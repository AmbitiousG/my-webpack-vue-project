<template>
  <el-form :model="item" label-width="80px" style="height: 100%;">
    <div class="wrapper row column">
      <div class="cell basis100 scroll">
        <el-form-item label="分类">
          <el-select v-model="item.category">
            <el-option label="交通" value="1"></el-option>
            <el-option label="饮食" value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="收支类型">
          <el-radio-group v-model="item.itemType">
            <el-radio :label="1">支出</el-radio>
            <el-radio :label="2">收入</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="金额">
          <el-input v-model.number="item.amount" type="number"></el-input>
        </el-form-item>
        <el-form-item label="时间">
          <el-date-picker v-model="item.datetime" type="datetime" placeholder="选择日期时间"></el-date-picker>
        </el-form-item>
        <el-form-item label="备忘">
          <el-input type="textarea" v-model="item.desc"></el-input>
        </el-form-item>
      </div>
      <div class="cell nogrow opt">
        <el-form-item>
          <el-button type="primary" @click="onSubmit">立即创建</el-button>
          <el-button style="float: right;" type="danger" @click="reset">清除</el-button>
        </el-form-item>
      </div>
    </div>
  </el-form>
</template>
<script>
export default {
  // name: 'AddItem',
  props: {
    item: {
      type: Object,
      default: function() {
        return {
          category: null,
          itemType: 1,
          amount: 0,
          memo: '',
          desc: '',
          datetime: Date.now()
        }
      }
    }
  },
  data() {
    return {
      // item:
    }
  },
  methods: {
    onSubmit() {
      alert(this.item)
    },
    reset() {
      this.item = {
        category: null,
        itemType: 1,
        amount: 0,
        memo: ''
      }
    }
  }
}

</script>
<style lang="css" scoped>
.row {
  display: flex;
}

.row.column{
  flex-direction: column;
}

.cell{
  flex: 1 auto;
}

.cell.basis100{
  flex-basis: 100%;
}

.cell.nogrow{
  flex-grow: 0;
}

.cell.scroll{
  overflow: auto;
}

.wrapper{
  width: 100%;
  height: 100%;
}

.wrapper .cell{
  padding: 10px;
}

.wrapper .opt > div{
  margin-bottom: 0;
}

.text {
  font-size: 14px;
}

.item {
  padding: 18px 0;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}

.clearfix:after {
  clear: both
}

.box-card {
  /*width: 480px;*/
}

</style>
