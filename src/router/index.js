import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Compare from '../views/Compare.vue'
import Statistics from '../views/Statistics.vue'
import NotFound from '../views/NotFound.vue'

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
  },
  {
    path: '/:pathMatch(.*)*',
    component: NotFound
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes: routes
})

export default router
