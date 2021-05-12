<template>
  <div class="discover-page">
    <div class="discover-item-box">
      <div
        class="discover-category discover-item"
        v-for="item in categoryList"
        @click="getCategoryList(item)"
        @mouseenter="showCategoryOption(item)"
        @mouseleave="hideCategoryOption"
        :key="item.categoryGroupName"
        :class="{ selectClass: item.categoryGroupName === clickItem }"
      >
        {{ item.categoryGroupName }}
      </div>
      <div
        class="discover-singers discover-item"
        @mouseenter="showSingerOption"
        @mouseleave="hideSingerOption"
        :class="{ selectClass: clickItem === '歌手' }"
        @click="getSingerList"
      >
        歌手
      </div>
    </div>
    <div
      class="discover-category-option-box"
      v-show="isShowCategoryOption"
      @mouseenter="enterCategoryOption"
      @mouseleave="hideCategoryOption"
    >
      <div
        class="discover-category-option"
        v-for="item in optionList"
        @click="getList(item)"
        :key="item.categoryId"
      >
        {{ item.categoryName }}
      </div>
    </div>
    <div
      class="discover-singer-option-box"
      v-show="isShowSingerOption"
      @mouseenter="enterSingerOption"
      @mouseleave="hideSingerOption"
    >
      <div class="discover-singer-area-box">
        <div
          class="discover-singer-area"
          v-for="item in singerArea"
          :key="item.text"
          :class="{ selectClass: item.text === singerAreaSelected.text }"
          @click="selectSingerArea(item)"
        >
          {{ item.text }}
        </div>
      </div>
      <div class="discover-singer-gender-box">
        <div
          class="discover-singer-gender"
          v-for="item in singerGender"
          :class="{ selectClass: item.text === singerGenderSelected.text }"
          :key="item.text"
          @click="selectSingerGender(item)"
        >
          {{ item.text }}
        </div>
      </div>
    </div>
    <div class="discover-list" v-show="isShowCategoryPage">
      <div class="discover-list-grip-box">
        <div
          class="discover-list-item"
          v-for="item in playList"
          @click="enterPlayList(item)"
          :key="item.playListMid"
        >
          <img :src="item.imgUrl" />
          <div class="discover-list-text">{{ item.playListName }}</div>
        </div>
      </div>
      <div class="discover-load-more" @click="loadMoreCategory">
        {{ loadMoreText }}
      </div>
    </div>
    <div class="discover-list" v-show="isShowSingerPage">
      <div class="discover-list-grip-box">
        <div
          class="discover-list-item"
          v-for="item in singerList"
          @click="enterSingerInfo(item)"
          :key="item.singerMid"
        >
          <img :src="item.singerPic" />
          <div class="discover-list-text">{{ item.singerName }}</div>
        </div>
      </div>
      <div class="discover-load-more" @click="loadMoreSinger">
        {{ loadMoreText }}
      </div>
    </div>
  </div>
</template>

<script>
import Loading from "@/common/Loading.vue";
import SongList from "@/common/SongList.vue";

import {
  getCategory,
  getPlayList,
  getNewSingerList,
  getPlayListInfo,
  getSingerInfo,
} from "@/network/spider";

import standardizeAPI from "@/network/standardizeAPI.js";

