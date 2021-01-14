<template>
  <div class="left-nav">
    <div class="logo-box">
      <div class="logo">
        <img src="@/assets/logo.svg" width="50px" />
      </div>
      <div class="app-name">迷你音乐</div>
    </div>
    <div class="router-button-box">
      <router-link to="/DiscoverPage" class="nav-item">
        <img class="nav-icon" src="@/assets/discover.svg" />
        <div class="nav-text">发现</div>
      </router-link>
      <router-link to="/SearchPage" class="nav-item">
        <img class="nav-icon" src="@/assets/search.svg" />
        <div class="nav-text">搜索</div>
      </router-link>
      <router-link to="/LikedPage" class="nav-item">
        <img class="nav-icon" src="@/assets/liked.svg" />
        <div class="nav-text">喜欢</div>
      </router-link>
      <router-link to="/LyricPage" class="nav-item">
        <img class="nav-icon" src="@/assets/lyric.svg" />
        <div class="nav-text">歌词</div>
      </router-link>
      <div
        class="nav-item mark-item"
        id="markListDiv"
        @click.self="markBox"
        @blur="hideMarkBox"
        tabindex="0"
      >
        <img class="nav-icon" src="@/assets/mark.svg" @click="markBox" />
        <div class="nav-text" @click="markBox">收藏</div>
        <img
          class="nav-arrow-down-icon"
          src="@/assets/arrow-down.svg"
          @click="markBox"
          :style="arrowStytle"
        />
        <div class="nav-mark-song-box" :style="markBoxStyle">
          <div
            class="nav-mark-song-item"
            v-for="(item, index) in markList"
            :key="item.name"
            @click="clickList(index)"
            :class="{ active: activeListIndex === index }"
          >
            <div class="nav-mark-song-text">
              {{ item.name }}
            </div>
            <div class="nav-delete-box" @click="removeSongList(index)">
              <img src="@/assets/delete.svg" />
            </div>
          </div>
          <div class="nav-mark-add-item">
            <div class="nav-mark-input-box" v-if="isShowInput">
              <input
                type="text"
                id="nav-mark-input"
                @focus="inputFocus"
                @blur="hideInput"
                @change="inputChange"
                v-model="inputText"
              />
            </div>
            <div class="nav-mark-add-box" v-else @click="showInput">
              <div class="nav-mark-add-icon">
                <img src="@/assets/add.svg" />
              </div>
              <div class="nav-mark-add-text">新建歌单</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="playing-box">
      <div class="album-img-box">
        <img :src="getAlbumImgUrl" :style="albumImgStyle" />
      </div>
      <div class="playing-song-name">
        {{ currentList.length === 0 ? "" : currentList[currentListIndex].songname }}
      </div>
      <div class="playing-singer-name">
        {{ currentList.length == 0 ? "" : currentList[currentListIndex].singer.name }}
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "left-nav",
  data() {
    return {
      defaultAlbumImgUrl: require("@/assets/default-album-img.svg"),
      markBoxStyle: {},
      arrowStytle: {},
      isShowMarkBox: false,
      isShowInput: false,
      inputText: "",
      activeListIndex: null,
    };
  },
  computed: {
    ...mapState([
      "albumImgStyle",
      "currentList",
      "currentListIndex",
      "markList",
      "isInputFocus",
    ]),

    getAlbumImgUrl() {
      let isHaveAlbumImg = true;

      //启动时以默认专辑图片做为背景图片
      if (this.currentList.length === 0) {
        isHaveAlbumImg = false;
      } else {
        //获取当前歌曲专辑图片
        var albumImg = this.currentList[this.currentListIndex].albumimg;

        //如果返回下面的专辑图片地址，说明此专辑根本没专辑图片
        if (
          albumImg ===
          "http://imgcache.qq.com/music/photo/album_300/0/300_albumpic_0_0.jpg"
        ) {
          isHaveAlbumImg = false;
        }
      }

      return isHaveAlbumImg ? albumImg : this.defaultAlbumImgUrl;
    },
  },
  methods: {
    //点击收藏时展示下拉框的下拉和收起动画
    markBox() {
      this.$router.push("MarkPage");
      //展开动画
      if (this.isShowMarkBox === false) {
        //收藏框向下滚出
        this.markBoxStyle = {
          "max-height": "200px",
          transition: "max-height 0.3s ease-out",
        };
        //箭头旋转到朝上
        this.arrowStytle = {
          transform: "rotate(-180deg)",
          transition: "all 0.3s ease-out",
        };
        this.isShowMarkBox = true;
      } else {
        //收起动画
        this.markBoxStyle = {
          "max-height": "0px",
          transition: "max-height 0.3s ease-in",
        };
        this.arrowStytle = {
          transform: "rotate(0deg)",
          transition: "all 0.3s ease-in",
        };
        this.isShowMarkBox = false;
      }
    },

    hideMarkBox() {
      if (this.isInputFocus === false) {
        this.markBoxStyle = {
          "max-height": "0px",
          transition: "max-height 0.3s ease-in",
        };
        this.arrowStytle = {
          transform: "rotate(0deg)",
          transition: "all 0.3s ease-in",
        };
        this.isShowMarkBox = false;
      }
    },

    removeSongList(index) {
      this.$store.commit("sendRemoveMarkListIndex", index);
      this.$store.commit("showDialog", "remove-song-list");
    },

    inputFocus() {
      this.$store.commit("sendInputFocus", true);
    },

    showInput() {
      this.isShowInput = true;
      this.$store.commit("sendInputFocus", true);
      setTimeout(() => {
        document.getElementById("nav-mark-input").focus();
      }, 50);
    },

    hideInput() {
      this.isShowInput = false;
      this.$store.commit("sendInputFocus", false);
      document.getElementById("markListDiv").focus();
    },

    inputChange() {
      let haveSameListName = false;

      this.markList.forEach((item) => {
        if (item.name === this.inputText) {
          haveSameListName = true;
        }
      });

      if (haveSameListName === false) {
        this.isShowInput = false;
        this.$store.commit("addSongList", this.inputText);
        this.activeIndex = this.markList.length - 1;
        this.inputText = "";
      } else {
        this.$message.showMessage({
          type: "warning",
          message: "已存在此歌单名，请使用其他名称",
        });
        this.inputText = "";
      }
    },

    clickList(index) {
      this.activeListIndex = index;
      this.$store.commit("sendMarkListIndex", this.activeListIndex);
    },
  },
};
</script>

