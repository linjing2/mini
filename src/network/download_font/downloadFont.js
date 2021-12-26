import axios from "axios";
import fs from "fs";
import { Promise } from "core-js";

export default async function downloadFont() {

  return new Promise(async (resolve,reject) => {
    let res = await axios({
      method: "get",
      url: "https://gitee.com/cgper/miniMusic/attach_files/854969/download/fonts.zip",
      responseType: "stream",
    })
    console.log(res)
  
    let data = res.data;
    let ws = fs.createWriteStream("./fonts.zip");
    let total = Number(data.headers["content-length"]);
    let loaded = 0;
    let progress = 0;
  
    //下载字体资源
    data.pipe(ws)
  
    // 监听下载进度
    data.on("data", (chunk) => {
      loaded += chunk.length;
      progress = loaded / total;
      console.log((progress * 100).toFixed(2) + "%");
    });
  
    data.on("end", async () => {
      console.log("字体下载完成");
      resolve()
    });
  })
}