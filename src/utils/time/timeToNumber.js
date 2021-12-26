// 将时间字符串转换为毫秒数
// 时间字符串格式：2021-07-09 20:35:20
export default function timeToNumber(timeStr) {

  let year = Number(timeStr.slice(0,4)) 
  let month = Number(timeStr.slice(5,7)) 
  let date = Number(timeStr.slice(8,10)) 

  let hour = Number(timeStr.slice(11,13)) 
  let minute = Number(timeStr.slice(14,16)) 
  let second = Number(timeStr.slice(17)) 

  let myDate = new Date(year, month - 1, date, hour, minute, second, 0)

  return myDate.getTime()
}