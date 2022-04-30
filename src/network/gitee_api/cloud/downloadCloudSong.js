import axios from "axios";
import fs from "fs";
import { Promise } from "core-js";

export default async function downloadCloudSong(song, listenProgress, state) {

  return new Promise(async (resolve,reject) => {
    let res = await axios({
      method: "get",
      url: song.downloadUrl,
      responseType: "stream",
    })
  
    let data = res.data;
    let ws = fs.createWriteStream(song.songUrl);
    let total = Number(data.headers["content-length"]);
    let loaded = 0;
    let progress = 0;
  
    //下载云端歌曲
    data.pipe(ws)

    state.downloadSongPause = () => {
      data.pause()
    }

    // 监听下载进度
    data.on("data", (chunk) => {
      loaded += chunk.length;
      progress = loaded / total;
      listenProgress((progress * 100).toFixed(2))
      if((progress * 100).toFixed(2) == 100.00){
        resolve(true)
      }
    });

    data.on("error", async () => {
      console.log("歌曲下载出错");
      reject(false)
    });

  })
}