<template>
    <div class="wrapper">
      <el-button @click="lazyLoadTest">Async Load</el-button>
      <div class="row">
        <div class="cell">Name:</div>
        <div class="cell">{{name}}</div>
      </div>
      <div class="row">
        <div class="cell">Gender</div>
        <div class="cell">{{gender}}</div>
      </div>
      <div class="row">
        <div class="cell">Age</div>
        <div class="cell">{{age}}</div>
      </div>
      <router-view></router-view>
    </div>
</template>

<script>
    export default {
      name: 'profile',
      props: {
        user: {
          type: Object,
          default () {
            return {Name: 'Alex', Gender: 'Man', Age: 24}
          }
        }
      },
      methods: {
        lazyLoadTest () {
          this.$router.push({name: 'AsyncTest'})
        }
      },
      // data () {
      //   return {
      //     user: this.user
      //   }
      // },
      computed: {
        name () {
          return this.user.Name
        },
        gender () {
          return this.user.Gender
        },
        age () {
          return this.user.Age
        }
      }
    }
</script>

<style scoped>
  .wrapper {
    width: 400px;
    margin: auto;
    font-size: 12px;
    font-family: "Segoe UI","Lucida Grande",Helvetica,Arial,Verdana,sans-serif,"Trebuchet MS";
  }
  .wrapper .row{
    display: -webkit-flex;
    display: -moz-flex;
    display: -ms-flex;
    display: -o-flex;
    display: flex;
  }
  .wrapper .cell {
    line-height: 24px;
    padding: 3px;
    border: 1px solid #ccc;
  }
  .wrapper .cell:first-child {
    flex: 0 1 100px;
    text-align: right;
  }

  .wrapper .cell:last-child{
    flex: 1 1 100%;
    text-align: left;
  }
</style>
