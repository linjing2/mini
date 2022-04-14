<template>
  <div class="album-page">
    <div class="album-header">
      <div
        class="album-page-album-img"
        :style="{
          width: imgWidth + 'px',
          height: imgHeight + 'px',
          'border-radius': imgBorderRadius + '%',
        }"
      >
        <img :src="albumInfo.albumImgUrl" />
      </div>
      <div class="album-page-album-name">{{ albumInfo.albumName }}</div>
    </div>
    <div class="album-list-box" :style="{ height: descriptionHeight + 'px' }">
      <song-list :list="albumInfo.musicList" @scroll="scroll"></song-list>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

import SongList from "@/common/list/song/SongList.vue";

export default {
  name: "album-page",
  components: {
    SongList,
  },
  computed: {
    ...mapState(["albumInfo"]),
  },
  data() {
    return {
      imgWidth: 200,
      imgHeight: 200,
      imgBorderRadius: 20,
      descriptionHeight: 460,
      scrollDownFlag: 0,
      scrollUpFlag: 0,
    };
  },
  watch:{
    // 向下滑动专辑图片缩小
    scrollDownFlag(newValue) {
      if(newValue == 1){
        this.imgWidth = 100
        this.imgHeight = 100
        this.imgBorderRadius = 50
      }
    },
    
    // 向上滑动专辑图片变大
    scrollUpFlag(newValue) {
      if(newValue == 1){
        this.imgWidth = 200
        this.imgHeight = 200
        this.imgBorderRadius = 20
      }
    }
  },
  activated() {
    this.imgWidth = 200;
    this.imgHeight = 200;
    this.imgBorderRadius = 20;
  },
  methods: {
    // 滚动时缩放图片
    scroll(e) {
      let scrollPos = e.target.scrollTop;

      if(scrollPos > 200){
        this.scrollDownFlag += 1
        this.scrollUpFlag = 0
      }

      if(scrollPos < 200){
        this.scrollUpFlag += 1
        this.scrollDownFlag = 0
      }

    },
  },
};
</script>

<style>
.album-page {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.album-header {
  width: 100%;
  display: flex;
  margin-bottom: 10px;
  align-items: center;
}

.album-page-album-img {
  overflow: hidden;
  transition: 0.5s;
}

.album-page-album-img > img {
  width: 100%;
  height: 100%;
}

.album-page-album-name {
  margin-left: 20px;
}

.album-list-box {
  width: 100%;
  flex: 1;
}
</style>
