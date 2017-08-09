<template>
  <!-- <el-form :model="item" label-width="80px" style="height: 100%;">
    <div class="wrapper row column">
      <div class="cell basis100 scroll">
        <el-form-item label="分类">
          <el-select v-model="item.category">
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
  </el-form> -->
  <div>
    <div>
      <loading v-model="isLoading"></loading>
    </div>
    <group v-if="!isLoading" label-width="4.5em" label-margin-right="2em" lable-align="right">
      <button-tab v-model="item.recordType">
        <button-tab-item>支出</button-tab-item>
        <button-tab-item>收入</button-tab-item>
      </button-tab>
      <popup-picker title="分类" show-name placeholder="请选择" :data="[categoryData]" v-model="item.category" value-text-align="left"></popup-picker>
      <x-input title="金额" v-model="item.amount" type="number" required></x-input>
      <datetime title="时间" v-model="item.datetime" format="YYYY-MM-DD HH:mm" required></datetime>
      <x-textarea title="详情" v-model="item.desc" :max="200" :show-counter="false" :height="60" :rows="8" :cols="30"></x-textarea>
      <x-textarea title="备忘" v-model="item.memo" :max="200" :show-counter="false" :height="60" :rows="8" :cols="30"></x-textarea>
      <flexbox>
        <flexbox-item>
          <x-button type="primary" action-type="button" :show-loading="isSubmitting" :disabled="isSubmitting" @click.native="onSubmit">新建</x-button>
        </flexbox-item>
        <flexbox-item>
          <x-button type="warn" action-type="button" @click.native="reset">重置</x-button>
        </flexbox-item>
      </flexbox>
    </group>
  </div>
</template>
<script>
import _ from 'lodash'
import {
  Group,
  Cell,
  PopupPicker,
  Loading,
  ButtonTab,
  ButtonTabItem,
  XInput,
  Datetime,
  XTextarea,
  Flexbox,
  FlexboxItem,
  XButton,
  dateFormat
} from 'vux'
export default {
  // name: 'AddItem',
  props: {},
  data() {
    return {
      isLoading: true,
      isSubmitting: false,
      item: {
        category: [],
        recordType: 0,
        amount: 0,
        memo: '',
        desc: '',
        datetime: dateFormat(new Date(), 'YYYY-MM-DD HH:mm')
      },
      categoryData: [],
    }
  },
  components: {
    Group,
    PopupPicker,
    Cell,
    Loading,
    ButtonTab,
    ButtonTabItem,
    XInput,
    Datetime,
    XTextarea,
    Flexbox,
    FlexboxItem,
    XButton
  },
  mounted() {
    this.$http.post('api/getCategories').then(response => {
      let res = response.body;
      if (res.Categories && res.Categories.length > 0) {
        this.isLoading = false;
        this.categoryData = _.map(res.Categories, c => {
          return {
            name: c.CategoryName,
            value: c.CategoryID
          }
        });
      } else {
        //error
      }
    })
  },
  methods: {
    checkData() {
      if (this.item.category.length == 0) {
        this.$vux.toast.show({
          text: '请选择分类！',
          type: 'warn',
        });
        return false;
      }
      if (this.item.amount == 0) {
        this.$vux.toast.show({
          text: '请输入金额！',
          type: 'warn',
        });
        return false;
      }
      if (!this.item.datetime) {
        this.$vux.toast.show({
          text: '请选择时间！',
          type: 'warn',
        });
        return false;
      }
      if (!this.item.desc) {
        this.$vux.toast.show({
          text: '请输入描述！',
          type: 'warn',
        });
        return false;
      }
      return true;
    },
    onSubmit() {
      if (this.checkData()) {
        this.$http.post('/api/save', {
          item: _.assign({}, this.item, {
            category: this.item.category[0]
          })
        }).then(response => {
          let res = response.body;
          if (res.Success) {
            this.$vux.toast.show({
              text: '新建成功！',
              type: 'success',
            });
            // this.reset();
          }
        })
      }
    },
    reset() {
      this.item = {
        category: [],
        recordType: 0,
        amount: 0,
        memo: '',
        desc: '',
        datetime: dateFormat(new Date(), 'YYYY-MM-DD HH:mm')
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


.vux-button-group,
.vux-flexbox-item {
  padding: 10px 35px;
  /*border-bottom: 1px solid #D9D9D9;*/
}

.vux-flexbox {
  /*margin: 10px 35px;*/
}

</style>
