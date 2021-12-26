import compressing from "compressing";

export default async function unzipFont() {
    // 首次解压会失败，所以解压两次。
    compressing.zip
    .uncompress("./fonts.zip", "./fonts", {
      zipFileNameEncoding: "gbk",
    })
    console.log("第一次解压")
    
    await compressing.zip
    .uncompress("./fonts.zip", "./fonts", {
      zipFileNameEncoding: "gbk",
    })
    console.log("第二次解压")
}