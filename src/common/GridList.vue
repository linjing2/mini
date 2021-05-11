<template>
  <div class="grid-list">
    <div class="grid-item-box">
      <div class="grid-item" v-for="item in list" @click="userClick(item)" :key="item.id">
        <img :src="item.imgUrl" />
        <div class="grid-item-name">{{ item.text }}</div>
      </div>
    </div>
    <div class="grid-load-more" @click="loadMore">{{ loadMoreText }}</div>
  </div>
</template>

<script>
export default {
  name: "grid-list",
  props: {
    list: {
      type: Array,
      default() {
        return [];
      },
    },
    loadMoreText: {
      type: String,
      default() {
        return "加载更多";
      },
    },
  },
  methods: {
    userClick(item) {
      this.$emit("userClick", item);
    },

    loadMore() {
      this.$emit("loadMore");
    },
  },
};
</script>

<style>
.grid-list {
  width: 100%;
  height: 100%;
  overflow-y: scroll;
}

.grid-item-box {
  width: 100%;
  display: grid;
  grid-template-columns: repeat(4, 25%);
  justify-items: center;
  align-items: center;
  grid-row-gap: 10px;
}

.grid-item {
  width: 160px;
  height: 220px;
  margin-top: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.grid-item > img {
  width: 160px;
  height: 160px;
  border-radius: 20px;
  box-shadow: 0 0 15px grey;
}

.grid-item > img:hover {
  transform: scale(1.1);
}

.grid-item-name {
  width: 160px;
  height: 60px;
  line-height: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 14px;
}

.grid-load-more {
  width: 100%;
  height: 40px;
  line-height: 40px;
  text-align: center;
  border-radius: 10px;
  background-color: rgba(255, 255, 255, 0.2);
}

grid-load-more:hover {
  cursor: pointer;
}
</style>
