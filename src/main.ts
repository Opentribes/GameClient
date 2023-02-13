import {createApp} from 'vue';

import App from './components/App.vue';
import router from './router';

import './../styles/style.scss';

const appContainer = document.getElementById('app');
if (appContainer instanceof HTMLElement) {
    const app = createApp(App);
    app.use(router);
    app.mount('#app');
}

