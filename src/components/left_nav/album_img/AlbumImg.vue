<template>
  <div
    class="album-img"
    :class="{
      'album-flip-90': isAlbumFlip90,
      'album-flip-180': isAlbumFlip180,
    }"
  >
    <img :src="albumImgUrl" :style="isPlaying ? albumRotateRunning : albumRotatePaused" />
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "album-img",
  data() {
    return {
      defaultAlbumImgUrl: require("@/assets/default-album-img.svg"),
      albumRotateRunning: {
        animation: "albumRotate 20s linear infinite running",
      },
      albumRotatePaused: {
        animation: "albumRotate 20s linear infinite paused",
      },
      isAlbumFlip90: false,
      isAlbumFlip180: false,
    };
  },
  computed: {
    ...mapState(["currentList", "currentListIndex", "isPlaying"]),
    songID() {
      if (this.currentList.length !== 0) {
        return this.currentList[this.currentListIndex].songID;
      }
    },
    albumImgUrl() {
      if (this.currentList.length != 0) {
        let currentSong = this.currentList[this.currentListIndex];
        if (currentSong.albumImgUrl) {
          return currentSong.albumImgUrl;
        } else {
          return this.defaultAlbumImgUrl;
        }
      } else {
        return this.defaultAlbumImgUrl;
      }
    },
  },
  watch: {
    //播放歌曲变化时，显示翻转动画
    songID() {
      let albumimg = this.currentList[this.currentListIndex].albumImgUrl;

      //翻转90°的class插入，专辑图片开始翻转90°，耗时0.5s
      this.isAlbumFlip90 = true;

      setTimeout(() => {
        //翻转90°后，去掉翻转90°的class
        this.isAlbumFlip90 = false;

        //在翻转到90°这一瞬间，将专辑图片改成下一首的专辑图片
        this.albumImgUrl = albumimg;

        //接着从90°翻转到180°,耗时0.5s
        this.isAlbumFlip180 = true;
      }, 500);

      setTimeout(() => {
        //1s后翻转完成，去掉对应的class
        this.isAlbumFlip180 = false;

        //注意，翻转动画由插入class完成，用完记得一定要去掉class
      }, 1000);
    },
  },
};
</script>

<style>
.album-img {
  width: 180px;
  height: 180px;
  overflow: hidden;
  border-radius: 50%;
  box-shadow: 0 0 10px var(--highlight-deep-color);
}

.album-img > img {
  width: 100%;
  height: 100%;
}

.album-flip-90 {
  animation: albumFlip90 0.5s linear forwards;
}

.album-flip-180 {
  animation: albumFlip180 0.5s linear forwards;
}

/* 专辑图片翻转从0°翻转到90° */
@keyframes albumFlip90 {
  from {
    transform: rotateY(0deg);
  }
  to {
    transform: rotateY(90deg);
  }
}

/* 专辑图片翻转从90°翻转到180° */
@keyframes albumFlip180 {
  from {
    transform: rotateY(-90deg);
  }
  to {
    transform: rotateY(0deg);
  }
}

/* 专辑图片旋转 */
@keyframes albumRotate {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
