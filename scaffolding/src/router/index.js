import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

import Header from '../testing/Header.vue'
import Button from '../testing/Button.vue'
import Field from '../testing/Field.vue'
import Navbar from '../testing/Navbar.vue'
import Cart from '../testing/Cart.vue'
import Me from '../testing/Me.vue'
import Swiper from '../testing/Swiper.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import Article from '../views/Article.vue';
Vue.use(VueRouter)

const routes = [
  {
    // 后面要改的
    path:'/article/:id',
    component:Article
  },
  {
    path:'/login',
    component:Login
  },
  {
    path:'/swiper',
    component:Swiper
  },
  {
    path:'/cart',
    component:Cart
  },
  {
    path:'/me',
    component:Me
  },
  {
    path:'/header',
    component:Header
  },
  {
    path:'/button',
    component:Button
  },
  {
    path:'/field',
    component:Field
  },
  {
    path:'/register',
    component:Register
  },
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path:"/navbar",
    component:Navbar,
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
