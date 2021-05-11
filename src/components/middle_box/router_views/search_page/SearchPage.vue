<template>
  <div class="search-list-page">
    <loading v-if="loading.searchPage.isLoading"></loading>
    <song-list
      :class="{ blur: loading.searchPage.isLoading }"
      :list="searchList"
      :isShowLoadMore="true"
      @loadMore="loadMoreSearchSong"
      :loadMoreText="加载更多"
      ref="searchList"
    ></song-list>
  </div>
</template>

<script>
import { mapState } from "vuex";
import SongList from "@/common/SongList.vue";
import Loading from "@/common/Loading.vue";

export default {
  name: "search-page",
  data() {
    return {};
  },
  components: {
    SongList,
    Loading,
  },
  computed: {
    ...mapState(["searchList", "loading"]),
  },
  mounted() {
    //添加监听scrollToTop事件，使新的搜索发生后立即回到顶端
    this.$EventBus.$on("scrollToTop", () => {
      this.$refs.searchList.backTop();
    });
  },
  methods: {
    loadMoreSearchSong() {
      this.$store.dispatch("loadMoreSong", "SearchPage");
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

.blur {
  filter: blur(10px);
}
</style>
