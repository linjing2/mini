<template>
  <div id="app">
    <!-- 展示需要显示的对话框 -->
    <component v-if="isShowDialog" :is="dialog"></component>

    <div class="app-background" :style="appStyle">
      <background-color></background-color>
    </div>
    <div class="app-background-above" :style="appStyle">
      <left-nav></left-nav>
      <middle-box></middle-box>
      <right-bar></right-bar>
    </div>
    <setting :style="settingPanelStyle"></setting>
  </div>
</template>

<script>
import { mapState } from "vuex";
import addFontLink from "@/network/download_font/addFontLink.js";
import checkFontDir from "@/network/download_font/checkFontDir.js";

import BackgroundColor from "@/common/background_color/BackgroundColor.vue";
import LeftNav from "./components/left_nav/LeftNav";
import MiddleBox from "./components/middle_box/MiddleBox";
import RightBar from "./components/right_bar/RightBar";
import Setting from "@/components/setting/Setting.vue";

// 对话框组件
import RemoveSongList from "@/common/dialog/RemoveSongList.vue";
import AddMarkSong from "@/common/dialog/AddMarkSong.vue";
import About from "@/common/dialog/About.vue";
import MvPlayer from "@/common/dialog/MvPlayer.vue";
import ChooseSinger from "@/common/dialog/ChooseSinger.vue";
import CheckUpdate from "@/common/dialog/CheckUpdate.vue";
import EditLocalSong from "@/common/dialog/EditLocalSong.vue";

export default {
  name: "app",
  components: {
    LeftNav,
    MiddleBox,
    RightBar,
    AddMarkSong,
    RemoveSongList,
    About,
    MvPlayer,
    ChooseSinger,
    CheckUpdate,
    EditLocalSong,
    Setting,
    BackgroundColor,
  },
  data() {
    return {
      appStyle: {},
      settingPanelStyle: {},
    };
  },
  computed: {
    ...mapState([
      "dialog",
      "isShowDialog",
      "isShowSettingPanel",
      "backgroundTheme",
      "isDownloadedFont",
    ]),
  },
  watch: {
    //绘制设置面板展示和隐藏的翻转动画
    isShowSettingPanel: function (newValue) {
      if (newValue === true) {
        this.appStyle = {
          animation: "Flip_0-90 0.3s linear forwards",
        };
        this.settingPanelStyle = {
          animation: "Flip_90-180 0.3s linear 0.3s forwards",
        };
      } else {
        this.settingPanelStyle = {
          animation: "Flip_180-90 0.3s linear forwards",
        };
        this.appStyle = {
          transform: "rotateY(90deg)",
          animation: "Flip_90-0 0.3s linear 0.3s forwards",
        };
      }
    },
  },
  mounted() {
    this.$store.commit("getHistoryData");
    this.$router.push({ path: "DiscoverPage" });
    this.$store.dispatch("autoCheckUpdate");

    //检查字体包是否已下载
    let isFontReady = checkFontDir();
    if (isFontReady) {
      // 已下载则添加link标签引入字体资源
      addFontLink();
    }
  },
};
</script>

<style>
:root {
  --highlight-color: #c5b5f0;
  --highlight-deep-color: #7e57c2;
  --font-size: 16px;
  --font-color: black;
  --font-family: "";
  --font-weight: normal;
  --lyric-font-family: "";
  --lyric-font-size: 20px;
  --lyric-font-weight: normal;
  --background-color: #fdfdfd;
  --progress-bar-color: rgba(0, 0, 0, 0.1);
  --progressed-color: rgba(255, 255, 255, 0.4);
  --shadow-color: rgba(0, 0, 0, 0.1);
}

body {
  position: relative;
  perspective: 20000px;
}

/* @font-face {
  font-family: "清松手写体";
  src: url("../font/清松手写体.ttf");
} */

#app {
  width: 1030px;
  height: 830px;
  position: relative;
  border-radius: 20px;
  -webkit-user-select: none;
  overflow: hidden;
  font-family: var(--font-family);
  font-size: var(--font-size);
  font-weight: var(--font-weight);
  color: var(--font-color);
}

@keyframes Flip_0-90 {
  from {
    transform: rotateY(0deg);
  }
  to {
    transform: rotateY(90deg);
  }
}

@keyframes Flip_90-0 {
  from {
    transform: rotateY(90deg);
  }
  to {
    transform: rotateY(0deg);
  }
}

@keyframes Flip_90-180 {
  from {
    transform: rotateY(-90deg);
  }
  to {
    transform: rotateY(0deg);
  }
}

@keyframes Flip_180-90 {
  from {
    transform: rotateY(0deg);
  }
  to {
    transform: rotateY(-90deg);
  }
}

.app-background {
  width: 1000px;
  height: 800px;
  position: absolute;
  margin-left: 15px;
  margin-top: 15px;
  border-radius: 20px;
  background-color: #fff;
  overflow: hidden;
}

.app-background-above {
  width: 1000px;
  height: 800px;
  position: absolute;
  margin-left: 15px;
  margin-top: 15px;
  border-radius: 20px;
  box-shadow: 0 0 10px 5px rgba(0, 0, 0, 0.3);
}

/* 下面修改全局滚动条样式 */
::-webkit-scrollbar {
  width: 6px;
}

::-webkit-scrollbar-thumb {
  border-radius: 3px;
  background-color: rgba(255, 255, 255, 0.15);
}

::-webkit-scrollbar-track {
  border-radius: 3px;
  background-color: rgba(255, 255, 255, 0.1);
}
</style>
