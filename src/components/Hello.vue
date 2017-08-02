<template>
  <div class="wrapper">
    <div class="content">
      <h1>{{ msg }}</h1>
    </div>
  </div>
</template>
<script>
export default {
  name: 'hello',
  data() {
    return {
      msg: 'Welcome to Your Vue.js App',
      count: 0
    }
  },
  methods: {
    increaseCount() {
      this.count++
    }
  }
}

</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1,
h2 {
  font-weight: normal;
}

.wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
}
.content{
  text-align: center;
}

</style>
