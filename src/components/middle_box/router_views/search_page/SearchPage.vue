<template>
  <div class="search-list-page">
    <loading :isLoading="isLoading" :isBlur="true"></loading>
    <song-list
      :list="searchList"
      :isShowLoadMore="true"
      @loadMore="loadMoreSearchSong"
      :loadMoreText="loadMoreText"
    ></song-list>
  </div>
</template>

<script>
import { mapState } from "vuex";
import standardizeAPI from "@/network/standardizeAPI.js";
import { getSearch } from "@/network/spider";

import SongList from "@/common/list/song/SongList.vue";
import Loading from "@/common/loading/Loading.vue";

import searchSong from "@/network/music_api/searchSong.js";

export default {
  name: "search-page",
  data() {
    return {
      searchList: [],
      loadMoreText: "加载更多",
      currentPage: 1,
      isLoading: false,
      loadMoreText: "加载更多",
    };
  },
  components: {
    SongList,
    Loading,
  },
  computed: {
    ...mapState(["searchText"]),
  },
  mounted() {
    if (this.searchText != "") {
      this.search();
    }
  },
  watch: {
    searchText(newValue) {
      this.search();
    },
  },
  methods: {
    async search() {
      let searchText = this.searchText;
      this.currentPage = 1;
      this.isLoading = true;
      this.loadMoreText = "加载更多";

      let searchListData;
      try {
        searchListData = await searchSong(searchText, 1);
      } catch (err) {
        this.$message.showMessage({
          type: "error",
          message: "请求数据出错：" + err,
        });
        this.isLoading = false;
      }

      this.isLoading = false;

      this.searchList = searchListData;
    },
    async loadMoreSearchSong() {
      this.currentPage += 1;
      this.loadMoreText = "加载中...";

      let searchText = this.searchText;

      let searchListData;
      try {
        searchListData = await searchSong(searchText, this.currentPage);
        this.searchList.push(...searchListData);
      } catch (err) {
        this.$message.showMessage({
          type: "error",
          message: "请求数据出错：" + err,
        });
        this.loadMoreText = "加载更多";
      }

      if (searchListData.length < 50) {
        this.loadMoreText = "没有更多了q(≧▽≦q)";
      } else {
        this.loadMoreText = "加载更多";
      }
    },
  },
};
</script>

<style>
.search-list-page {
  width: 100%;
  height: 100%;
  position: relative;
}
</style>
