<template>
  <div class="cloud-view">
    <div class="add-song-icon">
      <input
        class="add-song-input"
        type="file"
        multiple="multiple"
        @change="browseFile"
      />
      <img src="@/assets/add-song.svg" alt="" />
    </div>
    <div class="cloud-song-list">
      <song-list :list="cloudSongs">
        <div class="cloud-text" @click="toReleasePage">{{ cloudText }}</div>
      </song-list>
    </div>
  </div>
</template>

<script>
import {mapState} from "vuex"
import axios from "axios";
import getCurrentTime from "@/utils/time/getCurrentTime.js";
import getCloudMusicList from "@/network/gitee_api/cloud/getCloudMusicList.js";
import decrypt from "@/utils/security/decrypt.js";
import getmac from "getmac";
import getPath from "@/utils/path/getPath.js";
import fs from "fs";
import path from "path";
const { shell } = window.require("electron");

import SongList from "@/common/list/song/SongList.vue";

export default {
  name: "cloud-view",
  components: {
    SongList,
  },
  data() {
    return {
      cloudSongs: [],
      count: 0,
      songs: [],
    };
  },
  computed: {
    ...mapState(["userInfo"]),
    cloudText() {
      if (this.userInfo.access_token == null) {
        return "未登录";
      } else {
        return "前往Gitee的release页面上传音乐";
      }
    },
  },
  mounted() {

    this.loadCloudMusicList();
  },
  methods: {
    // 请求云端音乐数据
    async loadCloudMusicList() {

      if(this.userInfo.access_token == null) return 

      let storePath = getPath() + "\\resource\\cloud";
      if (!fs.existsSync(storePath)) {
        fs.mkdirSync(storePath);
      }

      let releaseData = await getCloudMusicList({
        access_token: this.userInfo.access_token,
        owner: this.userInfo.owner,
      });

      console.log("releaseData", releaseData);

      if (releaseData.status != 200) {
        Vue.prototype.$message.showMessage({
          type: "error",
          message: "获取云端音乐失败",
        });
      } else {
        this.cloudSongs = [];
        let MusicFormat = ["mp3", "MP3", "wav", "WAV", "ogg", "OGG"];

        releaseData.data.forEach((item) => {
          item.assets.forEach((each) => {
            if (
              each.hasOwnProperty("name") &&
              MusicFormat.includes(each.name.split(".")[1])
            ) {
              let song = {
                albumID: null,
                albumImgUrl: null,
                albumNmae: null,
                singer: [],
                songID: each.name.split(".")[0] + "-cloud-" + item.id,
                songName: each.name.split(".")[0],
                songUrl: storePath + "\\" + each.name,
                fileName: each.name,
                lyric: null,
                downloadUrl: each.browser_download_url,
                isDownload: false,
                type: "cloud",
              };
              this.cloudSongs.push(song);
            }
          });
        });

        this.$store.commit("setCloudList", this.cloudSongs)

      }

      console.log("cloudList",this.cloudSongs);
    },
    async browseFile(e) {
      let files = e.target.files;
      console.log(files);

      let songs = Array.from(files);

      songs = songs.filter((item) => item.type == "audio/mpeg");

      console.log("songs", songs);

      this.songs = songs;

      // this.uploadSong();
      let uploadSong = async () => {
        if (this.userInfo.access_token == "") {
          Vue.prototype.$message.showMessage({
            type: "error",
            message: "请登录后使用云端功能！",
          });
        } else {
          let access_token = this.userInfo.access_token;
          let owner = this.userInfo.owner;
          let repo = "MiniMusicDatabase";
          let song_path =
            "CloudMusic/" + encodeURI(this.songs[this.count].name);
          console.log("song_path", song_path);

          // let songData = new Buffer(songs[this.count]).toString("base64")
          let file_path = songs[this.count].path;
          let songData = fs.readFileSync(file_path);
          let songDataBase64 = songData.toString("base64");
          let formData = new FormData();
          formData.append("file", songData);
          // console.log("songData",songData)
          // console.log("songDataBase64",songData.toString("base64"))
          // let songDataBase64 =  'data' + mineType.lookup(songs[this.count].path)
          // console.log("songDataBase64",songDataBase64)
          axios({
            url: "https://gitee.com/cgper/MiniMusicDatabase/attach_files/upload_attach?attach_type=release",
            method: "POST",
            data: formData,
          })
            .then((res) => {
              console.log("res");
              console.log(res);
            })
            .catch((err) => {
              console.log(err);
            });

          // axios({
          //   method: "POST",
          //   url: `https://gitee.com/api/v5/repos/${owner}/${repo}/contents/${path}`,
          //   data: {
          //     access_token,
          //     content: songDataBase64,
          //     message: getCurrentTime(),
          //   },
          // })
          //   .then((res) => {
          //     console.log(res);
          //     this.count += 1;
          //     console.log("count", this.count);
          //     if (this.count < this.songs.length) {
          //       uploadSong();
          //     }
          //   })
          //   .catch((err) => {
          //     console.log(err);
          //     console.log("成功上传" + this.count + 1 + "首");
          //     console.log("失败" + this.songs.length - this.count + "首");
          //     this.count = 0;
          //   });
        }
      };

      uploadSong();
    },

    async uploadSong() {
      if (this.userInfo.access_token == "") {
        Vue.prototype.$message.showMessage({
          type: "error",
          message: "请登录后使用云端功能！",
        });
      } else {
        let access_token = this.userInfo.access_token;
        let owner = this.userInfo.owner;
        let repo = "MiniMusicDatabase";
        let path = "CloudMusic/" + encodeURI(this.songs[this.count].name);
        console.log("path", path);

        let songData = window.btoa(
          unescape(encodeURIComponent(this.songs[this.count]))
        );
        axios({
          method: "POST",
          url: `https://gitee.com/api/v5/repos/${owner}/${repo}/contents/${path}`,
          data: {
            access_token,
            content: songData,
            message: getCurrentTime(),
          },
        })
          .then((res) => {
            console.log(res);
            this.count += 1;
            console.log("count", this.count);
            if (this.count < this.songs.length) {
              this.uploadSingleSong();
            }
          })
          .catch((err) => {
            console.log(err);
            console.log("成功上传" + this.count + 1 + "首");
            console.log("失败" + this.songs.length - this.count + "首");
            this.count = 0;
          });
      }
    },

    toReleasePage() {
      if (this.userInfo.access_token != "") {
        let owner = this.userInfo.owner;
        shell.openExternal(
          `https://gitee.com/${owner}/MiniMusicCloud/releases`
        );
      }
    },
  },
};
</script>

<style>
.cloud-view {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.cloud-song-list {
  height: 620px;
  overflow-y: scroll;
}

.cloud-text {
  width: 100%;
  height: 40px;
  line-height: 40px;
  text-align: center;
  border-radius: 10px;
  background-color: rgba(255, 255, 255, 0.2);
}
</style>
