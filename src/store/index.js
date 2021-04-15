import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import { request } from "@/network/request.js";
import getSearchList from '@/network/getSearchList.js'
import getDiscoverList from '@/network/getDiscoverList.js'

export default new Vuex.Store({
  state: {
    appVersion: "1.3.0",
    currentList: [],   //当前歌单
    currentListIndex: null, //当前歌曲
    currentSongUrl: '',  //当前歌曲播放链接
    searchList: [],  //搜索歌单
    discoverList: [],  //发现歌单
    likedList: [],  //喜欢歌单
    markList: [],
    markListIndex: 0,
    playMode: 'listForwardMode',  //播放模式
    albumImgRotateStyle: {},  //控制专辑图片旋转
    searchText: '',  //用户搜索内容
    currentPage: 1,  //搜索请求页数(一页50包含50首歌曲)
    loadMoreText: '加载更多',  //加载更多按钮显示的文本
    canLoadMore: true,  //指示是否已没有更多数据可加载
    lyric: [],  //歌词
    currentTime: null,  //当前歌曲正在播放的时刻
    isInputFocus: false,  //用户是否正在输入，用于决定是否移除快捷键监听
    isSearchPageBlur: false,  //搜索页面是否模糊
    isSearchPageLoading: false,  //搜索页面是否显示正在加载
    isDiscoverPageLoading: false, //发现页面是否显示正在加载
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
      appVersion: '1.3.0',
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
  },
  mutations: {

    getHistoryData(state) {
      if (localStorage.hasOwnProperty('likedList')) {
        state.likedList = JSON.parse(localStorage.getItem('likedList'))
      }

      if (localStorage.hasOwnProperty('markList')) {
        state.markList = JSON.parse(localStorage.getItem('markList'))
      }

      if (localStorage.hasOwnProperty('setting')) {
        let setting = JSON.parse(localStorage.getItem('setting'))
        if(setting.appVersion === state.appVersion) {
          state.setting = setting
        }else {
          //做一些不同版本兼容性工作

        }
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
    },

    sendCurrentIndex(state, payload) {
      state.currentListIndex = payload.index

      //将点击歌曲所在的歌单复制一份给当前歌单
      //不要直接两者相等，不然两歌单可能会相互干扰
      state.currentList = []
      state.currentList.push(...payload.list)
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
      localStorage.setItem('setting',JSON.stringify(state.setting))
    },

    setHighlightColor(state, highlightColor) {
      state.setting.appearance.highlightColor = highlightColor
      localStorage.setItem('setting',JSON.stringify(state.setting))
    },

    setFontFamily(state, fontFamily) {
      state.setting.appearance.font.fontFamily = fontFamily
      localStorage.setItem('setting',JSON.stringify(state.setting))
    },

    setLyricFontFamily(state, lyricFontFamily) {
      state.setting.appearance.font.lyricFontFamily = lyricFontFamily
      localStorage.setItem('setting',JSON.stringify(state.setting))
    },

    setFontWeight(state, fontWeight) {
      state.setting.appearance.font.fontWeight = fontWeight
      localStorage.setItem('setting',JSON.stringify(state.setting))
    },

    setLyricFontWeight(state, lyricFontWeight) {
      state.setting.appearance.font.lyricFontWeight = lyricFontWeight
      localStorage.setItem('setting',JSON.stringify(state.setting))
    },

    setFontSize(state, fontSize) {
      state.setting.appearance.font.fontSize = fontSize
      localStorage.setItem('setting',JSON.stringify(state.setting))
    },

    setLyricFontSize(state, lyricFontSize) {
      state.setting.appearance.font.lyricFontSize = lyricFontSize
      localStorage.setItem('setting',JSON.stringify(state.setting))
    },

    //新建歌单
    addSongList(state, inputText) {
      let newSongList = {
        name: inputText,
        list: []
      }
      state.markList.push(newSongList)

      localStorage.setItem('markList', JSON.stringify(state.markList))

    },

    //删除歌单
    removeSongList(state) {
      state.markList.splice(state.removeMarkListIndex, 1)
      Vue.prototype.$message.showMessage({
        type: 'success',
        message: '歌单已被删除'
      })

      localStorage.setItem('markList', JSON.stringify(state.markList))

    },

    renameSongList(state, payload) {
      let index = payload.index
      let newName = payload.newName
      state.markList[index].name = newName
    },

    addMarkSong(state, markListIndex) {
      state.markList[markListIndex].list.unshift(state.selectedSong)
      Vue.prototype.$message.showMessage({
        type: "success",
        message: "收藏成功，歌曲已加入歌单",
      });

      localStorage.setItem('markList', JSON.stringify(state.markList))

    },

    //收藏歌曲只能从收藏页面移除
    removeMarkSong(state, songIndex) {
      state.markList[state.markListIndex].list.splice(songIndex, 1)
      Vue.prototype.$message.showMessage({
        type: 'success',
        message: '已将此歌曲从收藏列表移除'
      })

      localStorage.setItem('markList', JSON.stringify(state.markList))

    },

    sendLikedSong(state, item) {

      let isThisSongLiked = false
      let likedSongIndex = null

      //检测当前歌曲是否已在喜欢的列表中
      state.likedList.forEach((likedItem, index) => {
        if (likedItem.songmid === item.songmid) {
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

      localStorage.setItem('likedList', JSON.stringify(state.likedList))
    },

    //修改专辑图片样式，使专辑图片开始转动
    albumRotateRunning(state) {
      state.albumImgRotateStyle = {
        'animation': 'albumRotate 20s linear infinite running'
      }
    },

    //修改专辑图片样式，使专辑图片暂停转动（保持已转动的角度）
    albumRotatePaused(state) {
      state.albumImgRotateStyle = {
        'animation': 'albumRotate 20s linear infinite paused'
      }
    },

    handleDiscoverList(state) {

      //显示加载动画
      state.isDiscoverPageLoading = true

      getDiscoverList().then(res => {
        console.log(res)
        state.discoverList = res.data.data.list
        state.isDiscoverPageLoading = false
      }).catch(err => {
        console.log(err)
        Vue.prototype.$message.showMessage({
          type: 'error',
          message: "请求数据出错：" + err
        })
        state.isDiscoverPageLoading = false
      })
    },

    handleSearchSong(state, searchText) {
      state.searchText = searchText

      //搜索时搜索页面模糊并显示加载动画
      state.isSearchPageBlur = true
      state.isSearchPageLoading = true

      state.loadMoreText = '加载更多', 

      getSearchList(state.searchText, 1)
        .then(res => {

          let searchList = res.data.data.list

          //有一些无id歌曲，将其剔除掉。因为没id根本无法得到歌曲资源
          state.searchList = searchList.filter(item => item.songmid.length === 14)

          console.log(state.searchList)

          //搜索后再显示loadMore
          state.haveSearched = true

          //搜索完成隐藏搜索页面模糊和显示加载动画
          state.isSearchPageBlur = false
          state.isSearchPageLoading = false
        })
        .catch(err => {
          console.log(err)
          Vue.prototype.$message.showMessage({
            type: 'error',
            message: "请求数据出错：" + err
          })
          state.isSearchPageBlur = false
          state.isSearchPageLoading = false
        })
    },

    handleLoadMore(state) {
      state.loadMoreText = "加载中..."
      if (state.canLoadMore) {
        state.currentPage += 1
        getSearchList(state.searchText, state.currentPage)
          .then(res => {
            //得到下一页的搜索结果
            let moreSearchList = res.data.data.list

            //如请求结果为0，则说明没有更多歌曲了
            if (moreSearchList.length === 0) {
              state.loadMoreText = "已到达底线，再也加载不出来了"
              state.canLoadMore = false
            } else {
              moreSearchList.forEach(item => {

                //有一些无id歌曲，将其剔除掉。因为没id根本无法得到歌曲资源
                if (item.songmid.length === 14) {
                  state.searchList.push(item)
                }
              })
              state.loadMoreText = "加载更多"
              console.log(state.searchList)
            }
          })
          .catch(err => {
            state.loadMoreText = "加载更多"
            console.log(err)
            Vue.prototype.$message.showMessage({
              type: 'error',
              message: "请求数据出错：" + err
            })
          })
      }
    },

    //处理随机播放模式下的下一首
    handleRandomMode(state) {
      let randomIndex = Math.floor(Math.random() * state.currentList.length)
      state.currentListIndex = randomIndex
      this.commit('getSongUrlAndLyric')
    },

    getSongUrlAndLyric(state) {
      request({
        url: 'song',
        params: {
          songmid: state.currentList[state.currentListIndex].songmid,
          guid: '126548448',
          lyric: 1
        },
      }).then(res => {

        //获取歌曲播放链接
        console.log(res)
        state.currentSongUrl = res.data.data.musicUrl
        if (state.currentSongUrl === "https://ws.stream.qqmusic.qq.com/") {
          Vue.prototype.$message.showMessage({
            type: 'error',
            message: "无法获取音乐资源，可能为付费音乐或其他原因。"
          })
          this.commit('playNextSong')
        }

        //处理歌词
        let lyric = res.data.data.lyric

        //歌词按行切开变成数组
        lyric = lyric.split('\n')

        //去掉前面五个没用的歌词
        lyric.splice(0, 5)

        //清除上一首的歌词
        state.lyric = []

        //将歌词与时间分离
        lyric.forEach(eachLine => {
          let t = eachLine.substring(eachLine.indexOf("[") + 1, eachLine.indexOf("]"))
          let lyricTextLineObj = {
            time: (parseInt(t.split(":")[0]) * 60 + parseFloat(t.split(":")[1])).toFixed(2),
            text: eachLine.substring(eachLine.indexOf("]") + 1, eachLine.length)
          }

          state.lyric.push(lyricTextLineObj)
        })
      }).catch(err => {
        console.log(err)
        Vue.prototype.$message.showMessage({
          type: 'error',
          message: "请求数据出错：" + err
        })
        this.commit('albumRotatePaused')
      })
    },

    playPreviousSong(state) {
      //各个列表上一首到头则index重新置零
      state.currentListIndex -= 1
      if (state.currentListIndex >= 0) {
        this.commit('getSongUrlAndLyric')
      } else {
        state.currentListIndex = 0
      }
    },

    playCurrentSong() {
      this.commit('getSongUrlAndLyric')
    },

    playNextSong(state) {
      //各个列表下一首到头了，则将index停留在最后一位
      state.currentListIndex += 1
      if (state.currentListIndex < state.currentList.length) {
        this.commit('getSongUrlAndLyric')
      } else {
        //当播放列表index超出，如果是列表循环模式，则将index置零，从头开始播放
        if (state.playMode === "listCycleMode") {
          state.currentListIndex = 0
          this.commit('getSongUrlAndLyric')
        } else {
          //如果不是列表循环模式，则index停留在最后
          state.currentListIndex = state.currentList.length - 1
          this.commit('albumRotatePaused')
        }
      }
    }
  },
  actions: {
  },
  modules: {
  }
})
