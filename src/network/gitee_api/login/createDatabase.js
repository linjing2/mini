import axios from "axios";

export default function createDatabase(config) {
  const {access_token} = config

  return axios({
    method: 'POST',
    url: 'https://gitee.com/api/v5/user/repos',
    data: {
      access_token,
      name: "MiniMusicDatabase",
      description: "迷你音乐云端数据",
      private: true,
      auto_init: true
    }
  })
}