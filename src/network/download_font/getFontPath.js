import path from "path"

export default function getFontPath() {

  let rootPath = process.execPath;
  let fontPath = path.resolve(rootPath, "..");

  //如果是测试环境，则路径为下
  if (process.env.NODE_ENV !== 'production'){
    fontPath = path.resolve(fontPath, "..");
    fontPath = path.resolve(fontPath, "..");
    fontPath = path.resolve(fontPath, "..");
  }

  return fontPath
}