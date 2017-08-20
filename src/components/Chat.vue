<template>
  <form @submit="onSubmit">
    <div class="row column wrapper">
      <div class="cell basis100">
        <div class="row" v-for="msg in messages">
          <div class="cell nogrow name">{{user.username}}:</div>
          <div class="cell basis100"></div>
        </div>
      </div>
      <div class="cell nogrow">
        <div class="row">
          <div class="cell basis100">
            <input type="text" class="msg-input" />
          </div>
          <div class="cell nogrow">
            <input type="submit" name="">
          </div>
        </div>
      </div>
    </div>
  </form>
</template>
<script>
import { mapGetters } from 'vuex'
import io from 'socket.io-client'
import {getIdToken} from '../utils/auth'
export default {
  name: 'Chat',
  data() {
    return {
      messages: []
    }
  },
  compuetd: {
    ...mapGetters(['user'])
  },
  methods: {
    onSubmit(evt) {
      evt.preventDefault();
      return false;
    }
  },
  created() {
    var token = getIdToken();
    // alert(token)
    var socket = io.connect('http://localhost:3000', {
      // 'path': '/',
      'query': `token=${token}`
    });
    socket.on("unauthorized", function(error) {
      if (error.data.type == "UnauthorizedError" || error.data.code == "invalid_token") {
        // redirect user to login page perhaps?
        console.log("User's token has expired");
      }
    });
    console.log(io)
  }
}

</script>
<style scoped>
form,
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

</style>
