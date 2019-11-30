import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/task-management.vue'
import AuthGard from '../routerAuthGard.js'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
    beforeEnter: AuthGard,
  },
  {
    path: '/connect',
    name: 'connect',
    component: () => import(/* webpackChunkName: "about" */ '../views/connect.vue'),
    beforeEnter: AuthGard,
  },
  {
    path: '/task-management',
    name: 'task-management',
    component: () => import(/* webpackChunkName: "about" */ '../views/task-management.vue'),
    beforeEnter: AuthGard,
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
