import { createApp } from 'vue'
import { createPinia } from 'pinia'
import axios from 'axios'
import VueAxios from 'vue-axios'
import App from './App.vue'
import router from './router'
import Loading from 'vue3-loading-overlay'
import 'vue3-loading-overlay/dist/vue3-loading-overlay.css'
import { currency } from './methods/filters'
import { date } from './methods/filters'
import $httpMessageState from './methods/pushMessage'
import 'bootstrap-icons/font/bootstrap-icons.css'
import {
    Form, Field, ErrorMessage, defineRule, configure
} from 'vee-validate';
import AllRules from '@vee-validate/rules';
import { localize, setLocale } from '@vee-validate/i18n';
import zhTW from '@vee-validate/i18n/dist/locale/zh_TW.json';

// 選單
import UserMenu from './components/UserNavbar.vue';

// Swiper
import { register } from 'swiper/element/bundle';
// import 'swiper/swiper-bundle.css';

Object.keys(AllRules).forEach((rule) => {
    defineRule(rule, AllRules[rule]);
});

configure({
    generateMessage: localize({ zh_TW: zhTW }), // 載入繁體中文語系
    validateOnInput: true, // 當輸入任何內容直接進行驗證
});
// 設定預設語系
setLocale('zh_TW');

const app = createApp(App);
app.config.globalProperties.$filters = {
    currency,
    date,
};

app.config.globalProperties.$httpMessageState = $httpMessageState;
app.use(VueAxios, axios);
app.use(router);
app.component('Loading', Loading);
// 掛載 Global 的 VeeValidate 元件
app.component('Field', Field);
app.component('Form', Form);
app.component('ErrorMessage', ErrorMessage);
// 選單註冊
app.component('UserMenu', UserMenu);
app.use(createPinia());
app.use(register);

app.mount('#app');

