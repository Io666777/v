<script setup>
import { ref } from 'vue'

const product = ref(null)
const isVisible = ref(false)

const open = (productData) => {
  product.value = productData
  isVisible.value = true
  document.body.style.overflow = 'hidden'
}

const close = () => {
  isVisible.value = false
  document.body.style.overflow = ''
}

defineExpose({ open })
</script>

<template>
  <transition name="fade">
    <div 
      v-if="isVisible"
      class="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
      @click.self="close"
    >
      <div class="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <!-- Кнопка закрытия -->
        <button 
          @click="close"
          class="absolute top-4 right-4 text-white hover:text-gray-300 z-10"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <!-- Контент -->
        <div v-if="product" class="grid md:grid-cols-2 gap-8 p-8">
          <!-- Изображение -->
          <div class="bg-gray-100 rounded-xl overflow-hidden">
            <img 
              :src="product.imageUrl" 
              :alt="product.title"
              class="w-full h-full object-cover"
            />
          </div>

          <!-- Описание -->
          <div>
            <h2 class="text-2xl font-bold mb-4">{{ product.title }}</h2>
            <div class="text-2xl font-bold text-gray-900 mb-6">{{ product.price }} руб.</div>
            
            <!-- Блок описания -->
            <div class="mb-8">
              <h3 class="text-lg font-semibold mb-2">Описание</h3>
              <p class="text-gray-700">{{ product.description || 'Описание отсутствует' }}</p>
            </div>

            <!-- Кнопки действий -->
            <div class="flex space-x-4">
              <button 
                v-if="product.onClickFavorite"
                @click="product.onClickFavorite"
                class="p-2 rounded-full border border-gray-200 hover:bg-gray-100"
              >
                <img
                  :src="product.isFavorite ? '/like-2.svg' : '/like-1.svg'"
                  alt="Like"
                  class="w-6 h-6"
                />
              </button>

              <button 
                v-if="product.onClickAdd"
                @click="product.onClickAdd"
                class="flex-1 bg-green-500 text-white py-3 px-6 rounded-lg hover:bg-green-600 transition flex items-center justify-center"
              >
                <img
                  :src="product.isAdded ? '/checked.svg' : '/plus.svg'"
                  alt="Add to cart"
                  class="w-5 h-5 mr-2"
                />
                {{ product.isAdded ? 'В корзине' : 'В корзину' }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<style>
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
</style>