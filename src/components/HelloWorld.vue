<template>
  <div id="helloWorld">
    <div class="Nav">
      <div class="Nav_item">
        <div class="Logo">
          <img src="@/assets/logo.png" style="width: 167px;height: 70px;">
        </div>
        <el-tabs v-model="activeName" @tab-click="handleClick" class="Tabs">
          <el-tab-pane label="发现音乐" name="first">
            <el-row>
              <el-button size="mini" round @click="change(0)" :class="{actives: 0==num}">推荐</el-button>
              <el-button size="mini" round @click="change(1)" :class="{actives: 1==num}">排行榜</el-button>
              <el-button size="mini" round @click="change(2)" :class="{actives: 2==num}">歌单</el-button>
              <el-button size="mini" round @click="change(3)" :class="{actives: 3==num}">主播电台</el-button>
              <el-button size="mini" round @click="change(4)" :class="{actives: 4==num}">歌手</el-button>
              <el-button size="mini" round @click="change(5)" :class="{actives: 5==num}">新碟上架</el-button>
            </el-row>
          </el-tab-pane>
          <el-tab-pane label="我的音乐" name="second" ></el-tab-pane>
          <el-tab-pane label="朋友" name="third">角色管理</el-tab-pane>
          <el-tab-pane label="商城" name="fourth">定时任务补偿</el-tab-pane>
          <el-tab-pane label="音乐人" name="firth">定时任务补偿</el-tab-pane>
          <el-tab-pane label="下载客户端" name="sixth">定时任务补偿</el-tab-pane>
        </el-tabs>
        <div class="Input">
          <el-input v-model="input" style="width: 160px;margin-right: 20px" prefix-icon="el-icon-search" placeholder="音乐/视频/电台/用户" size="mini"></el-input>
          <label style="color: #787878;font-size: 12px;">登录</label>
        </div>
      </div>
      <div class="Nav_content"></div>
    </div>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      activeName: 'second',
      num: 0,
      pageList: ['/OnePage', '/SecondPage'],
      input: ''
    }
  },
  methods: {
    handleClick (tab, event) {
      console.log(tab, event)
    },
    change (num) {
      this.num = num
      this.$router.push(this.pageList[num])
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  #helloWorld {
  }
  .Logo {
    float: left;
    width: 167px;
    height: auto;
    margin-right: 20px;
  }
  .Input {
    position: absolute;
    right: calc(50% - 420px);
    top: 20px;
  }
  .Nav {
    height: 70px;
    background-color: #242424;
  }
  .Nav_item {
    width: 1100px;
    margin: 0 auto;
  }
  .Nav_content {
    position: absolute;
    margin: -34px 0;
    height: 34px;
    width: 100%;
    z-index: -1;
    background-color: #C20C0C;
  }
  /deep/ div .el-tabs__header {
    margin: 0px;
  }
  /deep/ div .el-tabs__nav-scroll {
    height: 72px !important;
  }
  /deep/ .el-tabs__nav-wrap {
    margin-bottom: -1px;
    min-height: 1px;
  }
  /deep/ .el-tabs__nav-wrap::after {
    display: none;
  }
  /deep/ div .el-tabs__active-bar {
    bottom: 3px;
    background-color: #C20C0C !important;
  }
  /deep/ div.el-tabs--top .el-tabs__item.is-top:nth-child(2) {
    padding-left: 20px;
  }
  /deep/ div.el-tabs--top .el-tabs__item.is-top:last-child {
    padding-right: 20px;
  } {
    padding-left: 20px;
  }
  /deep/ div .el-tabs__item{
    line-height: 70px;
    height: 70px;
    font-size: 14px;
    color: #CCCCCC;
  }
  /deep/ div .el-tabs__item:hover {
    color: #FFFFFF;
    background-color: #000000;
  }
  /deep/ div .el-tabs__item.is-active {
    color: #FFFFFF;
    background-color: #000000;
  }

  /deep/ div .el-tab-pane {
    line-height: 34px;
    float: left;
    font-size: 12px;
    color: #FFFFFF;
  }
  /deep/ div .el-tabs__content {
    min-height: 5px;
    background-color: #C20C0C;
  }
  /deep/ div .el-button{
    background: #C20C0C;
    border: 1px solid #C20C0C;
    color: #FFFFFF;
    padding: 3px 6px;
    margin: 0 10px 0px 10px;
  }
  /deep/ div .el-button--mini.is-round {
    margin-left: 30px;
    padding: 3px 6px;
  }
  /deep/ div .el-button:hover {
    background: #9B0909;
    border: 1px solid #9B0909;
    border-radius: 20px;
  }
  /deep/ div .el-button.el-button--default.el-button--mini.is-round.actives {
    background: #9B0909;
    border: 1px solid #9B0909;
    border-radius: 20px;
  }
  /deep/ .el-input__inner {
    border-radius: 28px;
  }
</style>
