<script setup>
defineProps({
  totalPrice: Number
})

const emit = defineEmits(['openDrawer'])
</script>

<template>
  <header class="flex justify-between items-center border-b border-slate-200 px-10 py-8">
    <!-- Блок логотипа -->
    <router-link to="/" class="flex-1">
      <div class="flex items-center gap-4 w-fit">
        <img src="/logo.png" alt="Logo" class="w-10" />
        <div>
          <h2 class="text-xl font-bold uppercase text-black">Lavka</h2>
          <p class="text-slate-400">Магазин лучшей бижутерии</p>
        </div>
      </div>
    </router-link>

    <!-- Блок навигации -->
    <nav class="flex-1 flex justify-center gap-8">
      <router-link 
        v-for="link in [
          { path: '/', name: 'Главная' },
          { path: '/rings', name: 'Кольца' },
          { path: '/bracelets', name: 'Браслеты' },
          { path: '/earrings', name: 'Серьги' },
          { path: '/amulets', name: 'Амулеты' }
        ]"
        :key="link.path"
        :to="link.path"
        class="text-gray-500 hover:text-black transition py-1 px-2"
        active-class="!text-black !font-bold"
      >
        {{ link.name }}
      </router-link>
    </nav>

    <!-- Блок иконок -->
    <div class="flex-1 flex justify-end">
      <ul class="flex items-center gap-8">
        <li @click="() => emit('openDrawer')" class="flex items-center cursor-pointer gap-3 text-gray-500 hover:text-black">
          <img src="/cart.svg" alt="Cart" />
          <b>{{ totalPrice }} BYN.</b>
        </li>
        <router-link to="/favorites">
          <li class="flex items-center cursor-pointer gap-3 text-gray-500 hover:text-black">
            <img src="/heart.svg" alt="Cart" />
            <span>Закладки</span>
          </li>
        </router-link>
      </ul>
    </div>
  </header>
</template>