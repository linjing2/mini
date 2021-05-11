<template>
  <div class="play-list-page">
    <song-list :list="playList" ref="playListDOM"></song-list>
  </div>
</template>

<script>
import { mapState } from "vuex";
import SongList from "@/common/SongList.vue";

export default {
  name: "play-list-page",
  data() {
    return {};
  },
  components: {
    SongList,
  },
  computed: {
    ...mapState(["playList"]),
  },
  mounted() {
    //添加监听scrollToTop事件，使新的搜索发生后立即回到顶端
    this.$EventBus.$on("scrollToTop", () => {
      this.$refs.playListDOM.backTop();
    });
  },
  methods: {},
};
</script>

<style>
.play-list-page {
  width: 100%;
  height: 100%;
  position: relative;
}
</style>
