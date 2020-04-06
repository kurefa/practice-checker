import Vue from "vue";
import './plugins/fontawesome'
import "./plugins/bootstrap-vue";
import "./plugins/vue-animated";
import App from "./App.vue";
import store from "./store";
Vue.config.productionTip = false;

new Vue({
  store,
  render: h => h(App),
}).$mount("#app");
