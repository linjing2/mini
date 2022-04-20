import axios from "axios";

// 创建用于储存云端歌曲的数据库
export default function createCloud(config) {
  const {access_token} = config

  return axios({
    method: 'POST',
    url: 'https://gitee.com/api/v5/user/repos',
    data: {
      access_token,
      name: "MiniMusicCloud",
      description: "迷你音乐云端歌曲仓库",
      private: false,
      auto_init: true
    }
  })
}