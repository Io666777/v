<script setup>
import { ref } from 'vue'

const props = defineProps({
  id: Number,
  title: String,
  imageUrl: String,
  price: Number,
  isFavorite: Boolean,
  isAdded: Boolean,
  description: String,
  onClickFavorite: Function,
  onClickAdd: Function
})

const showDetail = ref(false)

const toggleDetail = () => {
  showDetail.value = !showDetail.value
  document.body.style.overflow = showDetail.value ? 'hidden' : ''
}
</script>

<template>
  <div class="relative">
    <!-- Основная карточка -->
    <div 
      class="relative bg-white border border-slate-100 rounded-3xl p-6 cursor-pointer transition hover:-translate-y-2 hover:shadow-xl flex flex-col"
      style="width: 300px; height: 400px; flex-shrink: 0;"
      @click="toggleDetail"
    >
      <!-- Кнопка избранного -->
      <img
        v-if="onClickFavorite"
        :src="!isFavorite ? '/like-1.svg' : '/like-2.svg'"
        alt="Like"
        class="absolute top-6 left-6 z-10 w-6 h-6 hover:scale-110 transition-transform"
        @click.stop="onClickFavorite"
      />

      <!-- Изображение товара (ОСНОВНОЕ, которое было пропущено) -->
      <div class="relative w-full h-48 mx-auto mb-4 overflow-hidden rounded-xl flex-shrink-0">
        <img 
          :src="imageUrl || '/placeholder-product.jpg'" 
          :alt="title"
          class="w-full h-full object-cover"
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

    <!-- Детальное описание (модальное окно) -->
    <transition name="fade">
      <div 
        v-if="showDetail"
        class="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
        @click.self="toggleDetail"
      >
        <div class="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
          <button 
            @click="toggleDetail"
            class="absolute top-4 right-4 text-gray-500 hover:text-black z-10"
          >
            ✕
          </button>
          
          <div class="grid md:grid-cols-2 gap-8 p-8">
            <div class="bg-gray-100 rounded-xl overflow-hidden h-96">
              <img 
                :src="imageUrl" 
                :alt="title"
                class="w-full h-full object-cover"
              />
            </div>
            
            <div>
              <h2 class="text-2xl text-black font-bold mb-4">{{ title }}</h2>
              <div class="text-2xl font-bold text-gray-900 mb-6">{{ price }} руб.</div>
              
              <div class="mb-8">
                <h3 class="text-lg font-semibold mb-2">Описание</h3>
                <p class="text-gray-700 whitespace-pre-line">
                  {{ description || 'Описание отсутствует' }}
                </p>
              </div>

              <div class="flex space-x-4">
                <button 
                  v-if="onClickFavorite"
                  @click.stop="onClickFavorite"
                  class="p-2 rounded-full border border-gray-200 hover:bg-gray-100"
                >
                  <img
                    :src="isFavorite ? '/like-2.svg' : '/like-1.svg'"
                    alt="Like"
                    class="w-6 h-6"
                  />
                </button>

                <button 
                  v-if="onClickAdd"
                  @click.stop="onClickAdd"
                  class="flex-1 bg-green-500 text-white py-3 px-6 rounded-lg hover:bg-green-600 transition"
                >
                  {{ isAdded ? 'В корзине' : 'В корзину' }}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>