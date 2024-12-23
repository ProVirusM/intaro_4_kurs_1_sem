import { createStore } from 'vuex';
import axios from 'axios';

export default createStore({
    state: {
        resumes: [],  // Массив с резюме
    },
    mutations: {
        // Мутация для установки списка резюме
        setResumes(state, resumes) {
            state.resumes = resumes;
        },
        // Мутация для обновления статуса резюме
        // Метод обновления статуса резюме
        // Метод обновления статуса резюме
        updateResumeStatus(state, { r, newStatus }) {
            const resume = state.resumes.find(resume => resume._id === r._id);
            if (resume) {
                resume.status = newStatus;
            }
        },

        // Мутация для обновления информации о резюме
        // updateResume(state, updatedResume) {
        //     const index = state.resumes.findIndex(r => r._id === updatedResume._id);
        //     if (index !== -1) {
        //         state.resumes[index] = updatedResume;
        //     }
        // },




    },
    actions: {
        // Получаем резюме с сервера
        async fetchResumes({ commit }) {
            try {
                const { data } = await axios.get('http://localhost:3000/api/cv');
                commit('setResumes', data); // Сохраняем полученные резюме в state
            } catch (error) {
                console.error('Ошибка загрузки резюме:', error);
            }
        },

        // Получаем одно резюме по id
        // async fetchResume({ commit }, id) {
        //     try {
        //         const { data } = await axios.get(`http://localhost:3000/api/cv/${id}`);
        //         return data;
        //     } catch (error) {
        //         console.error('Ошибка получения резюме по ID:', error);
        //     }
        // },
        // Обновляем все данные резюме на сервере
        async updateResume({ commit }, updatedResume) {
            try {
                // Отправляем PUT-запрос на сервер для обновления всего резюме
                const response = await axios.put(`http://localhost:3000/api/cv/${updatedResume._id}`, updatedResume);

                if (response.status === 200) {
                    // Обновляем резюме в Vuex, если запрос успешен
                    commit('updateResume', updatedResume);
                    console.log('Резюме обновлено');
                }
            } catch (error) {
                console.error('Ошибка обновления резюме:', error);
            }
        },
        // Обновляем статус резюме на сервере и в Vuex
        // Обновляем резюме (включая статус) на сервере и в Vuex
        // Обновляем статус и остальные данные резюме на сервере и в Vuex
        async updateResumeStatus({ commit }, { r, newStatus }) {
            try {
                const response = await axios.put(`http://localhost:3000/api/cv/${r._id}/status/update`, {
                    status: newStatus,
                });
                if (response.status === 200) {
                    commit('updateResumeStatus', { r, newStatus });
                    console.log(`Статус резюме ${r._id} успешно обновлён на ${newStatus}`);
                }
            } catch (error) {
                console.error('Ошибка при обновлении статуса резюме:', error);
                throw error; // Пробрасываем ошибку дальше
            }
        },
    },
    getters: {
        // Геттер для получения всех резюме
        resumesByStatus: (state) => state.resumes,
    },
});
