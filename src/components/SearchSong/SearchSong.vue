<template>
  <div id="Search">
    <div class="Content">
      <div class="Middle">
        <div class="SearchContent" style="margin-top: 15px;">
          <el-input placeholder="请输入内容" v-model="SongName">
            <el-button slot="append" icon="el-icon-search" @click="search()"></el-button>
          </el-input>
        </div>
        <div class="SongList">
          <p style="color: #999999" v-if="SongNum > 0">搜索"{{SongName}}"，找到 <span style="color: #C20C0C;">{{SongNum}}</span> 首歌</p>
          <p style="color: #999999" v-else-if="SongNum == 0">未搜索到任何歌曲</p>
        </div>
        <div class="List">
          <el-tabs type="border-card">
            <el-tab-pane label="单曲">
              <el-table
                :data="personData"
                style="width: 100%"
                :show-header="false"
                :row-class-name="tableRowClassName">
                <el-table-column
                  label="歌名"
                  width="370">
                  <template slot-scope="scope">
                    <el-button @click="handleClick(scope.row.url)" type="text" size="small">{{scope.row.songname}}</el-button>
                  </template>
                </el-table-column>
                <el-table-column
                  prop="action"
                  label="操作"
                  width="96">
                </el-table-column>
                <el-table-column
                  prop="name"
                  label="歌手"
                  width="130">
                </el-table-column>
                <el-table-column
                  prop="songlist"
                  label="专辑"
                  width="156">
                </el-table-column>
                <el-table-column
                  prop="time"
                  label="时长">
                </el-table-column>
              </el-table>
            </el-tab-pane>
            <el-tab-pane label="配置管理">配置管理</el-tab-pane>
            <el-tab-pane label="角色管理">角色管理</el-tab-pane>
            <el-tab-pane label="定时任务补偿">定时任务补偿</el-tab-pane>
          </el-tabs>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SearchSong',
  created () {
    if (this.$route.params != null || this.$route.params === undefined) {
      this.SongName = this.$route.params.str
    }
  },
  data () {
    return {
      msg: '不是吧没有触发？',
      SongName: '',
      SongNum: 0,
      tableData: [{
        songName: '一路向北',
        action: '',
        name: '周杰伦',
        songList: '《一路向北》',
        time: '01:37'
      }],
      personData: []
    }
  },
  methods: {
    tableRowClassName ({row, rowIndex}) {
      if (rowIndex % 2 === 1) {
        return 'warning-row'
      } else {
        return ''
      }
    },
    handleClick (url) {
      console.log(url)
    },
    search () {
      // this.$axios.get('/user/selectOne?id=' + id)
      //   .then(r => {
      //     if (r.status === 200) {
      //       console.log(r.data)
      //       this.personData = r.data
      //     }
      //   })
      //   .catch(failResponse => {
      //   })
      this.$axios.get('/music/selectByName?songName=' + this.SongName)
        .then(r => {
          if (r.status === 200) {
            this.personData = r.data
            console.log(r.data)
          }
        })
        .catch(failResponse => {
        })
    }
  }
}
</script>

<style scoped>
  #Search {
    background: #F5F5F5;
  }
  .SearchContent {
    padding: 38px 0 0 0;
  }
  .Content {
    margin-top: -9px;
    width: 100%;
    height: auto;
  }
  .Middle {
    width: 904px;
    min-height: 700px;
    margin: 0 auto;
    padding: 0 40px;
    background: white;
    border-left: 1px solid #d3d3d3;
    border-right: 1px solid #d3d3d3;
  }
  .el-input-group {
    width: 46%;
    font-size: 12px;
  }
  .SongList {
    margin: 28px 0 17px 0;
    text-align: left;
  }
  .SongList p{
    font-size: 12px;
  }
  .List {

  }
  /deep/ .el-tabs--border-card {
    border: none;
    box-shadow: none;
  }
  /deep/.el-tabs--border-card >.el-tabs__header {
    border: 1px solid #DCDFE6;
    border-bottom: 0;
  }
  /deep/.el-table .warning-row {
    background: #F7F7F7;
  }
  /deep/.el-tabs--border-card>.el-tabs__header .el-tabs__item {
    width: 110px;
  }
  /deep/.el-tabs--border-card>.el-tabs__content {
    padding: 0;
    padding-top: 15px;
  }
  /deep/.el-table--enable-row-transition .el-table__body td {
    padding-left: 20px;
  }
</style>
