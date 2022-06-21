import { createApp } from 'vue';
import App from '../src/views/Login';
import router from '../src/router';
import store from '../src/store';
import '../src/assets/css/base.css';

createApp(App).use(router).use(store).mount('#root');
