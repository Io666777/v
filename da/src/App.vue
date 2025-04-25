<script setup>
import TheHeader from './components/TheHeader.vue';
import CartList from './components/CartList.vue';
import IDrawer from './components/IDrawer.vue';
</script>

<template>
  <div>
    <IDrawer/>
    <div class="bg-white w-4/5 m-auto h-screen rounded-xl shadow-xl mt-10">
      <TheHeader />
      <div class="p-10">
        <h2 class="text-3xl font-bold mb-8">Все кольца</h2>
        <CartList/>
      </div>
    </div>
  </div>
</template>