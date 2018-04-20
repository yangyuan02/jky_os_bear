import Vue from 'vue'
import Router from 'vue-router'

const login = r => require.ensure([], () => r(require('@/views/login')), 'Login')

const Home = r => require.ensure([], () => r(require('@/views/home')), 'Home')

const error = r => require.ensure([], () => r(require('@/components/common/error')), 'error')

const IndexMain = r => require.ensure([], () => r(require('@/views/level01/main')), 'IndexMain')//进行中的计划

const IndexMainDetail = r => require.ensure([], () => r(require('@/views/level01/detail')), 'IndexMainDetail')//设计工作详情

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/login',
      name: 'login',
      component: login
    },
    {
      path: '/home',
      component: Home,
      children: [
        {
          path: '/',
          name: 'IndexMain',
          component: IndexMain
        },
        {
          path: '/home/detail/:planId/:planName',
          name: 'IndexMainDetail',
          component: IndexMainDetail
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
