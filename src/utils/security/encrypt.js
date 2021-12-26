// 使用密钥对文本进行加密
export default function encrypt(text, key) {
  // 待加密文本和密钥必须为字符串
  if(typeof text != 'string' || typeof key != 'string') {
    console.error("待加密文本和密钥必须为字符串")
    return false
  }

  // 将密钥拆分为单个字符数组
  let keyArr = key.split('')
  let keyNumArr = []

  // 将文本拆分为单个字符数组
  let textArr = text.split('')
  let textNumArr = []

  // 将密钥字符串编码为数字
  keyArr.forEach(item => {
    let keyNum = item.codePointAt(0)
    keyNumArr.push(keyNum)
  })

  // 将待加密文本字符串编码为数字
  textArr.forEach(item => {
    let textNum = item.codePointAt(0)
    textNumArr.push(textNum)
  })

  let textAddArr = []

  let diffLength = textNumArr.length / keyNumArr.length

  // 密钥长度需大于文本长度，否则密钥自己复制自己加长
  if(diffLength > 1) {
    let keyNumArrCopy = []
    keyNumArrCopy.push(...keyNumArr)

    for(let j = 1; j < diffLength; j++) {
      keyNumArr.push(...keyNumArrCopy)
    }
    console.log(keyNumArr)
  }

  // 将文本数值与密钥数值一一相加，从而形成加密
  for(let i = 0; i < textNumArr.length; i++) {
    textAddArr[i] = textNumArr[i] + keyNumArr[i]
  }

  let encryptedText = ""

  let letterArr = ['g', 'h', 'i', 'j', 'k', 'l', 
  'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 
  'v', 'w', 'x', 'y', 'z']

  // 将加密后的数字转换为16进制
  textAddArr.forEach(item => {
    
    let hex = item.toString(16)

    // 位数均为4位，不足4位则补充随机字母，兼容汉字加密
    if(hex.length < 4) {
      let randomIndex_1 = (Math.random() * 19).toFixed(0)
      let randomIndex_2 = (Math.random() * 19).toFixed(0)
      hex += letterArr[randomIndex_1] + letterArr[randomIndex_2]
    }
    
    encryptedText += hex
  })

  console.log(encryptedText)

  return encryptedText

}