export default {
  name: "discover-page",
  data() {
    return {
      categoryList: [],
      optionList: [],
      playList: [],
      singerList: [],
      isShowCategoryOption: false,
      isShowSingerOption: false,
      isShowCategoryPage: true,
      isShowSingerPage: false,
      categoryTimer: null,
      singerTimer: null,
      singerArea: [
        { value: -100, text: "全部" },
        { value: 200, text: "内地" },
        { value: 2, text: "港台" },
        { value: 5, text: "欧美" },
        { value: 4, text: "日本" },
        { value: 3, text: "韩国" },
        { value: 6, text: "其他" },
      ],
      singerGender: [
        { value: -100, text: "全部" },
        { value: 0, text: "男" },
        { value: 1, text: "女" },
        { value: 2, text: "组合" },
      ],
      categoryIdSelected: "",
      singerAreaSelected: { value: -100, text: "全部" },
      singerGenderSelected: { value: -100, text: "全部" },
      hoverItem: "",
      clickItem: "",
      loadMoreText: "加载更多",
      categoryListPage: 1,
      singerListPage: 1,
    };
  },
  components: {
    Loading,
    SongList,
  },
  computed: {},
  mounted() {
    this.getDiscoverTag();
  },
  // beforeRouteLeave(to, from, next) {
  //   //记下离开时滑块位置
  //   // this.scrollerPosition = this.$refs.discoverItemBoxDOM.scrollTop;
  //   // next();
  // },
  // activated() {
  //   //激活后恢复滑块位置
  //   // this.$refs.discoverItemBoxDOM.scrollTop = this.scrollerPosition;
  // },
  methods: {
    async getDiscoverTag() {
      //获取顶栏分类标签
      this.categoryList = await getCategory();

      //一进入直接展示第一个标签的歌单
      let firstCategoryItemId = this.categoryList[0].categoryList[0].categoryId;
      let playListData = await getPlayList({ categoryId: firstCategoryItemId, page: 1 });
      this.playList = playListData.list;

      //移除第一个标签，因为此标签一进入已展示
      this.categoryList.splice(0, 1);
    },

    getCategoryList(item) {
      this.optionList = item.categoryList;
    },

    async getList(item) {
      this.clickItem = this.hoverItem;
      this.isShowSingerPage = false;
      this.isShowCategoryPage = true;
      this.categoryIdSelected = item.categoryId;
      let playListData = await getPlayList({ categoryId: item.categoryId, page: 1 });
      this.playList = playListData.list;
    },

    async enterPlayList(item) {
      let playListData = await getPlayListInfo(item.playListMid);
      let playList = standardizeAPI(playListData.list);
      let albumInfo = {
        albumID: item.playListMid,
        albumImgUrl: item.imgUrl,
        albumName: item.playListName,
        musicList: playList,
      };
      this.$store.commit("setAlbumInfo", albumInfo);
      this.$router.push({ path: "AlbumPage" });
    },

    async enterSingerInfo(singer) {
      console.log(singer);
      let singerInfoData = await getSingerInfo({ singerMid: singer.singerMid });
      console.log(singerInfoData);
      let singerInfo = {
        singerName: singer.singerName,
        singerMid: singer.singerMid,
        singerPic: singer.singerPic,
        singerDescription: singerInfoData.desc,
      };
      console.log(singerInfo);
      this.$store.commit("setSingerInfo", singerInfo);
      this.$router.push({ path: "SingerPage" });
    },

    showCategoryOption(item) {
      this.hoverItem = item.categoryGroupName;
      clearTimeout(this.categoryTimer);
      clearTimeout(this.singerTimer);
      this.isShowSingerOption = false;
      this.optionList = item.categoryList;
      this.isShowCategoryOption = true;
    },

    showSingerOption() {
      this.hoverItem = "歌手";
      clearTimeout(this.categoryTimer);
      clearTimeout(this.singerTimer);
      this.isShowCategoryOption = false;
      this.isShowSingerOption = true;
    },

    hideCategoryOption() {
      this.categoryTimer = setTimeout(() => {
        this.isShowCategoryOption = false;
      }, 500);
    },

    hideSingerOption() {
      this.singerTimer = setTimeout(() => {
        this.isShowSingerOption = false;
      }, 500);
    },

    enterCategoryOption() {
      clearTimeout(this.categoryTimer);
      this.isShowCategoryOption = true;
    },

    enterSingerOption() {
      clearTimeout(this.singerTimer);
      this.isShowSingerOption = true;
    },

    async getSingerList() {
      this.clickItem = this.hoverItem;
      this.isShowCategoryPage = false;
      this.isShowSingerPage = true;
      let singrtListData = await getNewSingerList({
        page: 1,
        area: this.singerAreaSelected.value,
        sex: this.singerGenderSelected.value,
        genre: -100,
        index: -100,
      });
      console.log(singrtListData);
      this.singerList = singrtListData.singerList;
    },

    async selectSingerArea(item) {
      this.clickItem = this.hoverItem;
      this.isShowCategoryPage = false;
      this.isShowSingerPage = true;
      this.singerAreaSelected = item;
      let singrtListData = await getNewSingerList({
        page: 1,
        area: this.singerAreaSelected.value,
        sex: this.singerGenderSelected.value,
        genre: -100,
        index: -100,
      });
      console.log(singrtListData);
      this.singerList = singrtListData.singerList;
    },

    async selectSingerGender(item) {
      this.clickItem = this.hoverItem;
      this.isShowCategoryPage = false;
      this.isShowSingerPage = true;
      this.singerGenderSelected = item;
      let singrtListData = await getNewSingerList({
        page: 1,
        area: this.singerAreaSelected.value,
        sex: this.singerGenderSelected.value,
        genre: -100,
        index: -100,
      });
      console.log(singrtListData);
      this.singerList = singrtListData.singerList;
    },

    async loadMoreCategory() {
      this.categoryListPage += 1;
      let playListData = await getPlayList({
        categoryId: this.categoryIdSelected,
        page: this.categoryListPage,
      });
      this.playList.push(...playListData.list);
    },

    async loadMoreSinger() {
      this.singerListPage += 1;
      this.loadMoreText = "加载中...";
      let singrtListData = await getNewSingerList({
        page: this.singerListPage,
        area: this.singerAreaSelected.value,
        sex: this.singerGenderSelected.value,
        genre: -100,
        index: -100,
      });
      this.singerList.push(...singrtListData.singerList);
      this.loadMoreText = "加载更多";
    },
  },
};
</script>

