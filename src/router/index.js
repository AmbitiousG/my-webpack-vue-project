import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import Profile from '@/components/Profile'
// import AddItem from '@/components/AddItem'

Vue.use(Router)

export default new Router({
  // mode: 'history',
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
      component(resolve) {
        require(['@/components/AddItem'], resolve)
      }
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
