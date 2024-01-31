import './assets/main.css';

import { createApp } from 'vue';
import { createPinia } from 'pinia';
import VueSweetalert2 from 'vue-sweetalert2';
import '@sweetalert2/theme-dark/dark.css';
import axios from 'axios';
import VueAxios from 'vue-axios';
import Loading from 'vue3-loading-overlay';
import 'vue3-loading-overlay/dist/vue3-loading-overlay.css';

import App from './App.vue';
import router from './router';

const app = createApp(App);

// sweetAlert2
const sweetAlertOptions = {
  allowOutsideClick: false,
};
app.use(VueSweetalert2, sweetAlertOptions);
app.use(VueAxios, axios);
app.use(createPinia());
app.use(router);

app.component('LoadingOverlay', Loading);

app.mount('#app');
