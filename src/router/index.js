import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/firstpage',
      name: 'firstpage',
      component: resolve => require(['@/pages/firstpage'],resolve)
    }
  ]
})
