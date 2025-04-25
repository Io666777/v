<script setup>
import ICart from './ICart.vue';

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
      title="Кольцо Langma-ruti"
      imageUrl="/rings/ring-1.jpg"
      :price="4950"
      :isAdded="true"
      :isFavorite="true"
      :onClickAdd="onClickAdd"
      :onClickFavorite="onClickFavorite"
    />
  </div>
</template>