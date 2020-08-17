<template>
  <div id="TuiJian" style="height: 500px;">
    <div class="TJ_header">
      <div class="block">
        <el-carousel trigger="click" height="285px;" arrow="always">
          <el-carousel-item v-for="item in pMusicList" :key="item">
            <img :src="item.img" style="width: 730px;height:285px;"><img src="@/assets/down.png" style="width: 254px;height:285px;">
          </el-carousel-item>
        </el-carousel>
      </div>
    </div>
    <div class="TJ_content"></div>
    <div class="TJ_footer"></div>
  </div>
</template>

<script>
export default {
  name: 'OnePage',
  created () {
    console.log('11111')
  },
  data () {
    return {
      msg: 'This is my first page,Thanks for your watching',
      pMusicList: [
        {
          img: require('../../assets/p1.png'),
          url: ''
        },
        {
          img: require('../../assets/p2.png')
        },
        {
          img: require('../../assets/p3.png')
        }
      ]
    }
  }
}
</script>

<style scoped>
  #TuiJian {
    margin-top: 35px;
  }
  .TJ_header {
    height: 285px;
  }
  .TJ_content {
    height: 285px;
  }
  .el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 150px;
    margin: 0;
  }

  /deep/.el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }

  /deep/.el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }
  #TuiJian /deep/ .el-carousel__arrow--left{
     left: calc(50% - 550px) !important;
   }
  #TuiJian /deep/ .el-carousel__arrow--right{
    right: calc(50% - 550px) !important;
  }
  #TuiJian /deep/ .el-carousel__arrow {
    height: 55px;
    width: 40px;
    border-radius: 0;
    background-color: transparent !important;
    font-size: 45px !important;
  }
  #TuiJian /deep/ .el-carousel__arrow:hover {
    background-color: gray !important;
    height: 55px;
    width: 40px;
    border-radius: 0;
  }
  #TuiJian /deep/ .el-carousel__container {
    height: 285px;
  }
</style>
