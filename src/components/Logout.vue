<template>
</template>

<script>
import {mapActions} from 'vuex'
export default {

  name: 'Logout',

  data () {
    return {

    };
  },
  mounted() {
    this.logout(() => {
      this.$router.push({
        name: 'Hello'
      });
    });
  },
  methods: {
    ...mapActions(['logout'])
  }
};
</script>

<style lang="css" scoped>
</style>