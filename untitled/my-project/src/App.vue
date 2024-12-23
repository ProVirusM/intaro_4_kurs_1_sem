<template>
  <div id="app">
    <nav>
      <router-link to="/" class="nav-button">Главная</router-link>
      <router-link to="/add" class="nav-button">Новое резюме</router-link>
    </nav>
    <router-view></router-view>
  </div>

<!--  <div class="container">-->
<!--    <ResumeList />-->
<!--    <div class="form-container">-->
<!--      <h2>Форма резюме</h2>-->
<!--      <ProfessionInput v-model="profession" />-->
<!--      <CityInput v-model="city" />-->
<!--      <PhotoInput v-model="photo" />-->
<!--      <NameInput v-model="name" />-->
<!--      <EmailInput v-model="email" />-->
<!--      <PhoneInput v-model="phone" />-->
<!--      <BirthdayInput v-model="birthday" />-->

<!--      <StatusInput v-model="status" />-->

<!--      <div v-for="(education, index) in educationInfo" :key="education.id">-->
<!--        <EducationInput-->
<!--            :modelValue="education"-->
<!--            :educationInfo="educationInfo"-->
<!--            :index="index"-->
<!--            @remove="removeEducation"-->
<!--        />-->

<!--      </div>-->

<!--      <button @click="addEducation" class="add-education-btn">Указать еще одно место обучения</button>-->

<!--      <SalaryInput v-model="salary" />-->
<!--      <SkillsInput v-model="skills" />-->
<!--      <AboutMeInput v-model="about_me" />-->

<!--      <button @click="saveResume" class="save-btn">Сохранить резюме</button>-->
<!--    </div>-->

<!--    <div class="summary-container">-->
<!--      <h2>Резюме</h2>-->
<!--      <p>Профессия: <span>{{ profession }}</span></p>-->
<!--      <p>Город: <span>{{ city }}</span></p>-->
<!--      <p>Фото:</p>-->
<!--      <div class="image-container">-->
<!--        <img v-if="photo" :src="photo" width="200" height="100" alt="Фото" class="profile-photo" />-->
<!--      </div>-->
<!--      <p>Имя: <span>{{ name }}</span></p>-->
<!--      <p>Email: <span>{{ email }}</span></p>-->
<!--      <p>Телефон: <span>{{ phone }}</span></p>-->
<!--      <p>День Рождения: <span>{{ birthday }}</span></p>-->

<!--      <p>Образования:</p>-->
<!--      <div v-for="(education) in educationInfo" :key="education.id">-->
<!--        <div v-show="education.level !== 'Среднее'">-->
<!--          <p>Учебное заведение: <span>{{ education.institution }}</span></p>-->
<!--          <p>Факультет: <span>{{ education.faculty }}</span></p>-->
<!--          <p>Специализация: <span>{{ education.specialization }}</span></p>-->
<!--          <p>Год окончания: <span>{{ education.yearOfGraduation }}</span></p>-->
<!--        </div>-->
<!--      </div>-->

<!--      <p>Желаемая зарплата: <span>{{ salary }}</span></p>-->
<!--      <p>Ключевые навыки: <span>{{ skills }}</span></p>-->
<!--      <p>О себе: <span>{{ about_me }}</span></p>-->
<!--      <p>Статус: <span>{{ status }}</span></p>-->
<!--    </div>-->
<!--  </div>-->
</template>

<script>
// import { ref } from "vue";
// import axios from "axios";
// import ResumeList from "./components/ResumeList.vue";
// import ProfessionInput from "./components/ProfessionInput.vue";
// import CityInput from "./components/CityInput.vue";
// import PhotoInput from "./components/PhotoInput.vue";
// import NameInput from "./components/NameInput.vue";
// import EmailInput from "./components/EmailInput.vue";
// import PhoneInput from "./components/PhoneInput.vue";
// import BirthdayInput from "./components/BirthdayInput.vue";
// import SalaryInput from "./components/SalaryInput.vue";
// import SkillsInput from "./components/SkillsInput.vue";
// import AboutMeInput from "./components/AboutMeInput.vue";
// import EducationInput from "./components/EducationInput.vue";
// import StatusInput from "./components/StatusInput.vue";
//
// export default {
//   name: "App",
//   components: {
//     ResumeList,
//     ProfessionInput,
//     CityInput,
//     PhotoInput,
//     NameInput,
//     EmailInput,
//     PhoneInput,
//     BirthdayInput,
//     SalaryInput,
//     SkillsInput,
//     AboutMeInput,
//     EducationInput,
//     StatusInput,
//   },
//   setup() {
//     const profession = ref("");
//     const city = ref("");
//     const photo = ref("");
//     const name = ref("");
//     const email = ref("");
//     const phone = ref("");
//     const birthday = ref("");
//     const salary = ref("");
//     const skills = ref("");
//     const about_me = ref("");
//     const status = ref("Новый");
//     const educationInfo = ref([
//       {
//         id: Date.now(),
//         level: "Среднее",
//         institution: "",
//         faculty: "",
//         specialization: "",
//         yearOfGraduation: "",
//       },
//     ]);
//
//     const addEducation = () => {
//       educationInfo.value.push({
//         id: Date.now(),
//         level: "Среднее",
//         institution: "",
//         faculty: "",
//         specialization: "",
//         yearOfGraduation: "",
//       });
//     };
//
//     const removeEducation = (index) => {
//       educationInfo.value.splice(index, 1);
//     };
//
//     const saveResume = async () => {
//       try {
//         const resumeData = {
//           profession: profession.value,
//           city: city.value,
//           photo: photo.value,
//           name: name.value,
//           email: email.value,
//           phone: phone.value,
//           birthday: birthday.value,
//           salary: salary.value,
//           skills: skills.value,
//           about_me: about_me.value,
//           status: status.value,
//           education: educationInfo.value,
//         };
//
//         await axios.post("http://localhost:3000/api/cv", resumeData);
//         alert("Резюме успешно сохранено!");
//
//         // Сброс данных после сохранения
//         profession.value = "";
//         city.value = "";
//         photo.value = "";
//         name.value = "";
//         email.value = "";
//         phone.value = "";
//         birthday.value = "";
//         salary.value = "";
//         skills.value = "";
//         about_me.value = "";
//         status.value = "Новый";
//         educationInfo.value = [
//           {
//             id: Date.now(),
//             level: "Среднее",
//             institution: "",
//             faculty: "",
//             specialization: "",
//             yearOfGraduation: "",
//           },
//         ];
//       } catch (error) {
//         console.error("Ошибка при сохранении резюме:", error);
//       }
//     };
//
//     return {
//       profession,
//       city,
//       photo,
//       name,
//       email,
//       phone,
//       birthday,
//       salary,
//       skills,
//       about_me,
//       status,
//       educationInfo,
//       addEducation,
//       removeEducation,
//       saveResume,
//     };
//   },
// };
</script>






<style>
.nav-button {
  padding: 10px 15px;
  margin: 5px;
  background-color: #007acc;
  color: white;
  text-decoration: none;
  border-radius: 5px;
  display: inline-block;
  text-align: center;
}

.nav-button:hover {
  background-color: #005f99;
}
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: Arial, sans-serif;
  background-color: #f0f4f8;
  color: #333;
  display: flex;
  justify-content: center;
  padding-top: 50px;
}

.container {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 20px;
  width: 700px; /* Фиксированная ширина контейнера */
}

.form-container, .summary-container {
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  width: 320px; /* Фиксированная ширина для каждого блока */
  min-height: 250px; /* Минимальная высота для симметрии */
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
