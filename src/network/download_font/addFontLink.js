import getFontPath from "./getFontPath";

export default function addFontLink() {
  let fontPath = getFontPath()
  let linkEle = document.createElement("link");
  linkEle.setAttribute("rel", "stylesheet");
  linkEle.setAttribute("href", fontPath + "/fonts/fonts.css");
  document.body.appendChild(linkEle);
}