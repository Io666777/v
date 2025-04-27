<script setup>
import { inject } from 'vue';
import ICart from './ICart.vue';

defineProps({
  items: Array
});

// Получаем функцию toggleFavorite через inject
const toggleFavorite = inject('toggleFavorite');

if (!toggleFavorite) {
  console.error('Ошибка: toggleFavorite не предоставлена через provide/inject.');
}

// Обработчик для добавления/удаления из избранного
const onClickFavorite = (item) => {
  toggleFavorite(item);
};
</script>

<template>
  <div class="grid grid-cols-4 gap-5">
    <ICart
      v-for="item in items"
      :key="item.id"
      :id="item.id"
      :title="item.name"
      :imageUrl="item.imageUrl"
      :price="item.price"
      :isFavorite="item.isFavorite"
      :isAdded="item.isAdded"
      :onClickFavorite="() => onClickFavorite(item)"
    />
  </div>
</template>
