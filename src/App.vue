<!-- <template>
  <div id="app">
    <img src="./assets/logo.png">
    <el-button @click="showProfile">Show Profile</el-button>
    <router-view></router-view>
  </div>
</template> -->
<template>
  <div class="mc-main">
    <div class="mc-left nav-wrapper">
      <el-menu default-active="1" class="mc-nav">
        <el-menu-item index="1">Home</el-menu-item>
        <el-menu-item index="2">Records</el-menu-item>
        <el-menu-item index="3">Graph</el-menu-item>
        <el-menu-item index="4">About</el-menu-item>
      </el-menu>
    </div>
    <div class="mc-right content">
      <view-router></view-router>
    </div>
  </div>
</template>

<style>
  html, body{
    width: 100%;
    height: 100%;
    margin: 0;
    padding: 0;
  }
  .mc-main{
    width: 100%;
    height: 100%;
    display: flex;
  }
  .mc-left, .mc-right{
    height: 100%;
  }
  .mc-left{
    flex: 0 1 200px;
  }
  .mc-right{
    flex: 1 1 100%;
  }
  .mc-nav-wrapper{
    min-height: 100%;
  }
</style>



<script>
export default {
  name: 'app',
  methods: {
    showProfile () {
      this.$router.push({name: 'Profile'})
    }
  }
}
</script>

