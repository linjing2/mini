<template>
  <div class="setting-font">
    <div class="font-family">
      <div class="font-family-text">界面字体</div>
      <div class="font-family-drop-down-box-wrap">
        <div class="font-family-drop-down-box" @click="showFontFamilyOption()">
          <div class="font-family-using">
            {{ fontFamilyText }}
          </div>
          <img src="@/assets/arrow-down.svg" />
          <div
            class="font-family-option-box"
            id="font-family-option-box"
            tabindex="0"
            v-if="isShowFontFamilyOption"
            @blur="hideFontFamilyOption()"
          >
            <div
              class="font-family-option"
              v-for="(item, index) in fontFamilyList"
              :key="item + index"
              @click.stop="changeFontFamily(item)"
              :style="{ fontFamily: item }"
            >
              {{ item }}
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="font-family">
      <div class="font-family-text">歌词字体</div>
      <div class="font-family-drop-down-box-wrap">
        <div class="font-family-drop-down-box" @click="showLyricFontOption()">
          <div class="font-family-using" :style="{fontFamily: lyricFontFamilyText}">
            {{ lyricFontFamilyText }}
          </div>
          <img src="@/assets/arrow-down.svg" />
          <div
            class="font-family-option-box"
            id="lyric-font-family-option-box"
            tabindex="0"
            v-if="isShowLyricFontOption"
            @blur="hideLyricFontOption()"
          >
            <div
              class="font-family-option"
              v-for="(item, index) in lyricFontFamilyList"
              :key="item + index"
              @click.stop="changeLyricFontFamily(item)"
              :style="{ fontFamily: item }"
            >
              {{ item }}
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="font-size">
      <div class="font-small">小</div>
      <div class="font-slider">
        <div class="font-slider-bar"></div>
        <div class="font-size-option-box">
          <div class="font-size-thumb"></div>
          <div
            class="font-size-option"
            v-for="(item, index) in fontSizeList"
            :key="item + index"
          >
            <div class="font-size-dot"></div>
            <div class="font-size-label">{{ item }}</div>
          </div>
        </div>
      </div>
      <div class="font-large">大</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "setting-font",
  data() {
    return {
      isShowFontFamilyOption: false,
      isShowLyricFontOption: false,
      fontFamilyText: "系统默认",
      lyricFontFamilyText: "跟随界面字体", 
      fontFamilyList: [
        "系统默认",
        "阿朱泡泡体",
        "点点像素体",
        "方正楷体简体",
        "方正楷体繁体",
        "寒蝉手拙体",
        "汉字拼音体",
        "品如手写体",
        "清松手写体",
        "新叶念体",
        "杨任东竹石体",
        "站酷快乐体",
        "OPPO Sans",
      ],
      lyricFontFamilyList: [
        "跟随界面字体",
        "阿朱泡泡体",
        "点点像素体",
        "方正楷体简体",
        "方正楷体繁体",
        "寒蝉手拙体",
        "汉字拼音体",
        "品如手写体",
        "清松手写体",
        "新叶念体",
        "杨任东竹石体",
        "站酷快乐体",
        "OPPO Sans",
      ],
      fontSizeList: [
        "10px",
        "11px",
        "12px",
        "13px",
        "14px",
        "15px",
        "16px",
        "17px",
        "18px",
        "19px",
        "20px",
      ],
    };
  },
  methods: {
    showFontFamilyOption() {
      this.isShowFontFamilyOption = true;
      setTimeout(() => {
        document.querySelector("#font-family-option-box").focus();
      });
    },
    showLyricFontOption() {
      this.isShowLyricFontOption = true;
      setTimeout(() => {
        document.querySelector("#lyric-font-family-option-box").focus();
      });
    },
    hideFontFamilyOption() {
      this.isShowFontFamilyOption = false;
    },
    hideLyricFontOption() {
      this.isShowLyricFontOption = false;
    },
    changeFontFamily(fontFamily) {
      this.fontFamilyText = fontFamily;
      document.body.style.setProperty("--font-family", fontFamily);
      if(this.lyricFontFamilyText === '跟随界面字体') {
        document.body.style.setProperty("--lyric-font-family", fontFamily);
      }
    },
    changeLyricFontFamily(lyricFontFamily) {
      if(lyricFontFamily === '跟随界面字体') {
        document.body.style.setProperty("--lyric-font-family", this.fontFamilyText);
      }else {
        document.body.style.setProperty("--lyric-font-family", lyricFontFamily);
      }
      this.lyricFontFamilyText = lyricFontFamily;
      this.isShowLyricFontOption = false;
    }
  },
};
</script>

<style>
.setting-font {
  width: 100%;
  height: 100%;
}

.font-family {
  width: 560px;
  height: 50px;
  margin-top: 40px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}

.font-family:nth-child(2) {
  margin-top: 20px;
}

.font-family-text {
  height: 30px;
  padding: 2px 5px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.font-family-drop-down-box-wrap {
  width: 150px;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.font-family-drop-down-box {
  position: relative;
  height: 30px;
  padding: 0px 5px;
  display: flex;
  align-items: center;
  border: 1px var(--highlight-color) solid;
  border-radius: 8px;
}

.font-family-using {
  padding: 0px 2px;
}

.font-family-using + img {
  width: 16px;
  height: 16px;
  padding: 0px 4px;
}

.font-family-option-box {
  position: absolute;
  left: 50%;
  top: 34px;
  transform: translateX(-50%);
  padding: 10px 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 999;
  border-radius: 10px;
  background-color: var(--background-color);
  filter: drop-shadow(0 0 10px var(--highlight-deep-color));
}

.font-family-option-box:focus {
  outline: none;
}

.font-family-option {
  white-space: nowrap;
  padding: 4px 8px;
  border-radius: 8px;
}

.font-family-option:hover {
  cursor: pointer;
  transform: scale(1.05);
  background-color: var(--highlight-color);
}

.font-size {
  width: 560px;
  height: 100px;
  margin-top: 20px;
  display: flex;
  flex-direction: row;
  background-color: skyblue;
}

.font-small {
  width: 50px;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.font-large {
  width: 50px;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.font-slider {
  flex: 1;
  position: relative;
  background-color: orange;
}

.font-slider-bar {
  width: 100%;
  height: 2px;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background-color: grey;
}

.font-size-option-box {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  background-color: red;
}

.font-size-thumb {
  position: absolute;
  width: 14px;
  height: 14px;
  left: calc(100% / 22);
  top: 50%;
  transform: translateX(-50%) translateY(-200%);
  background-color: blue;
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
}

.font-size-thumb::before {
  position: absolute;
  content: "";
  width: 0;
  height: 0;
  top: 100%;
  border-top: 7px blue solid;
  border-bottom: 0px pink solid;
  border-left: 7px transparent solid;
  border-right: 7px transparent solid;
  background-color: red;
}

.font-size-option {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: orange;
}

.font-size-dot {
  margin-top: 45px;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: green;
}
</style>
