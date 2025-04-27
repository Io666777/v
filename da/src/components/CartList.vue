<script setup>
// Импортируем необходимые модули и компоненты
import { inject, defineProps } from 'vue';
import ICart from './ICart.vue';

// Указываем, что компонент принимает список товаров через props
defineProps({
  items: Array
});

// Обработчик для добавления в корзину
const onClickAdd = (item) => {
  console.log(`Товар добавлен в корзину: ${item.name}`);
  // Здесь можно добавить логику для добавления в корзину
};

// Инъекция функции добавления в избранное из родительского контекста
const addToFavorite = inject('addToFavorite');

if (!addToFavorite) {
  console.error('addToFavorite не передан через provide/inject');
}

// Обработчик для добавления в избранное
const onClickFavorite = (item) => {
  if (!addToFavorite) {
    console.error('addToFavorite не найден, невозможно добавить в избранное.');
    return;
  }

  const obj = {
    ...item, // Используем текущий объект товара
    parentId: item.id // Указываем parentId как идентификатор товара
  };

  console.log(`Товар добавлен в избранное: ${item.name}`);
  addToFavorite(obj); // Передаем объект функции addToFavorite
};
</script>

<template>
  <div class="h-fit">
    <div class="grid grid-cols-4 gap-5">
      <!-- Передаем данные и обработчики в компонент ICart -->
      <ICart
        v-for="item in items"
        :key="item.id"
        :id="item.id"
        :title="item.name"
        :imageUrl="item.imageUrl"
        :price="item.price"
        :onClickAdd="() => onClickAdd(item)"
        :onClickFavorite="() => onClickFavorite(item)"
      />
    </div>
  </div>
</template>
