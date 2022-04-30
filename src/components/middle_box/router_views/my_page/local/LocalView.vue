<template>
  <div class="local-view">
    <div class="local-song-list">
      <song-list :list="localList">
        <div class="add-song-box"  @mouseenter="showLocalText" @mouseleave="hideLocalText">
          <img src="@/assets/add.svg" v-show="!isShowLocalText"/>
          <input
            class="add-song-input"
            type="file"
            multiple="multiple"
            @change="browseFile"
            accept=".mp3, .wav"
          />
          <div class="add-local-song-text" v-show="isShowLocalText">导入本地歌曲</div>
        </div>
      </song-list>
    </div>
  </div>
</template>

<script>
import {mapState} from "vuex"

import fs from "fs";
import path from "path";
import getPath from "@/utils/path/getPath.js";
import SongList from "@/common/list/song/SongList.vue";
export default {
  name: "local-view",
  components: {
    SongList,
  },
  data() {
    return {
      isShowLocalText: false,
    };
  },
  computed:{
    ...mapState(["localList"])
  },
  methods: {
    async browseFile(e) {
      let files = e.target.files;
      console.log(files);
      
      let storePath = path.resolve(getPath() , "./resource")
      console.log(storePath);
      if (!fs.existsSync(storePath)) {
        fs.mkdirSync(storePath);
      }

      let localPath = path.resolve(storePath , "./local") 
      if (!fs.existsSync(localPath)) {
        fs.mkdirSync(localPath);
      }

      let filesArr = Array.from(files);

      filesArr = filesArr.filter((item) => item.type == "audio/mpeg");
      console.log("filesArr",filesArr)

      let localList = []

      filesArr.forEach((item) => {
        let file = fs.createReadStream(item.path);
        let copyFile = fs.createWriteStream( path.resolve(localPath , item.name));
        file.pipe(copyFile);

        let song = {
          albumID: null,
          albumImgUrl: null,
          albumNmae: null,
          singer: [],
          songID: item.name.split(".")[0] + "local",
          songName: item.name.split(".")[0],
          songUrl: path.resolve(localPath, item.name),
          lyric: null,
          type: "local",
          tag: []
        };
        localList.push(song);
      });
      console.log("localList",localList);
      this.$store.commit("addLocalList", localList)
    },

    showLocalText(){
      this.isShowLocalText = true
    },

    hideLocalText(){
      this.isShowLocalText = false
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

.local-song-list {
  height: 620px;
}

.local-song-item {
  width: 100%;
  height: 30px;
  display: flex;
  align-items: center;
}

.add-song-box {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 40px;
  border-radius: 10px;
  background-color: rgba(255, 255, 255, 0.2);
}

.add-song-box > input {
  width: 100%;
  height: 100%;
  opacity: 0;
  position: absolute;
}

.add-song-box > img {
  position: absolute;
  width: 80%;
  height: 80%;
}

add-local-song-text{
  position: absolute;
}
</style>
