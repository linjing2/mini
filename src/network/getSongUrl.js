import request from "axios";
import { getSearch, getSongVkey, getCdn } from "@/network/spider";


function generateGuid() {
  const t = new Date().getUTCMilliseconds();
  const guid = (Math.round(2147483647 * Math.random()) * t) % 1e10;
  window.localStorage.guid = guid;
  return guid;
}

let getSongUrl = async function getSongUrl(songID) {
  let guid = generateGuid();
  console.log('guid',guid)
  console.log('songID',songID)

  let purl = await getSongVkey({
    songMid: songID,
  });
  console.log('purl',purl)

  let cdn = await getCdn(guid);
  console.log("cdn", cdn);

  console.log("url", cdn + purl);
  return cdn + purl
}

export default getSongUrl