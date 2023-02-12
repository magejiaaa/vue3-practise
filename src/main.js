import { createApp } from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import App from './App.vue'
import router from './router'
import Loading from 'vue3-loading-overlay';
import 'vue3-loading-overlay/dist/vue3-loading-overlay.css';
// import { apply } from 'core-js/fn/reflect'

const app = createApp(App)
app.use(VueAxios, axios);
app.use(router);
app.component('Loading',Loading);
app.mount('#app');

