<template>
  <div v-show="isShow" class="download-progress">
    <div class="download-progress-mask" :style="{ left: left + 'px' }">
      <div class="download-progress-left-box">
        <canvas ref="canvasDom"></canvas>
        <div class="download-progress-percentage">
          <div class="percentage-int">{{ intNum + "." }}</div>
          <div class="percentage-decimal">{{ decimalNum }}</div>
          <div class="percentage-sign">%</div>
        </div>
      </div>
      <div class="download-progress-middle-box">
        <div class="download-progress-text">正在下载</div>
        <div class="download-progress-song-name">
          <span>{{ downloadingSong.songName }}</span>
        </div>
      </div>
      <div class="download-progress-right-box">
        <div class="download-progress-right-box-item" @click="cancelDownload">终止</div>
        <div class="download-progress-right-box-item" @click="hide">隐藏</div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "download-progress",
  data() {
    return {
      ctx: null,
      isShow: false,
      left: 10,
    };
  },
  computed: {
    ...mapState([
      "setting",
      "downloadSongProgress",
      "selectedSong",
      "isShowDownloadProgress",
      "downloadingSong"
    ]),

    intNum() {
      return this.downloadSongProgress.split(".")[0];
    },

    decimalNum() {
      return this.downloadSongProgress.split(".")[1];
    },
  },
  watch: {
    downloadSongProgress(newVal) {
      this.drawProgress((Number(newVal) / 100) * 360);
      if (newVal == "100.00") {
        this.$message.showMessage({
          type: "success",
          message: this.selectedSong.songName + "下载完成",
        });
      }
    },

    isShowDownloadProgress(newVal) {
      console.log("isShowDownloadProgress", newVal);
      if (newVal == true) {
        this.isShow = true;
        this.left = 340;
        setTimeout(() => {
          this.left = 10;
        }, 200);
      } else {
        this.left = 340;
        setTimeout(() => {
          this.isShow = false;
        }, 1000);
      }
    },
  },
  mounted() {
    let canvas = this.$refs.canvasDom;
    canvas.width = 80;
    canvas.height = 80;
    this.ctx = canvas.getContext("2d");

    this.ctx.lineWidth = 6;
    this.ctx.lineCap = "round";
    this.ctx.beginPath();
    this.ctx.arc(40, 40, 28, 0, 2 * Math.PI);
    this.ctx.strokeStyle = "rgba(0, 0, 0, 0.1)";
    this.ctx.stroke();
  },
  methods: {
    // 绘制下载进度环
    drawProgress(deg) {
      this.ctx.clearRect(0, 0, 80, 80);
      this.ctx.lineWidth = 6;
      this.ctx.lineCap = "round";
      this.ctx.beginPath();
      this.ctx.arc(40, 40, 28, 0, 2 * Math.PI);
      this.ctx.strokeStyle = "rgba(0, 0, 0, 0.1)";
      this.ctx.stroke();
      this.ctx.beginPath();
      this.ctx.arc(
        40,
        40,
        28,
        -0.5 * Math.PI,
        (Math.PI / 180) * deg - 0.5 * Math.PI
      );
      this.ctx.strokeStyle = this.setting.appearance.highlightColor.value;
      this.ctx.stroke();
      this.ctx.closePath();
    },

    cancelDownload(){
      this.$store.dispatch("cancelDownloadSong")
    },

    hide() {
      let payload = {
        isShowDownloadProgress: false,
      };
      this.$store.commit("setState", payload);
    },
  },
};
</script>

<style>
.download-progress {
  width: 320px;
  height: 100px;
  overflow: hidden;
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  top: 30px;
  right: 44px;
  z-index: 999;
  overflow: hidden;
}

.download-progress-mask {
  position: absolute;
  width: 300px;
  height: 80px;
  left: 10px;
  display: flex;
  z-index: 999;
  border-radius: 20px;
  overflow: hidden;
  transition: 1s;
  /* background-color: var(--background-color); */
  box-shadow: 0 0 10px var(--highlight-deep-color);
}

.download-progress-left-box {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 80px;
  height: 80px;
  border-top-left-radius: 20px;
  border-bottom-left-radius: 20px;
  backdrop-filter: blur(20px);
}

.download-progress-left-box > canvas {
  position: absolute;
}

.download-progress-percentage {
  position: absolute;
  display: flex;
}

.percentage-int {
  font-size: 12px;
}

.percentage-decimal {
  font-size: 9px;
  display: flex;
  align-items: flex-end;
}

.percentage-sign {
  font-size: 12px;
}

.download-progress-middle-box {
  width: 140px;
  height: 80px;
  backdrop-filter: blur(40px);
}

.download-progress-text {
  width: 100%;
  height: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.download-progress-song-name {
  width: 100%;
  height: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.download-progress-song-name > span {
  padding: 2px 5px;
  border-radius: 6px;
  background-color: var(--highlight-color);
  color: var(--highlight-deep-color);
  display: block;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}

.download-progress-right-box {
  width: 80px;
  height: 80px;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  border-top-right-radius: 20px;
  border-bottom-right-radius: 20px;
  backdrop-filter: blur(20px);
}

.download-progress-right-box-item {
  padding: 4px 14px;
  background-color: var(--highlight-color);
  border-radius: 8px;
}

.download-progress-right-box-item:hover {
  cursor: pointer;
}

.download-progress-right-box-item:active {
  cursor: pointer;
  transform: scale(1.1);
}
</style>
