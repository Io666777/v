import './assets/main.css'

import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import { autoAnimatePlugin } from '@formkit/auto-animate/vue'
import App from './App.vue'

import Home from './pages/Home.vue'
import Favorites from './pages/Favorites.vue'
import Rings from './pages/Rings.vue'
import Bracelets from './pages/Bracelets.vue'
import Earrings from './pages/Earrings.vue'
import Amulets from './pages/Amulets.vue'

const app = createApp(App)

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/favorites', name: 'Favorites', component: Favorites },
  { path: '/rings', name: 'Rings', component: Rings },
  { path: '/bracelets', name: 'Bracelets', component: Bracelets },
  { path: '/earrings', name: 'Earrings', component: Earrings },
  { path: '/amulets', name: 'Amulets', component: Amulets }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

app.use(router)
app.use(autoAnimatePlugin)

app.mount('#app')