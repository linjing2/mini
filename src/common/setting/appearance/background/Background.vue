<template>
  <div class="setting-background">
    <div class="background-radio-box">
      <label class="background-option" v-for="item in checkList" :key="item.id">
        <input type="radio" name="backgorund" :value="item.value" v-model="picked">
        <div class="option-text">{{item.text}}</div>
      </label>
    </div>
  </div>
</template>

<script>
export default {
  name: 'setting-background',
  data() {
    return {
      checkList: [
        {
          id: 0,
          text: '变色龙',
          value: 'chameleon-theme'
        },
        {
          id: 1,
          text: '牛奶白',
          value: 'milk-white-theme'
        },
        {
          id: 2,
          text: '高亮黑',
          value: 'dark-highlight-theme'
        },
        {
          id: 3,
          text: '清新绿',
          value: 'simple-green-theme'
        },
        {
          id: 4,
          text: '炫丽彩',
          value: 'colorful-theme'
        }
      ],
      picked: 'chameleon-theme'
    }
  },
  watch: {
    picked: function(newValue) {
      console.log(newValue)
      if(newValue === 'dark-highlight-theme') {
        document.body.style.setProperty("--font-color", '#eee');
        document.body.style.setProperty("--progress-bar-color", 'rgba(255,255,255,0.1)');
      }else {
        document.body.style.setProperty("--font-color", 'black');
        document.body.style.setProperty("--progress-bar-color", 'rgba(0,0,0,0.1)');
      }

      switch(newValue) {
        case 'chameleon-theme':
          document.body.style.setProperty("--background-color", 'white');
          break
        
        case 'milk-white-theme':
          document.body.style.setProperty("--background-color", '#fdfdfd');
          break
        
        case 'dark-highlight-theme':
          document.body.style.setProperty("--background-color", '#171717');
          break
        
        case 'simple-green-theme':
          document.body.style.setProperty("--background-color", '#dffff5');
          break

        case 'colorful-theme':
          document.body.style.setProperty("--background-color", 'white');
          break
      }
      
      this.$store.commit('setBackgroundTheme', newValue)
    }
  }
}
</script>

<style>
.setting-background {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.background-radio-box {
  width: 500px;
  height: 100px;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
  margin-top: 40px;
}

.background-option input {
  display: none;
}

.background-option input:checked + .option-text {
    background-color: var(--highlight-color);
}

.background-option input:checked + .option-text::before {
    box-shadow: 0 0 0 5px var(--highlight-color) inset;
}

.option-text {
  position: relative;
  width: 80px;
  height: 30px;
  text-align: center;
  line-height: 30px;
  border-radius: 15px;
  transition: all 0.3s;
}

.option-text::before {
  content: "";
  position: absolute;
  display: block;
  width: 20px;
  height: 20px;
  top: -22px;
  left: 50%;
  transform: translateX(-50%);
  border-radius: 50%;
  box-shadow: 0 0 0 2px var(--highlight-color) inset;
}
</style>
