import axios from 'axios'
import Vue from 'vue'

export default async function getAccessToken(config) {
  const {email, password} = config

  try{
    let getAccessTokenRes = await axios({
      method: "POST",
      url: "https://gitee.com/oauth/token",
      data: {
        grant_type: "password",
        username: email,
        password: password,
        client_id:
          "f195007b5c66f0f4d9db4b57fa30979eb9026b8529211c1d56239f0635a617c1",
        client_secret:
          "950cd587c8b63ab58f413b637beb04ed8a441a0e134739dcfd4d5aea57951cba",
        scope: "user_info projects",
      },
    })
  
    let {access_token, refresh_token} = getAccessTokenRes.data

    Vue.prototype.$message.showMessage({
      type: 'success',
      message: '登录成功'
    })

    return {
      access_token,
      refresh_token
    }

  }catch(err) {
    console.log(err)
    Vue.prototype.$message.showMessage({
      type: 'error',
      message: '账号或密码错误'
    })

  }
}