import axios from "axios";

export default function getSha(config) {
  const {access_token, owner, repo, path} = config
  return axios({
    method: 'GET',
    url: `https://gitee.com/api/v5/repos/${owner}/${repo}/contents/${path}`,
    params: {
      access_token
    }
  })
}