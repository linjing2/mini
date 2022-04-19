import axios from "axios";
import fs from "fs";
import getPath from "@/utils/path/getPath.js";
import { Promise } from "core-js";

export default async function downloadCloudSong(config) {
  const {access_token, owner, song_name} = config
  let repo = "MiniMusicDatabase"
  let path = "CloudMusic/" + song_name
  return new Promise(async (resolve, reject) => {
    let res = await axios({
      method: 'GET',
      url: encodeURI(`https://gitee.com/api/v5/repos/${owner}/${repo}/contents/${path}`),
      params: {
        access_token
      }
    })
    console.log(res)
    let file = window.atob(res.data.content) 
    console.log(file)

    // let storePath = getPath() + "\\resource\\cloud";
    // if (!fs.existsSync(storePath)) {
    //   fs.mkdirSync(storePath);
    // }

    // let data = res.data;
    // let ws = fs.createWriteStream(storePath);
    // let total = Number(data.headers["content-length"]);
    // let loaded = 0;
    // let progress = 0;

    // //下载云端歌曲
    // data.pipe(ws)

    // // 监听下载进度
    // data.on("data", (chunk) => {
    //   loaded += chunk.length;
    //   progress = loaded / total;
    //   console.log((progress * 100).toFixed(2) + "%");
    // });

    // data.on("end", async () => {
    //   console.log("云端歌曲下载完成");
    //   resolve()
    // });
  })
}