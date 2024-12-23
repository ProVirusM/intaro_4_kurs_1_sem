<template>
  <div class="homepage">
    <!-- Сообщение об ошибке -->
    <div v-if="errorMessage" class="error-message">{{ errorMessage }}</div>
    <div v-if="successMessage" class="success-message">{{ successMessage }}</div>

    <!-- Колонки для резюме -->
    <div class="columns">
      <div
          v-for="column in columns"
          :key="column.status"
          class="column"
          :data-status="column.status"
      >
        <h3>{{ column.label }} ({{ resumesByStatusMap[column.status]?.length || 0 }})</h3>

        <!-- Draggable -->
        <draggable
            v-model="resumesByStatusMap[column.status]"
            group="resumes"
            tag="div"
            @start="onDragStart"
            @end="onDragEnd"
            :animation="150"
        >
          <template #item="{ element }">
            <div
                class="resume-card"
                :data-id="element._id"
                @click="navigateToEdit(element._id)"
            >
              <img :src="element.photo || 'https://via.placeholder.com/50'" alt="Фото" />
              <p><strong>{{ element.profession || 'Не указана' }}</strong></p>
              <p>{{ element.name || 'Имя неизвестно' }}</p>
              <p>{{ getAge(element.birthday) }} лет</p>
            </div>
          </template>
        </draggable>

      </div>
    </div>
  </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex';
import draggable from 'vuedraggable';
import axios from 'axios';

export default {
  components: { draggable },
  name: "HomePage",
  data() {
    return {
      errorMessage: null,
      successMessage: null,
      columns: [
        { status: 'Новый', label: 'Новый' },
        { status: 'Назначено собеседование', label: 'Назначено собеседование' },
        { status: 'Принят', label: 'Принят' },
        { status: 'Отказ', label: 'Отказ' },
      ],
      resumesByStatusMap: {},
    };
  },

  computed: {
    ...mapGetters(['resumesByStatus']),
  },

  watch: {
    resumesByStatus: {
      handler(newVal) {
        try {
          this.resumesByStatusMap = this.groupByStatus(newVal);
        } catch (e) {
          this.errorMessage = 'Ошибка при группировке резюме!';
          console.error('Ошибка в watch:', e);
        }
      },
      immediate: true,
    },
  },

  methods: {
    ...mapActions(['fetchResumes', 'updateResumeStatus']),

    // Навигация при клике
    navigateToEdit(id) {
      try {
        if (!id) throw new Error('Некорректный идентификатор резюме');
        this.$router.push(`/edit/${id}`);
      } catch (e) {
        this.errorMessage = "Ошибка при переходе к редактированию!";
        console.error(e);
      }
    },

    // Группировка резюме
    groupByStatus(resumes) {
      const grouped = {
        'Новый': [],
        'Назначено собеседование': [],
        'Принят': [],
        'Отказ': [],
      };
      resumes.forEach(resume => {
        if (resume.status && grouped[resume.status]) {
          grouped[resume.status].push(resume);
        } else {
          console.warn(`Резюме с ID ${resume._id} имеет некорректный статус: ${resume.status}`);
        }
      });
      return grouped;
    },

    // Получение возраста
    getAge(birthday) {
      try {
        if (!birthday) return 'Дата неизвестна';
        const birthDate = new Date(birthday);
        if (isNaN(birthDate)) throw new Error('Некорректный формат даты рождения');
        const diff = Date.now() - birthDate.getTime();
        return Math.floor(diff / (1000 * 60 * 60 * 24 * 365.25));
      } catch (e) {
        console.error('Ошибка при расчёте возраста:', e);
        return 'Ошибка в возрасте';
      }
    },

    // Обработка завершения перетаскивания
    async onDragEnd(event) {
      try {
        const { to, item } = event;

        console.log("onDragEnd - to element:", to);
        console.log("onDragEnd - dataset status:", to?.dataset?.status);

        // Проверка нового статуса
        const newStatus = to?.dataset?.status || to?.parentElement?.dataset?.status;
        if (!newStatus) {
          throw new Error('Не удалось определить новый статус.');
        }

        // Проверка элемента резюме
        const draggedElement = item.__draggable_context?.element;
        if (!draggedElement || !draggedElement._id) {
          throw new Error('Некорректный элемент резюме.');
        }

        console.log(`Перетащенный элемент ID: ${draggedElement._id}, Новый статус: ${newStatus}`);

        // Проверка на изменение статуса
        if (draggedElement.status === newStatus) {
          console.warn('Статус не изменился. Операция отменена.');
          this.successMessage = "Статус не изменился.";
          return;
        }

        // Обновляем статус локально
        draggedElement.status = newStatus;

        // Отправка запроса на сервер
        await axios.put(`http://localhost:3000/api/cv/${draggedElement._id}/status/update`, {
          status: newStatus,
        });

        this.successMessage = `Статус успешно обновлён на "${newStatus}".`;
        console.log(`Статус обновлён на "${newStatus}"`);
      } catch (error) {
        console.error('onDragEnd - Ошибка:', error);
        this.errorMessage = `Ошибка при обновлении статуса: ${error.message}`;
      } finally {
        setTimeout(() => {
          this.errorMessage = null;
          this.successMessage = null;
        }, 5000);
      }
    },

    onDragStart(event) {
      console.log("Начато перетаскивание элемента:", event);
    },
  },

  async created() {
    try {
      await this.fetchResumes();
      this.successMessage = "Резюме успешно загружены!";
    } catch (error) {
      this.errorMessage = "Ошибка при загрузке резюме!";
      console.error("Ошибка при создании компонента:", error);
    }
  },
};
</script>
<style scoped>
.columns {
  display: flex;
  gap: 20px;
}
.column {
  width: 22%;
  background-color: #fff;
  padding: 10px;
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}
.error-message, .success-message {
  padding: 10px;
  margin-bottom: 20px;
  border-radius: 5px;
  text-align: center;
}
.error-message {
  background-color: #f8d7da;
  color: #721c24;
  border: 1px solid #f5c6cb;
}
.success-message {
  background-color: #d4edda;
  color: #155724;
  border: 1px solid #c3e6cb;
}
.resume-card {
  background-color: #f9f9f9;
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 5px;
  cursor: pointer;
  transition: box-shadow 0.2s ease-in-out;
}
.resume-card:hover {
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
}
.resume-card img {
  width: 50px;
  height: 50px;
  object-fit: cover;
  border-radius: 50%;
}
</style>
