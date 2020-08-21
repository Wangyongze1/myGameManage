<template>
  <div id="helloWorld">
    <Header></Header>
    <router-view/>
    <div class="Footer"></div>
    <PlaySong></PlaySong>
  </div>
</template>

<script>
import Header from '@/components/Header/Header'
import PlaySong from '@/components/PlaySong/PlaySong'

export default {
  name: 'HelloWorld',
  components: {Header, PlaySong},
  data () {
    return {
    }
  },
  methods: {
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .Footer {
    border-top: 1px solid #d3d3d3;
    height: 173px;
    width: 100%;
  }
</style>
