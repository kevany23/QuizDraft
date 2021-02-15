import Vue from 'vue';
import App from './App.vue';
import router from './router';
import 'bootstrap/dist/css/bootstrap.css';
import { BootstrapVue, BootstrapVueIcons } from 'bootstrap-vue';
import GAuth from 'vue-google-oauth2';
import { GOOGLE_CLIENT_ID } from './config/config';

const gauthOption = {
  clientId: GOOGLE_CLIENT_ID,
  scope: 'profile email',
  prompt: 'select_account',
  fetch_basic_profile: true
}
Vue.use(GAuth, gauthOption);

Vue.use(BootstrapVue);
Vue.use(BootstrapVueIcons);
Vue.config.productionTip = false;
document.title = "QuizDraft";
document.body.style.backgroundColor = "lightGray";

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
