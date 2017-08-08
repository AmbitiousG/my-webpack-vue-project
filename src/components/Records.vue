<template>
  <div class="wrapper">
    <!-- <template>
      <el-table :data="records" height="100%" border style="width: 100%">
        <el-table-column prop="date" label="日期" width="180">
        </el-table-column>
        <el-table-column prop="name" label="姓名" width="180">
        </el-table-column>
        <el-table-column prop="address" label="地址">
        </el-table-column>
      </el-table>
    </template> -->
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
    this.$http.post('/api/getList').then(response => {
      let data = response.body;
      this.list = data;
    }, response => {
      //error cb
    })
  }
};

</script>
<style lang="css" scoped>
.cell.title {
  width: 80px;
}

</style>
