<template>
  <div>
    <label>Имя:</label>
    <input type="text" v-model="nameValue" @input="validateInput" :class="{ 'input-error': error }" />
    <small v-if="error" class="error-note">{{ error }}</small> <!-- Примечание об ошибке -->
  </div>
</template>

<script>
import { ref, watch } from 'vue'

export default {
  props: {
    modelValue: String
  },
  setup(props, {emit}) {
    const nameValue = ref(props.modelValue)
    const error = ref(null)
    const validateInput = () => {
      const namePattern = /^[A-ZА-Я][a-zа-я]*$/ // Поддерживает только первую заглавную и остальные строчные буквы
      if(!nameValue.value){
        error.value="Поле 'Имя' обязательно для заполнения."
      } else if(!namePattern.test(nameValue.value)){
        error.value = "Имя должно начинаться с заглавной буквы, остальные буквы должны быть строчными и только на русском или английском."
      } else {
        error.value = null
      }

      emit('update:modelValue', nameValue.value)
    }

    watch(() => props.modelValue, (newVal) => {
      nameValue.value = newVal
      validateInput()
    })

    return { nameValue, error, validateInput }
  }
}
</script>
<style scoped>


.input-error {
  border-color: red;
}

.error-note {
  color: red;
  font-size: 0.8em;
  margin-top: 4px;
}
</style>