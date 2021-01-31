import Vue from 'vue';
import App from './App.vue';
import router from './router';
import 'bootstrap/dist/css/bootstrap.css';
import { BootstrapVue, BootstrapVueIcons } from 'bootstrap-vue';

Vue.use(BootstrapVue);
Vue.use(BootstrapVueIcons);
Vue.config.productionTip = false;
document.title = "QuizDraft";
document.body.style.backgroundColor = "lightGray";

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
