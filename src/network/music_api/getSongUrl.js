import { getSongVkey, getCdn} from "@/network/spider";

export default async function getSongUrl(songItem) {

  let guid = () => {
    const t = new Date().getUTCMilliseconds();
    const guid = (Math.round(2147483647 * Math.random()) * t) % 1e10;
    window.localStorage.guid = guid;
    return guid;
  };

  let songID = songItem.songID

  let purl = await getSongVkey({
    songMid: songID,
  });

  //purl为空，则可能是vip歌曲
  if (purl == '') return false

  let cdn = await getCdn(guid());

  let songUrl = cdn + purl

  return songUrl
}