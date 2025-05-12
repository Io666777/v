<script setup>
import { ref, inject } from 'vue'

const props = defineProps({
  id: Number,
  title: String,
  imageUrl: String,
  price: Number,
  isFavorite: Boolean,
  isAdded: Boolean,
  onClickFavorite: Function,
  onClickAdd: Function,
  description: String // Добавляем новое поле для описания
})

const { openProductDetail } = inject('productDetail')

const handleClick = () => {
  if (openProductDetail) {
    openProductDetail({
      id: props.id,
      title: props.title,
      imageUrl: props.imageUrl,
      price: props.price,
      description: props.description,
      isFavorite: props.isFavorite,
      isAdded: props.isAdded
    })
  }
}
</script>

<template>
  <div 
    class="relative bg-white border border-slate-100 rounded-3xl p-6 cursor-pointer transition hover:-translate-y-2 hover:shadow-xl flex flex-col"
    style="width: 300px; height: 400px; flex-shrink: 0;"
    @click="handleClick"
  >
    <!-- Кнопка избранного (теперь с stopPropagation) -->
    <img
      v-if="onClickFavorite"
      :src="!isFavorite ? '/like-1.svg' : '/like-2.svg'"
      alt="Like"
      class="absolute top-6 left-6 z-10 w-6 h-6 hover:scale-110 transition-transform"
      @click.stop="onClickFavorite"
    />

    <!-- Изображение товара -->
    <div class="relative w-full h-48 mx-auto mb-4 overflow-hidden rounded-xl flex-shrink-0">
      <img 
        :src="imageUrl || '/placeholder-product.jpg'" 
        alt="Product"
        class="absolute top-0 left-0 w-full h-full object-cover object-center"
      />
    </div>

    <!-- Название товара -->
    <div class="flex-grow min-h-[60px] mb-4 overflow-hidden">
      <p 
        class="text-base text-gray-900 font-medium line-clamp-2 break-words"
        :title="title || 'Название товара'"
      >
        {{ title || 'Без названия' }}
      </p>
    </div>

    <!-- Блок цены и кнопки -->
    <div class="mt-auto flex justify-between items-center">
      <div>
        <span class="text-sm text-slate-400">Цена:</span>
        <p class="text-lg font-bold text-gray-900">{{ price || 0 }} руб.</p>
      </div>
      <img
        v-if="onClickAdd"
        @click.stop="onClickAdd"
        :src="!isAdded ? '/plus.svg' : '/checked.svg'"
        alt="Add to cart"
        class="w-8 h-8 hover:scale-110 transition-transform"
      />
    </div>
  </div>
</template>