import Vue from 'vue'
import App from './App.vue'
import Vuex from 'vuex'
import 'bootstrap/dist/css/bootstrap.css'
import { router } from "./router";
import vuetify from './plugins/vuetify'
import store from "./store";

Vue.use(Vuex);
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  vuetify,
  router,
  store,
}).$mount('#app') 