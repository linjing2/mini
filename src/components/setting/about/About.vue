<template>
  <div class="setting-about">
    <div class="sub-setting-option">
      <router-link to="/About/AppInfo" class="setting-option">版本信息</router-link>
      <router-link to="/About/CheckUpdate" class="setting-option">检查更新</router-link>
      <router-link to="/About/Development" class="setting-option">开发者</router-link>
    </div>
    <keep-alive>
      <router-view name="aboutSettingView" class="sub-setting-view"></router-view>
    </keep-alive>
  </div>
</template>

<script>
export default {
  name: "setting-about",
};
</script>

<style>
.setting-about {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
}

.sub-setting-option {
  width: 200px;
  height: 100%;
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.sub-setting-view {
  width: 100%;
  height: 100%;
}

.router-link-active {
  background-color: var(--highlight-color);
}
</style>
