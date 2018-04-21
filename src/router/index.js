import Vue from 'vue'
import Router from 'vue-router'

const login = r => require.ensure([], () => r(require('@/views/login')), 'Login')

const Home = r => require.ensure([], () => r(require('@/views/home')), 'Home')

const error = r => require.ensure([], () => r(require('@/components/common/error')), 'error')

const IndexMain = r => require.ensure([], () => r(require('@/views/level01/main')), 'IndexMain')//进行中的计划

const IndexMainDetail = r => require.ensure([], () => r(require('@/views/level01/detail')), 'IndexMainDetail')//设计工作详情

const user = r => require.ensure([], () => r(require('@/views/user/index')), 'user')

const EvaluationPoint = r => require.ensure([], () => r(require('@/views/evaluationPoint/index')), 'EvaluationPoint')//评测点

const pointDetail = r => require.ensure([], () => r(require('@/views/evaluationPoint/pointDetail')), 'pointDetail')

const ExpertGroup = r => require.ensure([], () => r(require('@/views/expertGroup/index')), 'ExpertGroup')//专家组

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
            name: 'home',
            component: Home,
            children: [
                {
                    path: '/',
                    name: 'IndexMain',
                    component: IndexMain
                },
                {
                    path: '/home/detail',
                    name: 'IndexMainDetail',
                    component: IndexMainDetail
                },
                {
                    path: '/home/user',
                    name: 'user',
                    component: user
                },
                {
                    path: '/home/evaluationPoint',
                    name: 'EvaluationPoint',
                    component: EvaluationPoint
                },{
                    path: '/home/pointDetail',
                    name: 'pointDetail',
                    component: pointDetail
                },
                {
                    path: '/home/expertGroup',
                    name: 'ExpertGroup',
                    component: ExpertGroup
                }
            ]
        },
        {
            path: '*',
            name: 'error',
            component: error
        }
    ]
})
