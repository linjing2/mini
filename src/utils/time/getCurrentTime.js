// 获取当前时间，格式为 yyyy-MM-dd hh:mm:ss
export default function getCurrentTime() {
  let myDate = new Date()

  let yearNum = myDate.getFullYear()
  let monthNum = myDate.getMonth() + 1
  let dateNum = myDate.getDate()

  let hourNum = myDate.getHours()
  let minuteNum = myDate.getMinutes()
  let secondNum = myDate.getSeconds()

  // 数字转换为字符串并补位
  let year = yearNum.toString()
  let month = monthNum.toString().padStart(2, '0')
  let date = dateNum.toString().padStart(2, '0')

  let hour = hourNum.toString().padStart(2, '0')
  let minute = minuteNum.toString().padStart(2, '0')
  let second = secondNum.toString().padStart(2, '0')

  return year + '-' + month + '-' + date + ' ' + hour + ':' + minute + ':' + second

}