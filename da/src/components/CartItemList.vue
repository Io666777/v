<script setup>
import { inject } from 'vue';
import CartItem from './CartItem.vue';

const cart = inject('cart'); // Без деструктуризации
</script>

<template>
  <div class="flex flex-col gap-4">
    <CartItem 
  v-for="item in cart" 
  :key="item.id" 
  :title="item.title" 
  :price="item.price" 
  :imageUrl="item.imageUrl"
/>

  </div>
</template>