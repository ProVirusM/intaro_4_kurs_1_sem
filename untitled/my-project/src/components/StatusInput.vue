<template>
  <div className="status-input">
    <p>Статус:</p>
    <select v-model="status">
      <option value="Новый">Новый</option>
      <option value="Назначено собеседование">Назначено собеседование</option>
      <option value="Принят">Принят</option>
      <option value="Отказ">Отказ</option>
    </select>
  </div>
</template>

<script>
export default {
  props: {
    modelValue: {
      type: String,
      default: 'Новый', // Статус по умолчанию
    }
  },
  computed: {
    status: {
      get() {
        return this.modelValue;
      },
      set(newValue) {
        this.$emit('update:modelValue', newValue);
      }
    }
  }
}
</script>

<style scoped>
.status-input {
  margin-bottom: 15px;
}

select {
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1em;
}
</style>
