import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import { store } from "./store";
import "roboto-fontface/css/roboto/roboto-fontface.css";
import "@mdi/font/css/materialdesignicons.css";
import vuetify from "./plugins/vuetify";

Vue.config.productionTip = false;

const port = process.env.PORT || 3000;

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
