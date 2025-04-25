<script setup>
import CartItem from './CartItem.vue';
</script>

<template>
  <div>
    <!-- Затемнение фона -->
    <div class="fixed top-0 left-0 h-full w-full bg-black z-10 opacity-70"></div>
    
    <!-- Основной контейнер корзины -->
    <div class="bg-white w-96 h-full fixed right-0 top-0 z-20 p-8 flex flex-col">
      <!-- Заголовок -->
      <h2 class="text-2xl font-bold mb-6">Корзина</h2>
      
      <!-- Список товаров -->
      <div class="flex-1 overflow-y-auto mb-6">
        <CartItem />
        <CartItem />
        <CartItem />
      </div>
      
      <!-- Итоговая сумма -->
      <div class="mt-auto">
        <div class="flex items-center gap-2 mb-4">
          <span class="text-gray-500">Приговор:</span>
          <div class="flex-1 border-b border-dashed border-gray-300"></div>
          <b class="text-lg">66565 BYN</b>
        </div>
        
        <!-- Кнопка оформления -->
        <button
          disabled
          class="w-full bg-lime-500 hover:bg-lime-600 text-white 
          disabled:bg-slate-400 disabled:cursor-not-allowed
          py-3 px-4 rounded-xl font-medium transition"
        >
          Оформить заказ
        </button>
      </div>
    </div>
  </div>
</template>
<!--  -->