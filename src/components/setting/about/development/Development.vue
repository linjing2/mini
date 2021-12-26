<template>
  <div class="setting-development">
    <div class="setting-development-content">
      <div class="setting-item-content">
        <div class="setting-turn-on-console-box">
          <div class="setting-turn-on-console-text">调试控制台:</div>
          <div class="setting-turn-on-console-button" @click="turnOnDevTool">
            开启调试控制台
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
const { ipcRenderer } = window.require("electron");

export default {
  name: "setting-development",
  methods: {
    turnOnDevTool() {
      ipcRenderer.send("turnOnDevTool");
    },
  },
};
</script>

<style>
.setting-development {
  width: 100%;
  height: 100%;
}

.setting-development-content {
  width: 100%;
  margin-top: 40px;
}

.setting-turn-on-console-box {
  width: 100%;
  height: 40px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.setting-turn-on-console-text {
  padding: 0 20px;
}

.setting-turn-on-console-button {
  padding: 5px 20px;
  border-radius: 15px;
  background-color: var(--highlight-color);
}

.setting-turn-on-console-button:hover {
  cursor: pointer;
}

.setting-turn-on-console-button:active {
  transform: scale(1.2);
}
</style>
