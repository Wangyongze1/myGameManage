<template>
  <div>
    <h1>你访问的页面不存在</h1>
    <el-button @click="goBack()">返回上一项</el-button>
  </div>
</template>

<script>
export default {
  name: 'Error',
  methods: {
    goBack () {
      this.$router.go(-1)
    }
  }
}
</script>

<style scoped>

</style>
