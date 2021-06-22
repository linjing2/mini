<template>
  <div class="left-nav">
    <logo/>
    <nav-buttons/>
    <album-img/>
    <song-info/>
  </div>
</template>

<script>
import Logo from './logo/Logo.vue';
import NavButtons from './nav_buttons/NavButtons.vue'
import AlbumImg from "./album_img/AlbumImg.vue";
import SongInfo from "./song_info/SongInfo.vue";

export default {
  name: "left-nav",
  components: { AlbumImg, Logo, NavButtons, SongInfo},
};
</script>

<style>
.left-nav {
  width: 200px;
  height: 100%;
  float: left;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 20px 0 0 20px;
}
</style>
