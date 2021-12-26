import fs from "fs"
import getFontPath from "./getFontPath"

export default function checkFontDir(){
  
  let fontPath = getFontPath() + "/fonts"

  if(fs.existsSync(fontPath)){
    return true
  }else{
    return false
  }
}