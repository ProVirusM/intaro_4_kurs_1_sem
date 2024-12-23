
<template>
  <div class="edit-resume">
    <h2>Редактирование резюме</h2>

    <!-- Форма редактирования -->
    <form @submit.prevent="saveResume">
      <div class="container">
        <div class="form-container">

          <!-- Основные данные резюме -->
          <div class="form-group">
            <label for="name">Имя</label>
            <input type="text" v-model="resume.name" id="name" required />
          </div>

          <div class="form-group">
            <label for="profession">Профессия</label>
            <input type="text" v-model="resume.profession" id="profession" required />
          </div>

          <div class="form-group">
            <label for="birthday">Дата рождения</label>
            <input type="date" v-model="resume.birthday" id="birthday" required />
          </div>

          <div class="form-group">
            <label for="email">Email</label>
            <input type="email" v-model="resume.email" id="email" required />
          </div>

          <div class="form-group">
            <label for="phone">Телефон</label>
            <input type="tel" v-model="resume.phone" id="phone" required />
          </div>

          <div class="form-group">
            <label for="address">Город</label>
            <input type="text" v-model="resume.city" id="address" required />
          </div>

          <div class="form-group">
            <label for="status">Статус</label>
            <select v-model="resume.status" id="status">
              <option value="Новый">Новый</option>
              <option value="Назначено собеседование">Назначено собеседование</option>
              <option value="Принят">Принят</option>
              <option value="Отказ">Отказ</option>
            </select>
          </div>

          <!-- Образование -->
          <div v-for="(education, index) in resume.education" :key="index" class="education-group">
            <h3>Образование {{ index + 1 }}</h3>

            <!-- Уровень образования -->
            <div class="form-group">
              <label :for="'education-level-' + index">Уровень образования</label>
              <select v-model="education.level" :id="'education-level-' + index" required>
                <option value="Среднее">Среднее</option>
                <option value="Среднее специальное">Среднее специальное</option>
                <option value="Высшее">Неоконченное высшее</option>
                <option value="Бакалавриат">Высшее</option>

              </select>
            </div>
            <div v-if="education.level !== 'Среднее'">
            <!-- Учебное заведение -->
            <div class="form-group">
              <label :for="'education-institution-' + index">Учебное заведение</label>
              <input
                  type="text"
                  v-model="education.institution"
                  :id="'education-institution-' + index"
                  placeholder="Учебное заведение"
              />
            </div>

            <!-- Факультет -->
            <div class="form-group">
              <label :for="'education-faculty-' + index">Факультет</label>
              <input
                  type="text"
                  v-model="education.faculty"
                  :id="'education-faculty-' + index"
                  placeholder="Факультет"
              />
            </div>

            <!-- Специализация -->
            <div class="form-group">
              <label :for="'education-specialization-' + index">Специализация</label>
              <input
                  type="text"
                  v-model="education.specialization"
                  :id="'education-specialization-' + index"
                  placeholder="Специализация"
              />
            </div>

            <!-- Год выпуска -->
            <div class="form-group">
              <label :for="'education-yearOfGraduation-' + index">Год выпуска</label>
              <input
                  type="text"
                  v-model="education.yearOfGraduation"
                  :id="'education-yearOfGraduation-' + index"
                  placeholder="Год выпуска"
              />
            </div>
            </div>
            <!-- Кнопка для удаления записи образования -->
            <button type="button" @click="removeEducation(index)">Удалить</button>
            <hr />
          </div>

          <!-- Кнопка для добавления новой записи образования -->
          <button type="button" @click="addEducation">Добавить образование</button>

          <!-- Дополнительные данные -->
          <div class="form-group">
            <label for="salary">Желаемая зарплата</label>
            <input type="number" v-model="resume.salary" id="salary" placeholder="Введите желаемую зарплату" />
          </div>

          <div class="form-group">
            <label for="skills">Навыки</label>
            <textarea v-model="resume.skills" id="skills" placeholder="Перечислите навыки" rows="4"></textarea>
          </div>

          <div class="form-group">
            <label for="aboutMe">О себе</label>
            <textarea v-model="resume.about_me" id="aboutMe" placeholder="Информация о вас" rows="6"></textarea>
          </div>

          <div class="form-group">
            <label for="photo">Фото (URL)</label>
            <input type="text" v-model="resume.photo" id="photo" placeholder="Введите URL фото" />
            <div v-if="resume.photo" class="image-preview">
              <img :src="resume.photo" alt="Фото" style="max-width: 100px; margin-top: 10px;" />
            </div>
          </div>

          <!-- Кнопка для сохранения резюме -->
          <button type="submit">Сохранить</button>
          <!-- Кнопка для удаления резюме -->
          <button type="button" @click="deleteResume" class="delete-btn">Удалить резюме</button>

        </div>
      </div>
    </form>
