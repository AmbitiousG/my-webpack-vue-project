// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueResource from 'vue-resource'
import ElementUI from 'element-ui'
// import {Button} from 'element-ui'
// import 'element-ui/lib/theme-default/index.css'
import App from './App'
import router from './router'
// var Vue = window.Vue || require('vue').default;

Vue.use(VueResource)
Vue.use(ElementUI)
Vue.config.productionTip = false

/* eslint-disable no-new */
window.vm = new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
