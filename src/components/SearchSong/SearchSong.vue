<template>
  <div id="Search">
    <div class="Content">
      <div class="Middle">
        <div class="SearchContent" style="margin-top: 15px;" @keydown.enter="search()">
          <el-input placeholder="请输入内容" v-model="sSongName">
            <el-button slot="append" icon="el-icon-search" @click="search()" ></el-button>
          </el-input>
        </div>
        <div class="SongList">
          <p style="color: #999999" v-if="Num > 0">搜索"{{SongName}}"，找到 <span style="color: #C20C0C;">{{Num}}</span> {{msg}}</p>
          <p style="color: #999999" v-else-if="Num == 0">未搜索到任何歌曲</p>
        </div>
        <div class="List">
          <el-tabs type="border-card" v-model="activeName" @tab-click="click">
            <el-tab-pane label="单曲" name="song">
              <el-table
                :data="personData"
                style="width: 100%"
                :show-header="false"
                :row-class-name="tableRowClassName">
                <el-table-column
                  label="歌名"
                  width="370">
                  <template slot-scope="scope">
                    <el-button @click="handleClick(scope.row.id,scope.row.name)" type="text" size="small">{{scope.row.name}}</el-button>
                  </template>
                </el-table-column>
                <el-table-column
                  prop="action"
                  label="操作"
                  width="96">
                </el-table-column>
                <el-table-column
                  label="歌手"
                  width="150">
                  <template slot-scope="scope">
                    <span class="Artist" v-for="(item,index) in scope.row.artists" :key="index" @click="handleClickArtist(scope.row.id,scope.row.artists)" type="text" size="small" style="font-size: 12px;white-space:nowrap">{{item.name}} </span>
                  </template>
                </el-table-column>
                <el-table-column
                  label="专辑"
                  width="156">
                  <template slot-scope="scope">
                    <span class="Artist" @click="handleClickAlbum(scope.row.album.id,scope.row.album.name)"
                          type="text" size="small" style="font-size: 12px;white-space:nowrap" :title="'《'+ scope.row.album.name +'》'">《{{scope.row.album.name}}》</span>
                  </template>
                </el-table-column>
                <el-table-column
                  prop="time"
                  label="时长">
                </el-table-column>
              </el-table>
            </el-tab-pane>
            <el-tab-pane label="歌手" name="singer">歌手</el-tab-pane>
            <el-tab-pane label="专辑" name="list">专辑</el-tab-pane>
            <el-tab-pane label="视频" name="video">视频</el-tab-pane>
            <el-tab-pane label="歌词" name="lyrics">歌词</el-tab-pane>
            <el-tab-pane label="歌单" name="myList">歌单</el-tab-pane>
            <el-tab-pane label="主播电台" name="watcher">主播电台</el-tab-pane>
            <el-tab-pane label="用户" name="user">用户</el-tab-pane>
          </el-tabs>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axiosw from '../../axios/index'
export default {
  name: 'SearchSong',
  activated () {
    if (this.$route.params.str !== undefined) {
      this.sSongName = this.$route.params.str
      this.search()
    }
  },
  watch: {
    '$route': {
      handler (newVal, oldVal) {
        this.getview(newVal, oldVal)
      },
      deep: true,
      immediate: true
    },
    activeName: {
      handler () {
        switch (this.activeName) {
          case 'song': this.msg = '首单曲'; break
          case 'singer': this.msg = '位歌手'; break
          case 'list': this.msg = '个视频'; break
          case 'video': this.msg = '个歌词'; break
          case 'myList': this.msg = '个歌单'; break
          case 'watcher': this.msg = '个电台'; break
          case 'user': this.msg = '个用户'; break
        }
      }
    }
  },
  data () {
    return {
      msg: '首单曲',
      SongName: '',
      sSongName: '',
      SongId: 0,
      lyric: '',
      Num: 0,
      activeName: 'song',
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
    getview (to, from) {
      if (this.$route.query.flag === 0) {
        this.sSongName = this.$route.query.str
        this.search()
        this.$route.query.flag++
      }
    },
    tableRowClassName ({row, rowIndex}) {
      if (rowIndex % 2 === 1) {
        return 'warning-row'
      } else {
        return ''
      }
    },
    click (tab, event) {
      this.activeName = tab.name
    },
    handleClick (url, name) {
      this.SongId = url
      this.searchLyric()
      this.$store.commit('changePlay', url)
    },
    handleClickArtist (url, name) {
    },
    handleClickAlbum (url, name) {
    },
    search () {
      this.SongName = this.sSongName
      axiosw({
        url: '/search?keywords=' + this.SongName,
        method: 'get'
      })
        .then(res => {
          this.personData = res.data.result.songs
          this.Num = res.data.result.songs.length
          console.log('我拿到的数据：', this.personData)
        })
        .catch(err => {
          console.log(err)
        })
      // this.$axios.get('/music/selectByName?songName=' + this.SongName)
      //   .then(r => {
      //     if (r.status === 200) {
      //       this.personData = r.data
      //       this.Num = r.data.length
      //     }
      //   })
      //   .catch(failResponse => {
      //   })
    },
    searchLyric () {
      axiosw({
        url: '/lyric?id=' + this.SongId,
        method: 'get'
      })
        .then(res => {
          this.lyric = res.data.lrc.lyric
          let data = {
            name: 'SongDetail',
            params: {
              lyric: this.lyric
            }
          }
          console.log(this.lyric)
          this.$router.push(data)
        })
        .catch(err => {
          console.log(err)
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
    max-width: 904px;
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
  .Artist:hover {
    cursor: pointer;
    text-decoration: underline;
  }
</style>
