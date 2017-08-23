<template>
<div>
  <form @submit="onSubmit">
    <div class="row column wrapper">
      <div class="cell basis100">
        <div v-for="msg in messages" class="row" :class="msgClass(msg)">
          <div v-if="!isSysMsg(msg)" class="cell nogrow name">{{msg.user.username}}:</div>
          <div class="cell basis100">{{msg.message}}</div>
        </div>
      </div>
      <div class="cell nogrow">
        <div class="row">
          <div class="cell basis100">
            <input type="text" class="msg-input" v-model.trim="message" />
          </div>
          <div class="cell nogrow">
            <input type="submit" value="发送">
          </div>
        </div>
      </div>
    </div>
  </form>
  </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
import io from 'socket.io-client'
import {getIdToken} from '../utils/auth'
const TYPE_LOGIN = 0;
const TYPE_MESSAGE = 1;
const TYPE_LOGOUT = 2;
export default {
  name: 'Chat',
  data() {
    return {
      messages: [],
      message: '',
      socket: null,
      // TYPE_LOGIN,
      // TYPE_MESSAGE
    }
  },
  compuetd: {
    ...mapGetters(['user'])
  },
  methods: {
    msgClass(msg) {
      return {'type-sys': this.isSysMsg(msg), 'type-msg': msg.type == TYPE_MESSAGE};
    },
    isSysMsg(msg){
      return msg.type == TYPE_LOGIN || msg.type == TYPE_LOGOUT;
    },
    onSubmit(evt) {
      evt.preventDefault();
      this.message != '' && this.socket.emit('new chat message', this.message);
      this.message = '';
      return false;
    },
    ...mapActions(['logout'])
  },
  created() {
    var token = getIdToken() || '';
    if(this.socket)
      this.socket.close();
    this.socket = io.connect({
      query: `token=${token}`,
      transports: ['websocket']
    });
    // socket.on("invalid_token", function(error) {
    //   if (error.data.type == "UnauthorizedError" || error.data.code == "invalid_token") {
    //     // redirect user to login page perhaps?
    //     console.log("User's token has expired");
    //   }
    // });
    this.socket.on('error', (...obj) => {
      try{
        var err = JSON.parse(obj[0]);
        if(err.type){
          this.$vux.alert.show({title: '请重新登录！', onHide: () => {
            this.logout(() => {
              this.$router.push({
                name: 'Login'
              });
            });
          }});
        }
      }
      catch(e) {
        this.$vux.toast.show({
          text: 'Error occured!',
          type: 'warn',
        });
      }
    })
    this.socket.on("login", ({user}) => {
      this.messages.push({
        type: TYPE_LOGIN,
        message: `${user.username} 登陆!`
      })
    });
    this.socket.on("logout", ({user}) => {
      this.messages.push({
        type: TYPE_LOGOUT,
        message: `${user.username} 退出!`
      })
    });
    this.socket.on("new chat message", ({message, user}) => {
      this.messages.push({type: TYPE_MESSAGE, message, user});
      console.log(message);
    });
  }
}

</script>
<style scoped>
form{
    position: absolute;
    width: 100%;
    top: 46px;
    bottom: 52px;
}
.wrapper{
  height: 100%;
}
.msg-input{
  box-sizing: border-box;
  width: 100%;
}

.name {
  flex-basis: 100px;
}

.type-sys{
  text-align: center;
  color: #777;
}

</style>
