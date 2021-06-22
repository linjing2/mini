<template>
  <div class="logo-box" @click="testAPI">
    <div class="logo">
      <img src="@/assets/logo.svg" width="50px" />
    </div>
    <div class="app-name">迷你音乐</div>
  </div>
</template>

<script>
export default {
  name: 'logo',
  methods: {
    testAPI() {

    }
  }
}
</script>

<style>
.logo-box {
  width: 160px;
  height: 50px;
  margin-top: 20px;
  border-radius: 25px;
  background-color: rgba(255, 255, 255, 0.2);
}

.logo {
  width: 50px;
  height: 50px;
  float: left;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.3);
}

.app-name {
  width: 110px;
  height: 50px;
  float: left;
  line-height: 50px;
  text-align: center;
  font-size: 18px;
  border-radius: 25px;
}
</style>