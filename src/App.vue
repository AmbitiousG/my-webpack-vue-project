<template>
  <div id="app">
    <!-- <img src="./assets/logo.png"> -->
    <el-button @click="showProfile">Show Profile</el-button>
    <router-view></router-view>
  </div>
</template>

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

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
