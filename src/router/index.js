import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Compare from '../views/Compare.vue'
import Statistics from '../views/Statistics.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/compare',
    name: 'Compare',
    component: Compare
  },
  {
    path: '/stats/:country',
    name: 'Statistics',
    component: Statistics
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
