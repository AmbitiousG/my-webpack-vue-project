<template>
<div>
  <group label-width="3em" label-margin-right="2em" lable-align="right">
    <x-input title="用户名" v-model="username" required></x-input>
    <x-input title="密码" v-model="password" type="password" required></x-input>
    <cell primary="content">
      <x-button type="primary" action-type="button" :show-loading="isSubmitting" :disabled="isSubmitting" @click.native="onSubmit">登陆</x-button>
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
import {mapActions} from 'vuex'
export default {
  name: 'Login',
  components: {
    Group,
    Cell,
    XInput,
    XButton
  },
  data () {
    return {
      isSubmitting: false,
      username: '',
      password: '',
    };
  },
  methods: {
    onSubmit() {
      this.login({data: {
        username: this.username,
        password: this.password
      }, cb: res => {
        if(res.error){
          this.$vux.toast.show({
            text: res.error,
            type: 'warn',
          });
        }
        else{
          this.$router.push({
            name: 'Hello'
          })
        }
      }});
    },
    ...mapActions(['login'])
  }
};
</script>

<style lang="css" scoped>
</style>