# 迷你音乐

### 特点
一个简单、美观的音乐播放器

### 版权
此项目仅用于代码学习和技术交流，不提供任何音乐下载或vip付费服务。请尊重音乐平台和创作者的版权，切勿做出任何损害音乐平台和创作者利益的行为。如若此项目无意侵犯了你的利益，请及时联系作者（1833608478@qq.com）,立即删除源代码。

所有歌曲数据均来源于网络，本项目几乎与你打开浏览器在线听音乐无异，仅仅只是节省了你打开网站搜索的时间而已。这里特别感谢lunhui1994提供的数据接口[node-music-api](https://github.com/lunhui1994/node-music-api)。顺便提醒，数据接口随时可能失效，请提前做好心理准备。

### 安装包
Windows：    [mini-music-Setup-1.2.0.exe](https://gitee.com/cgper/miniMusic/attach_files/622493/download/mini-music%20Setup%201.2.0.exe)

Mac:         [mini-music-1.2.0.dmg](https://gitee.com/cgper/miniMusic/attach_files/622331/download/mini-music-1.2.0.dmg)

Linux:       [mini-music_1.2.0_amd64.deb](https://gitee.com/cgper/miniMusic/attach_files/622327/download/mini-music_1.2.0_amd64.deb)

Andriod（测试）：    [mini-music-1.1.0.apk](https://gitee.com/cgper/mini-music-mobile/attach_files/530445/download/mini-music-1.1.0.apk)

andriod 扫码下载：

![](https://images.gitee.com/uploads/images/2020/1125/162724_4ad751f3_2020534.png "屏幕截图.png")

### Web版
在线体验：[点击在线体验](http://cgper.gitee.io/mini-music-webpage)

### 截图
#### desktop版
![发现](https://images.gitee.com/uploads/images/2021/0303/101905_096579b6_2020534.png "发现.png")
![搜索](https://images.gitee.com/uploads/images/2021/0303/101928_13aba41e_2020534.png "搜索.png")
![喜欢](https://images.gitee.com/uploads/images/2021/0303/101947_6a9f93bf_2020534.png "喜欢.png")
![歌词](https://images.gitee.com/uploads/images/2021/0303/102003_85954301_2020534.png "歌词.png")
#### 移动版
![](https://images.gitee.com/uploads/images/2020/1125/161948_c0653461_2020534.png "截图.png")
#### web版
![Web版](https://images.gitee.com/uploads/images/2021/0303/102129_17894994_2020534.png "Web.png")

### 隐私
为了防止用户退出应用后丢失历史数据，本应用会记录你的一些使用习惯（包括历史搜索、mark的歌曲、音量大小）。但所有数据均会保存到本地浏览器（或app)的localStorage中储存，不会发送到网络而造成隐私泄漏。这也意味着音乐播放器在你更换浏览器后就不会再有你的使用数据。

### 提示

#### 快捷键
| 空格键   | ↑键  | ↓键 | ←键 | →键 |
|-------|------|-------|-------|--------|
| 暂停/播放 | 增加音量 | 减小音量  | 上一首   | 下一首    |

#### 窗口移动
此app为无边框应用，拖动窗口需在右侧40px宽的rightbar拖动区按住左键以拖动窗口，下图红色区：

![拖动区](https://images.gitee.com/uploads/images/2020/1109/195202_4bfc9ec9_2020534.png "rightbar.png")

#### Tips
- 搜索列表右键可添加收藏，取消收藏需进入收藏页面点击歌曲前面的五角星。

### 开发
#### desktop版
##### 安装开发依赖
> npm install
##### 调试
> npm run electron:serve
##### 打包（你使用哪个系统平台就会打包对应平台的安装包）
> npm run electron:build
#### 移动版
移动版和desktop版有着些许差别，请前往[迷你音乐移动版](https://gitee.com/cgper/mini-music-mobile)
#### web版
web版和desktop版有着细微差别，请前往[迷你音乐web版](https://gitee.com/cgper/mini-music-webpage)

### 更新v1.2.0
- 新增歌曲分类收藏
- 新增loading动画
- 新增专辑图片切换动画
- 更新message通知组件
- 彻底移除element-ui组件，全部采用自制组件


### 期待
- 更换音乐数据api，将会有更多的音乐可听
- 增加更多的皮肤主题

### 致谢
[Vue.js](https://cn.vuejs.org/)

[electron](https://www.electronjs.org/)

[Element](https://element.eleme.cn/#/zh-CN)

[node-music-api](https://github.com/lunhui1994/node-music-api)

[vue-cli-plugin-electron-builder](https://github.com/nklayman/vue-cli-plugin-electron-builder)
