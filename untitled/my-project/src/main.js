import { createApp } from 'vue';
import App from './App.vue';
import router from './router'; // Импорт маршрутизатора
import store from './store'; // Подключаем Vuex store

createApp(App)
    .use(router) // Подключение маршрутизатора
    .use(store) // Подключаем Vuex store
    .mount('#app');
