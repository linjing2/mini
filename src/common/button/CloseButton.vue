<template>
  <div class="close-button" @click="close">
    <div class="close-cover"></div>
    <div class="close-icon">
      <img src="@/assets/close.svg" />
    </div>
  </div>
</template>

<script>
export default {
  name: "close-button",
  methods: {
    close() {
      this.$emit('close')
    }
  }
}
</script>

<style>
.close-button {
  position: relative;
  width: 20px;
  height: 20px;
  overflow: hidden;
  border-radius: 50%;
}

.close-button:hover {
  box-shadow: 0 0 15px #7e57c2;
  cursor: pointer;
}

.close-cover {
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: red;
}

.close-cover:hover {
  background-color: transparent;
}

.close-icon {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.close-icon > img {
  width: 100%;
  height: 100%;
}
</style>