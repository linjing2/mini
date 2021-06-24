import createDatabase from "./createDatabase";
import createFile from "./createFile";
import Vue from 'vue'

export default async function firstUploadData(config) {
  const {access_token, repo, owner, likedListStore, markListStore} = config

  let createDatabaseRes = await createDatabase({ access_token });
  console.log('创建仓库成功', createDatabaseRes);

  let createLikedListRes = await createFile({
    owner,
    repo,
    path: "likedListStore/likedListStore.json",
    access_token,
    content: likedListStore,
    message: Date.now(),
  });
  console.log('创建likedListStore文件成功', createLikedListRes)

  let createMarkListRes = await createFile({
    owner,
    repo,
    path: "markListStore/markListStore.json",
    access_token,
    content: markListStore,
    message: Date.now(),
  });
  console.log('创建markListStore文件成功', createMarkListRes)

  if (createLikedListRes.status === 200 && createMarkListRes.status === 200) {
    Vue.prototype.$message.showMessage({
      type: 'success',
      message: '上传数据成功'
    })
    return '上传数据成功'
  } else {
    Vue.prototype.$message.showMessage({
      type: 'error',
      message: '上传数据失败'
    })
    return '上传数据失败'
  }
}