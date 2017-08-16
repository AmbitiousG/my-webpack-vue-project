<template>
  <div>
    <group label-width="4em" label-margin-right="2em" lable-align="right">
      <x-input title="用户名" v-model="username" required></x-input>
      <x-input title="邮箱" v-model="email" required></x-input>
      <x-input title="密码" v-model="password" type="password" required></x-input>
      <x-input title="重复密码" v-model="password2" type="password" required></x-input>
      <cell primary="content">
        <x-button type="primary" action-type="button" :show-loading="isSubmitting" :disabled="isSubmitting" @click.native="onSubmit">注册</x-button>
      </cell>
    </group>
  </div>
</template>
<script>
import {
  Group,
  Cell,
  XInput,
  XButton
} from 'vux'
import { mapActions } from 'vuex'
export default {
  name: 'Register',
  components: {
    Group,
    Cell,
    XInput,
    XButton
  },
  data() {
    return {
      isSubmitting: false,
      username: '',
      email: '',
      password: '',
      password2: '',
    };
  },
  methods: {
    checkData() {
      if (this.username == '') {
        this.$vux.toast.show({
          text: '请输入用户名！',
          type: 'warn',
        });
        return false;
      }
      if (this.email == '') {
        this.$vux.toast.show({
          text: '请输入邮箱！',
          type: 'warn',
        });
        return false;
      }
      if (this.password == '') {
        this.$vux.toast.show({
          text: '请输入密码！',
          type: 'warn',
        });
        return false;
      }
      if (this.password2 == '') {
        this.$vux.toast.show({
          text: '请重复输入密码！',
          type: 'warn',
        });
        return false;
      }
      return true;
    },
    onSubmit() {
      if (this.checkData()) {
        this.register({
          data: {
            username: this.username,
            password: this.password,
            email: this.email
          },
          cb: (res) => {
            if (!res.success) {
              this.$vux.toast.show({
                text: res.error,
                type: 'warn',
              });
            }
            else{
              this.$vux.toast.show({
                text: '注册成功！',
                type: 'success',
              });
              this.$router.push({
                name: 'Login'
              });
            }
          }
        });
      }
    },
    ...mapActions(['register'])
  }
};

</script>
<style lang="css" scoped>


</style>
