import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/chatroom',
    name: 'ChatRoom',
    component: () => import(/* webpackChunkName: "chatroom" */ '../views/ChatRoom.vue')
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import(/* webpackChunkName: "register" */ '../views/Register.vue')
  },
]

const router = new VueRouter({
  mode: 'history',
  routes
})

router.afterEach(() => {
  window.scrollTo(0,0)
})

export default router
