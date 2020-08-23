<template>
  <div id="playSong">
    <div class="content" :class="{active: lock == 1}"  @mouseover="mouseOver" @mouseleave="mouseLeave">
      <div class="box">
        <div class="head"><button class="el-icon-lock" style="float: right" v-show="lock == 1" @click="LockMe"></button>
          <button class="el-icon-unlock" style="float: right" v-show="lock != 1" @click="LockMe"></button></div>
        <div class="middle">
          <div class="anniu">
            <button class="el-icon-d-arrow-left" @click="nextSong(-1)"></button>
            <button class="el-icon-d-arrow-right" @click="nextSong(1)"></button>
          </div>
          <audio controls="controls" :src="url + songData[index] + mp3" :autoplay="autoplay" @ended="nextSong(1)">
            Your browser does not support the audio element.
          </audio>
          <audio controls="controls" :src="getPlayUrl" style="display: none">
            Your browser does not support the audio element.
          </audio>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PlaySong',
  data () {
    return {
      url: 'http://music.163.com/song/media/outer/url?id=',
      mp3: '.mp3',
      url2: 'http://music.163.com/song/media/outer/url?id=1386056396.mp3',
      readME: '首先 找到你要下载的歌曲 用网页版打开 复制链接中的歌曲ID 如：\n' +
        'Mike Zhou - The Dawn (亡灵序曲完美钢琴版) [Cover Dreamtale]\n' +
        'http://music.163.com/#/song?id=476592630\n' +
        'ID就是476592630\n' +
        '然后将ID替换到链接 http://music.163.com/song/media/outer/url?id= .mp3 中\n' +
        '如：http://music.163.com/song/media/outer/url?id=476592630.mp3\n' +
        '复制这个链接 就可以直接通过网页打开纯mp3地址了 添加到下载工具中也可下载 还能添加到QQ空间背景音乐中',
      lock: 0,
      num: 0,
      songData: [],
      index: 0,
      length: 0,
      flag: 0,
      lastTime: 0,
      autoplay: false
    }
  },
  created () {
    this.songData = this.$store.state.songList
    this.length = this.$store.state.songList.length
  },
  updated () {
    if (this.num === 0 && this.flag === 0) {
      this.lock = 1
      let that = this
      setTimeout(function () {
        that.lock = 0
        that.num = 1
      }, 2000)
    } else if (this.num === 1) {
      this.num = 0
    } else if (this.flag === 1) {
      this.flag = 0
    }
  },
  computed: {
    // 这里需要把store 动态的数据放到computed里面才会同步更新 视图
    getPlayUrl () {
      let that = this
      that.autoplay = true
      var index = 0
      if (that.$store.state.playSong !== '') {
        let shortData = that.songData
        shortData.push(that.$store.state.playSong)
        that.songData = [...new Set(shortData)]
        console.log(that.songData)
        that.length = that.songData.length
        index = that.songData.indexOf(this.$store.state.playSong)
      }
      that.index = index
      return this.$store.state.playSong
    }
  },
  methods: {
    LockMe () {
      if (this.lock === 0) {
        this.lock = 1
      } else {
        this.lock = 0
      }
    },
    mouseOver () {
      this.lock = 1
    },
    mouseLeave (e) {
      this.lastTime = e.timeStamp
      let that = this
      setTimeout(function () {
        if (that.lastTime === e.timeStamp) {
          that.lock = 0
          that.flag = 1
        }
      }, 1000)
    },
    nextSong (flag) {
      if (flag === -1) {
        if (this.index > 0) {
          this.index--
        } else if (this.index === 0 && this.length > 0) {
          this.index = this.length - 1
        } else {
          this.index = this.length
        }
      } else if (flag === 1) {
        if (this.index < this.length - 1) {
          this.index++
        } else {
          this.index = 0
        }
      }
    }
  }
}
</script>

<style scoped>
  #playSong {
  }
  .content {
    position: fixed;
    bottom: -53px;
    height: 0px;
    width: 100%;
    margin: 0 auto;
    transition: 0.5s;
  }
  .content:hover {
    transition: 0.1s;
    bottom: 0 !important;
  }
  .head {
    position: absolute;
    height: 20px;
    top: -20px;
    width: 100%;
  }
  .box {
    position: absolute;
    height: 53px;
    background-color: #242424;
    top: -53px;
    width: 100%;
  }
  .active {
    bottom: 0 !important;
  }
  .middle {
  }
  /deep/ audio {
    width: 600px;
    margin-top: 10px;
    height: 30px;
  }
  .anniu {
    display: inline-block;
    width: 90px;
    top: -10px;
    left: -9px;
    position: relative;
    height: 54px;
  }
  /deep/ .el-icon-d-arrow-left {
    padding: 6px 12px;
  }
  /deep/ .el-icon-d-arrow-right {
    padding: 6px 12px;
  }
</style>
