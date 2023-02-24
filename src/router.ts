import Map from './components/Map.vue';
import WorldMap from "./components/WorldMap.vue";
import {createRouter, createWebHistory, RouteRecordRaw} from 'vue-router';
import ServerSide from "./components/ServerSide.vue";

const routes: RouteRecordRaw[] = [
    {
        path: '/map/:locationX(\\d+)?/:locationY(\\d+)?', name: 'map', component: WorldMap
    }, {
        path: '/:pathMatch(.*)*', name: 'ServerSide', component: ServerSide
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})


export default router;