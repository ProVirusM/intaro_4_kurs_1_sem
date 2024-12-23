<template>
  <div>
    <label>Желаемая зарплата:</label>
    <input type="text" v-model="updateSalaryValue" />
  </div>
</template>

<script>
import { ref, watch, computed } from 'vue'

export default {
  props: {
    modelValue: String
  },
  setup(props, {emit}) {
    const salaryValue = ref(props.modelValue)
    const updateSalaryValue = computed({
      get: () => salaryValue.value,
      set: (value) => {
        salaryValue.value = value;
        emit('update:modelValue', salaryValue.value);
      }
    });
    watch(() => props.modelValue, (newVal) => {
      salaryValue.value = newVal
    })

    return { salaryValue, updateSalaryValue }
  }
}
</script>