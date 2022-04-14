<template>
  <div class="album-img-box">
    <div
      class="album-img"
      :class="{
        'album-flip0-90': isAlbumFlip0_90,
        'album-flip90-180': isAlbumFlip90_180,
        'album-flip180-90': isAlbumFlip180_90,
        'album-flip90-0': isAlbumFlip90_0,
      }"
    >
      <img
        :src="albumImgUrl"
        :style="isPlaying ? albumRotateRunning : albumRotatePaused"
      />
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "album-img",
  data() {
    return {
      albumImgUrl: require("@/assets/default-album-img.svg"),
      defaultAlbumImgUrl: require("@/assets/default-album-img.svg"),
      albumRotateRunning: {
        animation: "albumRotate 20s linear infinite running",
      },
      albumRotatePaused: {
        animation: "albumRotate 20s linear infinite paused",
      },
      isAlbumFlip0_90: false,
      isAlbumFlip90_180: false,

      isAlbumFlip180_90: false,
      isAlbumFlip90_0: false,
    };
  },
  computed: {
    ...mapState(["currentList", "currentListIndex", "isPlaying"]),

    // 获取正在播放的歌曲对象
    playingSong() {
      if (this.currentList.length !== 0 && this.currentListIndex != null) {
        return this.currentList[this.currentListIndex];
      } else {
        return null;
      }
    },
  },
  watch: {
    // 监听切歌
    currentListIndex(newIndex, oldIndex) {
      // 无专辑图片时显示默认专辑图片
      let albumimg = this.defaultAlbumImgUrl;
      let invalidAddress =
        "https://y.gtimg.cn/music/photo_new/T002R300x300M000.jpg?max_age=2592000";
      if (
        this.playingSong != null &&
        this.playingSong.albumImgUrl != invalidAddress &&
        this.playingSong.albumImgUrl != null
      ) {
        // 有可用专辑图片时显示专辑图片
        albumimg = this.playingSong.albumImgUrl;
      }

      // 切歌翻转专辑图片
      if (newIndex > oldIndex) {
        //翻转90°的class插入，专辑图片开始翻转90°，耗时0.5s
        this.isAlbumFlip0_90 = true;

        setTimeout(() => {
          //翻转90°后，去掉翻转90°的class
          this.isAlbumFlip0_90 = false;

          //在翻转到90°这一瞬间，将专辑图片改成下一首的专辑图片
          this.albumImgUrl = albumimg;

          //接着从90°翻转到180°,耗时0.5s
          this.isAlbumFlip90_180 = true;
        }, 500);

        setTimeout(() => {
          //1s后翻转完成，去掉对应的class
          this.isAlbumFlip90_180 = false;

          //注意，翻转动画由插入class完成，用完记得一定要去掉class
        }, 1000);
      } else {
        // 反向翻转
        this.isAlbumFlip180_90 = true;

        setTimeout(() => {
          this.isAlbumFlip180_90 = false;
          this.albumImgUrl = albumimg;
          this.isAlbumFlip90_0 = true;
        }, 500);

        setTimeout(() => {
          this.isAlbumFlip90_0 = false;
        }, 1000);
      }
    },
  },
};
</script>

<style>
.album-img-box {
  perspective: 1000px; /* 翻转加点立体感 */
  width: 200px;
  height: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
}
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

.album-flip0-90 {
  animation: albumFlip0_90 0.5s ease-in forwards;
}

.album-flip90-180 {
  animation: albumFlip90_180 0.5s ease-out forwards;
}

.album-flip180-90 {
  animation: albumFlip180_90 0.5s ease-in forwards;
}

.album-flip90-0 {
  animation: albumFlip90_0 0.5s ease-out forwards;
}

/* 专辑图片翻转从0°翻转到90° */
@keyframes albumFlip0_90 {
  from {
    transform: rotateY(0deg);
  }
  to {
    transform: rotateY(90deg);
  }
}

/* 专辑图片翻转从90°翻转到180° */
@keyframes albumFlip90_180 {
  from {
    transform: rotateY(-90deg);
  }
  to {
    transform: rotateY(0deg);
  }
}

/* 专辑图片翻转从0°翻转到90° */
@keyframes albumFlip180_90 {
  from {
    transform: rotateY(0deg);
  }
  to {
    transform: rotateY(-90deg);
  }
}

/* 专辑图片翻转从90°翻转到180° */
@keyframes albumFlip90_0 {
  from {
    transform: rotateY(90deg);
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
