import axios from 'axios'

export default async function getUserInfo(access_token) {
  let getUserInfoRes = await axios({
    url: 'https://gitee.com/api/v5/user',
    params: {
      access_token
    }
  })

  let { name, avatar_url, login } = getUserInfoRes.data;

  return {
    name,
    owner: login,
    avatar_url,
  }
}