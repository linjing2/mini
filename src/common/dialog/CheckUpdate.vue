<template>
  <div class="check-update">
    <div class="check-update-colse-button">
        <close-button @close="closeDialog"></close-button>
    </div>
    <div class="check-update-content">
      <div class="check-update-title">发现新版本</div>
      <div class="version-info-box">
        <div class="version-box">
          <div class="version-text">最新版本：</div>
          <div class="version">{{ "v" + checkUpdateData.latestVersion }}</div>
        </div>
        <div class="version-box">
          <div class="version-text">当前版本：</div>
          <div class="version">{{ "v" + appVersion }}</div>
        </div>
      </div>
      <div class="new-features">
        <div class="new-features-text">What's NEW</div>
        <div class="release-time">
          {{ checkUpdateData.releaseTime.slice(0, 9) }}
        </div>
        <div class="release-note-box">
          <div
            class="release-note-item"
            v-for="item in checkUpdateData.releaseNote"
            :key="item"
          >
            <div class="release-note-icon"></div>
            {{ item }}
          </div>
        </div>
      </div>
    </div>
    <div class="check-update-button-box">
      <div class="check-update-button" @click="closeAutoCheckUpdate">
        烦死了，别再提醒了
      </div>
      <div class="check-update-button" @click="releaseLink">有点意思，过去瞅瞅</div>
    </div>
  </div>
</template>

<script>
const { shell } = window.require("electron");
import { mapState } from "vuex";
import CloseButton from '@/common/button/CloseButton.vue'

export default {
  name: "check-update",
  components: {
    CloseButton
  },
  computed: {
    ...mapState(["checkUpdateData", "appVersion"]),
  },
  methods: {
    closeDialog() {
      this.$store.commit("hideDialog");
    },

    closeAutoCheckUpdate() {
      // 关闭自动检查更新
      this.$store.commit("setIsAutoCheckUpdate", false);
      this.closeDialog()
    },

    releaseLink() {
      shell.openExternal("https://gitee.com/cgper/miniMusic/releases");
      this.closeDialog()
    }
  },
};
</script>

<style>
.check-update {
  width: 500px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 999;
  overflow: hidden;
  border-radius: 20px;
  background-color: var(--background-color);
  box-shadow: 0 0 10px var(--highlight-deep-color);
}

.check-update-content {
  width: 100%;
  box-sizing: border-box;
  padding: 15px;
}

.check-update-colse-button {
  position: absolute;
  width: 30px;
  height: 30px;
  right: 5px;
  top: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.check-update-title {
  width: 100%;
  height: 30px;
  padding: 5px 0;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
}

.version-info-box {
  width: 100%;
  height: 70px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
}

.version-box {
  width: 100%;
  height: 30px;
  display: flex;
  align-items: center;
}

.version-text {
  width: 20%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.version {
  width: 80%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  background-color: var(--highlight-color);
}

.new-features {
  position: relative;
  width: 100%;
  height: 250px;
  margin-top: 20px;
  box-sizing: border-box;
  border: 2px solid var(--highlight-color);
  border-radius: 20px;
}

.new-features-text {
  position: absolute;
  padding: 5px 10px;
  transform: translateY(-50%) translateX(20%);
  border-radius: 10px;
  background-color: var(--highlight-color);
}

.release-time {
  margin-left: 20px;
  margin-top: 20px;
  font-weight: bold;
}

.release-note-box {
  width: 100%;
  height: 80%;
  box-sizing: border-box;
  padding-left: 20px;
  overflow-y: scroll;
}

.release-note-item {
  margin-top: 10px;
}

.release-note-icon {
  display: inline-block;
  width: 10px;
  height: 10px;
  margin-right: 5px;
  border-radius: 50%;
  background-color: var(--highlight-color);
}

.check-update-button-box {
  width: 100%;
  height: 30px;
  display: flex;
  justify-content: space-evenly;
}

.check-update-button {
  width: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 14px;
  border-top: 1px solid var(--progress-bar-color);
}

.check-update-button:first-child {
  border-right: 1px solid var(--progress-bar-color);
}

.check-update-button:hover {
  cursor: pointer;
  background-color: var(--highlight-color);
}
</style>
