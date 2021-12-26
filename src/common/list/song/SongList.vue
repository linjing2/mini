<template>
  <div class="song-list" ref="SongListDiv">
    <div class="song-list-backtop" @click="backTop" v-show="isShowBackTop">
      <img src="@/assets/backtop.svg" width="30px" />
    </div>
    <div
      class="right-click-box"
      :style="setRightClickBoxStyle"
      tabindex="0"
      @blur="hideRightClickBox"
      ref="RightClickBoxDiv"
      v-if="isShowRightClickBox"
    >
      <div class="right-click-item" @click="markSong">
        <div class="right-click-icon">
          <img src="@/assets/mark.svg" />
        </div>
        <div class="right-click-text">收藏</div>
      </div>
      <div class="right-click-item" @click="editLocalSong" v-if="showEdit">
        <div class="right-click-icon">
          <img src="@/assets/edit.svg" />
        </div>
        <div class="right-click-text">编辑</div>
      </div>
    </div>
    <div class="song-list-title">
      <div></div>
      <div>歌名</div>
      <div>歌手</div>
      <div>专辑</div>
    </div>
    <div class="song-list-box" @scroll="scroll" ref="songListBoxDOM">
      <div
        class="song-list-item"
        v-for="(item, index) in list"
        @click.right="mouseRightClick($event, item, index)"
        :key="item.songID"
        :style="
          (currentList.length === 0
            ? ''
            : currentList[currentListIndex].songID === item.songID
            ? playingSongStyle
            : '') || (selectSongIndex === index ? selectSongStyle : '')
        "
      >
        <div class="mark-img" v-if="isShowMarkImg">
          <img :src="setMarkImgUrl(item)" @click="removeMarkSong(index)" width="18px" />
        </div>
        <div class="like-img" v-else>
          <img :src="setLikeImgUrl(item)" @click="likeSong(item)" width="18px" />
        </div>
        <div class="song-list-song-name" @click="playThisSong(item, index)">
          <div class="song-name-text">{{ item.songName }}</div>
          <div class="local-song-icon" v-if="item.type == 'local'">
            <img src="@/assets/local-song.svg" />
          </div>
        </div>
        <div class="song-list-singer-name" @click="playThisSong(item, index)">
          <span @click.stop="showSinger(item)">{{ showSingerName(item) }}</span>
        </div>
        <div class="song-list-album-name" @click="playThisSong(item, index)">
          {{ item.albumName }}
        </div>
      </div>
      <div
        class="load-more"
        v-if="list.length !== 0 && isShowLoadMore === true"
        @click="loadMore"
      >
        {{ loadMoreText }}
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { getSingerInfo } from "@/network/spider";

