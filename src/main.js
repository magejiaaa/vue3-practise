import { createApp } from 'vue'
import { createPinia } from 'pinia'
import axios from 'axios'
import VueAxios from 'vue-axios'
import App from './App.vue'
import router from './router'
import Loading from 'vue3-loading-overlay'
import 'vue3-loading-overlay/dist/vue3-loading-overlay.css'
import { currency } from './methods/filters'
// import { apply } from 'core-js/fn/reflect'


const app = createApp(App);
const pinia = createPinia();
app.config.globalProperties.$filters = {
    currency,
};
app.use(VueAxios, axios);
app.use(router);
app.component('Loading',Loading);
app.use(pinia);
app.mount('#app');

