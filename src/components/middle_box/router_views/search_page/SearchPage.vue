<template>
  <div class="search-list-page">
    <loading v-if="isSearchPageLoading"></loading>
    <song-list
      :class="{ blur: isSearchPageBlur }"
      :list="searchList"
      :isShowLoadMore="true"
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
    ...mapState(["searchList", "isSearchPageBlur", "isSearchPageLoading"]),
  },
  mounted() {
    //添加监听scrollToTop事件，使新的搜索发生后立即回到顶端
    this.$EventBus.$on("scrollToTop", () => {
      this.$refs.searchList.backTop();
    });
  },
  methods: {
    playThisSong(item, index) {
      var payload = {
        index: index,
        activatedPage: "SearchPage",
      };

      this.$store.commit("sendCurrentIndex", payload);
      this.$store.commit("playCurrentSong");
    },

    likeSong(item, index) {
      this.$store.commit("sendLikedSong", item);
    },

    setLikeImgUrl(item) {
      let isThisSongLiked = false;

      //将已like的歌曲逐一与搜索列表对比，如有likedList中的歌曲，则红心点亮
      this.likedList.forEach((likedItem) => {
        if (likedItem.songmid === item.songmid) {
          isThisSongLiked = true;
        }
      });

      return isThisSongLiked ? this.likedImgUrl : this.likeImgUrl;
    },

    backTop() {
      this.$refs.searchListBoxDom.scrollTop = 0;
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
