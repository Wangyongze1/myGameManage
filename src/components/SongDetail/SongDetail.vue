<template>
  <div id="SongDetail">
    <div class="Lyric" v-html="lyric"></div>
  </div>
</template>

<script>
export default {
  name: 'SongDetail',
  data () {
    return {
      lyric: ''
    }
  },
  mounted () {
    console.log(222)
    if (this.$route.params.lyric !== undefined) {
      this.lyric = this.$route.params.lyric
      this.lyric = this.lyric.replace(/(\[\d\d\:\d\d\.[0-9]*\])/g, '<br/>')
      console.log(this.lyric)
    }
  },
  methods: {
  }
}
</script>

<style scoped>
#SongDetail {
  width: 100%;
}
.Lyric {
  padding-top: 20px;
  margin: 0 auto;
  width: 500px;
  text-align: left;
  height: auto;
}
</style>
