import Vue from 'vue'
import VueRouter from 'vue-router'
import Hello from '@/components/Hello'
import Profile from '@/components/Profile'
// import AddItem from '@/components/AddItem'
// var Vue = window.Vue || require('vue').default;
// var VueRouter = window.VueRouter || require('vue-router').default;

Vue.use(VueRouter)
export default new VueRouter({
  mode: 'history',
  routes: [{
      path: '/',
      name: 'Hello',
      component: Hello
    },
    {
      path: '/profile',
      name: 'Profile',
      component: Profile,
      children: [{
        path: 'async',
        name: 'AsyncTest',
        component(resolve) {
          require(['@/components/AsyncTest'], resolve)
        }
      }]
    },
    {
      path: '/new',
      name: 'AddItem',
      // component(resolve) {
      //   require(['@/components/AddItem'], resolve)
      // },
      component: () => import('@/components/AddItem')
    },
    {
      path: '/comingsoon',
      name: 'ComingSoon',
      component(resolve) {
        require(['@/components/ComingSoon'], resolve)
      }
    }
  ]
})
