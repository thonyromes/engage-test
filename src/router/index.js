import { createRouter, createWebHashHistory } from 'vue-router';
import Home from '../views/Home.vue';
import List from '../views/List.vue';
import Details from '../views/Details.vue'
import NotFound from '../views/NotFound.vue'

const routes = [
  {
    path: '/:id?',
    name: 'Home',
    component: Home
  },
  {
    path: '/list',
    name: 'List',
    component: List
  },
  {
    path: '/view/:id',
    name: 'Details',
    component: Details
  },
  {
    path: '/:pathMatch(.*)+',
    name: 'NotFound',
    component: NotFound
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes
});

export default router;