// 使用密钥对文本进行解密
export default function decrypt(text, key) {
  // 待解密文本和密钥必须为字符串
  if(typeof text != 'string' || typeof key != 'string') {
    console.error("待解密文本和密钥必须为字符串")
    return false
  }

  // 将密钥拆分为单个字符数组
  let keyArr = key.split('')
  let keyNumArr = []

  // 将密钥字符串编码为数字
  keyArr.forEach(item => {
    let keyNum = item.codePointAt(0)
    keyNumArr.push(keyNum)
  })

  //将加密文本每4个字符分组
  let splitText = text.match(/.{4}/g)

  // 去掉g-z字符
  let hexTextArr = []
  splitText.forEach(item => {
    hexTextArr.push(item.replace(/[g-z]/g, ''))
  })

  // 16进制转换为10进制
  let hexNumArr = []
  hexTextArr.forEach(item => {
    hexNumArr.push(parseInt(item,16))
  })

  let diffLength = hexNumArr.length / keyNumArr.length

  // 密钥长度需大于文本长度，否则密钥自己复制自己加长
  if(diffLength > 1) {
    let keyNumArrCopy = []
    keyNumArrCopy.push(...keyNumArr)

    for(let j = 1; j < diffLength; j++) {
      keyNumArr.push(...keyNumArrCopy)
    }
  }

  let decryptedText = ''
  let textNumArr = []

  // 将文本数值与密钥数值一一相减，从而解密
  for(let i = 0; i < hexNumArr.length; i++) {
    textNumArr[i] = hexNumArr[i] - keyNumArr[i]
  }

  // 将编码转换为字符串
  textNumArr.forEach(item => {
    decryptedText += String.fromCodePoint(item)
  })

  return decryptedText

}