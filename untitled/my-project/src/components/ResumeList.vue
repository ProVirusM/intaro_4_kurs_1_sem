<template>
  <div class="resume-list">
    <h2>Список резюме</h2>
    <div v-if="loading">Загрузка...</div>
    <div v-else-if="resumes.length === 0">Нет резюме для отображения</div>
    <div v-else>
      <ul>
        <li v-for="resume in resumes" :key="resume._id">
          <div>
            <h3>{{ resume.name }}</h3>
            <p>Профессия: {{ resume.profession }}</p>
            <p>Город: {{ resume.city }}</p>
            <p>Статус: {{ resume.status }}</p>
            <button @click="viewResume(resume._id)">Подробнее</button>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
// import { ref, onMounted } from "vue";
import axios from "axios";

export default {
  name: "ResumeList",
  data() {
    return {
      resumes: [],  // Массив для хранения всех резюме
      loading: true,  // Статус загрузки
    };
  },
  methods: {
    async fetchResumes() {
      try {
        const response = await axios.get("http://localhost:3000/api/cv");  // Запрос к серверу
        this.resumes = response.data;  // Записываем полученные резюме в массив
      } catch (error) {
        console.error("Ошибка при получении резюме:", error);
      } finally {
        this.loading = false;  // Завершаем загрузку
      }
    },
    viewResume(resumeId) {
      // Этот метод можно использовать для перехода на страницу с деталями резюме
      alert(`Просмотр резюме с ID: ${resumeId}`);
    }
  },
  onMounted() {
    this.fetchResumes();  // Запрос всех резюме при монтировании компонента
  }
};
</script>

<style scoped>
.resume-list {
  margin: 20px;
}

.resume-list h2 {
  font-size: 1.5em;
  color: #007acc;
  margin-bottom: 10px;
}

.resume-list ul {
  list-style-type: none;
  padding: 0;
}

.resume-list li {
  margin: 10px 0;
  padding: 10px;
  background-color: #f9f9f9;
  border-radius: 4px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.resume-list h3 {
  font-size: 1.2em;
  margin: 0;
}

.resume-list p {
  margin: 5px 0;
}

button {
  padding: 5px 10px;
  background-color: #007acc;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #005fa3;
}
</style>
