<template>
  <div class="setting-appinfo">
    <div class="setting-appinfo-content">
      <div class="setting-item-content">
        <div class="setting-appinfo-version">
          <div class="crrent-version-text">当前版本:</div>
          <div class="crrent-version">{{ appVersion }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "setting-appinfo",
  computed: {
    ...mapState(["appVersion"]),
  },
};
</script>

<style>
.setting-appinfo-content {
  width: 100%;
  margin-top: 40px;
}

.setting-appinfo-version {
  width: 100%;
  height: 40px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.crrent-version-text {
  height: 40px;
  padding: 0 20px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.crrent-version {
  height: 40px;
  padding: 0 20px;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
