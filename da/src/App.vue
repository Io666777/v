<script setup>
// Импорт необходимых модулей и компонентов
import { computed, onMounted, provide, reactive, ref, watch } from 'vue';
import axios from 'axios';

import TheHeader from './components/TheHeader.vue';
import CartList from './components/CartList.vue';
import IDrawer from './components/IDrawer.vue'

// Реактивное хранилище для списка товаров
const items = ref([]);
const cart = ref([])

const drawerOpen = ref(true)

const closeDrawer= () =>{
  drawerOpen.value = false
}

const openDrawer= () =>{
  drawerOpen.value = true
}

// Реактивный объект фильтров
const filters = reactive({
  sortBy: 'title', // Сортировка по умолчанию
  searchQuery: ''  // Поле поиска
});


const totalPrice =computed(()=> cart.value.reduce((acc, item) =>acc + item.price, 0) )
// Обработчик изменения сортировки
const onChangeSelect = (event) => {
  filters.sortBy = event.target.value;
};

const onClickAddPlus = (item) => {
  if (!item.isAdded) {
    addToCart(item);
  } else{
    removeFromCart(item);
  }

  console.log(cart)
};

// Обработчик изменения поля поиска
const onChangeSelectInput = (event) => {
  filters.searchQuery = event.target.value;
};

// Функция для получения избранных товаров
const fetchFavorites = async () => {
  try {
    const { data: favorites } = await axios.get('https://db07bcdb7e4a04f7.mokky.dev/favorites');

    // Проблемное место: здесь требуется корректное мапирование данных
    items.value = items.value.map((item) => {
      const favorite = favorites.find((favorite) => favorite.parentId === item.id);
      return favorite
        ? { ...item, isFavorite: true, favoriteId: favorite.id }
        : { ...item, isFavorite: false };
    });
  } catch (err) {
    console.error('Ошибка при загрузке избранного:', err);
  }
};

// Функция добавления/удаления из избранного
const toggleFavorite = async (item) => {
  try {
    if (item.isFavorite) {
      // Удаляем из избранного
      await axios.delete(`https://db07bcdb7e4a04f7.mokky.dev/favorites/${item.favoriteId}`);
      item.isFavorite = false; // Убираем сердечко
      console.log(`Товар удален из избранного: ${item.title}`);
    } else {
      // Добавляем в избранное
      const obj = { parentId: item.id };
      const { data } = await axios.post('https://db07bcdb7e4a04f7.mokky.dev/favorites', obj);
      item.isFavorite = true; // Добавляем сердечко
      item.favoriteId = data.id;
      console.log(`Товар добавлен в избранное: ${item.title}`);
    }
  } catch (err) {
    console.error('Ошибка при изменении избранного:', err);
  }
};

// Функция для получения списка товаров с учетом фильтров
const fetchItems = async () => {
  try {
    const params = {
      sortBy: filters.sortBy,
      ...(filters.searchQuery && { title: `*${filters.searchQuery}*` })
    };

    const { data } = await axios.get('https://db07bcdb7e4a04f7.mokky.dev/shop', { params });

    items.value = data.map((item) => ({
      ...item,
      isFavorite: false,
      isAdded: false
    }));
  } catch (err) {
    console.error('Ошибка при загрузке товаров:', err);
  }
};

const addToCart = (item) =>{
  cart.value.push(item)
  item.isAdded = true
}

const removeFromCart = (item) =>{
  cart.value.splice(cart.value.indexOf(item), 1)
  item.siAdded = false
}

// Загружаем данные при монтировании компонента
onMounted(async () => {
  await fetchItems();
  await fetchFavorites();
});

// Отслеживаем изменения фильтров и обновляем список товаров
watch(
  () => [filters.sortBy, filters.searchQuery],
  fetchItems
);

provide('cart',{
  cart,
  closeDrawer,
  openDrawer,
  addToCart,
  removeFromCart
})
</script>

<template>
  <div>
    <IDrawer v-if="drawerOpen"/> 
    <div class="bg-white w-4/5 m-auto rounded-xl border-2 border-gray-300 shadow-xl mt-10 h-fit">
      <TheHeader :totalPrice="totalPrice" @openDrawer="openDrawer" />
      <div class="p-10">
        <div class="flex justify-between items-center">
          <h2 class="text-3xl font-bold mb-8">Все кольца</h2>

          <div class="flex gap-4">
            <!-- Сортировка -->
            <select
              @change="onChangeSelect"
              class="py-2 px-3 text-gray-500 border border-gray-300 rounded-md outline-none"
            >
              <option value="price">По цене (дешевые)</option>
              <option value="-price">По цене (дорогие)</option>
              <option value="title">По названию</option>
            </select>

            <!-- Поиск -->
            <input
              class="border border-gray-300 rounded-md py-2 pl-10 pr-4 outline-none focus:border-gray-400"
              type="text"
              placeholder="Поиск..."
              @input="onChangeSelectInput"
            />
          </div>
        </div>
        <!-- Событие addToFavorite -->
        <CartList :items="items" @addToFavorite="toggleFavorite" @addToCart="onClickAddPlus" />
      </div>
    </div>
  </div>
</template>