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
      <el-menu @select="toggleView" default-active="1" class="mc-nav">
        <el-menu-item index="1">Home</el-menu-item>
        <el-menu-item index="2">Records</el-menu-item>
        <el-menu-item index="3">Graph</el-menu-item>
        <el-menu-item index="4">List</el-menu-item>
        <el-menu-item index="5">About</el-menu-item>
      </el-menu>
    </div>
    <div class="mc-right content">
      <!-- <add-item></add-item> -->
      <transition name="fade">
      <router-view></router-view>
      </transition>
    </div>
  </div>
</template>
<style>
html,
body {
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
}

.mc-main {
  width: 100%;
  height: 100%;
  display: flex;
}

.mc-left,
.mc-right {
  height: 100%;
}

.mc-left {
  flex: 0 1 200px;
}

.mc-right {
  flex: 1 1 100%;
  overflow: hidden;
}

.mc-nav-wrapper {
  min-height: 100%;
}

.mc-nav {
  height: 100%;
}
.fade-enter-active, .fade-leave-active {
  transition-property: opacity;
  transition-duration: .25s;
}

.fade-enter-active {
  transition-delay: .25s;
}

.fade-enter, .fade-leave-active {
  opacity: 0
}
</style>
<script>
// import AddItem from './components/AddItem.vue'

export default {
  name: 'app',
  components: {
    // AddItem
  },
  mounted() {
    // this.$router.push({name: 'AddItem'});
  },
  methods: {
    showProfile() {
      this.$router.push({ name: 'Profile' })
    },
    toggleView(index) {
      if (index == "1") {
        this.$router.push({ name: 'Hello' })
      } else if (index == "2") {
        this.$router.push({ name: 'AddItem' });
      }
    }
    // render: h => h(AddItem)
  }
}

</script>