<!--    &lt;!&ndash; Кнопка для удаления резюме &ndash;&gt;-->
<!--    <button type="button" @click="deleteResume">Удалить резюме</button>-->

  </div>

</template>

<script>
import { mapActions } from 'vuex';
import axios from 'axios';

export default {
  name: 'EditResume',
  data() {
    return {
      resume: {
        _id: '',
        name: '',
        profession: '',
        birthday: '',
        email: '',
        phone: '',
        city: [{

          label: '',
          id: '1',
        }],
        status: '',
        education: [
          {
            level: '',
            institution: '',
            faculty: '',
            specialization: '',
            yearOfGraduation: '',
            _id: ''
          }
        ],
        salary: '',
        skills: '',
        about_me: '',
        photo: '', // Здесь сохраняем URL фото
      },
    };
  },

  methods: {
    ...mapActions(['fetchResumes', 'updateResumeStatus']), // Подключаем действия Vuex

    // Загружаем резюме по id, когда компонент создан
    async loadResume() {
      await this.fetchResumes(); // Загружаем все резюме

      const resumeId = this.$route.params.id; // Получаем id из маршрута
      const resume = this.$store.state.resumes.find(res => res._id === resumeId); // Ищем резюме по id

      if (resume) {
        // Преобразуем дату в строку формата YYYY-MM-DD
        if (resume.birthday) {
          this.resume.birthday = resume.birthday.split('T')[0]; // Убираем время, оставляем только дату
        }
        this.resume = { ...resume }; // Заполняем поля формы
        console.log("Загруженные данные:", this.resume); // Проверка загруженных данных
      } else {
        console.error('Резюме не найдено');
      }
    },
    // // Метод для удаления резюме
    // async deleteResume() {
    //   try {
    //     // Запрос на удаление резюме
    //     const response = await axios.delete(`http://localhost:3000/api/cv/${this.resume._id}`);
    //
    //     if (response.status === 200) {
    //       console.log('Резюме удалено!');
    //       this.$router.push('/'); // Перенаправление на главную страницу
    //     }
    //   } catch (error) {
    //     console.error('Ошибка при удалении резюме:', error);
    //   }
    // },

    // Обрабатываем сохранение изменений
    // Обновляем резюме через PUT запрос
    async saveResume() {
      try {
        console.log("Данные для сохранения:", this.resume); // Проверка отправляемых данных

        // Отправляем PUT-запрос на сервер для обновления резюме
        const response = await axios.put(`http://localhost:3000/api/cv/${this.resume._id}`, this.resume);

        if (response.status === 200) {
          console.log('Резюме обновлено!');
          this.$router.push('/'); // После сохранения перенаправляем на главную страницу
        }
      } catch (error) {
        console.error('Ошибка при сохранении резюме:', error);
      }
    },


    // Добавляем новый блок образования
    addEducation() {
      this.resume.education.push({
        level: '',
        institution: '',
        faculty: '',
        specialization: '',
        yearOfGraduation: '',
      });
    },
    async deleteResume() {
      try {
        // Запрос на удаление резюме
        const response = await axios.delete(`http://localhost:3000/api/cv/${this.resume._id}`);

        if (response.status === 200) {
          console.log('Резюме удалено!');
          this.$router.push('/'); // Перенаправление на главную страницу
        }
      } catch (error) {
        console.error('Ошибка при удалении резюме:', error);
      }
    },
    // Удаляем блок образования по индексу
    removeEducation(index) {
      this.resume.education.splice(index, 1);
    },
  },

  async created() {
    await this.loadResume(); // Загружаем данные резюме при создании компонента
  },
};
</script>

<style scoped>
button.delete-btn {
  background-color: #e74c3c;
  margin-top: 20px;
}

button.delete-btn:hover {
  background-color: #c0392b;
}

/* Стили для формы редактирования */
.edit-resume {
  max-width: 500px;
  margin: 0 auto;
}

h2 {
  text-align: center;
}

.container {
  display: flex;
  justify-content: center; /* Центрируем форму */
  gap: 20px;
}

.form-container {
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  width: 100%; /* Делаем форму на всю ширину */
  max-width: 600px; /* Ограничиваем максимальную ширину формы */
}

h2 {
  font-size: 1.5em;
  color: #007acc;
  margin-bottom: 20px;
}

.form-group {
  margin-bottom: 15px;
}

.form-group label {
  display: block;
  font-weight: bold;
}

.form-group input,
.form-group select,
.form-group textarea {
  width: 100%;
  padding: 8px;
  margin-top: 5px;
  border-radius: 4px;
  border: 1px solid #ccc;
}

button {
  padding: 10px 20px;
  background-color: #007acc;
  color: white;
  border-radius: 5px;
  cursor: pointer;
  width: 100%;
}

button:hover {
  background-color: #005f99;
}

img {
  margin-top: 10px;
  max-width: 100px;
}
</style>
