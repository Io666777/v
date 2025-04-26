<script setup>
import ICart from './ICart.vue';

defineProps({
  items: Array
})

const onClickAdd = () => {
  console.log('Товар добавлен в корзину');
  // Здесь может быть логика добавления в корзину
};

const onClickFavorite = () => {
  console.log('Товар добавлен в избранное');
  // Здесь может быть логика добавления в избранное
};
</script>

<template>
  <div class="grid grid-cols-4 gap-5">
    <ICart
       v-for="item in items"
      :key="item.id"
      :title="item.name"
      :imageUrl="item.imageUrl"
      :price="item.price"
      :isAdded="true"
      :isFavorite="true"
      :onClickAdd="onClickAdd"
      :onClickFavorite="onClickFavorite"
    />
  </div>
</template>