import Vue from 'vue'
import VueRouter from 'vue-router'
import CoinInfo from "@/views/CoinInfo";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'CoinInfo',
    component: CoinInfo
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
