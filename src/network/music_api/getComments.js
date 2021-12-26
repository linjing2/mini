import axios from "axios";
axios.defaults.adapter = require('axios/lib/adapters/http')

export default async function getComments() {
  let _ = Date.now()
  let res = await axios({
    headers: {
      'Referer': 'https://c.y.qq.com/',
      'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/75.0.3770.100 Safari/537.36',
      'Accept-Encoding': 'gzip' // 打开gzip
    },
    method: 'POST',
    url: `https://u.y.qq.com/cgi-bin/musics.fcg`,
    params: {
      _: Date.now(),
      sign: 'zzaoqwg5m3uqff9ad0a0c63cfd5c2feccb9d3cbd9f43b'
    }
  })

  console.log(res)
}