export default {
  name: "song-list",
  props: {
    list: {
      type: Array,
      default() {
        return [];
      },
    },
    isShowLoadMore: {
      type: Boolean,
      default: false,
    },
    loadMoreText: {
      type: String,
      default: "加载更多",
    },
    isShowMarkImg: {
      type: Boolean,
      default: false,
    },
    isKeepScrollPositon: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      likeImgUrl: require("@/assets/like.svg"),
      likedImgUrl: require("@/assets/liked.svg"),
      markImgUrl: require("@/assets/mark.svg"),
      markedImgUrl: require("@/assets/marked.svg"),
      scrollerPosition: 0,
      isShowBackTop: false,
      playingSongStyle: {
        "background-color": "var(--highlight-color)",
        "border-radius": "10px",
      },
      selectSongIndex: null,
      selectSongStyle: {
        "border-radius": "10px",
        "background-color": "rgba(197, 181, 240, 0.5)",
      },
      isShowRightClickBox: false,
      positionX: 0,
      positionY: 0,
    };
  },
  computed: {
    ...mapState([
      "currentList",
      "currentListIndex",
      "likedList",
      "markList",
      "selectedSong",
    ]),

    //将list的第一个item的id作为list的id
    listId() {
      if (this.list.length > 0) {
        return this.list[0].songID;
      }
    },

    setRightClickBoxStyle() {
      let rightClickBoxStyle = {
        left: this.positionX + "px",
        top: this.positionY + "px",
      };

      return rightClickBoxStyle;
    },

    showEdit() {
      console.log("selectedSong", this.selectedSong);
      if (this.selectedSong.hasOwnProperty("type")) {
        if (this.selectedSong.type == "local") {
          return true;
        }
      } else {
        return false;
      }
    },
  },
  watch: {
    //如果list的id变化则自动回到顶端
    listId() {
      this.backTop();
    },
  },
  activated() {
    //回到歌单后，保持原来的滚动位置
    if (this.isKeepScrollPositon === true) {
      this.$refs.songListBoxDOM.scrollTop = this.scrollerPosition;
    }
  },
  methods: {
    playThisSong(item, index) {
      let payload = {
        index: index,
        list: this.list,
      };

      //将用户点击的歌曲index连带歌单一起发送至vuex
      this.$store.commit("sendCurrentIndex", payload);
      this.$store.dispatch("playCurrentSong");
    },

    async showSinger(item) {
      console.log(item);
      //若只有一个歌手则直接进入歌手页面，否则弹出选择歌手对话框
      if (item.singer.length > 1) {
        this.$store.commit("setChooseSingerList", item.singer);
        this.$store.commit("showDialog", "choose-singer");
      } else {
        let singerDescription = "";
        try {
          let singerInfoData = await getSingerInfo({ singerMid: item.singer[0].ID });
          singerDescription = singerInfoData.desc;
        } catch (err) {
          console.log(err);
          singerDescription = "";
        }
        let singerInfo = {
          singerName: item.singer[0].name,
          singerMid: item.singer[0].ID,
          singerPic:
            "http://y.gtimg.cn/music/photo_new/T001R150x150M000" +
            item.singer[0].ID +
            ".jpg",
          singerDescription: singerDescription,
        };
        console.log(singerInfo);
        this.$store.commit("setSingerInfo", singerInfo);
        this.$router.push({ path: "SingerPage" });
      }
    },

    likeSong(item) {
      this.$store.commit("sendLikedSong", item);
    },

    removeMarkSong(index) {
      this.$store.commit("removeMarkSong", index);
    },

    setLikeImgUrl(item) {
      let isThisSongLiked = false;

      //将已like的歌曲逐一与搜索列表对比，如有likedList中的歌曲，则红心点亮
      this.likedList.forEach((likedItem) => {
        if (likedItem.songID === item.songID) {
          isThisSongLiked = true;
        }
      });

      return isThisSongLiked ? this.likedImgUrl : this.likeImgUrl;
    },

    setMarkImgUrl(item) {
      let isThisSongMarked = false;

      //检测当前歌曲是否已在收藏列表中
      //在，则点亮star。否则不点亮。
      this.markList.forEach((songList) => {
        songList.list.forEach((markItem) => {
          if (markItem.songmid === item.songmid) {
            isThisSongMarked = true;
          }
        });
      });

      return isThisSongMarked ? this.markedImgUrl : this.markImgUrl;
    },

    showSingerName(item) {
      let singerNameArr = [];
      item.singer.forEach((each) => {
        singerNameArr.push(each.name);
      });

      let singerNames = singerNameArr.join("/");
      return singerNames;
    },

    backTop() {
      //如丝般流畅地滑到顶端
      let timer = setInterval(() => {
        this.$refs.songListBoxDOM.scrollTop -= 100;
        if (this.$refs.songListBoxDOM.scrollTop <= 0) {
          clearInterval(timer);
        }
      }, 10);
    },

    //监听页面滚动事件
    scroll(e) {
      //当滑块滑动到一定距离一键回顶才出现
      this.scrollerPosition = e.target.scrollTop;

      if (this.scrollerPosition > 600) {
        this.isShowBackTop = true;
      } else {
        this.isShowBackTop = false;
      }

      this.$emit("scroll", e);
    },

    mouseRightClick(e, item, index) {
      this.selectSongIndex = index;
      this.$store.commit("sendSelectedSong", item);

      setTimeout(() => {
        this.$refs.RightClickBoxDiv.focus();
      }, 200);

      this.isShowRightClickBox = true;
      let left = this.$refs.SongListDiv.getBoundingClientRect().left;
      let top = this.$refs.SongListDiv.getBoundingClientRect().top;
      this.positionX = e.pageX - left;
      this.positionY = e.pageY - top;
    },

    hideRightClickBox() {
      this.isShowRightClickBox = false;
      console.log("hide");
    },

    markSong() {
      this.$store.commit("showDialog", "add-mark-song");
      this.isShowRightClickBox = false;
    },

    editLocalSong() {
      console.log(this.selectedSong);
      this.$store.commit("showDialog", "edit-local-song");
    },

    loadMore() {
      this.$emit("loadMore");
    },
  },
};
</script>

