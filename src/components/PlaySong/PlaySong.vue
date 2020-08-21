<template>
  <div id="playSong">
    <div class="content">
      <audio controls="controls">
        <source :src="url" type="audio/mp3">
      </audio>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PlaySong',
  data () {
    return {
      url: '../../../static/music/Daisy.mp3'
    }
  }
}
</script>

<style scoped>
  .content {
    position: fixed;
    bottom: 0;
    height: 50px;
    width: 100%;
    background-color: #242424;
    margin: 0 auto;
  }
  /deep/ audio {
    width: 600px;
    margin-top: 10px;
    height: 30px;
  }
</style>
