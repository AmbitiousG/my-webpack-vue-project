import {getIdToken, isLoggedIn} from './utils/auth'
import Vue from 'vue'
import VueResource from 'vue-resource'
Vue.use(VueResource)

var token = getIdToken();
if(token)
  Vue.http.headers.common['Authorization'] = `Bearer ${token}`;

// import Vuex from 'vuex'
// Vue.use(Vuex)

import VueRouter from 'vue-router'
Vue.use(VueRouter)

import App from './App_vux'
import router from './router'
import store from './store'

// plugins
import { BusPlugin, DatetimePlugin, DevicePlugin, ToastPlugin, AlertPlugin, ConfirmPlugin, LoadingPlugin, AppPlugin } from 'vux'

Vue.use(DevicePlugin)
Vue.use(ToastPlugin)
Vue.use(AlertPlugin)
Vue.use(ConfirmPlugin)
Vue.use(LoadingPlugin)
Vue.use(DatetimePlugin)
Vue.use(BusPlugin)

Vue.config.productionTip = false

router.beforeEach(function (to, from, next) {
  if(to.fullPath !== '/' && to.path !== '/login' && to.path !== '/register' && !isLoggedIn()){
    next({path: '/login'});
  }
  else{
    store.commit('updateLoadingStatus', {isLoading: true});
    next();
  }
})

router.afterEach(function (to) {
  store.commit('updateLoadingStatus', {isLoading: false})
})

window.vm = new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
