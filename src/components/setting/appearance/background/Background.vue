<template>
  <div class="setting-background">
    <div class="setting-background-content">
      <div class="setting-item-content">
        <div class="background-radio-box">
          <div
            class="background-option"
            v-for="(item, index) in backgroundList"
            :key="item.text + index"
          >
            <div
              class="background-option-ring"
              :class="{
                'background-option-ring-picked': picked.value === item.value,
              }"
              @click="setBackground(item)"
            ></div>
            <div
              class="background-option-text"
              :class="{
                'background-option-text-picked': picked.value === item.value,
              }"
              @click="setBackground(item)"
            >
              {{ item.text }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "setting-background",
  computed: {
    ...mapState(["setting"]),
  },
  data() {
    return {
      backgroundList: [
        {
          text: "变色龙",
          value: "chameleon-theme",
        },
        {
          text: "牛奶白",
          value: "milk-white-theme",
        },
        {
          text: "高亮黑",
          value: "dark-highlight-theme",
        },
        {
          text: "清新绿",
          value: "simple-green-theme",
        },
        {
          text: "炫丽彩",
          value: "colorful-theme",
        },
      ],
      picked: {
        text: "变色龙",
        value: "chameleon-theme",
      },
    };
  },
  mounted() {
    this.picked = this.setting.appearance.background;
  },
  methods: {
    setBackground(item) {
      //只有点击改变背景时才展示背景切换动画
      this.$store.commit("setIsShowThemeAnimation", true);

      //暗主题需要改变文字、进度条等颜色
      if (item.value === "dark-highlight-theme") {
        document.body.style.setProperty("--font-color", "#eee");
        document.body.style.setProperty("--progress-bar-color", "rgba(255,255,255,0.1)");
      } else {
        document.body.style.setProperty("--font-color", "black");
        document.body.style.setProperty("--progress-bar-color", "rgba(0,0,0,0.1)");
      }

      //根据不同主题改变背景颜色
      switch (item.value) {
        case "chameleon-theme":
          document.body.style.setProperty("--background-color", "white");
          break;

        case "milk-white-theme":
          document.body.style.setProperty("--background-color", "#fdfdfd");
          break;

        case "dark-highlight-theme":
          document.body.style.setProperty("--background-color", "#171717");
          break;

        case "simple-green-theme":
          document.body.style.setProperty("--background-color", "#dffff5");
          break;

        case "colorful-theme":
          document.body.style.setProperty("--background-color", "white");
          break;
      }

      this.picked = item;
      this.$store.commit("setBackground", item);
    },
  },
};
</script>

<style>
.setting-background {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.setting-background-content {
  width: 100%;
  margin-top: 40px;
}

/* 添加设置item的背景，用于区分各个item */
.setting-item-content {
  border-radius: 10px;
  margin-bottom: 10px;
  box-shadow: 0 0 10px var(--progress-bar-color);
}

.background-radio-box {
  width: 100%;
  height: 80px;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
}

.background-option {
  width: 80px;
  height: 60px;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
}

.background-option-ring {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  box-shadow: 0 0 0 2px var(--highlight-color) inset;
}

.background-option-text {
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0px 10px;
  border-radius: 15px;
}

.background-option-text-picked {
  background-color: var(--highlight-color);
}

.background-option-ring-picked {
  box-shadow: 0 0 0 5px var(--highlight-color) inset;
}
</style>
