(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-fd20071e"],{"311c":function(t,i,r){"use strict";var c=r("63f2"),e=r.n(c);e.a},"4bad":function(t,i,r){"use strict";r.r(i);var c=function(){var t=this,i=t.$createElement,r=t._self._c||i;return r("div",{ref:"lyricPage",staticClass:"lyric-page"},t._l(t.lyric,(function(i,c){return r("div",{key:c,staticClass:"lyric-item"},[r("div",{staticClass:"lyric-text-line",style:t.setPlayingLyricStyle(i,c)},[t._v(" "+t._s(i.lyric)+" ")])])})),0)},e=[],n=r("5530"),l=r("2f62"),s={name:"lyric-page",data:function(){return{playingLyricStytle:{transform:"scale(1.5)",color:"var(--highlight-color)"},currentLyricIndex:0,scrollTop:0}},computed:Object(n["a"])({},Object(l["b"])(["lyric","currentTime"])),watch:{currentLyricIndex:function(){this.$refs.lyricPage.scrollTop=0,this.currentLyricIndex>7&&(this.$refs.lyricPage.scrollTop=40*(this.currentLyricIndex-7))}},activated:function(){this.$refs.lyricPage.scrollTop=40*(this.currentLyricIndex-7)},methods:{setPlayingLyricStyle:function(t,i){if(this.currentTime>t.time&&(i===this.lyric.length-1||this.currentTime<this.lyric[i+1].time))return this.currentLyricIndex=i,this.playingLyricStytle}}},a=s,y=(r("311c"),r("2877")),u=Object(y["a"])(a,c,e,!1,null,null,null);i["default"]=u.exports},"63f2":function(t,i,r){}}]);
//# sourceMappingURL=chunk-fd20071e.246275c9.js.map