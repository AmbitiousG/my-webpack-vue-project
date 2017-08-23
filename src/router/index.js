import Vue from 'vue'
import VueRouter from 'vue-router'
import Hello from '@/components/Hello'
import Profile from '@/components/Profile'
// import AddItem from '@/components/AddItem'
// var Vue = window.Vue || require('vue').default;
// var VueRouter = window.VueRouter || require('vue-router').default;

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
      path:'/records',
      name: 'Records',
      component: () => import('@/components/Records')
    },
    {
      path: '/comingsoon',
      name: 'ComingSoon',
      component(resolve) {
        require(['@/components/ComingSoon'], resolve)
      }
    },
    {
      path: '/login',
      name: 'Login',
      component(resolve) {
        require(['@/components/Login'], resolve)
      }
    },
    {
      path: '/logout',
      name: 'Logout',
      component(resolve) {
        require(['@/components/Logout'], resolve)
      }
    },
    {
      path: '/register',
      name: 'Register',
      component(resolve) {
        require(['@/components/Register'], resolve)
      }
    },
    {
      path: '/chat',
      name: 'Chat',
      component(resolve) {
        require(['@/components/Chat'], resolve)
      }
    }
  ]
})
