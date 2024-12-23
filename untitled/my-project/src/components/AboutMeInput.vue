<template>
  <div>
    <label>О себе:</label>
    <input type="text" v-model="about_meValue" @input="$emit('update:modelValue', about_meValue)" />
  </div>
</template>

<script>
import { ref, watch } from 'vue'

export default {
  props: {
    modelValue: String
  },
  setup(props) {
    const about_meValue = ref(props.modelValue)

    watch(() => props.modelValue, (newVal) => {
      about_meValue.value = newVal
    })

    return { about_meValue }
  }
}
</script>