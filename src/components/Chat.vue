<template>
  <form @submit="onSubmit">
    <div class="row column">
      <div class="cell basis100">
        <div class="row" v-for="msg in messages">
          <div class="cell nogrow name">{{user.username}}:</div>
          <div class="cell basis100"></div>
        </div>
      </div>
      <div class="cell nogrow">
        <div class="row">
          <div class="cell basis100">
            <input type="text" />
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
import io from 'socket.io'
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
    onSubmit() {
      return false;
    }
  },
  created() {
    debugger;
  }
}

</script>
<style scoped>
.name {
  flex-basis: 100px;
}

</style>
