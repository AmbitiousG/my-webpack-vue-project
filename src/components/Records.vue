<template>
  <Group class="wrapper">
      <!-- <el-table :data="records" height="auto" border style="width: 100%" stripe>
        <el-table-column label="操作" width="65">
          <template scope="scope">
            <el-button @click="removeRecord(scope.$index)" type="text" size="small">移除</el-button>
          </template>
        </el-table-column>
        <el-table-column prop="CategoryName" label="分类" width="100">
        </el-table-column>
        <el-table-column prop="RecordType" label="收支类型" width="95">
        </el-table-column>
        <el-table-column prop="Amount" label="金额" width="100">
        </el-table-column>
        <el-table-column prop="RecordDate" label="时间" width="180">
        </el-table-column>
        <el-table-column prop="Description" label="详情">
        </el-table-column>
        <el-table-column prop="Memo" label="备忘">
        </el-table-column>
      </el-table> -->
      <!-- <panel :list="recordsFormat" type="4"></panel> -->
      <cell v-for="record in records" primary="content" value-align="left" :key="record">
      <div class="row record">
        <div class="cell">
          <div class="row column">
            <div class="cell content">
              <span class="record-date">{{record.RecordDate}}</span>
            </div>
            <div class="cell content">{{record.CategoryName + ': ' + record.Description}}</div>
          </div>
        </div>
        <div class="cell nogrow content">
          <span class="amount" :class="{'out': record.RecordType == '支出'}">{{formatAmount(record)}}</span>
        </div>
      </div>
      </cell>
  </Group>
</template>
<script>
import _ from 'lodash'
import {
  Group, Cell, numberComma
} from 'vux'
export default {
  name: 'Records',
  data() {
    return {
      records: [],
    };
  },
  components: {
    Group, Cell
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
  computed: {
    recordsFormat() {
      return _.map(this.records, record => {
        return {
          title: (record.RecordType == '收入' ? '+' : '-') + numberComma(record.Amount.toFixed(2)),
          desc: `${record.CategoryName}: ${record.Description}`,
          meta: {
            date: record.RecordDate,
          }
        }
      })
    }
  },
  methods: {
    formatAmount({RecordType, Amount}) {
      return (RecordType == '收入' ? '+' : '-') + numberComma(Amount.toFixed(2))
    },
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
  /*height: 100%;*/
  /*overflow: auto;*/
}

.el-table {
  height: 100%;
}

.row.record{
  /*border-bottom: 1px solid #D9D9D9;*/
}

.row.record:active{
  /*background-color: #ececec;*/
}

.amount{
  color: green;
  font-size: 30px;
  line-height: 2em;
}

.amount.out{
  color: #d02a2a;
}
</style>
