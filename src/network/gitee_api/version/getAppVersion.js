import axios from "axios";

export default async function getAppVersion() {
  let appVersion = await axios({
    url: "https://gitee.com/cgper/database/raw/master/miniMusic/version.json",
    method: "GET"
  })

  return appVersion.data

}