<template>
  <div>
    <label>Профессия:</label>
    <input type="text" v-model="professionValue" @input="$emit('update:modelValue', professionValue)" />
  </div>
</template>

<script>
import { ref, watch } from 'vue'

export default {
  props: {
    modelValue: String
  },
  setup(props) {
    const professionValue = ref(props.modelValue)

    watch(() => props.modelValue, (newVal) => {
      professionValue.value = newVal
    })

    return { professionValue }
  }
}
</script>