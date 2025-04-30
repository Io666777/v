<script setup>
defineProps({
  id: Number,
  title: String,
  imageUrl: String,
  price: Number
});

defineEmits(['removeFromCart']);
</script>

<template>
  <div class="flex border border-slate-100 p-4 rounded-xl gap-3 justify-between items-center">
    <div class="flex gap-3 flex-grow">
      <img :src="imageUrl" alt="Товар" class="w-16 h-16 object-contain" />
      <div class="flex flex-col justify-between">
        <p class="font-medium">{{ title }}</p>
        <b class="mt-2">{{ price }} BYN</b>
      </div>
    </div>
    <img 
      src="/close.svg" 
      alt="Удалить" 
      class="opacity-40 hover:opacity-100 cursor-pointer transition w-10 h-10"
      @click="$emit('removeFromCart', id)"
    />
  </div>
</template>