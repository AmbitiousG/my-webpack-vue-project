<template>
  <div class="wrapper">
    <template>
      <el-table :data="records" height="auto" border style="width: 100%" stripe>
        <el-table-column label="操作" width="100">
          <template scope="scope">
            <el-button @click="removeRecord(scope.$index)" type="text" size="small">移除</el-button>
          </template>
        </el-table-column>
        <el-table-column prop="CategoryName" label="分类" width="100">
        </el-table-column>
        <el-table-column prop="RecordType" label="收支类型" width="100">
        </el-table-column>
        <el-table-column prop="Amount" label="金额" width="100">
        </el-table-column>
        <el-table-column prop="RecordDate" label="时间" width="180">
        </el-table-column>
        <el-table-column prop="Description" label="详情">
        </el-table-column>
        <el-table-column prop="Memo" label="备忘">
        </el-table-column>
      </el-table>
    </template>
  </div>
</template>
<script>
import _ from 'lodash'
export default {

  name: 'Records',

  data() {
    return {
      records: [],
    };
  },
  mounted() {
    this.$http.post('/api/getList').then(response => {
      let res = response.body;
      // var result = [];
      // for (var i = 0; i < 5; i++) {
      //   var clone = _.cloneDeep(res.Records);
      //   result = _.concat(result, clone);
      // }
      // this.records = result;
      this.records = res.Records;
    }, response => {
      //error cb
    })
  },
  methods: {
    removeRecord(index) {
      var record = this.records[index];
      this.$confirm('将删除此项目, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$http.post('/api/deleteRecord', { recordID: record.RecordID }).then(response => {
          let res = response.body;
          if (res.Success) {
            this.$message({
              message: '移除成功！',
              type: 'success',
            });
            this.records.splice(index, 1);
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });

    }
  }
};

</script>
<style lang="css" scoped>
.wrapper {
  width: 100%;
  height: 100%;
}

.el-table {
  height: 100%;
}

</style>
