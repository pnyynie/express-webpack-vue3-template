import { createRouter, createWebHashHistory } from 'vue-router'

const HomePage = () => import('../views/HomePage/index.vue')

const routes = [
  { path: '/', component: HomePage },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

router.beforeEach((to, from, next) => {
  // console.log(to, from);
  next()
})

export default router