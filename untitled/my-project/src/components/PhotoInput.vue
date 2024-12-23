<template>
  <div>
    <label>Фото:</label>
    <input type="url" v-model="photoValue" @input="$emit('update:modelValue', photoValue)" />
  </div>
</template>

<script>
import { ref, watch } from 'vue'

export default {
  props: {
    modelValue: String
  },
  setup(props) {
    const photoValue = ref(props.modelValue)

    watch(() => props.modelValue, (newVal) => {
      photoValue.value = newVal
    })

    return { photoValue }
  }
}
</script>