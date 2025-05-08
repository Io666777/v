<script setup>
defineProps({
  totalPrice: Number
})

const emit = defineEmits(['openDrawer'])
</script>

<template>
  <header class="flex justify-between border-b border-slate-200 px-10 py-8">
    <router-link to="/">
      <div class="flex items-center gap-4">
        <img src="/logo.png" alt="Logo" class="w-10" />
        <div>
          <h2 class="text-xl font-bold uppercase text-white">Lavka</h2>
          <p class="text-slate-400">Магазин лучшей бижутерии</p>
        </div>
      </div>
    </router-link>

    <div class="flex items-center gap-10">
      <!-- Основное меню навигации -->
      <nav class="hidden md:flex items-center gap-6">
        <router-link 
          to="/" 
          class="text-gray-500 hover:text-black transition"
          active-class="text-black font-medium"
        >
          Главная
        </router-link>
        <router-link 
          to="/rings" 
          class="text-gray-500 hover:text-black transition"
          active-class="text-black font-medium"
        >
          Кольца
        </router-link>
        <router-link 
          to="/bracelets" 
          class="text-gray-500 hover:text-black transition"
          active-class="text-black font-medium"
        >
          Браслеты
        </router-link>
        <router-link 
          to="/earrings" 
          class="text-gray-500 hover:text-black transition"
          active-class="text-black font-medium"
        >
          Серьги
        </router-link>
        <router-link 
          to="/amulets" 
          class="text-gray-500 hover:text-black transition"
          active-class="text-black font-medium"
        >
          Амулеты
        </router-link>
      </nav>

      <!-- Иконки действий -->
      <ul class="flex items-center gap-6">
        <li
          @click="() => emit('openDrawer')"
          class="flex items-center cursor-pointer gap-3 text-gray-500 hover:text-black"
        >
          <img src="/cart.svg" alt="Cart" class="w-6" />
          <b>{{ totalPrice }} руб.</b>
        </li>

        <router-link to="/favorites">
          <li class="flex items-center cursor-pointer gap-3 text-gray-500 hover:text-black">
            <img src="/heart.svg" alt="Favorites" class="w-6" />
            <span class="hidden md:inline">Закладки</span>
          </li>
        </router-link>

        <li class="flex items-center cursor-pointer gap-3 text-gray-500 hover:text-black">
          <img src="/profile.svg" alt="Profile" class="w-6" />
          <span class="hidden md:inline">Профиль</span>
        </li>
      </ul>
    </div>
  </header>
</template>