<template>
  <div class="mv-player">
    <div class="test"></div>
    <div @click="closeMVPlayerDialog" class="close-dialog-button"></div>
  </div>
</template>

<script>
export default {
  name: "mv-player-dialog",
  data() {
    return {};
  },
  methods: {
    closeMVPlayerDialog() {
      this.$store.commit("hideDialog");
    },
  },
};
</script>

<style>
.mv-player {
  background-color: red;
  width: 800px;
  height: 450px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 999;
  border-radius: 20px;
  background-color: var(--background-color);
  box-shadow: 0 0 10px var(--highlight-deep-color);
}

.test {
  width: 200px;
  height: 200px;
  background-color: orange;
}

.close-dialog-button {
  margin-left: 670px;
  margin-top: 10px;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: red;
}

.close-dialog-button:hover {
  background-color: transparent;
  background-image: url("../../assets/close.svg");
  background-position: center;
  background-repeat: no-repeat;
  background-size: contain;
  box-shadow: 0 0 15px #7e57c2;
  cursor: pointer;
}

.close-dialog-button:active {
  transform: scale(1.5);
}
</style>
