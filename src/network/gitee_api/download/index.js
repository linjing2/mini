import getFile from "./getFile";
import Vue from 'vue'

export default async function downloadData(config) {

  const { access_token, owner, repo } = config

  let likedListStore = ""
  let markListStore = ""

  try {
    let likedListRes = await getFile({
      access_token,
      owner,
      repo,
      path: 'likedListStore/likedListStore.json'
    })

    let likedListStoreBase64 = likedListRes.data.content
    likedListStore = decodeURIComponent(escape(window.atob(likedListStoreBase64)))

  }catch(err) {
    console.log(err)
    Vue.prototype.$message.showMessage({
      type: 'error',
      message: '请先上传数据'
    })
    return '同步数据到客户端失败'
  }

  let markListRes = await getFile({
    access_token,
    owner,
    repo,
    path: 'markListStore/markListStore.json'
  })

  let markListStoreBase64 = markListRes.data.content
  markListStore = decodeURIComponent(escape(window.atob(markListStoreBase64)))

  Vue.prototype.$message.showMessage({
    type: 'success',
    message: '同步数据到本地成功'
  })

  return {
    likedListStore: JSON.parse(likedListStore),
    markListStore: JSON.parse(markListStore)
  }

}