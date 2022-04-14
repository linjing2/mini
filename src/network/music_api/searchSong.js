import { getSearch } from "../spider";

export default async function searchSong(keyword, page) {
  let searchList = []
  let searchListData = await getSearch({
    keyword,
    page
  });

  let list = searchListData.song.list

  list.forEach(item => {
    let songItem = {
      songID: item.mid,
      songName: item.name,
      singer: [],
      albumName: item.album.name,
      albumID: item.album.mid,
      albumImgUrl: `https://y.gtimg.cn/music/photo_new/T002R300x300M000${item.album.mid}.jpg?max_age=2592000`
    }

    item.singer.forEach(each => {
      songItem.singer.push({
        name: each.name,
        ID: each.mid
      })
    })

    searchList.push(songItem)
  });

  console.log("searchList",searchList)
  
  return searchList
}