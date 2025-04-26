<script setup>

import { onMounted, ref } from 'vue';
import axios from 'axios';

import TheHeader from './components/TheHeader.vue';
import CartList from './components/CartList.vue';
import IDrawer from './components/IDrawer.vue';

const items = ref([])

onMounted(async() => {
  try{
    const { data } = await axios.get('https://db07bcdb7e4a04f7.mokky.dev/shop')

    items.value = data
  } catch (err) {
    console.log(err)
  }
})

</script>

<template>
  <div>
     <!-- <IDrawer/>  -->
    <div class="bg-white w-4/5 m-auto rounded-xl border-2 border-gray-300 shadow-xl mt-10 h-fit">
      <TheHeader />
      <div class="p-10">
        <div class="flex justify-between items-center">

          <h2 class="text-3xl font-bold mb-8">Все кольца</h2>

         <div class="flex gap-4">
          <select class="py-2 px-3 text-gray-500 border border-gray-300 rounded-md outline-none">
            <option class="text-gray-500">По цене(дешевые)</option>
            <option class="text-gray-500">По цене(дорогие)</option>
            <option class="text-gray-500">По названию</option>
          </select>

          <div class="relative">
            <img class="absolute left-5 top-3.5 left-4" src="/search.svg"/>
            <input class="border border-gray-300 rounded-md py-2 pl-10 pr-4 outline-none focus:border-gray-400" type="text" placeholder="Поиск..."/>
          </div>
         </div>

        </div>
        <CartList :items="items"/>
      </div>
    </div>
  </div>
</template>