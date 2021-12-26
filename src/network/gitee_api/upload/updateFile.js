import axios from "axios";
import getSha from "./getSha";

export default async function updateFile(config) {
  const { owner, repo, path, access_token, content } = config

  let shaRes = await getSha({
    access_token,
    owner,
    repo,
    path
  })

  let sha = shaRes.data.sha

  return axios({
    method: 'PUT',
    url: `https://gitee.com/api/v5/repos/${owner}/${repo}/contents/${path}`,
    data: {
      access_token,
      content,
      sha,
      message: Date.now()
    }
  })
}