<style>
.left-nav {
  width: 200px;
  height: 100%;
  float: left;
  position: relative;
  border-radius: 20px 0 0 20px;
}

.logo-box {
  width: 160px;
  height: 50px;
  margin-left: 20px;
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

.router-button-box {
  width: 100%;
  height: 480px;
  overflow: hidden;
}

.nav-item {
  width: 160px;
  height: 30px;
  display: block;
  margin-left: 20px;
  margin-bottom: 15px;
  text-align: center;
  line-height: 30px;
  font-size: 16px;
  text-decoration: none;
  border-radius: 10px;
  background-color: rgba(255, 255, 255, 0.2);
}

.nav-item:first-child {
  margin-top: 50px;
}

.nav-item:hover {
  background-color: var(--highlight-color);
}

.nav-icon {
  width: 20px;
  height: 20px;
  float: left;
  margin-left: 20px;
  margin-top: 5px;
}

.nav-text {
  float: left;
  height: 30px;
  margin-left: 5px;
  line-height: 30px;
  color: black;
}

.nav-arrow-down-icon {
  width: 20px;
  height: 20px;
  float: right;
  margin-right: 20px;
  margin-top: 5px;
}

.mark-item {
  position: relative;
}

.mark-item:focus {
  outline: none;
}

.nav-mark-song-box {
  width: 100%;
  max-height: 0px;
  margin-top: 35px;
  overflow-y: scroll;
  background-color: orange;
  position: absolute;
  border-radius: 10px;
  background-color: white;
  box-shadow: 0 0 6px var(--highlight-deep-color);
}

.active {
  background-color: var(--highlight-color) !important;
}

.nav-mark-song-item {
  height: 30px;
  display: flex;
  flex-wrap: nowrap;
  justify-content: space-between;
  align-items: center;
  margin-left: 10px;
  margin-top: 4px;
  border-radius: 8px;
  background-color: rgba(197, 181, 240, 0.3);
}

.nav-mark-song-item:last-child {
  margin-bottom: 4px;
}

.nav-mark-song-item:hover {
  cursor: pointer;
  background-color: var(--highlight-color);
}

.nav-mark-song-text {
  float: left;
  padding-left: 5px;
  line-height: 30px;
  text-align: center;
  font-size: 15px;
  display: block;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}

.nav-delete-box {
  position: relative;
  float: right;
  width: 14px;
  height: 14px;
  margin-right: 5px;
  flex-shrink: 0;
  display: flex;
  justify-content: center;
  align-items: center;
}

.nav-delete-box > img {
  width: 100%;
  height: 100%;
}

.nav-delete-box > img:hover {
  transform: scale(1.2);
}

.nav-delete-box > img:active {
  transform: scale(1.3);
}

.nav-mark-add-item {
  height: 30px;
  margin-left: 10px;
  margin-top: 4px;
  margin-bottom: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
  background-color: rgba(197, 181, 240, 0.3);
}

.nav-mark-input-box {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.nav-mark-input-box > input {
  border: none;
  width: 90%;
  height: 20px;
  border-radius: 5px;
  text-align: center;
}

.nav-mark-input-box > input:focus {
  outline: none;
  box-shadow: 0 0 5px var(--highlight-deep-color);
}

.nav-mark-add-box {
  display: flex;
}

.nav-mark-add-icon {
  width: 30px;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.nav-mark-add-icon > img {
  width: 25px;
  height: 25px;
}

.router-link-active {
  background-color: var(--highlight-color);
}

.playing-box {
  width: 180px;
  height: 225px;
  margin-left: 10px;
}

.album-img-box {
  width: 180px;
  height: 180px;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  border-radius: 50%;
  box-shadow: 0 0 10px var(--highlight-deep-color);
}

.album-img-box > img {
  width: 100%;
  height: 100%;
}

@keyframes albumRotate {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.playing-song-name {
  width: 180px;
  height: 20px;
  margin-top: 5px;
  font-size: 16px;
  font-weight: bold;
  line-height: 20px;
  text-align: center;
  display: block;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}

.playing-singer-name {
  width: 180px;
  height: 20px;
  font-size: 12px;
  line-height: 20px;
  text-align: center;
  display: block;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}
</style>
