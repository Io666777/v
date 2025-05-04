<script setup>
defineProps({
  id: Number,
  title: String,
  imageUrl: String,
  price: Number,
  isFavorite: Boolean,
  isAdded: Boolean,
  onClickFavorite: Function,
  onClickAdd: Function
})
</script>

<template>
  <!-- Карточка с жестко заданными размерами -->
  <div 
    class="relative bg-white border border-slate-100 rounded-3xl p-6 cursor-pointer transition hover:-translate-y-2 hover:shadow-xl"
    style="width: 300px; height: 400px; flex-shrink: 0;"
  >
    <!-- Кнопка избранного (фиксированная позиция) -->
    <img
      v-if="onClickFavorite"
      :src="!isFavorite ? '/like-1.svg' : '/like-2.svg'"
      alt="Like"
      class="absolute top-6 left-6 z-10 w-6 h-6"
      @click="onClickFavorite"
    />

    <!-- Контейнер изображения (фиксированные размеры 1:1) -->
    <div class="relative w-full h-48 mx-auto mb-4 overflow-hidden rounded-xl">
      <img 
        :src="imageUrl" 
        alt="Product"
        class="absolute top-0 left-0 w-full h-full object-cover object-center"
      />
    </div>

    <!-- Название товара (фиксированная высота) -->
    <p class="text-base font-medium line-clamp-2 h-12">{{ title }}</p>

    <!-- Блок цены и кнопки (фиксированное положение внизу) -->
    <div class="absolute bottom-6 left-6 right-6 flex justify-between items-center">
      <div>
        <span class="text-sm text-slate-400">Цена:</span>
        <p class="text-lg font-bold">{{ price }} руб.</p>
      </div>
      <img
        v-if="onClickAdd"
        @click="onClickAdd"
        :src="!isAdded ? '/plus.svg' : '/checked.svg'"
        alt="Add to cart"
        class="w-8 h-8 hover:scale-110 transition-transform"
      />
    </div>
  </div>
</template>