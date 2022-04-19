<template>
  <div class="playing-song-info">
    <div class="playing-song-name">
      {{ currentList.length === 0 ? "" : currentList[currentListIndex].songName }}
    </div>
    <div class="playing-singer-name">
      {{ currentList.length == 0 ? "" : showSingerName }}
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "song-info",
  computed: {
    ...mapState(["currentList", "currentListIndex"]),

    showSingerName() {
      let singer = this.currentList[this.currentListIndex].singer;
      let singerNameArr = [];
      singer.forEach((item) => {
        singerNameArr.push(item.name);
      });

      let singerNames = singerNameArr.join("/");
      return singerNames;
    },
  },
};
</script>

<style>
.playing-song-info {
  width: 200px;
  height: 50px;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
}

.playing-song-name {
  box-sizing: border-box;
  padding: 0 8px;
  width: 100%;
  display: block;
  text-align: center;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}

.playing-singer-name {
  box-sizing: border-box;
  padding: 0 5px;
  width: 100%;
  display: block;
  text-align: center;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  font-size: 14px;
}
</style>
