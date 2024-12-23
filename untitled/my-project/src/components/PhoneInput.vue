<template>
  <div>
    <label>Телефон:</label>
    <input type="tel" v-model="phoneValue" @input="validateInput" :class="{'input-error': error}" />
    <small v-if="error" class="error-note" >{{error}}</small>
  </div>
</template>

<script>
import { ref, watch } from 'vue'

export default {
  props: {
    modelValue: String
  },
  setup(props, {emit}) {
    const phoneValue = ref(props.modelValue)
    const error=ref(null)
    const validateInput=()=>{
      const phonePattern=/^\+7\d{10}$/
      if (!phoneValue.value) {
        error.value = "Поле 'Номер телефона' обязательно для заполнения."
      } else if (!phoneValue.value.startsWith("+7")) {
        error.value = "Номер телефона должен начинаться с +7."
      } else if (!phonePattern.test(phoneValue.value)) {
        error.value = "Введите корректный номер телефона в формате +7XXXXXXXXXX."
      } else {
        error.value = null
      }
      emit('update:modelValue', phoneValue.value)
    }
    // Обновляем значение, если оно меняется из основного компонента
    watch(() => props.modelValue, (newVal) => {
      phoneValue.value = newVal
      validateInput()
    })

    return { phoneValue, error, validateInput }
  }
}
</script>

<style scoped>
input {
  padding: 8px;
  margin-top: 4px;
  width: 100%;
  box-sizing: border-box;
}
.input-error {
  border-color: red;
}

.error-note {
  color: red;
  font-size: 0.8em;
  margin-top: 4px;
}
</style>
