<template>
  <div class="logo-box">
    <div class="logo" @click="showLogin">
      <img :src="showLogoImg" width="50px" />
    </div>
    <div class="app-name" @click="testAPI">{{ showLogoText }}</div>
    <div id="login-box" v-show="isShowLogin">
      <div class="login-title">gitee账户登录</div>
      <div class="login-input-box">
        <div class="login-item">
          <div class="login-email">邮箱：</div>
          <input
            type="email"
            @focus="inputFocus"
            @blur="inputBlur"
            v-model="userAccount.email"
          />
        </div>
        <div class="login-item">
          <div class="login-password">密码：</div>
          <input
            type="password"
            @focus="inputFocus"
            @blur="inputBlur"
            v-model="userAccount.password"
          />
        </div>
      </div>
      <div
        class="sync-box"
        :class="{ 'sync-box-out': isShowSyncAnimation }"
        v-show="userInfo.access_token != ''"
      >
        <div class="upload-data" :class="{ disable: uploadDataDisable }">
          <img src="@/assets/cloud-arrow-up.svg" @click="handleUploadData" />
        </div>
        <div class="download-data" :class="{ disable: downloadDataDisable }">
          <img src="@/assets/cloud-arrow-down.svg" @click="handleDownloadData" />
        </div>
      </div>
      <div class="login-confirm-box">
        <div class="login-confirm" @click="confirmLogin">登录</div>
        <div class="logout" @click="logout">退出</div>
      </div>
    </div>
  </div>
</template>

<script>
import getAccessToken from "@/network/gitee_api/login/getAccessToken.js";
import getUserInfo from "@/network/gitee_api/login/getUserInfo.js";

import uploadData from "@/network/gitee_api/upload";
import downloadData from "@/network/gitee_api/download";

import getComments from "@/network/music_api/getComments.js";

import getmac from "getmac";

import encrypt from "@/utils/security/encrypt.js";
import decrypt from "@/utils/security/decrypt.js";

export default {
  name: "login",
  data() {
    return {
      userAccount: {
        email: "",
        password: "",
      },
      userInfo: {
        name: "",
        owner: "",
        avatar_url: "",
        access_token: "",
        refresh_token: "",
      },
      isShowLogin: false,
      isShowSyncAnimation: false,
      logoImgUrl: require("@/assets/logo.svg"),
      logoText: "迷你音乐",
      uploadDataDisable: false,
      downloadDataDisable: false,
    };
  },
  mounted() {
    // 获取当前设备MAC地址作为密钥
    let key = getmac();

    // 获取用户历史账户
    if (localStorage.hasOwnProperty("userAccount")) {
      let userAccountStr = localStorage.getItem("userAccount");
      let userAccount = JSON.parse(userAccountStr);
      this.userAccount = {
        email: decrypt(userAccount.email, key),
        password: decrypt(userAccount.password, key),
      };
    }

    // 获取用户历史用户信息
    if (localStorage.hasOwnProperty("userInfo")) {
      let userInfo = localStorage.getItem("userInfo");
      this.userInfo = JSON.parse(userInfo);
    }

    // 监听点击事件，点击位置不在登录框内则登录框隐藏
    document.addEventListener("click", (e) => {
      let loginDOM = document.getElementById("login-box");
      let left = loginDOM.getBoundingClientRect().left;
      let right = loginDOM.getBoundingClientRect().right;
      let top = loginDOM.getBoundingClientRect().top;
      let bottom = loginDOM.getBoundingClientRect().bottom;

      let click_x = e.pageX;
      let click_y = e.pageY;

      if (click_x < left || click_x > right || click_y < top || click_y > bottom) {
        this.isShowLogin = false;
      }
    });
  },
  computed: {
    showLogoImg() {
      if (this.userInfo.avatar_url == "") {
        return this.logoImgUrl;
      } else {
        return this.userInfo.avatar_url;
      }
    },

    showLogoText() {
      if (this.userInfo.name == "") {
        return this.logoText;
      } else {
        return this.userInfo.name;
      }
    },
  },
  methods: {
    async testAPI() {
      // this.$store.commit("setCurrentSongUrl","C:/Users/cgp/Downloads/早期/猜疑.mp3");
      console.log(Date.now());
    },
    showLogin() {
      // 延迟一下，避开点击showLogin时的点击监听
      setTimeout(() => {
        this.isShowLogin = true;
      }, 50);
    },

    // 用户登录gitee账号
    async confirmLogin() {
      // 获取当前设备MAC地址作为密钥
      let key = getmac();

      //账号加密后保存
      let userAccount = {
        email: encrypt(this.userAccount.email, key),
        password: encrypt(this.userAccount.password, key),
      };

      localStorage.setItem("userAccount", JSON.stringify(userAccount));

      let email = this.userAccount.email;
      let password = this.userAccount.password;

      let { access_token, refresh_token } = await getAccessToken({
        email,
        password,
      });

      if (access_token) {
        let getUserInfoRes = await getUserInfo(access_token);

        this.userInfo = {
          ...getUserInfoRes,
          access_token,
          refresh_token,
        };

        localStorage.setItem("userInfo", JSON.stringify(this.userInfo));

        this.isShowSyncAnimation = true;
        setTimeout(() => {
          this.isShowSyncAnimation = false;
        }, 2000);
      }
    },

    logout() {
      this.userInfo = {
        name: "",
        owner: "",
        avatar_url: "",
        access_token: "",
        refresh_token: "",
      };

      localStorage.removeItem("userInfo");

      this.isShowLogin = false;
    },

    inputFocus() {
      //用户正在输入，需要暂时移除快捷键功能。
      this.$store.commit("sendInputFocus", true);
    },

    inputBlur() {
      this.$store.commit("sendInputFocus", false);
    },

    async handleUploadData() {
      if (this.uploadDataDisable === false) {
        // 上传数据时防止用户再次点击上传
        this.uploadDataDisable = true;

        let owner = this.userInfo.owner;
        let repo = "MiniMusicDatabase";
        let access_token = this.userInfo.access_token;

        let likedListStore = "";
        if (localStorage.hasOwnProperty("likedListStore")) {
          likedListStore = localStorage.getItem("likedListStore");
        }
        let likedListStoreBase64 = window.btoa(
          unescape(encodeURIComponent(likedListStore))
        );

        let markListStore = "";
        if (localStorage.hasOwnProperty("markListStore")) {
          markListStore = localStorage.getItem("markListStore");
        }
        let markListStoreBase64 = window.btoa(
          unescape(encodeURIComponent(markListStore))
        );

        let uploadDataRes = await uploadData({
          owner,
          repo,
          access_token,
          likedListStore: likedListStoreBase64,
          markListStore: markListStoreBase64,
        });

        console.log(uploadDataRes);

        this.uploadDataDisable = false;
      }
    },

    async handleDownloadData() {
      if (this.downloadDataDisable === false) {
        this.downloadDataDisable = true;

        let access_token = this.userInfo.access_token;
        let owner = this.userInfo.owner;
        let repo = "MiniMusicDatabase";

        let downloadDataRes = await downloadData({
          access_token,
          owner,
          repo,
        });

        this.downloadDataDisable = false;

        console.log("downloadDataRes", downloadDataRes);

        if (downloadDataRes != "同步数据到客户端失败") {
          // 保存数据
          let likedListStore = JSON.stringify(downloadDataRes.likedListStore);
          let markListStore = JSON.stringify(downloadDataRes.markListStore);
          localStorage.setItem("likedListStore", likedListStore);
          localStorage.setItem("markListStore", markListStore);

          // 更新数据
          this.$store.commit("getHistoryData");
        }
      }
    },
  },
};
</script>

