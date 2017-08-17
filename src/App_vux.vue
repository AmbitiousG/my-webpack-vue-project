<template>
  <div style="height: 100%">
    <div>
      <loading v-model="isLoading"></loading>
    </div>
    <drawer :show.sync="drawerVisibility" width="200px;" show-mode="overlay" placement="left" :drawer-style="{'background-color':'#35495e', width: '200px'}">
      <div slot="drawer">
        <group :title="user.username || '未登陆！'" style="margin-top:20px">
          <cell v-if="!user.username" title="登录" link="/login" @click.native="hideDrawer"></cell>
          <cell v-if="!user.username" title="注册" link="/register" @click.native="hideDrawer"></cell>
          <cell v-if="!!user.username" title="退出" link="/logout" @click.native="hideDrawer"></cell>
        </group>
      </div>
      <!-- main content -->
      <view-box ref="viewBox" body-padding-top="46px" body-padding-bottom="52px">
        <x-header slot="header" style="width:100%;position:absolute;left:0;top:0;z-index:100;" :left-options="leftOptions" :right-options="rightOptions" :title="title" @on-click-more="onClickMore">
          <span v-if="showDrawerIcon" slot="overwrite-left" @click="toggleDrawer">
              <x-icon type="navicon" size="35" style="fill:#fff;position:relative;top:-8px;left:-3px;"></x-icon>
            </span>
        </x-header>
        <!-- remember to import BusPlugin in main.js if you use components: x-img and sticky -->
        <transition @after-enter="$vux.bus && $vux.bus.$emit('vux:after-view-enter')" :name="'vux-pop-' + (direction === 'forward' ? 'in' : 'out')">
          <router-view class="router-view"></router-view>
        </transition>
        <tabbar class="vux-demo-tabbar" icon-class="vux-center" slot="bottom">
          <tabbar-item :link="{path:'/'}" :selected="$route.path === '/'">
            <span class="demo-icon-22 vux-demo-tabbar-icon-home" slot="icon" style="position:relative;top: -2px;">&#xe637;</span>
            <span slot="label">主页</span>
          </tabbar-item>
          <tabbar-item :link="{path:'/new'}" :selected="$route.path === '/new'">
            <span class="demo-icon-22" slot="icon">&#xe633;</span>
            <span slot="label">新记录</span>
          </tabbar-item>
          <tabbar-item :link="{path:'/records'}" :selected="$route.path === '/records'">
            <span class="demo-icon-22" slot="icon">&#xe630;</span>
            <span slot="label">所有记录</span>
          </tabbar-item>
        </tabbar>
      </view-box>
    </drawer>
  </div>
</template>
<script>
import {
  Cell,
  Drawer,
  Group,
  Loading,
  Tabbar,
  TabbarItem,
  ViewBox,
  XHeader
  // XIcon,
}
from 'vux'
import {mapState, mapGetters} from 'vuex'
export default {
  name: 'app',
  components: {
    Cell,
    Drawer,
    Group,
    Loading,
    Tabbar,
    TabbarItem,
    ViewBox,
    XHeader,
    // XIcon,
  },
  data() {
    return {
      drawerVisibility: false,

    }
  },
  computed: {
    ...mapState({
      isLoading: state => {
        return state.isLoading
      }
    }),
    ...mapGetters(['user']),
    showDrawerIcon() {
      return this.$route.path === '/' || this.$route.path === '/component/drawer';
    },
    leftOptions() {
      return {
        showBack: this.$route.path !== '/'
      }
    },
    rightOptions() {
      return {
        showMore: true
      }
    },
    title() {
      return '标题';
    },
    direction() {
      return 'forward';
    }
  },
  mounted() {
    // this.$router.push({name: 'AddItem'});
  },
  methods: {
    hideDrawer() {
      this.drawerVisibility = false;
    },
    toggleDrawer() {
      this.drawerVisibility = !this.drawerVisibility;
    },
    onClickMore() {

    },
    toggleView(index) {
      if (index == "1") {
        this.$router.push({
          name: 'Hello'
        })
      }
      else if (index == "2") {
        this.$router.push({
          name: 'AddItem'
        });
      }
      else if (index == "3") {
        this.$router.push({
          name: 'Records'
        });
      }
      else {
        this.$router.push({
          name: 'ComingSoon'
        });
      }
    }
    // render: h => h(AddItem)
  }
}