<style>
.discover-page {
  position: relative;
  width: 100%;
  height: 100%;
}

.discover-item-box {
  width: 100%;
  height: 30px;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
}

.discover-item {
  padding: 4px 10px;
  border-radius: 10px;
}

.discover-item:hover {
  cursor: pointer;
  transform: scale(1.2);
}

.discover-category-option-box {
  position: absolute;
  top: 40px;
  width: 100%;
  height: 80px;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  flex-wrap: wrap;
  flex-shrink: 0;
  border-radius: 20px;
  background-color: rgba(255, 255, 255, 0.2);
  box-sizing: border-box;
  border: 1px solid var(--highlight-color);
  backdrop-filter: blur(50px);
  z-index: 999;
}

.discover-singer-option-box {
  position: absolute;
  top: 40px;
  width: 100%;
  height: 80px;
  border-radius: 20px;
  background-color: rgba(255, 255, 255, 0.2);
  box-sizing: border-box;
  border: 1px solid var(--highlight-color);
  backdrop-filter: blur(50px);
  z-index: 999;
}

.discover-category-option {
  padding: 4px 10px;
}

.discover-category-option:hover {
  cursor: pointer;
}

.discover-singer-area-box,
.discover-singer-gender-box {
  width: 100%;
  height: 40px;
  display: flex;
  align-items: center;
}

.discover-singer-area,
.discover-singer-gender {
  width: 50px;
  margin-left: 30px;
  padding: 2px 2px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
}

.discover-singer-area:first-child {
  margin-left: 100px;
}

.discover-singer-gender:first-child {
  margin-left: 100px;
}

.discover-list {
  width: 100%;
  height: 640px;
  overflow-y: scroll;
}

.discover-list-grip-box {
  width: 100%;
  display: grid;
  grid-template-columns: repeat(4, 25%);
  justify-items: center;
  align-items: center;
  grid-row-gap: 10px;
}

.discover-list-item {
  width: 160px;
  height: 220px;
  margin-top: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.discover-list-item > img {
  width: 160px;
  height: 160px;
  border-radius: 20px;
  box-shadow: 0 0 15px grey;
}

.discover-list-item > img:hover {
  transform: scale(1.1);
}

.discover-list-text {
  width: 160px;
  height: 60px;
  line-height: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 14px;
}

.discover-load-more {
  width: 100%;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  background-color: rgba(255, 255, 255, 0.2);
}

.play-list-back {
  width: 80px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.play-list-back-box {
  width: 60px;
  height: 20px;
  padding-top: 2px;
  padding-bottom: 2px;
  padding-right: 3px;
  display: flex;
  border-radius: 10px;
}

.play-list-back-box:hover {
  transform: scale(1.1);
  background-color: var(--highlight-color);
}

.play-list-back-box:active {
  transform: scale(1.2);
}

.play-list-back-icon {
  width: 20px;
  height: 20px;
}

.play-list-back-icon > img {
  width: 100%;
  height: 100%;
}

.play-list-back-text {
  width: 40px;
  height: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.play-list-box {
  width: 100%;
  height: 600px;
}

.selectClass {
  background-color: var(--highlight-color);
}
</style>