<style>
.logo-box {
  position: relative;
  width: 160px;
  height: 50px;
  margin-top: 20px;
  border-radius: 25px;
  background-color: rgba(255, 255, 255, 0.2);
}

.logo {
  width: 50px;
  height: 50px;
  float: left;
  border-radius: 50%;
  overflow: hidden;
  background-color: rgba(255, 255, 255, 0.3);
}

.app-name {
  width: 110px;
  height: 50px;
  float: left;
  line-height: 50px;
  text-align: center;
  font-size: 18px;
  border-radius: 25px;
  display: block;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}

#login-box {
  position: absolute;
  width: 300px;
  top: 60px;
  border-radius: 20px;
  overflow: hidden;
  backdrop-filter: blur(50px);
  box-shadow: 0 0 8px var(--highlight-deep-color);
  z-index: 999;
}

.login-title {
  width: 100%;
  height: 30px;
  line-height: 30px;
  text-align: center;
}

.login-input-box {
  width: 100%;
  height: 80px;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
}

.login-item {
  display: flex;
  height: 30px;
  justify-content: space-evenly;
  align-items: center;
}

.login-item > input {
  box-sizing: border-box;
  padding-left: 10px;
  width: 200px;
  height: 24px;
  border: none;
  font-size: 14px;
  border-radius: 8px;
  background-color: rgba(255, 255, 255, 0.2);
}

.login-item > input:focus {
  outline: none;
  box-shadow: 0 0 5px var(--highlight-deep-color);
  background-color: rgba(255, 255, 255, 0.6);
}

.sync-box {
  width: 100%;
  height: 40px;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
}

.sync-box-out {
  animation: syncBoxOut 0.5s ease-in;
}

@keyframes syncBoxOut {
  from {
    height: 0px;
  }
  to {
    height: 40px;
  }
}

.disable {
  filter: grayscale(100%);
}

.upload-data {
  position: relative;
  width: 25px;
  height: 25px;
}

.upload-data > img {
  width: 100%;
  height: 100%;
}

.upload-data > img:hover {
  cursor: pointer;
  transform: scale(1.1);
}

.download-data {
  width: 25px;
  height: 25px;
}

.download-data > img {
  width: 100%;
  height: 100%;
}

.download-data > img:hover {
  cursor: pointer;
  transform: scale(1.1);
}

.login-confirm-box {
  width: 100%;
  height: 40px;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
}

.login-confirm {
  padding: 5px 40px;
  border-radius: 10px;
  background-color: rgba(255, 255, 255, 0.3);
}

.login-confirm:hover {
  cursor: pointer;
}

.logout {
  padding: 5px 40px;
  border-radius: 10px;
  background-color: rgba(255, 255, 255, 0.3);
}

.logout:hover {
  cursor: pointer;
}
</style>
