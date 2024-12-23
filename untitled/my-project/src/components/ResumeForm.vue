<template>
  <div class="container">
    <div class="form-container">
      <h2>Форма резюме</h2>
      <!-- Поля ввода для резюме -->
      <ProfessionInput v-model="profession" />
      <CityInput v-model="city" />
      <PhotoInput v-model="photo" />
      <NameInput v-model="name" />
      <EmailInput v-model="email" />
      <PhoneInput v-model="phone" />
      <BirthdayInput v-model="birthday" />
      <StatusInput v-model="status" />

      <div v-for="education in educationInfo" :key="education.id">
        <EducationInput
            :modelValue="education"
            @update:modelValue="updateEducation($event)"
            @remove="removeEducation"
        />
      </div>

      <button @click="addEducation" class="add-education-btn">Указать еще одно место обучения</button>

      <SalaryInput v-model="salary" />
      <SkillsInput v-model="skills" />
      <AboutMeInput v-model="about_me" />

      <button @click="saveResume" class="save-btn">Сохранить резюме</button>
    </div>

    <div class="summary-container">
      <h2>Резюме</h2>
      <p>Профессия: <span>{{ profession }}</span></p>
      <p>Город: <span>{{ city }}</span></p>
      <p>Фото:</p>
      <div class="image-container">
        <img v-if="photo" :src="photo" width="200" height="100" alt="Фото" class="profile-photo" />
      </div>
      <p>Имя: <span>{{ name }}</span></p>
      <p>Email: <span>{{ email }}</span></p>
      <p>Телефон: <span>{{ phone }}</span></p>
      <p>День Рождения: <span>{{ birthday }}</span></p>

      <p>Образования:</p>
      <div v-for="education in educationInfo" :key="education.id">
        <div >
          <p ><strong>Уровень образования:</strong> {{ education.level }}</p>
          <p v-if="education.level !== 'Среднее'"><strong>Учебное заведение:</strong> {{ education.institution }}</p>
          <p v-if="education.level !== 'Среднее'"><strong>Факультет:</strong> {{ education.faculty }}</p>
          <p v-if="education.level !== 'Среднее'"><strong>Специализация:</strong> {{ education.specialization }}</p>
          <p v-if="education.level !== 'Среднее'"><strong>Год выпуска:</strong> {{ education.yearOfGraduation }}</p>
        </div>
      </div>

      <p>Желаемая зарплата: <span>{{ salary }}</span></p>
      <p>Ключевые навыки: <span>{{ skills }}</span></p>
      <p>О себе: <span>{{ about_me }}</span></p>
      <p>Статус: <span>{{ status }}</span></p>
    </div>
  </div>
</template>

<script>
// Импорт axios
import axios from 'axios';
import { ref } from "vue";
import ProfessionInput from "./ProfessionInput.vue";
import CityInput from "./CityInput.vue";
import PhotoInput from "./PhotoInput.vue";
import NameInput from "./NameInput.vue";
import EmailInput from "./EmailInput.vue";
import PhoneInput from "./PhoneInput.vue";
import BirthdayInput from "./BirthdayInput.vue";
import SalaryInput from "./SalaryInput.vue";
import SkillsInput from "./SkillsInput.vue";
import AboutMeInput from "./AboutMeInput.vue";
import EducationInput from "./EducationInput.vue";
import StatusInput from "./StatusInput.vue";

export default {
  name: "ResumeForm",
  components: {
    ProfessionInput,
    CityInput,
    PhotoInput,
    NameInput,
    EmailInput,
    PhoneInput,
    BirthdayInput,
    SalaryInput,
    SkillsInput,
    AboutMeInput,
    EducationInput,
    StatusInput,
  },
  setup() {
    const profession = ref("");
    const city = ref("");
    const photo = ref("");
    const name = ref("");
    const email = ref("");
    const phone = ref("");
    const birthday = ref("");
    const salary = ref("");
    const skills = ref("");
    const about_me = ref("");
    const status = ref("Новый");

    const educationInfo = ref([
      {
        id: Date.now(),
        level: "Среднее", // по умолчанию
        institution: "",
        faculty: "",
        specialization: "",
        yearOfGraduation: "",
      },
    ]);

    const addEducation = () => {
      educationInfo.value.push({
        id: Date.now(),
        level: "Среднее", // по умолчанию
        institution: "",
        faculty: "",
        specialization: "",
        yearOfGraduation: "",
      });
    };

    const removeEducation = (index) => {
      educationInfo.value.splice(index, 1);
    };

    // Обновить образование, когда modelValue изменяется
    const updateEducation = (updatedEducation) => {
      const index = educationInfo.value.findIndex(
          (education) => education.id === updatedEducation.id
      );
      if (index !== -1) {
        educationInfo.value[index] = updatedEducation;
      }
    };

    const saveResume = async () => {
      try {
        const resumeData = {
          profession: profession.value,
          city: city.value,
          photo: photo.value,
          name: name.value,
          email: email.value,
          phone: phone.value,
          birthday: birthday.value,
          salary: salary.value,
          skills: skills.value,
          about_me: about_me.value,
          status: status.value,
          education: educationInfo.value,
        };

        await axios.post("http://localhost:3000/api/cv", resumeData);
        alert("Резюме успешно сохранено!");
        resetForm();
      } catch (error) {
        console.error("Ошибка при сохранении резюме:", error);
      }
    };

    const resetForm = () => {
      profession.value = "";
      city.value = "";
      photo.value = "";
      name.value = "";
      email.value = "";
      phone.value = "";
      birthday.value = "";
      salary.value = "";
      skills.value = "";
      about_me.value = "";
      status.value = "Новый";
      educationInfo.value = [
        {
          id: Date.now(),
          level: "Среднее",
          institution: "",
          faculty: "",
          specialization: "",
          yearOfGraduation: "",
        },
      ];
    };

    return {
      profession,
      city,
      photo,
      name,
      email,
      phone,
      birthday,
      salary,
      skills,
      about_me,
      status,
      educationInfo,
      addEducation,
      removeEducation,
      saveResume,
      updateEducation,
    };
  },
};
</script>

<style>
/* Стиль для компонента */
.container {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 20px;
  width: 700px;
}

.form-container, .summary-container {
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  width: 320px;
  min-height: 250px;
}

h2 {
  font-size: 1.5em;
  color: #007acc;
  margin-bottom: 20px;
}

.form-container > * {
  margin-bottom: 15px;
}

input {
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1em;
}

input:focus {
  border-color: #007acc;
  outline: none;
}

.summary-container > p {
  display: flex;
  align-items: center;
  font-size: 1em;
  padding: 5px 0;
}

.summary-container > p span {
  margin-left: 10px;
  font-weight: bold;
  color: #333;
}
</style>