</script>

<style lang="less">
@import '~vux/src/styles/reset.less';
@import '~vux/src/styles/1px.less';
@import '~vux/src/styles/tap.less';
body {
  background-color: #fbf9fe;
}
html, body {
  height: 100%;
  width: 100%;
  overflow-x: hidden;
}
.demo-icon-22 {
  font-family: 'vux-demo';
  font-size: 22px;
  color: #888;
}
.weui-tabbar.vux-demo-tabbar {
  /** backdrop-filter: blur(10px);
  background-color: none;
  background: rgba(247, 247, 250, 0.5);**/
}
.vux-demo-tabbar .weui-bar__item_on .demo-icon-22 {
  color: #F70968;
}
.vux-demo-tabbar .weui-tabbar_item.weui-bar__item_on .vux-demo-tabbar-icon-home {
  color: rgb(53, 73, 94);
}
.demo-icon-22:before {
  content: attr(icon);
}
.vux-demo-tabbar-component {
  background-color: #F70968;
  color: #fff;
  border-radius: 7px;
  padding: 0 4px;
  line-height: 14px;
}
.weui-tabbar__icon + .weui-tabbar__label {
  margin-top: 0!important;
}
.vux-demo-header-box {
  z-index: 100;
  position: absolute;
  width: 100%;
  left: 0;
  top: 0;
}
@font-face {
  font-family: 'vux-demo';  /* project id 70323 */
  src: url('https://at.alicdn.com/t/font_h1fz4ogaj5cm1jor.eot');
  src: url('https://at.alicdn.com/t/font_h1fz4ogaj5cm1jor.eot?#iefix') format('embedded-opentype'),
  url('https://at.alicdn.com/t/font_h1fz4ogaj5cm1jor.woff') format('woff'),
  url('https://at.alicdn.com/t/font_h1fz4ogaj5cm1jor.ttf') format('truetype'),
  url('https://at.alicdn.com/t/font_h1fz4ogaj5cm1jor.svg#iconfont') format('svg');
}
.demo-icon {
  font-family: 'vux-demo';
  font-size: 20px;
  color: #04BE02;
}
.demo-icon-big {
  font-size: 28px;
}
.demo-icon:before {
  content: attr(icon);
}
.router-view {
  width: 100%;
  top: 46px;
}
.vux-pop-out-enter-active,
.vux-pop-out-leave-active,
.vux-pop-in-enter-active,
.vux-pop-in-leave-active {
  will-change: transform;
  transition: all 500ms;
  height: 100%;
  top: 46px;
  position: absolute;
  backface-visibility: hidden;
  perspective: 1000;
}
.vux-pop-out-enter {
  opacity: 0;
  transform: translate3d(-100%, 0, 0);
}
.vux-pop-out-leave-active {
  opacity: 0;
  transform: translate3d(100%, 0, 0);
}
.vux-pop-in-enter {
  opacity: 0;
  transform: translate3d(100%, 0, 0);
}
.vux-pop-in-leave-active {
  opacity: 0;
  transform: translate3d(-100%, 0, 0);
}
.menu-title {
  color: #888;
}
.row {
  display: flex;
}

.row.column{
  flex-direction: column;
}

.cell{
  flex: 1 auto;
}

.cell.basis100{
  flex-basis: 100%;
}

.cell.nogrow{
  flex-grow: 0;
}
.cell.content{
  padding: 5px;
}
</style>
