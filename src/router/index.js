import Vue from 'vue'
import Router from 'vue-router'

const login = r => require.ensure([], () => r(require('@/views/login')), 'Login')

const Home = r => require.ensure([], () => r(require('@/views/home')), 'Home')

const error = r => require.ensure([], () => r(require('@/components/common/error')), 'error')

const IndexMain =  r => require.ensure([], () => r(require('@/views/level01/main')), 'IndexMain')

Vue.use(Router)

export default new Router({
  mode:'history',
  routes: [
    {
      path: '/login',
      name: 'login',
      component: login
    },
    {
      path: '/home',
      name: 'home',
      component: Home,
      children:[
        {
          path: '/',
          name: 'IndexMain',
          component: IndexMain
        },
      ]
    },
    {
      path: '*',
      name: 'error',
      component: error
  }
  ]
})
