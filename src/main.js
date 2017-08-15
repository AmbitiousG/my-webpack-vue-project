// // The Vue build version to load with the `import` command
// // (runtime-only or standalone) has been set in webpack.base.conf with an alias.
// import Vue from 'vue'
// import VueResource from 'vue-resource'
// import ElementUI from 'element-ui'
// // import {Button} from 'element-ui'
// // import 'element-ui/lib/theme-default/index.css'
// import App from './App'
// import router from './router'
// // var Vue = window.Vue || require('vue').default;

// Vue.use(VueResource)
// Vue.use(ElementUI)
// Vue.config.productionTip = false

// /* eslint-disable no-new */
// window.vm = new Vue({
//   el: '#app',
//   router,
//   template: '<App/>',
//   components: { App }
// })

import Vue from 'vue'
import VueResource from 'vue-resource'
Vue.use(VueResource)

var storage = window.localStorage;
var token = storage.getItem('token') || '';
Vue.http.headers.common['Authorization'] = 'Bearer ' + token;

import Vuex from 'vuex'
Vue.use(Vuex)

import App from './App_vux'
import router from './router'
import store from './store'

// plugins
import { BusPlugin, DatetimePlugin, LocalePlugin, DevicePlugin, ToastPlugin, AlertPlugin, ConfirmPlugin, LoadingPlugin, AppPlugin } from 'vux'

Vue.use(DevicePlugin)
Vue.use(ToastPlugin)
Vue.use(AlertPlugin)
Vue.use(ConfirmPlugin)
Vue.use(LoadingPlugin)
Vue.use(LocalePlugin)
Vue.use(DatetimePlugin)
Vue.use(BusPlugin)

Vue.config.productionTip = false

var isLoggedIn = () => {
  var token = storage.getItem('token');
  return !!token;
}

router.beforeEach(function (to, from, next) {
  // debugger;
  if(to.fullPath !== '/' && to.path !== '/login' && !isLoggedIn()){
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
