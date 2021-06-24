import axios from "axios";

export default function createFile(config) {
  const { owner, repo, path, access_token, content, message} = config
  return axios({
    method: 'POST',
    url: `https://gitee.com/api/v5/repos/${owner}/${repo}/contents/${path}`,
    data: {
      access_token,
      content,
      message
    }
  })
}