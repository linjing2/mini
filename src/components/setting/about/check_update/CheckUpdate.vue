<template>
  <div class="setting-check-update">
    <div class="setting-check-update-content">
      <div class="setting-item-content">
        <div class="setting-auto-check-update">
          <div class="auto-check-update-text">自动检查更新</div>
          <div class="auto-check-update-switch">
            <mini-switch
              :value="isAutoCheckUpdate"
              @switchChange="switchChange"
            ></mini-switch>
          </div>
        </div>
      </div>
      <div class="setting-item-content">
        <div class="setting-manual-check-update">
          <div class="manual-check-update-text">手动检查更新</div>
          <div class="manual-check-update-button" @click="checkUpdate">检查更新</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import MiniSwitch from "@/common/switch/MiniSwitch.vue";
import { mapState } from "vuex";
export default {
  name: "setting-check-update",
  components: {
    MiniSwitch,
  },
  computed: {
    ...mapState(["isAutoCheckUpdate"]),
  },
  methods: {
    switchChange(value) {
      // 保存是否自动更新设置
      this.$store.commit("setIsAutoCheckUpdate", value);
    },

    checkUpdate() {
      this.$store.dispatch('manualCheckUpdate')
    }
  },
};
</script>

<style>
.setting-check-update-content {
  width: 100%;
  margin-top: 40px;
}

.setting-auto-check-update {
  width: 100%;
  height: 40px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.auto-check-update-text {
  padding: 0 10px;
}

.auto-check-update-switch {
  padding: 0 10px;
}

.setting-manual-check-update {
  width: 100%;
  height: 40px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.manual-check-update-text {
  padding: 0 10px;
}

.manual-check-update-button {
  margin-right: 10px;
  padding: 5px 10px;
  border-radius: 20px;
  background-color: var(--highlight-color);
}

.manual-check-update-button:hover {
  cursor: pointer;
}

.manual-check-update-button:active {
  transform: scale(1.1);
}
</style>
