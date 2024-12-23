<template>
  <div>
    <label>Email:</label>
    <input type="email" v-model="emailValue" @input="validateInput" :class="{ 'input-error': error }" />
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
    const emailValue = ref(props.modelValue)
    const error=ref(null)
    const validateInput=()=>{
      const emailPattern=/^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if(!emailValue.value){
        error.value("Поле 'Email' обязательно для заполнения.")
      } else if(!emailPattern.test(emailValue.value)){
        error.value = "Email неверный"
      } else{
        error.value=null
      }
      emit('update:modelValue', emailValue.value)


    }
    // Обновляем значение, если оно меняется из основного компонента
    watch(() => props.modelValue, (newVal) => {
      emailValue.value = newVal
    })

    return { emailValue, error, validateInput }
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
