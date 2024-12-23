<template>
  <div class="add-resume">
    <h1>Добавить резюме</h1>
    <ResumeForm @submit="addResume" />
  </div>
</template>

<script>
import ResumeForm from '../components/ResumeForm.vue';
import axios from 'axios';

export default {
  components: { ResumeForm },
  methods: {
    async addResume(data) {
      await axios.post('http://localhost:3000/api/cv', data);
      this.$router.push('/');
    },
  },
};
</script>
