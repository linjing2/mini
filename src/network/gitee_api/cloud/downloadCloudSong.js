import axios from "axios";
import fs from "fs";
import { Promise } from "core-js";
import getPath from "@/utils/path/getPath.js";

export default async function downloadCloudSong(song) {

  return new Promise(async (resolve,reject) => {
    let res = await axios({
      method: "get",
      url: song.downloadUrl,
      responseType: "stream",
    })
    console.log(res)
  
    let data = res.data;
    let ws = fs.createWriteStream(song.songUrl);
    let total = Number(data.headers["content-length"]);
    let loaded = 0;
    let progress = 0;
  
    //下载云端歌曲
    data.pipe(ws)
  
    // 监听下载进度
    data.on("data", (chunk) => {
      loaded += chunk.length;
      progress = loaded / total;
      console.log((progress * 100).toFixed(2) + "%");
    });
  
    data.on("end", async () => {
      console.log("歌曲下载完成");
      resolve(true)
    });

  })
}