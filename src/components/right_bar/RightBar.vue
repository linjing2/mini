<template>
  <div class="right-bar">
    <div class="right-bar-buttons">
      <div class="right-bar-button">
        <close-button @close="closeMainWindow"></close-button>
      </div>
      <div @click="minimizeMainWindow" class="right-bar-button">
        <div class="button-cover orange"></div>
        <div class="button-icon">
          <img src="@/assets/minimize.svg" />
        </div>
      </div>
      <div @click="showAboutDialog" class="right-bar-button">
        <div class="button-cover green"></div>
        <div class="button-icon">
          <img src="@/assets/about.svg" />
        </div>
      </div>
    </div>
    <div class="drag-bar"></div>
    <div class="setting">
      <img src="@/assets/setting.svg" @click="showSettingPanel" />
    </div>
  </div>
</template>

<script>
const { ipcRenderer } = window.require("electron");

import CloseButton from "@/common/button/CloseButton.vue";
export default {
  name: "right-bar",
  data() {
    return {};
  },
  components: {
    CloseButton,
  },
  methods: {
    closeMainWindow() {
      ipcRenderer.send("closeMainWindow");
    },

    minimizeMainWindow() {
      ipcRenderer.send("minimizeMainWindow");
    },

    showAboutDialog() {
      this.$store.commit("showDialog", "about");
    },

    showSettingPanel() {
      this.$store.commit("showSettingPanel");
      let payload = {
        router: "nav",
        path: this.$router.currentRoute.path,
      };
      this.$store.commit("setRouterHistory", payload);
      this.$router.push(this.$store.state.routerHistory.settingRouter);
    },
  },
};
</script>

<style>
.right-bar {
  width: 40px;
  height: 100%;
  position: relative;
  float: left;
  display: flex;
  flex-direction: column;
  border-radius: 0 20px 20px 0;
}

.right-bar-buttons {
  width: 100%;
  height: 80px;
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
}

.right-bar-button {
  position: relative;
  width: 20px;
  height: 20px;
  overflow: hidden;
  border-radius: 50%;
}

.right-bar-button:hover {
  box-shadow: 0 0 15px #7e57c2;
  cursor: pointer;
}

.right-bar-button:active {
  transform: scale(1.5);
}

.button-cover {
  position: absolute;
  width: 100%;
  height: 100%;
}

.button-cover:hover {
  background-color: transparent;
}

.button-icon {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.button-icon > img {
  width: 100%;
  height: 100%;
}

.red {
  background-color: red;
}

.orange {
  background-color: orange;
}

.green {
  background-color: #28ca42;
}

.drag-bar {
  width: 100%;
  flex-grow: 1;
  -webkit-app-region: drag;
}

.drag-bar:hover {
  cursor: move;
}

.drag-bar:active {
  cursor: move;
}

.setting {
  width: 40px;
  height: 40px;
  display: flex;
  flex-shrink: 0;
  justify-content: center;
  align-items: center;
}

.setting > img {
  width: 20px;
  height: 20px;
}

.setting > img:hover {
  cursor: pointer;
  transform: scale(1.2);
}

.setting > img:active {
  transform: scale(1.5);
}
</style>
