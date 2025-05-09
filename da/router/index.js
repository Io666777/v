import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../pages/HomePage.vue'
import RingsPage from '../pages/RingsPage.vue'
import BraceletsPage from '../pages/BraceletsPage.vue'
import EarringsPage from '../pages/EarringsPage.vue'
import AmuletsPage from '../pages/AmuletsPage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', component: HomePage },
    { path: '/rings', component: RingsPage },
    { path: '/bracelets', component: BraceletsPage },
    { path: '/earrings', component: EarringsPage },
    { path: '/amulets', component: AmuletsPage }
  ]
})

export default router