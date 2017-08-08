<template>
  <el-form :model="item" label-width="80px" style="height: 100%;">
    <div class="wrapper row column">
      <div class="cell basis100 scroll">
        <el-form-item label="分类">
          <el-select v-model="item.category">
            <!-- <el-option label="交通" value="1"></el-option>
            <el-option label="饮食" value="2"></el-option> -->
            <el-option v-for="category in categoryData" :label="category.CategoryName" :value="category.CategoryID" :key="category.CategoryID"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="收支类型">
          <el-radio-group v-model="item.recordType">
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
        <el-form-item label="详情">
          <el-input type="textarea" v-model="item.desc"></el-input>
        </el-form-item>
        <el-form-item label="备忘">
          <el-input type="textarea" v-model="item.memo"></el-input>
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
var _ = require('lodash')
export default {
  // name: 'AddItem',
  props: {},
  data() {
    return {
      item: {
        category: null,
        recordType: 1,
        amount: 0,
        memo: '',
        desc: '',
        datetime: Date.now()
      },
      categoryData: [],
    }
  },
  mounted() {
    this.$http.post('api/getCategories').then(response => {
      let res = response.body;
      if (res.Categories && res.Categories.length > 0) {
        this.categoryData = res.Categories;
      } else {
        //error
      }
    })
  },
  methods: {
    checkData() {
      if (!this.item.category) {
        this.$notify({
          message: '类型不能为空！',
          type: 'warning',
          duration: 3000
        });
        return false;
      }
      if (this.item.amount == 0) {
        this.$notify({
          message: '金额不能为空！',
          type: 'warning',
          duration: 3000
        });
        return false;
      }
      if (!this.item.desc) {
        this.$notify({
          message: '描述不能为空！',
          type: 'warning',
          duration: 3000
        });
        return false;
      }
      return true;
    },
    onSubmit() {
      if (this.checkData()) {
        this.$http.post('/api/save', { item: this.item }).then(response => {
          let res = response.body;
          if(res.Success){
            this.$notify({
              message:'新建成功！',
              type:'success',
              duration: 3000
            });
            this.reset();
          }
        })
      }
    },
    reset() {
      this.item = {
        category: null,
        recordType: 1,
        amount: 0,
        memo: '',
        desc: '',
        datetime: Date.now()
      }
    }
  }
}

</script>
<style lang="css" scoped>
.wrapper {
  width: 100%;
  height: 100%;
}

.wrapper .cell {
  padding: 10px;
}

.wrapper .opt>div {
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
