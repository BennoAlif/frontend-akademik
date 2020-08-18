import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Fakultas from "../views/Fakultas.vue"

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: "/fakultas",
    name: "Fakultas",
    component: Fakultas
  }
  
]

const router = new VueRouter({
  routes
})

export default router
