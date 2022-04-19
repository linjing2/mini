import axios from "axios";

export default function getCloudMusicList(config) {
  const {access_token, owner} = config
  let repo = "MiniMusicDatabase" 

  return axios({
    method: 'GET',
    url: `https://gitee.com/api/v5/repos/${owner}/${repo}/releases`,
    params: {
      access_token
    }
  })
}