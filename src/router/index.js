import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/firstpage',
      name: 'firstpage',
      component: resolve => require(['@/pages/firstpage'],resolve)
    },
    {
      path: '/index',
      name: 'index',
      component: resolve => require(['@/pages/index'],resolve)
    },
    {
      path: '/zhuanjiajihua',
      name: 'zhuanjiajihua',
      component: resolve => require(['@/pages/zhuanjiajihua'],resolve)
    },
  ]
})
