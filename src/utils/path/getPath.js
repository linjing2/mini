import path from "path"

export default function getPath() {

  // let rootPath = process.execPath;
  let rootPath = path.resolve(".");
  console.log("rootPath",rootPath)
  // rootPath = path.resolve(rootPath, "..");

  //如果是测试环境，则路径为下
  // if (process.env.NODE_ENV !== 'production'){
  //   rootPath = path.resolve(rootPath, "..");
  //   rootPath = path.resolve(rootPath, "..");
  //   rootPath = path.resolve(rootPath, "..");
  // }

  return rootPath
}