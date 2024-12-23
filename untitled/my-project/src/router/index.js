import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '../views/HomePage.vue';
import AddResumePage from '../views/AddResumePage.vue';
import EditResumePage from '../views/EditResumePage.vue';

const routes = [
    { path: '/', name: 'Home', component: HomePage },
    { path: '/add', name: 'AddResume', component: AddResumePage },
    { path: '/edit/:id', name: 'EditResume', component: EditResumePage },
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
});

export default router;
