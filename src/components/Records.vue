<template>
<div class="wrapper">
    <swipeout class="vux-1px-tb">
      <swipeout-item transition-mode="follow" v-for="(record, index) in records" :key="index">
        <div slot="right-menu">
          <swipeout-button type="warn" @click.native="removeRecord(index)" :width="70">删除</swipeout-button>
          <swipeout-button type="default" :width="70">取消</swipeout-button>
        </div>
        <div slot="content" :class="{'vux-1px-b': index !== records.length - 1, 'vux-1px-t': index === 0}" style="padding:12px;">
          <div class="row record">
            <div class="cell">
              <div class="row column">
                <div class="cell content">
                  <span class="record-date">{{record.RecordDate}}</span>
                </div>
                <div class="cell content desc">{{record.CategoryName + ': ' + record.Description}}</div>
              </div>
            </div>
            <div class="cell nogrow content">
              <span class="amount" :class="{'out': !record.IsIncome}">{{formatAmount(record)}}</span>
            </div>
          </div>
        </div>
      </swipeout-item>
    </swipeout>
  </div>
</template>
<script>
import _ from 'lodash'
import {
  Swipeout,
  SwipeoutItem,
  SwipeoutButton,
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
    Swipeout,
    SwipeoutItem,
    SwipeoutButton,
  },
  mounted() {
    if(this.records.length == 0)
      this.getAllRecords({
        alert: this.$vux.alert,
        cb:() => {

      }});
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
      this.$vux.confirm.show({
        title: '警告',
        content: '将删除此项目, 是否继续?',
        onConfirm: () => {
          this.deleteRecord({
            data: { recordID: record.RecordID },
            alert: this.$vux.alert,
            cb: res => {
              if(res.success){
                this.$vux.toast.show({
                  text: '删除成功！',
                  type: 'success',
                });
              }
            }
          })
          // this.$http.post('/api/deleteRecord', { recordID: record.RecordID }).then(response => {
          //   let res = response.body;
          //   if (res.Success) {
          //     this.$message({
          //       message: '移除成功！',
          //       type: 'success',
          //     });
          //     this.records.splice(index, 1);
          //   }
          // })
        }
      })
      // this.$vux.confirm('将删除此项目, 是否继续?', '提示', {
      //   confirmButtonText: '确定',
      //   cancelButtonText: '取消',
      //   type: 'warning'
      // }).then(() => {
        
      // }).catch(() => {
      //   this.$message({
      //     type: 'info',
      //     message: '已取消删除'
      //   });
      // });
    },
    ...mapActions(['deleteRecord', 'getAllRecords'])
  }
};

</script>
<style lang="css" scoped>
.wrapper {
  width: 100%;
  /*height: 100%;*/
  /*overflow: auto;*/
}

.record-date{
  color: #999;
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
