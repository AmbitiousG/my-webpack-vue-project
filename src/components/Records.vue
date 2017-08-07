<template>
  <div class="wrapper">
    <div v-for="item in list" class="row">
      <div class="cell nogrow title">Name:</div>
      <div class="cell">{{item.name}}</div>
      <div class="cell nogrow title">Value:</div>
      <div class="cell">{{item.value}}</div>
    </div>
  </div>
</template>
<script>
export default {

  name: 'Records',

  data() {
    return {
      list: [],
    };
  },
  mounted() {
    this.$http.post('/api/getList').then(response=> {
      let data = response.body;
      debugger;
    }, response=> {
      debugger;
      //error cb
    })
  }
};

</script>
<style lang="css" scoped>
.cell.title{
  width: 80px;
}
</style>
