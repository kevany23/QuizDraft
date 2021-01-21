import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import About from '../views/About.vue'
import VuePage from '../views/VuePage.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    component: About
  },
  {
    path:'/vuepage',
    name: 'VuePage',
    component: VuePage
  }
]

const router = new VueRouter({
  routes,
  mode: 'history'
})

export default router
