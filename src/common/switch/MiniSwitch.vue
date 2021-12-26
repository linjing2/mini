<template>
  <div class="switch" @click="handleSwitch" :class="{'switch-turn-on':value,'switch-turn-off': !value}">
    <div class="switch-handle" :style="value ? turnOnStyle : turnOffStyle">
      <div class="switch-handle-dot" :class="{'switch-turn-on':value,'switch-turn-off': !value}"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "mini-switch",
  props: {
    value: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      turnOnStyle: {
        marginLeft: "29px",
        transition: "all 0.5s",
      },
      turnOffStyle: {
        marginLeft: "3px",
        transition: "all 0.5s",
      },
    };
  },
  methods: {
    handleSwitch() {
      this.$emit("switchChange", !this.value)
    },
  },
};
</script>

<style>
.switch {
  width: 50px;
  height: 24px;
  display: flex;
  align-items: center;
  border-radius: 12px;
}

.switch:hover {
  cursor: pointer;
}

.switch-handle {
  width: 18px;
  height: 18px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 3px;
  border-radius: 50%;
  background-color: white;
}

.switch-handle-dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
}

.switch-turn-off {
  background-color: var(--shadow-color);
}

.switch-turn-on {
  background-color: var(--highlight-color);
}
</style>
