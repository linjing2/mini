import axios from "axios";

// 检查是否创建用于储存云端歌曲的仓库
export default function checkCloud(config) {
  const {access_token, owner} = config
  let repo = "MiniMusicCloud"
  return axios({
    method: 'GET',
    url: `https://gitee.com/api/v5/repos/${owner}/${repo}`,
    params: {
      access_token
    }
  })
}