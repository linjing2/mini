<template>
  <div class="my-page">
    <div class="my-page-header">
      <router-link to="/MyPage/Local" class="my-page-header-local">
        <div class="my-pager-header-iocn">
          <img src="@/assets/local.svg" />
        </div>
      </router-link>
      <router-link to="/MyPage/Cloud" class="my-page-header-cloud">
        <div class="my-pager-header-iocn">
          <img src="@/assets/cloud.svg" />
        </div>
      </router-link>
    </div>
    <div class="my-page-view">
      <router-view name="myView"></router-view>
    </div>
  </div>
</template>

<script>
export default {
  name: "my-page",
};
</script>

<style>
.my-page {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
}
.my-page-header {
  width: 100%;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  background-color: rgba(255, 255, 255, 0.2);
}

.my-page-header-local {
  width: 50%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  border-top-left-radius: 10px;
  border-bottom-left-radius: 10px;
}

.my-page-header-cloud {
  width: 50%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  border-top-right-radius: 10px;
  border-bottom-right-radius: 10px;
}

.my-pager-header-iocn {
  width: 20px;
  height: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.my-pager-header-iocn > img {
  width: 20px;
  height: 20px;
}

.my-page-view {
  flex: 1;
}
</style>
