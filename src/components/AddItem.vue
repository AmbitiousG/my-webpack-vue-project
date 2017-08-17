<template>
  <div>
    <div>
      <loading v-model="isLoading"></loading>
    </div>
    <group v-if="!isLoading" label-width="3em" label-margin-right="2em" lable-align="right">
      <button-tab v-model="item.recordType">
        <button-tab-item>支出</button-tab-item>
        <button-tab-item>收入</button-tab-item>
      </button-tab>
      <popup-picker title="分类" show-name placeholder="请选择" :data="[categoryData]" v-model="item.category" value-text-align="left"></popup-picker>
      <x-input title="金额" v-model="item.amount" type="number" required></x-input>
      <datetime title="时间" v-model="item.datetime" format="YYYY-MM-DD HH:mm" required></datetime>
      <x-textarea title="详情" v-model="item.desc" :max="200" :show-counter="false" :height="60" :rows="8" :cols="30"></x-textarea>
      <x-textarea title="备忘" v-model="item.memo" :max="200" :show-counter="false" :height="60" :rows="8" :cols="30"></x-textarea>
      <cell primary="content">
        <x-button type="primary" action-type="button" :show-loading="isSubmitting" :disabled="isSubmitting" @click.native="onSubmit">新建</x-button>
        <x-button type="warn" action-type="button" @click.native="reset">重置</x-button>
      </cell>
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
import { mapGetters, mapActions } from 'vuex'
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
    if (this.categoryData.length == 0) {
      this.isLoading = true;
      this.getCategories({
        alert: this.$vux.alert,
        cb: () => {
        this.isLoading = false;
      }})
    } else {
      this.isLoading = false;
    }
  },
  computed: {
    ...mapGetters(['categoryData'])
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
        var item = _.assign({}, this.item, {
          category: this.item.category[0]
        });
        this.saveRecord({
          data: { item },
          alert: this.$vux.alert,
          cb: res => {
            if (res.Success) {
              this.$vux.toast.show({
                text: '新建成功！',
                type: 'success',
              });
              // this.reset();
            }
          }
        });
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
    },
    ...mapActions(['getCategories', 'saveRecord'])
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


.vux-button-group {
  padding: 10px 35px;
  /*border-bottom: 1px solid #D9D9D9;*/
}

.vux-flexbox {
  /*margin: 10px 35px;*/
}

</style>
