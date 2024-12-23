<template>
  <label for="dd" class="form-label">Город</label>
  <div class="dropdown mb-3" id="dd" style="position: relative;">
    <button
        class="btn btn-outline-primary dropdown-toggle w-100 text-start"
        type="button"
        id="dropdownMenuButton"
        data-bs-toggle="dropdown"
        aria-expanded="false"
    >
      {{ selectedLabel }}
    </button>
    <ul class="dropdown-menu w-100" aria-labelledby="dropdownMenuButton">
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

// Объявляем событие для передачи выбранного города в родительский компонент
const emit = defineEmits(['update:modelValue']);

const searchQuery = ref(""); // Поисковый запрос
const selectedOption = ref(null); // Выбранный элемент

// Фильтрованные опции
const filteredOptions = ref([]);

// Метка для выбранного элемента
const selectedLabel = ref("Выберите элемент");

// Обработчик выбора элемента
const selectOption = (option) => {
  selectedLabel.value = option.label;
  selectedOption.value = option;
  // Отправляем выбранный город родителю
  emit('update:modelValue', option);
};

// Функция для поиска городов
const searchCities = async () => {
  const params = new URLSearchParams({
    v: '5.81',
    country_id: '1',
    region_id: '0',
    offset: '0',
    need_all: '0',
    count: '10',
    q: searchQuery.value
  });

  try {
    const response = await fetch(`/api/method/database.getCities?${params}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        'Authorization': 'Bearer 95d4a79995d4a79995d4a799df96cb3f6e995d495d4a799f329b17073154c54fe52893a'
      }
    });
    const data = await response.json();
    if (data.response && data.response.items) {
      filteredOptions.value = filterCities(data.response.items);
    }
  } catch (error) {
    console.error('Error fetching cities:', error);
  }
};

// Фильтрация полученных данных
const filterCities = (cities) => {
  return cities.map(city => ({
    label: city.title,
    id: city.id
  }));
};
</script>

<style scoped>
/* Стили для кнопки и выпадающего меню */
.dropdown-toggle {
  background-color: #ffffff;
  border-color: #cccccc;
  color: #333333;
  font-weight: 500;
}

.dropdown-toggle:focus {
  border-color: #007bff;
  box-shadow: 0 0 0 0.2rem rgba(38, 143, 255, 0.25);
}

.dropdown-menu {
  max-height: 250px;
  overflow-y: auto;
  border-radius: 5px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
}

.dropdown-item {
  cursor: pointer;
  padding: 10px;
  font-size: 14px;
}

.dropdown-item:hover {
  background-color: #f8f9fa;
  color: #007bff;
}

.dropdown-item:active {
  background-color: #007bff;
  color: white;
}

.text-muted {
  color: #6c757d !important;
}

/* Стили для поля поиска */
.form-control {
  font-size: 14px;
  padding: 0.75rem 1rem;
  border-radius: 4px;
  border: 1px solid #ccc;
}

.form-control:focus {
  border-color: #007bff;
  box-shadow: 0 0 0 0.2rem rgba(38, 143, 255, 0.25);
}

/* Дополнительные стили */
.label {
  font-size: 16px;
  font-weight: 600;
}
</style>
