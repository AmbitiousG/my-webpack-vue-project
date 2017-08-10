<template>
  <Group class="wrapper">
    <cell v-for="record in records" primary="content" value-align="left" :key="record.RecordID">
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
          <span class="amount" :class="{'out': !record.IsIncome}">{{formatAmount(record)}}</span>
        </div>
      </div>
    </cell>
  </Group>
</template>
<script>
import _ from 'lodash'
import {
  Group,
  Cell,
  numberComma
} from 'vux'
import {mapGetters, mapActions} from 'vuex'
export default {
  name: 'Records',
  data() {
    return {
      // records: [],
    };
  },
  components: {
    Group,
    Cell
  },
  mounted() {
    if(this.records.length == 0)
      this.getAllRecords(() => {

      });
  },
  computed: {
    ...mapGetters(['records']),
  },
  methods: {
    // getRecords(cb) {
    //   this.$http.post('/api/getList').then(response => {
    //     let res = response.body;
    //     this.updateRecords(res.Records);
    //     typeof(cb) == 'function' && cb.call();
    //   }, response => {
    //     //error cb
    //   })
    // },
    formatAmount({ RecordType, Amount }) {
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
    },
    ...mapActions(['updateRecords', 'getAllRecords'])
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

.row.record {
  /*border-bottom: 1px solid #D9D9D9;*/
}

.row.record:active {
  /*background-color: #ececec;*/
}

.amount {
  color: green;
  font-size: 30px;
  line-height: 2em;
}

.amount.out {
  color: #d02a2a;
}

</style>
