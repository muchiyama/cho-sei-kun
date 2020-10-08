import Vue from 'vue';
import App from './App.vue';

import BootstrapVue from 'bootstrap-vue'; // added
import axios from '@/components/wrap/AxiosWrapper';

import router from './router';
import vueBus from 'vue-bus';
import store from './store';
import './registerServiceWorker';

import 'bootstrap/dist/css/bootstrap.css'; // added
import 'bootstrap-vue/dist/bootstrap-vue.css'; // added

Vue.use(BootstrapVue);
Vue.use(vueBus);
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
