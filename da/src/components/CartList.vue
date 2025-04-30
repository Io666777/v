<script setup>
import ICart from './ICart.vue';

defineProps({
  items: Array
});

const emit = defineEmits(['addToFavorite', 'addToCart']);

const handleAddToFavorite = (item) => {
  emit('addToFavorite', item); // Передача события родителю
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
      :onClickFavorite="() => handleAddToFavorite(item)"
      :onClickAdd="() => emit('addToCart', item)"
    />
  </div>
</template>