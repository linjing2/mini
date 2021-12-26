import updateFile from "./updateFile"
import Vue from 'vue'

export default async function nonFirstUploadData(config) {
  const {access_token, owner, repo, likedListStore, markListStore} = config

  let uploadLikedListRes = await updateFile({
    owner,
    repo,
    path: 'likedListStore/likedListStore.json',
    access_token,
    content: likedListStore
  })

  console.log('更新喜欢歌单数据', uploadLikedListRes)

  let uploadMarkListRes = await updateFile({
    owner,
    repo,
    path: "markListStore/markListStore.json",
    access_token,
    content: markListStore
  })

  console.log('更新收藏歌单数据', uploadMarkListRes)

  if (uploadLikedListRes.status === 200 && uploadMarkListRes.status === 200) {
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