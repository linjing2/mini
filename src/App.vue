<template>
  <div id="app">
    <div class="app-background">
      <div class="blur-background">
        <img :src="getAlbumImg" />
      </div>
      <div v-if="false" class="milk-white-theme"></div>
      <div v-if="false" class="highlight-black-theme"></div>
      <div v-if="false" class="simple-green-theme"></div>
    </div>
    <div class="app-background-above">
      <!-- 展示需要显示的对话框 -->
      <component v-if="isShowDialog" :is="dialog"></component>
      <left-nav></left-nav>
      <middle-box></middle-box>
      <right-bar></right-bar>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

import LeftNav from "./components/left_nav/LeftNav";
import MiddleBox from "./components/middle_box/MiddleBox";
import RightBar from "./components/right_bar/RightBar";
import RemoveSongList from "@/common/dialog/RemoveSongList.vue";
import AddMarkSong from "@/common/dialog/AddMarkSong.vue";

export default {
  name: "app",
  components: {
    LeftNav,
    MiddleBox,
    RightBar,
    AddMarkSong,
    RemoveSongList,
  },
  data() {
    return {
      //默认专辑图片
      defaultAlbumImgUrl: require("@/assets/default-album-img.svg"),
    };
  },
  computed: {
    ...mapState(["currentList", "currentListIndex", "dialog", "isShowDialog"]),

    getAlbumImg() {
      //启动时以默认专辑图片做为背景图片
      if (this.currentList.length === 0) {
        return this.defaultAlbumImgUrl;
      }

      //获取当前歌曲专辑图片
      let albumimg = this.currentList[this.currentListIndex].albumimg;

      //返回下面的专辑图片地址，说明此专辑根本没专辑图片
      if (
        albumimg === "http://imgcache.qq.com/music/photo/album_300/0/300_albumpic_0_0.jpg"
      ) {
        return this.defaultAlbumImgUrl;
      }

      return albumimg;
    },
  },
  mounted() {
    this.$store.commit("getHistoryData");
    this.$router.push("DiscoverPage");
  },
};
</script>

<style>
:root {
  --highlight-color: #c5b5f0;
  --highlight-deep-color: #7e57c2;
}

body {
  position: relative;
}

#app {
  width: 1000px;
  height: 800px;
  position: relative;
  margin-left: 15px;
  margin-top: 15px;
  border-radius: 20px;
  -webkit-user-select: none;
  box-shadow: 0 0 10px 5px rgba(0, 0, 0, 0.3);
  overflow: hidden;
  background-color: white;
  /* color: white; */
}

.app-background {
  width: 100%;
  height: 100%;
  position: absolute;
}

.blur-background {
  width: 100%;
  height: 100%;
  filter: blur(150px);
}

.milk-white-theme {
  width: 100%;
  height: 100%;
  background-color: #fdfdfd;
}

.highlight-black-theme {
  width: 100%;
  height: 100%;
  background-color: #171717;
}

.simple-green-theme {
  width: 100%;
  height: 100%;
  background-color: #dffff5;
}

.blur-background > img {
  width: 100%;
  height: 100%;
}

.app-background-above {
  width: 100%;
  height: 100%;
  position: absolute;
}

/* 下面修改全局滚动条样式 */
::-webkit-scrollbar {
  width: 10px;
}

::-webkit-scrollbar-thumb {
  border-radius: 5px;
  background-color: rgba(255, 255, 255, 0.4);
}

::-webkit-scrollbar-track {
  border-radius: 5px;
  background-color: rgba(255, 255, 255, 0.1);
}
</style>
