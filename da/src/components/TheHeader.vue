<script setup>
defineProps({
  totalPrice: Number
})

const emit = defineEmits(['openDrawer']);
</script>

<template>
    <header class="flex justify-between items-center border-b border-gray-300 px-8 py-6">
      <div class="flex items-center gap-4">
        <h2 class="text-xl font-bold uppercase">Masiri</h2>
        <p>|</p>
        <p class="text-slate-500">Лавка колец</p>
      </div>
  
      <ul class="flex items-center gap-6">
        <li @click="() => emit('openDrawer')" class="flex items-center cursor-pointer gap-3 text-slate-500 hover:text-black">
          <img src="/cart.svg" class="w-5 h-5" />
          <span class="font-medium">{{totalPrice}} BYN</span>
        </li>
        <li class="flex items-center cursor-pointer gap-3 text-slate-500 hover:text-black">
          <img src="/heart.svg" class="w-5 h-5" />
          <span class="font-medium">Закладки</span>
        </li>
        <li class="flex items-center cursor-pointer gap-3 text-slate-500 hover:text-black">
          <img src="/profile.svg" class="w-5 h-5" />
          <span class="font-medium">Профиль</span>
        </li>
      </ul>
    </header>
  </template>