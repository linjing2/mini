<template>
  <div class="singer-page">
    <div class="singer-header">
      <div
        class="singer-img"
        :style="{
          width: imgWidth + 'px',
          height: imgHeight + 'px',
          'border-radius': imgBorderRadius + '%',
        }"
      >
        <img :src="singerInfo.singerPic" />
      </div>
      <div class="singer-introduction">
        <div class="singer-page-singer-name">{{ singerInfo.singerName }}</div>
        <div class="singer-description" :style="{ height: descriptionHeight + 'px' }">
          {{ singerInfo.singerDescription }}
        </div>
      </div>
    </div>
    <div class="singer-body">
      <div class="singer-tab-box">
        <div
          class="singer-tab"
          @click="getSong"
          :class="{ active: activatedTab === '单曲' }"
        >
          单曲
        </div>
        <div
          class="singer-tab"
          @click="getAlbumList"
          :class="{ active: activatedTab === '专辑' }"
        >
          专辑
        </div>
        <div class="singer-tab" @click="getMV" :class="{ active: activatedTab === 'MV' }">
          MV
        </div>
      </div>
      <div class="singer-list-box" :style="{ height: songListBoxHeight + 'px' }">
        <div class="singer-list-item" v-show="isShowSingerSong">
          <loading :isLoading="isSongLoading"></loading>
          <song-list
            :list="songList"
            :isShowLoadMore="true"
            @loadMore="loadMoreSong"
            :loadMoreText="songLoadMoreText"
            :isKeepScrollPositon="false"
            @scroll="scroll"
          ></song-list>
        </div>
        <div class="singer-list-item" v-show="isShowSingerAlbum">
          <loading :isLoading="isAlbumLoading"></loading>
          <grid-list
            :list="albumList"
            :loadMoreText="albumLoadMoreText"
            @loadMore="loadMoreAlbum"
            @clickItem="getAlbumInfo"
            @scroll="scroll"
          ></grid-list>
        </div>
        <div class="singer-list-item" v-show="isShowSingerMV">
          <loading :isLoading="isMvLoading"></loading>
          <div class="singer-mv-box" @scroll="scroll">
            <div
              class="singer-mv-item"
              v-for="item in MVList"
              @click="getMVInfo(item)"
              :key="item.mvId"
            >
              <img :src="item.piv" />
              <div class="singer-mv-name">{{ item.mvName }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import SongList from "@/common/list/song/SongList.vue";
import GridList from "@/common/list/grid/GridList.vue";
import Loading from "@/common/loading/Loading.vue";

import {
  getSingerMusicList,
  getSingerAlbumList,
  getAlbum,
  getSingerMvList,
  getMvInfo,
  getMUrl,
} from "@/network/spider";
import standardizeAPI from "@/network/standardizeAPI.js";

export default {
  name: "singer-page",
  data() {
    return {
      isShowSingerSong: true,
      isShowSingerAlbum: false,
      isShowSingerMV: false,
      songList: [],
      songListPage: 0,
      songLoadMoreText: "加载更多",
      albumList: [],
      albumListPage: 0,
      albumLoadMoreText: "加载更多",
      MVList: [],
      MVListPage: 0,
      MVLoadMoreText: "加载更多",
      activatedTab: "单曲",
      isSongLoading: false,
      isAlbumLoading: false,
      isMvLoading: false,
      imgWidth: 200,
      imgHeight: 200,
      imgBorderRadius: 20,
      descriptionHeight: 100,
      songListBoxHeight: 440,
      lastScrollPos: 0,
    };
  },
  components: {
    SongList,
    GridList,
    Loading,
  },
  activated() {
    this.imgWidth = 200;
    this.imgHeight = 200;
    this.imgBorderRadius = 20;
    this.descriptionHeight = 100;
    this.songListBoxHeight = 440;
  },
  computed: {
    ...mapState(["singerInfo"]),
  },
  watch: {
    singerInfo() {
      this.songList = [];
      this.albumList = [];
      this.MVList = [];
      this.getSong();
      console.log("singerInfo change", this.singerInfo);
    },
  },
  mounted() {
    //一进入就展示歌手的单曲
    this.getSong();
  },
  methods: {
    // 监听滚动，缩放上方歌手信息
    scroll(e) {
      let scrollPos = e.target.scrollTop;
      let scrollDirection = scrollPos - this.lastScrollPos > 0 ? "down" : "up";

      // 向下滚动，缩小上方歌手信息
      if (scrollDirection == "down") {
        if (this.imgWidth > 100) {
          this.imgWidth -= 5;
          this.imgHeight = this.imgWidth;
        } else {
          this.imgWidth = 100;
          this.imgHeight = this.imgWidth;
        }

        if (this.songListBoxHeight < 540) {
          this.songListBoxHeight += 5;
        } else {
          this.songListBoxHeight = 540;
        }

        if (this.imgBorderRadius < 50) {
          this.imgBorderRadius += 2;
        } else {
          this.imgBorderRadius = 50;
        }

        if (this.descriptionHeight > 50) {
          this.descriptionHeight -= 5;
        } else {
          this.descriptionHeight = 50;
        }

        // 向上滚动，放大上方歌手信息
      } else if (scrollDirection == "up" && scrollPos >= 0 && scrollPos <= 200) {
        if (this.imgWidth < 200) {
          this.imgWidth += 10;
          this.imgHeight = this.imgWidth;
        } else {
          this.imgWidth = 200;
          this.imgHeight = this.imgWidth;
        }

        if (this.songListBoxHeight > 440) {
          this.songListBoxHeight -= 10;
        } else {
          this.songListBoxHeight = 440;
        }

        if (this.imgBorderRadius > 20) {
          this.imgBorderRadius -= 5;
        } else {
          this.imgBorderRadius = 20;
        }

        if (this.descriptionHeight < 100) {
          this.descriptionHeight += 10;
        } else {
          this.descriptionHeight = 100;
        }
      }

      this.lastScrollPos = scrollPos;
    },
    //请求歌手的单曲
    async getSong() {
      this.activatedTab = "单曲";
      this.isShowSingerAlbum = false;
      this.isShowSingerMV = false;
      this.isShowSingerSong = true;
      this.songListPage = 0;
      this.songLoadMoreText = "加载更多";

      console.log(this.singerInfo);
      let songListData = [];

      if (this.songList.length == 0) {
        this.isSongLoading = true;

        try {
          songListData = await getSingerMusicList({
            page: 0,
            singerMid: this.singerInfo.singerMid,
          });
        } catch (err) {
          this.$message.showMessage({
            type: "error",
            message: "请求数据出错：" + err,
          });
          this.isSongLoading = false;
        }
        console.log("songListData", songListData);

        this.isSongLoading = false;

        this.songList = standardizeAPI(songListData.list);
      }
    },

    async getAlbumList() {
      this.activatedTab = "专辑";
      this.isShowSingerSong = false;
      this.isShowSingerMV = false;
      this.isShowSingerAlbum = true;
      this.albumListPage = 0;
      this.albumLoadMoreText = "加载更多";

      if (this.albumList.length == 0) {
        this.isAlbumLoading = true;

        let albumListData;
        try {
          albumListData = await getSingerAlbumList({
            page: 0,
            singerMid: this.singerInfo.singerMid,
          });
        } catch (err) {
          this.$message.showMessage({
            type: "error",
            message: "请求数据出错：" + err,
          });
          this.isAlbumLoading = false;
        }
        console.log("albumListData", albumListData);

        this.isAlbumLoading = false;

        let albumList = [];
        albumListData.list.forEach((item) => {
          let gridListItem = {
            id: item.albumMid,
            imgUrl:
              "https://y.gtimg.cn/music/photo_new/T002R300x300M000" +
              item.albumMid +
              ".jpg?max_age=2592000",
            text: item.albumName,
          };
          albumList.push(gridListItem);
        });
        this.albumList = albumList;
      }
    },

    async getAlbumInfo(item) {
      this.isAlbumLoading = true;

      let albumInfoData;
      try {
        albumInfoData = await getAlbum({
          albumMid: item.id,
        });
      } catch (err) {
        this.$message.showMessage({
          type: "error",
          message: "请求数据出错：" + err,
        });
        this.isAlbumLoading = false;
      }
      console.log("albumInfoData", albumInfoData);
      this.isAlbumLoading = false;

      let musicList = standardizeAPI(albumInfoData.musicList);
      let albumInfo = {
        albumID: albumInfoData.album.albumMid,
        albumName: albumInfoData.album.albumName,
        albumImgUrl:
          "https://y.gtimg.cn/music/photo_new/T002R300x300M000" +
          albumInfoData.album.albumMid +
          ".jpg?max_age=2592000",
        musicList: musicList,
      };
      this.$store.commit("setAlbumInfo", albumInfo);
      this.$router.push({ path: "AlbumPage" });
    },

    async getMV() {
      this.activatedTab = "MV";
      this.isShowSingerSong = false;
      this.isShowSingerAlbum = false;
      this.isShowSingerMV = true;

      if (this.MVList.length == 0) {
        this.isMvLoading = true;

        let MVListData;
        try {
          MVListData = await getSingerMvList({
            singerMid: this.singerInfo.singerMid,
            page: 0,
          });
        } catch (err) {
          this.$message.showMessage({
            type: "error",
            message: "请求数据出错：" + err,
          });
          this.isMvLoading = false;
        }
        console.log("MVListData", MVListData);
        this.isMvLoading = false;
        this.MVList = MVListData.list;
      }
    },

    async getMVInfo(item) {
      this.isMvLoading = true;

      let MVInfoData;
      try {
        MVInfoData = await getMvInfo({
          mvId: item.mvId,
        });
      } catch (err) {
        this.$message.showMessage({
          type: "error",
          message: "请求数据出错：" + err,
        });
        this.isMvLoading = false;
      }
      console.log("MVInfoData", MVInfoData);
      this.isMvLoading = false;

      let { mvSourceUrl, cn, vkey } = await getMUrl({
        fileid: MVInfoData.fileid,
      });

      let MVUrl = mvSourceUrl + cn + "?vkey=" + vkey;
      console.log(MVUrl);

      this.$store.commit("setMVUrl", MVUrl);
      this.$store.commit("showDialog", "mv-player");
    },

    async loadMoreSong() {
      //如果可以加载更多单曲则请求更多单曲，否则停止请求单曲
      if (this.songLoadMoreText != "已经到底啦o((>ω< ))o") {
        this.songListPage += 1;
        this.isSongLoading = true;

        let songListData;
        try {
          songListData = await getSingerMusicList({
            page: this.songListPage,
            singerMid: this.singerInfo.singerMid,
          });
        } catch (err) {
          this.$message.showMessage({
            type: "error",
            message: "请求数据出错：" + err,
          });
          this.isSongLoading = false;
        }
        console.log("songListData", songListData);
        this.isSongLoading = false;

        if (songListData.list.length < 30) {
          this.songLoadMoreText = "已经到底啦o((>ω< ))o";
        }
        this.songList.push(...standardizeAPI(songListData.list));
      }
    },

    async loadMoreAlbum() {
      //如果可以加载更多专辑则请求更多专辑，否则停止请求单曲
      if (this.albumLoadMoreText != "已经到底啦o((>ω< ))o") {
        this.albumListPage += 1;
        this.isAlbumLoading = true;

        let albumListData;
        try {
          albumListData = await getSingerAlbumList({
            page: this.albumListPage,
            singerMid: this.singerInfo.singerMid,
          });
        } catch (err) {
          this.$message.showMessage({
            type: "error",
            message: "请求数据出错：" + err,
          });
          this.isAlbumLoading = false;
        }
        console.log("albumListData", albumListData);
        this.isAlbumLoading = false;

        if (albumListData.list.length < 30) {
          this.albumLoadMoreText = "已经到底啦o((>ω< ))o";
        }

        albumListData.list.forEach((item) => {
          let gridListItem = {
            id: item.albumMid,
            imgUrl:
              "https://y.gtimg.cn/music/photo_new/T002R300x300M000" +
              item.albumMid +
              ".jpg?max_age=2592000",
            text: item.albumName,
          };
          this.albumList.push(gridListItem);
        });
      }
    },
  },
};
</script>

<style>
.singer-page {
  width: 100%;
  height: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
}

.singer-header {
  width: 100%;
  display: flex;
  align-items: center;
}

.singer-img {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
  overflow: hidden;
}

.singer-img > img {
  width: 100%;
  height: 100%;
}

.singer-introduction {
  flex: 1;
  box-sizing: border-box;
  padding: 0 10px;
}

.singer-page-singer-name {
  width: 100%;
  font-size: 20px;
}

.singer-description {
  width: 100%;
  margin-top: 10px;
  font-size: 14px;
  text-indent: 2em;
  text-align: justify;
  overflow-y: scroll;
}

.singer-body {
  width: 100%;
  flex: 1;
}

.singer-tab-box {
  width: 100%;
  height: 40px;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
}

.singer-tab {
  padding: 4px 50px;
  height: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
}

.singer-tab:hover {
  cursor: pointer;
  transform: scale(1.1);
  background-color: var(--progress-bar-color);
}

.singer-tab:active {
  transform: scale(1.2);
}

.singer-list-box {
  width: 100%;
}

.singer-list-item {
  position: relative;
  width: 100%;
  height: 100%;
}

.singer-mv-box {
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: repeat(3, 33.33%);
  overflow-y: scroll;
}

.singer-mv-item {
  width: 240px;
  height: 200px;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
}

.singer-mv-item > img {
  width: 240px;
  height: 135px;
  border-radius: 20px;
}

.singer-mv-name {
  width: 240px;
  height: 40px;
  line-height: 20px;
  text-align: center;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
}
</style>
