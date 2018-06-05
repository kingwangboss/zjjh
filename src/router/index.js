import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/firstpage',
      name: 'firstpage',
      component: resolve => require(['@/pages/firstpage2'], resolve)
    },
    {
      path: '/login',
      name: 'loginVC',
      component: resolve => require(['@/pages/login'], resolve)
    },
    {
      path: '/regist',
      name: 'registVC',
      component: resolve => require(['@/pages/regist'], resolve)
    },
    {
      path: '/lossPwd1',
      name: 'lossPwd1',
      component: resolve => require(['@/pages/lossPwd1'], resolve)
    },
    {
      path: '/lossPwd2',
      name: 'lossPwd2',
      component: resolve => require(['@/pages/lossPwd2'], resolve)
    },
    {
      path: '/mianfeijihua',
      name: 'mianfeijihua',
      component: resolve => require(['@/pages/mianfeijihua'], resolve)
    },
    {
      path: '/zhuanjiajihua',
      name: 'zhuanjiajihua',
      component: resolve => require(['@/pages/zhuanjiajihua'], resolve)
    },
    {
      path: '/wodejihua',
      name: 'wodejihua',
      component: resolve => require(['@/pages/wodejihua'], resolve)
    },
    {
      path: '/zhuanjiajihualiebiao',
      name: 'zhuanjiajihualiebiao',
      component: resolve => require(['@/pages/zhuanjiajihualiebiao'], resolve)
    },
    {
      path: '/planDetail',
      name: 'PlanDetail',
      component: resolve => require(['@/pages/planDetail'], resolve)
    },
    {
      path: '/pay',
      name: 'pay',
      component: resolve => require(['@/pages/pay'], resolve)
    },
  ]
})
