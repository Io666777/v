import { createRouter, createWebHistory } from 'vue-router'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
  { path: '/', component: Home },
  { path: '/rings', component: Rings },
  { path: '/bracelets', component: Bracelets },
  { path: '/earrings', component: Earrings },
  { path: '/amulets', component: Amulets },
  { path: '/favorites', component: Favorites }
  ]
})

export default router