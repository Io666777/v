<script setup>
defineProps({
  title: String,
  imageUrl: String,
  price: Number,
  isFavorite: Boolean,
  isAdded: Boolean,
  onClickAdd: Function,
  onClickFavorite: Function,
})
</script>

<template>
  <div class="bg-white relative m-10 border border-slate-100 rounded-xl p-8 overflow-hidden cursor-pointer transition hover:-translate-y-2 hover:shadow-xl">
    <!-- Лайк -->
    <img 
      :src="!isFavorite ? '/like-1.svg' : '/like-2.svg'"
      alt="Добавить в избранное" 
      class="absolute top-8 left-8 w-6 h-6 cursor-pointer"
      @click="onClickFavorite"
    />

    <!-- Контейнер для изображения -->
    <div class="h-64 flex items-center justify-center mb-4">
      <img 
        :src="imageUrl" 
        alt="Кольцо" 
        class="max-w-full max-h-full object-contain"
      />
    </div>

    <p class="mt-2 text-lg font-medium">{{ title }}</p>

    <div class="flex justify-between mt-5 items-center">
      <div class="flex flex-col">
        <span class="text-slate-400">Цена:</span>
        <b>{{ price }} BYN</b>
      </div>

      <img 
        @click.stop="onClickAdd" 
        :src="isAdded ? '/checked.svg' : '/plus.svg'"
        alt="Добавить в корзину"
        class="w-6 h-6 cursor-pointer"
      />
    </div>
  </div>
</template>