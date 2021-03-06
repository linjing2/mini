import getSha from "./getSha";
import firstUploadData from "./firstUploadData";
import nonFirstUploadData from "./nonFirstUploadData";

export default async function uploadData(config) {
  const { owner, repo, access_token } = config

  let isFirstUplaod = true

  // 判断是否是首次上传数据
  try {

    let getShaRes = await getSha({
      access_token,
      owner,
      repo,
      path: 'likedListStore/likedListStore.json'
    })
    console.log('getShaRes', getShaRes)
    isFirstUplaod = false

  } catch (err) {
    console.log(err)

    isFirstUplaod = true

  }

  if (isFirstUplaod === true) {
    // 首次上传需创建数据库和文件
    let firstUploadDataRes = await firstUploadData(config)

    console.log('firstUploadDataRes', firstUploadDataRes)
  } else {
    // 非首次上传直接更新数据
    let nonFirstUploadDataRes = await nonFirstUploadData(config)

    console.log('nonFirstUploadDataRes', nonFirstUploadDataRes)
  }

  return '上传数据完成'
}