import request from "axios";

export default function getSearchList(searchText, page) {
  return request({
    url:`http://c.y.qq.com/soso/fcgi-bin/client_search_cp?new_json=1&t=0&aggr=1&cr=1&catZhida=1&lossless=0&flag_qc=0&p=${page}&n=20&w=${encodeURIComponent(searchText)}&needNewCode=0`,
    // timeout: 5000,
  })
}