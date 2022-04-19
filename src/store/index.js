import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)


import { getLyric } from "@/network/spider";
import getSongUrl from "@/network/music_api/getSongUrl.js";

import getAppVersion from '@/network/gitee_api/version/getAppVersion';
import getCurrentTime from '@/utils/time/getCurrentTime';
import timeToNumber from '@/utils/time/timeToNumber';
import getmac from "getmac";
import decrypt from "@/utils/security/decrypt.js";
import encrypt from "@/utils/security/encrypt.js";

export default new Vuex.Store({
  state: {
    userInfo: {
      name: null,
      owner: null,
      avatar_url: null,
      access_token: null,
      refresh_token: null
    },
    appVersion: "1.5.0",
    lastCheckUpdateTime: "2021-07-09 17:48:00",
    checkUpdateData: {},
    isAutoCheckUpdate: true, // 是否自动检查更新
    isShowThemeAnimation: false,
    isPlaying: false,   // 当前是否正在播放歌曲
    currentList: [],   //当前歌单
    currentListIndex: null, //当前歌曲index
    currentSongUrl: '',  //当前歌曲播放链接
    discoverList: [],  //发现歌单
    likedList: [],  //喜欢歌单
    likedListStore: {  //喜欢歌单存储到localStorage
      apiVersion: "1.3.0",
      likedList: []
    },
    markList: [],   //收藏歌单
    markListIndex: 0,
    markListStore: {  //收藏歌单存储到localStorage
      apiVersion: "1.3.0",
      markList: []
    },
    playList: [],
    singerInfo: {},
    albumInfo: {},
    MVUrl: '',
    chooseSingerList: [],
    playMode: 'listForwardMode',  //播放模式
    searchText: '',  //用户搜索内容
    lyric: [],  //歌词
    currentTime: null,  //当前歌曲正在播放的时刻
    isInputFocus: false,  //用户是否正在输入，用于决定是否移除快捷键监听
    selectedSong: {},    //被选中的歌曲，用于暂存需要收藏的歌曲
    dialog: "",          //需要显示对话框组件的名称
    isShowDialog: false, //是否显示对话框
    isShowSettingPanel: false,  //是否显示设置面板
    removeMarkListIndex: null,  //暂存需要删除的歌单的index
    routerHistory: {       //记录最后一次路由跳转历史，用于导航路由和设置路由切换时自动回到上一次路由位置
      navRouter: '/Discover',
      settingRouter: '/Appearance/Background',
    },
    setting: {        //记录用户的设置信息
      appVersion: '1.4.0',
      appearance: {
        background: {
          text: '变色龙',
          value: 'chameleon-theme'
        },
        highlightColor: {
          text: '罗兰紫',
          value: '#c5b5f0'
        },
        font: {
          fontFamily: '系统默认',
          lyricFontFamily: '跟随界面字体',
          fontWeight: { text: "常规", value: "normal" },
          lyricFontWeight: { text: "常规", value: "normal" },
          fontSize: '16px',
          lyricFontSize: '20px',
        }
      }
    },
    playNextSongTimer: null,
  },
  mutations: {

    getHistoryData(state) {
      //检查本地是否有喜欢歌单的历史数据
      if (localStorage.hasOwnProperty('likedListStore')) {
        let likedListStore = JSON.parse(localStorage.getItem('likedListStore'))
        //如果有，再检查历史数据的版本是否与此app为同一版本
        //高版本app可能无法使用低版本的历史数据
        if (likedListStore.appVersion === '1.3.0' || likedListStore.apiVersion === '1.3.0') {
          state.likedList = likedListStore.likedList
        } else {
          //做一些不同版本兼容性工作

        }
      }

      //检查本地是否有收藏歌单的历史数据
      if (localStorage.hasOwnProperty('markListStore')) {
        let markListStore = JSON.parse(localStorage.getItem('markListStore'))
        //如果有，再检查历史数据的版本是否与此app为同一版本
        //高版本app可能无法使用低版本的历史数据
        if (markListStore.appVersion === '1.3.0' || markListStore.apiVersion === '1.3.0') {
          state.markList = markListStore.markList
        } else {
          //做一些不同版本兼容性工作

        }
      }

      //获取历史设置值
      if (localStorage.hasOwnProperty('setting')) {
        let setting = JSON.parse(localStorage.getItem('setting'))
        if (setting.appVersion === state.appVersion) {
          state.setting = setting
        } else {
          //做一些不同版本兼容性工作

        }
      }

      if (localStorage.hasOwnProperty('lastCheckUpdateTime')) {
        let lastCheckUpdateTime = localStorage.getItem('lastCheckUpdateTime')
        state.lastCheckUpdateTime = lastCheckUpdateTime
      }

      if (localStorage.hasOwnProperty('isAutoCheckUpdate')) {
        let isAutoCheckUpdate = JSON.parse(localStorage.getItem('isAutoCheckUpdate'))
        state.isAutoCheckUpdate = isAutoCheckUpdate
      }

      // 获取用户历史用户信息
      if (localStorage.hasOwnProperty("userInfo")) {
        let userInfoStr = localStorage.getItem("userInfo");
        let userInfo = JSON.parse(userInfoStr);
        let key = getmac()
        state.userInfo = {
          name: decrypt(userInfo.name, key),
          owner: decrypt(userInfo.owner, key),
          avatar_url: decrypt(userInfo.avatar_url, key),
          access_token: decrypt(userInfo.access_token, key),
          refresh_token: decrypt(userInfo.refresh_token, key),
        };
      }

      this.commit('initApp')
    },

    initApp(state) {
      document.body.style.setProperty("--highlight-color", state.setting.appearance.highlightColor.value);
      document.body.style.setProperty("--font-family", state.setting.appearance.font.fontFamily);
      document.body.style.setProperty("--lyric-font-family", state.setting.appearance.font.lyricFontFamily);
      document.body.style.setProperty("--font-weight", state.setting.appearance.font.fontWeight.value);
      document.body.style.setProperty("--lyric-font-weight", state.setting.appearance.font.lyricFontWeight.value);
      document.body.style.setProperty("--font-size", state.setting.appearance.font.fontSize);
      document.body.style.setProperty("--lyric-font-size", state.setting.appearance.font.lyricFontSize);

      //暗主题需要改变文字、进度条等颜色
      if (state.setting.appearance.background.value === "dark-highlight-theme") {
        document.body.style.setProperty("--font-color", "#eee");
        document.body.style.setProperty("--progress-bar-color", "rgba(255,255,255,0.1)");
      }

      //根据不同主题改变背景颜色
      switch (state.setting.appearance.background.value) {
        case "chameleon-theme":
          document.body.style.setProperty("--background-color", "white");
          break;

        case "milk-white-theme":
          document.body.style.setProperty("--background-color", "#fdfdfd");
          break;

        case "dark-highlight-theme":
          document.body.style.setProperty("--background-color", "#171717");
          break;

        case "simple-green-theme":
          document.body.style.setProperty("--background-color", "#dffff5");
          break;

        case "colorful-theme":
          document.body.style.setProperty("--background-color", "white");
          break;
      }
    },

    setUserInfo(state, userInfo) {
      state.userInfo = userInfo
      let key = getmac()
      // 加密用户信息
      let userInfoStore = {
        avatar_url: encrypt(userInfo.avatar_url, key),
        owner: encrypt(userInfo.owner, key),
        name: encrypt(userInfo.name, key),
        access_token: encrypt(userInfo.access_token, key),
        refresh_token: encrypt(userInfo.refresh_token, key),
      };
      localStorage.setItem('userInfo', JSON.stringify(userInfoStore))
    },

    removeUserInfo(state) {
      state.userInfo = {
        name: null,
        owner: null,
        avatar_url: null,
        access_token: null,
        refresh_token: null
      }

      localStorage.removeItem("userInfo")
    },

    setState(state, payload) {
      let key = payload.key
      let value = payload.value
      console.log(key)
      console.log(value)
      console.log(value instanceof Array)
      if (value instanceof Array) {
        state[key] = [...value]
        console.log(state[key])
      }
    },

    setIsShowThemeAnimation(state, isShowThemeAnimation) {
      state.isShowThemeAnimation = isShowThemeAnimation
    },

    setCheckUpdateData(state, checkUpdateData) {
      state.checkUpdateData = checkUpdateData
    },

    setIsAutoCheckUpdate(state, isAutoCheckUpdate) {
      state.isAutoCheckUpdate = isAutoCheckUpdate
      localStorage.setItem('isAutoCheckUpdate', isAutoCheckUpdate)
    },

    setIsPlaying(state, isPlaying) {
      state.isPlaying = isPlaying
    },

    sendCurrentIndex(state, payload) {
      state.currentListIndex = payload.index

      state.currentList = []
      state.currentList.push(...payload.list)
    },

    setCurrentListIndex(state, currentListIndex) {
      state.currentListIndex = currentListIndex
    },

    setCurrentSongUrl(state, songUrl) {
      state.currentSongUrl = songUrl
    },

    setLyric(state, lyric) {
      state.lyric = lyric
    },

    setSearchList(state, searchList) {
      state.searchList = searchList
    },

    setSearchText(state, searchText) {
      state.searchText = searchText
      console.log(state.searchText)
    },

    setSearchPage(state, searchPage) {
      state.searchPage = searchPage
    },

    setPlayList(state, playList) {
      state.playList = playList
    },

    setSingerInfo(state, singerInfo) {
      state.singerInfo = singerInfo
    },

    setAlbumInfo(state, albumInfo) {
      state.albumInfo = albumInfo
    },

    setMVUrl(state, MVUrl) {
      state.MVUrl = MVUrl
    },

    setChooseSingerList(state, chooseSingerList) {
      state.chooseSingerList = chooseSingerList
    },

    pushSearchLoadMore(state, loadMoreList) {
      state.searchList.push(...loadMoreList)
    },

    sendMarkListIndex(state, markListIndex) {
      state.markListIndex = markListIndex
    },

    sendPlayMode(state, mode) {
      state.playMode = mode
    },

    sendCurrentTime(state, currentTime) {
      state.currentTime = currentTime
    },

    sendInputFocus(state, isInputFocus) {
      state.isInputFocus = isInputFocus
    },

    sendSelectedSong(state, selectedSong) {
      state.selectedSong = selectedSong
      console.log(state.selectedSong)
    },

    sendRemoveMarkListIndex(state, removeMarkListIndex) {
      state.removeMarkListIndex = removeMarkListIndex
    },

    showDialog(state, dialog) {
      state.dialog = dialog
      state.isShowDialog = true
    },

    hideDialog(state) {
      state.isShowDialog = false
    },

    showSettingPanel(state) {
      state.isShowSettingPanel = true
    },

    hideSettingPanel(state) {
      state.isShowSettingPanel = false
    },

    setRouterHistory(state, payload) {
      if (payload.router === 'nav') {
        state.routerHistory.navRouter = payload.path
      }
      if (payload.router === 'setting') {
        state.routerHistory.settingRouter = payload.path
      }
    },

    setBackground(state, background) {
      state.setting.appearance.background = background
      localStorage.setItem('setting', JSON.stringify(state.setting))
    },

    setHighlightColor(state, highlightColor) {
      state.setting.appearance.highlightColor = highlightColor
      localStorage.setItem('setting', JSON.stringify(state.setting))
    },

    setFontFamily(state, fontFamily) {
      state.setting.appearance.font.fontFamily = fontFamily
      localStorage.setItem('setting', JSON.stringify(state.setting))
    },

    setLyricFontFamily(state, lyricFontFamily) {
      state.setting.appearance.font.lyricFontFamily = lyricFontFamily
      localStorage.setItem('setting', JSON.stringify(state.setting))
    },

    setFontWeight(state, fontWeight) {
      state.setting.appearance.font.fontWeight = fontWeight
      localStorage.setItem('setting', JSON.stringify(state.setting))
    },

    setLyricFontWeight(state, lyricFontWeight) {
      state.setting.appearance.font.lyricFontWeight = lyricFontWeight
      localStorage.setItem('setting', JSON.stringify(state.setting))
    },

    setFontSize(state, fontSize) {
      state.setting.appearance.font.fontSize = fontSize
      localStorage.setItem('setting', JSON.stringify(state.setting))
    },

    setLyricFontSize(state, lyricFontSize) {
      state.setting.appearance.font.lyricFontSize = lyricFontSize
      localStorage.setItem('setting', JSON.stringify(state.setting))
    },

    //新建歌单
    addSongList(state, inputText) {
      let newSongList = {
        name: inputText,
        list: []
      }
      state.markList.push(newSongList)

      //将收藏歌单存储起来
      state.markListStore.markList = state.markList
      localStorage.setItem('markListStore', JSON.stringify(state.markListStore))

    },

    //删除歌单
    removeSongList(state) {
      state.markList.splice(state.removeMarkListIndex, 1)
      Vue.prototype.$message.showMessage({
        type: 'success',
        message: '歌单已被删除'
      })

      //将收藏歌单存储起来
      state.markListStore.markList = state.markList
      localStorage.setItem('markListStore', JSON.stringify(state.markListStore))

    },

    //修改收藏歌单名称
    renameSongList(state, payload) {
      let index = payload.index
      let newName = payload.newName
      state.markList[index].name = newName

      //将收藏歌单存储起来
      state.markListStore.markList = state.markList
      localStorage.setItem('markListStore', JSON.stringify(state.markListStore))
    },

    addMarkSong(state, markListIndex) {
      state.markList[markListIndex].list.unshift(state.selectedSong)
      Vue.prototype.$message.showMessage({
        type: "success",
        message: "收藏成功，歌曲已加入歌单",
      });

      //将收藏歌单存储起来
      state.markListStore.markList = state.markList
      localStorage.setItem('markListStore', JSON.stringify(state.markListStore))

    },

    //收藏歌曲只能从收藏页面移除
    removeMarkSong(state, songIndex) {
      state.markList[state.markListIndex].list.splice(songIndex, 1)
      Vue.prototype.$message.showMessage({
        type: 'success',
        message: '已将此歌曲从收藏列表移除'
      })

      //将收藏歌单存储起来
      state.markListStore.markList = state.markList
      localStorage.setItem('markListStore', JSON.stringify(state.markListStore))

    },

    sendLikedSong(state, item) {

      let isThisSongLiked = false
      let likedSongIndex = null

      //检测当前歌曲是否已在喜欢的列表中
      state.likedList.forEach((likedItem, index) => {
        if (likedItem.songID === item.songID) {
          isThisSongLiked = true
          likedSongIndex = index
        }
      })

      if (isThisSongLiked === false) {

        //喜欢列表没有此歌曲，则加入喜欢列表
        state.likedList.unshift(item)

      } else {

        //喜欢列表已有此歌曲，则将此歌曲从喜欢列表移除
        state.likedList.splice(likedSongIndex, 1)

      }

      //将喜欢歌单存储起来
      console.log(state.likedList)
      console.log(state.likedListStore)
      state.likedListStore.likedList = state.likedList
      localStorage.setItem('likedListStore', JSON.stringify(state.likedListStore))
    },

  },
  actions: {
    async checkUpdate({ state, commit }) {

      let appVersion = await getAppVersion()
      console.log("appVersion", appVersion)

      let checkUpdateData
      switch (process.platform) {
        case "win32":
          checkUpdateData = appVersion.Windows
          break
        case "darwin":
          checkUpdateData = appVersion.Mac
          break
        case "linux":
          checkUpdateData = appVersion.Linux
          break
      }
      console.log(checkUpdateData)
      let latestVersionStr = checkUpdateData.latestVersion
      let latestVersionNum = Number(latestVersionStr.split('.').join(''))

      let currentVersionNum = Number(state.appVersion.split('.').join(''))

      if (currentVersionNum < latestVersionNum) {
        console.log('有新版本')
        commit('setCheckUpdateData', checkUpdateData)
        commit('showDialog', 'check-update')
        return true
      } else {
        console.log("已是最新版")
        return false
      }

    },

    async autoCheckUpdate({ state, dispatch }) {
      if (state.isAutoCheckUpdate == true) {
        let timeDiff = Date.now() - timeToNumber(state.lastCheckUpdateTime)

        // 自动检查更新至少间隔24小时才检查更新一次
        if (timeDiff > 24 * 3600 * 1000) {
          dispatch('checkUpdate')
          localStorage.setItem('lastCheckUpdateTime', getCurrentTime())
        } else {
          console.log('距上次检查更新没超过24小时')
        }
      }
    },

    async manualCheckUpdate({ dispatch }) {

      // 手动检查更新
      let haveNewVersion = await dispatch('checkUpdate')
      if (haveNewVersion == false) {
        Vue.prototype.$message.showMessage({
          type: 'success',
          message: "当前版本为最新版本！"
        })
      }
    },

    async playCurrentSong({ state, commit }) {

      // 清除上一首歌曲播放链接
      commit('setCurrentSongUrl', '')

      // 清除vip歌曲自动播放下一首歌曲定时器
      clearTimeout(state.playNextSongTimer)
      console.log("currentList", state.currentList)


      let currentSong = state.currentList[state.currentListIndex]
      console.log(currentSong)
      if (currentSong.type == 'local') {
        commit('setCurrentSongUrl', currentSong.songUrl)
      } else if (currentSong.type == 'cloud') {

      } else {
        // 请求歌曲播放链接
        let songUrl = await getSongUrl(currentSong)

        //提示vip歌曲无法播放
        if (songUrl == false) {
          Vue.prototype.$message.showMessage({
            type: 'error',
            message: "无法请求播放数据，可能为vip付费歌曲，即将播放下一首。"
          })
          state.playNextSongTimer = setTimeout(() => {
            this.dispatch('playNextSong')
          }, 5000)
        }

        commit('setCurrentSongUrl', songUrl)
        console.log('songUrl', state.currentSongUrl)

        // 请求歌词
        let lyric = []
        try {
          lyric = await getLyric(currentSong.songID)
        } catch (err) {
          Vue.prototype.$message.showMessage({
            type: 'error',
            message: "请求歌词出错：" + err
          })
        }

        commit('setLyric', lyric.lyricList)
      }


    },

    playNextSong({ state, commit, dispatch }) {

      commit('setCurrentListIndex', state.currentListIndex + 1)

      //各个列表下一首到头了，则将index停留在最后一位
      if (state.currentListIndex < state.currentList.length) {
        dispatch('playCurrentSong')
      } else {
        //当播放列表index超出，如果是列表循环模式，则将index置零，从头开始播放
        if (state.playMode === "listCycleMode") {
          commit('setCurrentListIndex', 0)
          dispatch('playCurrentSong')
        } else {
          //如果不是列表循环模式，则index停留在最后
          commit('setCurrentListIndex', state.currentList.length - 1)
        }
      }
    },

    playPreviousSong({ state, commit, dispatch }) {
      //各个列表上一首到头则index重新置零
      commit('setCurrentListIndex', state.currentListIndex - 1)
      if (state.currentListIndex >= 0) {
        dispatch('playCurrentSong')
      } else {
        commit('setCurrentListIndex', 0)
      }
    },

    //处理随机播放模式下的下一首
    handleRandomMode({ state, commit, dispatch }) {
      let randomIndex = Math.floor(Math.random() * state.currentList.length)
      commit('setCurrentListIndex', randomIndex)
      this.dispatch('playCurrentSong')
    },

  },
  modules: {
  }
})
