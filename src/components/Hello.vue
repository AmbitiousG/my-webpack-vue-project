<template>
  <div class="content">
    <h1>欢迎记账！</h1>
  </div>
</template>
<script>
export default {
  name: 'hello',
  data() {
    return {
      // msg: 'Welcome to Your Vue.js App',
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

.content{
  margin-top: 30px;
  text-align: center;
}

</style>
