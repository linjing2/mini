<template>
  <div class="setting-hightlight-color">
    <div class="hightlight-color-radio-box">
      <label class="hightlight-color-option" v-for="item in checkList" :key="item.id">
        <div class="hightlight-color-dot" :style="{backgroundColor: item.value,transform: item.value == picked ? 'scale(1.3)':''}"></div>
        <input type="radio" name="hightlight-color" :value="item.value" v-model="picked">
        <div class="hightlight-color-option-text">{{item.text}}</div>
      </label>
    </div>
  </div>
</template>

<script>
export default {
  name: 'setting-hightlight-color',
  data() {
    return {
      checkList: [
        {
          id: 0,
          text: '罗兰紫',
          value: '#c5b5f0'
        },
        {
          id: 1,
          text: '活力橙',
          value: '#ff5d00'
        },
        {
          id: 2,
          text: '柠檬黄',
          value: '#f8cb00'
        },
        {
          id: 3,
          text: '青葱绿',
          value: '#99f158'
        },
        {
          id: 4,
          text: '妖艳红',
          value: '#f74f9e'
        },
        {
          id: 5,
          text: '天空蓝',
          value: 'skyblue'
        }
      ],
      picked: '#c5b5f0'
    }
  },
  watch: {
    picked(newValue) {
      console.log(newValue)
      document.body.style.setProperty("--highlight-color", newValue)
    }
  }
}
</script>

<style>
.setting-hightlight-color {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.hightlight-color-radio-box {
  width: 500px;
  height: 80px;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
  margin-top: 40px;
}

.hightlight-color-option {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
}

.hightlight-color-dot {
  width: 20px;
  height: 20px;
  border-radius: 50%;
}

.hightlight-color-option input {
  display: none;
}

.hightlight-color-option input:checked + .hightlight-color-option-text {
    background-color: var(--highlight-color);
}

.hightlight-color-option-text {
  position: relative;
  width: 80px;
  height: 30px;
  text-align: center;
  line-height: 30px;
  border-radius: 15px;
  transition: all 0.3s;
}

</style>
