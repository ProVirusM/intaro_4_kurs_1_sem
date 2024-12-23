<template>
  <div class="education-input">
    <label for="education-level">Уровень образования:</label>
    <select v-model="selectedEducationLevel" id="education-level">
      <option value="Среднее">Среднее</option>
      <option value="Среднее специальное">Среднее специальное</option>
      <option value="Неоконченное высшее">Неоконченное высшее</option>
      <option value="Высшее">Высшее</option>
    </select>

    <div v-if="selectedEducationLevel !== 'Среднее'">
      <div class="education-fields">
        <!-- Поле Учебное заведение с использованием компонента InputUniversity -->
        <InputUniversity v-model="education.institution" :cityId="cityId" />

        <label for="faculty">Факультет:</label>
        <input v-model="education.faculty" id="faculty" type="text" placeholder="Введите факультет" />

        <label for="specialization">Специализация:</label>
        <input v-model="education.specialization" id="specialization" type="text" placeholder="Введите специализацию" />

        <label for="yearOfGraduation">Год окончания:</label>
        <input v-model="education.yearOfGraduation" id="yearOfGraduation" type="date" placeholder="Выберите год окончания" />
      </div>
    </div>

    <button v-if="canRemove" @click="removeEducation" class="remove-education-btn">×</button>
  </div>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue';
import InputUniversity from './UniversityInput.vue'; // Импортируем компонент

const props = defineProps({
  modelValue: Object,
  educationInfo: {
    type: Array,
    default: () => []
  },
  index: Number,
});

const emit = defineEmits(['update:modelValue', 'remove']);

const education = ref({ ...props.modelValue });
const selectedEducationLevel = ref(education.value.level || 'Среднее');
const canRemove = ref(props.educationInfo && props.educationInfo.length > 1);

const cityId = ref(1); // Пример ID города, можно привязывать динамически

watch(() => props.educationInfo.length, (newLength) => {
  canRemove.value = newLength > 1;
});

watch(education, () => {
  emit('update:modelValue', education.value);
}, { deep: true });

watch(selectedEducationLevel, (newLevel) => {
  education.value.level = newLevel;
});

const removeEducation = () => {
  emit('remove', props.index);
};

onMounted(() => {
  if (props.modelValue) {
    education.value = { ...props.modelValue };
    selectedEducationLevel.value = props.modelValue.level || 'Среднее';
  }
});
</script>

<style scoped>
/* Стили для основного компонента */
.remove-education-btn {
  background: transparent;
  border: none;
  color: red;
  font-size: 1.5rem;
  cursor: pointer;
}

.education-fields label {
  margin-top: 10px;
  display: block;
}
</style>