<style>
.song-list {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.song-list-backtop {
  position: absolute;
  width: 30px;
  height: 30px;
  bottom: 45px;
  right: 10px;
  border-radius: 10px;
  background-color: rgba(255, 255, 255, 0.3);
}

.song-list-backtop:hover {
  cursor: pointer;
  transform: scale(1.1);
}

.song-list-backtop:active {
  transform: scale(1.2);
}

.right-click-box {
  position: absolute;
  width: 70px;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  padding: 2px 5px;
  left: 45px;
  right: 10px;
  border-radius: 10px;
  overflow: hidden;
  background-color: var(--background-color);
  box-shadow: 0 0 10px var(--highlight-deep-color);
}

.right-click-box:focus {
  outline: none;
}

.right-click-item {
  width: 60px;
  margin-top: 5px;
  padding: 1px 2px;
  display: flex;
  align-items: center;
  border-radius: 8px;
}

.right-click-item:last-child {
  margin-bottom: 5px;
}

.right-click-item:hover {
  cursor: pointer;
  background-color: var(--highlight-color);
}

.right-click-icon {
  width: 20px;
  height: 20px;
  margin-left: 2px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.right-click-icon > img {
  width: 16px;
  height: 16px;
}

.right-click-text {
  height: 20px;
  margin-left: 2px;
  font-size: 12px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.song-list-title {
  width: 100%;
  height: 20px;
  line-height: 20px;
  display: flex;
  font-weight: bold;
}

.song-list-title div:nth-child(1) {
  width: 4%;
}

.song-list-title div:nth-child(2) {
  width: 40%;
}

.song-list-title div:nth-child(3) {
  width: 16%;
}

.song-list-title div:nth-child(4) {
  width: 40%;
}

.song-list-box {
  width: 100%;
  height: 100%;
  overflow-y: scroll;
}

.song-list-item {
  height: 40px;
  line-height: 40px;
  display: flex;
  box-sizing: border-box;
}

.like-img {
  width: 4%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.like-img:hover {
  cursor: pointer;
  transform: scale(1.2);
}

.like-img:active {
  transform: scale(1.5);
}

.mark-img {
  width: 4%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.mark-img:hover {
  cursor: pointer;
  transform: scale(1.2);
}

.mark-img:active {
  transform: scale(1.5);
}

.song-list-song-name {
  width: 40%;
  display: flex;
  align-items: center;
}

.song-name-text {
  display: block;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}

.local-song-icon {
  width: 20px;
  height: 20px;
  margin-left: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  background-color: var(--shadow-color);
}

.local-song-icon > img {
  width: 14px;
  height: 14px;
}

.song-list-singer-name {
  width: 16%;
  display: block;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}

.song-list-singer-name > span:hover {
  cursor: pointer;
}

.song-list-album-name {
  width: 40%;
  display: block;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}

.load-more {
  width: 100%;
  height: 40px;
  line-height: 40px;
  text-align: center;
  border-radius: 10px;
  background-color: rgba(255, 255, 255, 0.2);
}

.load-more:hover {
  cursor: pointer;
}
</style>
