<template>
  <div>
    <label>Навыки:</label>
    <input type="text" v-model="skillsValue" @input="$emit('update:modelValue', skillsValue)" />
  </div>
</template>

<script>
import { ref, watch } from 'vue'

export default {
  props: {
    modelValue: String
  },
  setup(props) {
    const skillsValue = ref(props.modelValue)

    watch(() => props.modelValue, (newVal) => {
      skillsValue.value = newVal
    })

    return { skillsValue }
  }
}
</script>