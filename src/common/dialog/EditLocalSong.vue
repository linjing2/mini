<template>
  <div class="edit-local-song">
    <div class="edit-local-song-close-button">
      <close-button @close="closeDialog"></close-button>
    </div>
    <div class="edit-local-song-title">编辑本地歌曲</div>
    <div class="edit-local-song-item">
      <div class="edit-local-song-item-text">歌名：</div>
      <div class="edit-local-song-name-input">
        <div class="have-same-song-name" v-if="haveSameSongName">已存在此歌名</div>
        <input
          type="text"
          v-model="songName"
          @change="saveSongName"
          @focus="inputFocus"
          @blur="inputBlur"
        />
      </div>
    </div>
    <div class="edit-local-song-item">
      <div class="edit-local-song-item-text">歌手：</div>
      <div class="edit-local-song-add-singer">
        <div class="add-singer-icon">
          <img src="@/assets/add.svg" />
        </div>
      </div>
      <!-- <div class="add-singer-input"></div> -->
    </div>
  </div>
</template>

<script>
import CloseButton from "@/common/button/CloseButton.vue";

import { mapState } from "vuex";
export default {
  name: "edit-local-song",
  components: {
    CloseButton,
  },
  data() {
    return {
      localSongs: [],
      songName: "",
      haveSameSongName: false,
    };
  },
  computed: {
    ...mapState(["selectedSong"]),
  },
  mounted() {
    this.songName = this.selectedSong.songName;
  },
  methods: {
    inputFocus() {
      //用户正在输入，需要暂时移除快捷键功能。
      this.$store.commit("sendInputFocus", true);
    },

    inputBlur() {
      //用户结束输入，需要继续开启快捷键监听
      this.$store.commit("sendInputFocus", false);
    },

    closeDialog() {
      this.$store.commit("hideDialog");
    },

    saveSongName() {
      if (localStorage.hasOwnProperty("localSongs")) {
        let localSongs = JSON.parse(localStorage.getItem("localSongs"));
        this.localSongs = localSongs;
      }
      console.log(this.songName);

      let haveSameSongName = false;
      this.localSongs.forEach((item) => {
        if (this.songName != this.selectedSong.songName) {
          if (this.songName == item.songName) {
            haveSameSongName = true;
          }
        }
      });
      this.haveSameSongName = haveSameSongName;
      console.log("haveSameSongName", this.haveSameSongName);
    },
  },
};
</script>

<style>
.edit-local-song {
  width: 500px;
  height: 500px;
  position: absolute;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px 20px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 999;
  border-radius: 20px;
  background-color: var(--background-color);
  box-shadow: 0 0 10px var(--highlight-deep-color);
}

.edit-local-song-close-button {
  position: absolute;
  right: 10px;
  top: 10px;
}

.edit-local-song-title {
  padding-bottom: 10px;
}

.edit-local-song-item {
  width: 440px;
  height: 40px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;
  padding: 0 10px;
  border-radius: 10px;
  margin-bottom: 10px;
  box-shadow: 0 0 10px var(--progress-bar-color);
}

.edit-local-song-name-input {
  position: relative;
}

.have-same-song-name {
  height: 100%;
  position: absolute;
  left: -40%;
  display: flex;
  align-items: center;
  font-size: 12px;
  color: red;
}

.edit-local-song-name-input > input {
  border: none;
  width: 200px;
  height: 26px;
  box-sizing: border-box;
  padding-left: 8px;
  border-radius: 6px;
  box-shadow: 0 0 5px var(--highlight-color);
}

.edit-local-song-name-input > input:focus {
  outline: 0;
  box-shadow: 0 0 5px var(--highlight-deep-color);
  background-color: rgba(255, 255, 255, 0.6);
}

.edit-local-song-add-singer {
  display: flex;
  justify-content: center;
  align-items: center;
}

.add-singer-icon {
  width: 20px;
  height: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: var(--highlight-color);
  border-radius: 10px;
  padding: 2px 8px;
}

.add-singer-icon:hover {
  cursor: pointer;
  transform: scale(1.1);
}

.add-singer-icon:active {
  transform: scale(1.2);
}

.add-singer-icon > img {
  width: 20px;
  height: 20px;
}
</style>
