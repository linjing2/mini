<template>
  <div class="local-view" @drop="fileDrop">
    <div class="local-view-tool">
      <div class="add-song-icon">
        <input
          class="add-song-input"
          type="file"
          multiple="multiple"
          @change="browseFile"
          accept=".mp3,"
        />
        <img src="@/assets/add-song.svg" alt="" />
      </div>
    </div>
    <div class="local-song-list">
      <song-list :list="localSongs"></song-list>
    </div>
  </div>
</template>

<script>
import fs from "fs";
import getPath from "@/utils/path/getPath.js";
import SongList from "@/common/list/song/SongList.vue";
export default {
  name: "local-view",
  components: {
    SongList,
  },
  data() {
    return {
      localSongs: [],
    };
  },
  mounted() {
    if (localStorage.hasOwnProperty("localSongs")) {
      let localSongs = JSON.parse(localStorage.getItem("localSongs"));
      this.localSongs = localSongs;
    }
  },
  methods: {
    async browseFile(e) {
      let files = e.target.files;
      console.log(files);
      let storePath = getPath() + "\\resource";
      console.log(storePath);
      if (!fs.existsSync(storePath)) {
        fs.mkdirSync(storePath);
      }

      let filesArr = Array.from(files);

      filesArr = filesArr.filter((item) => item.type == "audio/mpeg");

      filesArr.forEach((item) => {
        let file = fs.createReadStream(item.path);
        let copyFile = fs.createWriteStream(storePath + "/" + item.name);
        file.pipe(copyFile);

        let song = {
          albumID: null,
          albumImgUrl: null,
          albumNmae: null,
          singer: [],
          songID: item.name.split(".")[0],
          songName: item.name.split(".")[0],
          songUrl: storePath + "\\" + item.name,
          lyric: null,
          type: "local",
        };
        this.localSongs.push(song);
      });
      console.log(this.localSongs);
      localStorage.setItem("localSongs", JSON.stringify(this.localSongs));
    },

    refreshDir() {},

    fileDrop(e) {
      console.log("drop");

      e.preventDefault();

      console.log(e);
    },

    playSong(item, index) {
      let payload = {
        index: index,
        list: this.localSongs,
      };

      this.$store.commit("sendCurrentIndex", payload);
      this.$store.commit("setCurrentSongUrl", item.songUrl);
    },
  },
};
</script>

<style>
.local-view {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.local-view-tool {
  width: 100%;
  height: 20px;
  display: flex;
  align-items: center;
}

.add-song-icon {
  position: relative;
  width: 20px;
  height: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
}

.add-song-icon > img {
  width: 16px;
  height: 16px;
}

.add-song-icon:hover {
  transform: scale(1.1);
}

.add-song-icon:active {
  transform: scale(1.2);
}

.add-song-input {
  position: absolute;
  opacity: 0;
}

.add-song-input:hover {
  cursor: pointer;
}

.local-song-list {
  /* flex: 1; */
  height: 620px;
  overflow-y: scroll;
}

.local-song-item {
  width: 100%;
  height: 30px;
  display: flex;
  align-items: center;
}
</style>
