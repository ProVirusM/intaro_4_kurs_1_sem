<template>
  <label for="dd">Университет</label>
  <div class="dropdown mb-3" id="dd">
    <button
        class="btn btn-secondary dropdown-toggle"
        type="button"
        id="dropdownMenuButton"
        data-bs-toggle="dropdown"
        aria-expanded="false"
    >
      {{ selectedLabel }}
    </button>
    <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton">
      <!-- Поле для поиска -->
      <li class="p-2">
        <input
            type="text"
            class="form-control"
            v-model="searchQuery"
            @input="searchCities"
            placeholder="Поиск..."
        />
      </li>
      <li>
        <hr class="dropdown-divider" />
      </li>
      <!-- Список опций -->
      <li
          v-for="option in filteredOptions"
          :key="option.id"
          class="dropdown-item"
          @click="selectOption(option)"
      >
        {{ option.label }}
      </li>
      <!-- Если опций нет -->
      <li v-if="filteredOptions.length === 0" class="dropdown-item text-muted">
        Ничего не найдено
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref } from "vue";

const props = defineProps({
  cityId: 78,
  token: '95d4a79995d4a79995d4a799df96cb3f6e995d495d4a799f329b17073154c54fe52893a'
});
function getAccessToken() {
  // Временно возвращает фиксированный токен
  return '95d4a79995d4a79995d4a799df96cb3f6e995d495d4a799f329b17073154c54fe52893a';
}
const searchQuery = ref(""); // Поисковый запрос
const selectedOption = ref(null); // Выбранный элемент

// Фильтрованные опции
const filteredOptions = ref([]);

// Метка для выбранного элемента
const selectedLabel = ref("Выберите элемент");

const model = defineModel();

// Обработчик выбора элемента
const selectOption = (option) => {
  selectedLabel.value = option.label;
  model.value = option.label;
};

function searchCities(searchQuery) {
  const params = new URLSearchParams({
    v: '5.81',
    country_id: '1',
    //city_id: props.cityId,
    offset: '0',
    need_all: '0',
    count: '10',
    q: searchQuery.target.value
  });

  fetch(`/api/method/database.getUniversities?${params}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
      'Authorization': 'Bearer ' + getAccessToken()
    }
  })
      .then(response => {
        return response.json();
      })
      .then(res => {
        console.log('API response:', res); // Лог ответа
        if (res.response && res.response.items) {
          filteredOptions.value = filterCities(res.response.items);
        } else {
          console.error('Unexpected response format:', res);
          filteredOptions.value = [];
        }
      })
      .catch(error => {
        console.error('API error:', error); // Лог ошибок
        filteredOptions.value = [];
      });
}


function filterCities(cities) {
  return cities.map((city) => ({
    label: city.title,
    id: city.id
  }));
}
</script>

<style scoped>
/* Стили можно подправить для лучшего отображения */
.dropdown-item {
  cursor: pointer;
}
.dropdown-item:hover {
  background-color: #f8f9fa;
}
</style>
