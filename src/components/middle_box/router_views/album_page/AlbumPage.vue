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
    };
  },
  activated() {
    this.imgWidth = 200;
    this.imgHeight = this.imgWidth;
    this.imgBorderRadius = 20;
    this.descriptionHeight = 460;
  },
  methods: {
    // 滚动时缩放图片
    scroll(e) {
      let scrollPos = e.target.scrollTop;
      if (scrollPos >= 0 && scrollPos <= 200) {
        this.imgWidth = 200 - (scrollPos / 200) * 120;
        this.imgHeight = this.imgWidth;
        this.imgBorderRadius = 20 + (scrollPos / 200) * 30;
        this.descriptionHeight = 460 + (scrollPos / 200) * 120;
      }
    },
  },
};
</script>

<style>
.album-page {
  width: 100%;
  height: 100%;
}

.album-header {
  width: 100%;
  display: flex;
  margin-bottom: 10px;
  align-items: center;
}

.album-page-album-img {
  overflow: hidden;
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
}
</style>
