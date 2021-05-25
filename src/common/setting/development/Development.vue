<template>
  <div class="setting-development">
    <div class="sub-setting-option">
      <router-link to="/Development/Console" class="setting-option">控制台</router-link>
    </div>
    <keep-alive>
      <router-view name="developmentSettingView" class="sub-setting-view"></router-view>
    </keep-alive>
  </div>
</template>

<script>
export default {
  name: "setting-development",
};
</script>

<style>
.setting-development {
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