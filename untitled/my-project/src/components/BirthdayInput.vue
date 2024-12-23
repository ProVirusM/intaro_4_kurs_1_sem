<template>
  <div>
    <label>День Рождения:</label>
    <input type="date" v-model="birthdayValue" @input="$emit('update:modelValue', birthdayValue)" />
  </div>
</template>

<script>
import { ref, watch } from 'vue'

export default {
  props: {
    modelValue: String
  },
  setup(props) {
    const birthdayValue = ref(props.modelValue)

    watch(() => props.modelValue, (newVal) => {
      birthdayValue.value = newVal
    })

    return { birthdayValue }
  }
}
</script>