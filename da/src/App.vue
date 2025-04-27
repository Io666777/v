<script setup>
// Импорт необходимых модулей и компонентов
import { onMounted, provide, reactive, ref, provide, watch } from 'vue';
import axios from 'axios';

import TheHeader from './components/TheHeader.vue';
import CartList from './components/CartList.vue';
import IDrawer from './components/IDrawer.vue';

// Реактивное хранилище для списка товаров
const items = ref([]);

// Реактивный объект фильтров
const filters = reactive({
  sortBy: 'title',  // Сортировка по умолчанию
  searchQuery: ''   // Поле поиска
});

// Обработчик изменения сортировки
const onChangeSelect = (event) => {
  filters.sortBy = event.target.value;
};

// Обработчик изменения поля поиска
const onChangeSelectInput = (event) => {
  filters.searchQuery = event.target.value;
};

// Функция для получения избранных товаров
const fetchFavorites = async () => {
  try {
    const { data: favorites } = await axios.get('https://db07bcdb7e4a04f7.mokky.dev/favorites');
    
    items.value = items.value.map(item => {
      const favorite = favorites.find(favorite => favorite.parentId === item.id);
      return favorite
        ? { ...item, isFavorite: true, favoriteId: favorite.id }
        : item;
    });
  } catch (err) {
    console.error('Ошибка при загрузке избранного:', err);
  }
};

const addToFavorite = asunc (item) => {
  item.isFavorite = true;
  console.log(item)
};

// Функция для получения списка товаров с учетом фильтров
const fetchItems = async () => {
  try {
    const params = {
      sortBy: filters.sortBy,
      ...(filters.searchQuery && { title: `*${filters.searchQuery}*` }) // Добавляем параметр поиска, если он указан
    };

    const { data } = await axios.get('https://db07bcdb7e4a04f7.mokky.dev/shop', { params });

    items.value = data.map(item => ({
      ...item,
      isFavorite: false,
      isAdded: false
    }));
  } catch (err) {
    console.error('Ошибка при загрузке товаров:', err);
  }
};

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

provide('addToFavorite', addToFavorite);
</script>

<template>
  <div>
    <!-- Основной контейнер -->
    <div class="bg-white w-4/5 m-auto rounded-xl border-2 border-gray-300 shadow-xl mt-10 h-fit">
      <TheHeader /> <!-- Компонент шапки -->

      <div class="p-10">
        <!-- Заголовок и фильтры -->
        <div class="flex justify-between items-center">
          <h2 class="text-3xl font-bold mb-8">Все кольца</h2>

          <div class="flex gap-4">
            <!-- Выпадающий список для сортировки -->
            <select
              @change="onChangeSelect"
              class="py-2 px-3 text-gray-500 border border-gray-300 rounded-md outline-none"
            >
              <option value="price" class="text-gray-500">По цене (дешевые)</option>
              <option value="-price" class="text-gray-500">По цене (дорогие)</option>
              <option value="title" class="text-gray-500">По названию</option>
            </select>

            <!-- Поле поиска -->
            <div class="relative">
              <img class="absolute top-3.5 left-4" src="/search.svg" />
              <input
                class="border border-gray-300 rounded-md py-2 pl-10 pr-4 outline-none focus:border-gray-400"
                type="text"
                placeholder="Поиск..."
                @input="onChangeSelectInput"
              />
            </div>
          </div>
        </div>

        <!-- Компонент списка товаров -->
        <CartList :items="items" />
      </div>
    </div>
  </div>
</template>
