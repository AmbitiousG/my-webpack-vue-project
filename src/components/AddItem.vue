<template>
  <div class="wrapper">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span style="line-height: 36px;">新的记账项目</span>
        <el-button style="float: right;" type="primary" @click="reset">清除</el-button>
      </div>
      <el-form :model="item" label-width="80px">
        <el-form-item label="分类">
          <el-select v-model="item.category">
            <el-option label="交通" value="1"></el-option>
            <el-option label="饮食" value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="收支类型">
          <el-radio-group v-model="item.itemType">
            <el-radio label="收入" value="1"></el-radio>
            <el-radio label="支出" value="2"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="金额">
          <el-input v-model.number="item.amount" type="number"></el-input>
        </el-form-item>
        <!-- <el-form-item label="备忘"></el-form-item> -->
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  // name: 'AddItem',
  props: {
    item: {
      type: Object,
      default: function () {
        return {
          category: null,
          itemType: 1,
          amount: 0,
          memo: ''
        }
      }
    }
  },
  data () {
    return {
      // item:
    }
  },
  methods: {
    reset () {
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
.wrapper{
  width: 800px;
  height: 500px;
  margin: auto;
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
  width: 480px;
}
</style>
