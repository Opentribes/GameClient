import Map from './components/Map.vue';
import {createRouter, createWebHistory, RouteRecordRaw} from 'vue-router';
import ServerSide from "./components/ServerSide.vue";

const routes: RouteRecordRaw[] = [
    {
        path: '/map/:locationX(\\d+)?/:locationY(\\d+)?', name: 'map', component: Map
    }, {
        path: '/:pathMatch(.*)*', name: 'ServerSide', component: ServerSide
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})


export default router;