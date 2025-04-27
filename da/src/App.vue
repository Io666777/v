<script setup>
// Импортируем необходимые модули и компоненты
import { onMounted, reactive, ref, watch } from 'vue';
import axios from 'axios'; // Для работы с API

import TheHeader from './components/TheHeader.vue'; // Шапка страницы
import CartList from './components/CartList.vue';   // Компонент для отображения товаров
import IDrawer from './components/IDrawer.vue';     // Боковая панель (опционально)

// Реактивное хранилище для списка товаров
const items = ref([]);

// Реактивный объект для фильтров
const filters = reactive({
  sortBy: 'title',  // Сортировка по умолчанию
  searchQuery: ''   // Поле поиска
});

// Функция для изменения сортировки
const onChangeSelect = (event) => {
  filters.sortBy = event.target.value; // Обновляем значение sortBy
};

// Функция для обновления значения поля поиска
const onChangeSelectInput = (event) => {
  filters.searchQuery = event.target.value; // Обновляем значение searchQuery
};

// Функция для получения данных с сервера
const fetchItems = async () => {
  try {
    // Подготавливаем параметры для запроса
    const params = {
      sortBy: filters.sortBy // Добавляем параметр сортировки
    };

    // Если пользователь ввел текст в поисковую строку, добавляем параметр поиска
    if (filters.searchQuery) {
      params.title = `*${filters.searchQuery}*`;
    }

    // Выполняем GET-запрос к серверу
    const { data } = await axios.get('https://db07bcdb7e4a04f7.mokky.dev/shop', { params });

    // Обновляем список товаров
    items.value = data;
  } catch (err) {
    console.error('Ошибка при получении данных:', err); // Логируем ошибку
  }
};

// Загружаем данные при монтировании компонента
onMounted(fetchItems);

// Отслеживаем изменения фильтров и вызываем fetchItems при изменении
watch(filters, fetchItems);
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
              <option value="name" class="text-gray-500">По названию</option>
            </select>

            <!-- Поле для ввода текста поиска -->
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

        <!-- Компонент отображения списка товаров -->
        <CartList :items="items" />
      </div>
    </div>
  </div>
</template>
