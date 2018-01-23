import Vue from 'vue'
import Vonic from 'vonic'
import FloatBtn from './components/common/FloatBtn.vue'
import {PAGE_SIZE} from "./constant";
import api from "./api.config";
import ajax from './ajax'
import routes from "./router";


//global reg back component
Vue.component(
  "float-btn", FloatBtn,
);

//CI api
Vue.prototype.$api = api;
//global variable(page size)
Vue.prototype.$page = 10;

//CI ajax
Vue.prototype.$ajax = ajax;

// Routes

Vonic.app.setConfig(
  "routerOptions", {mode: "history"},
);

Vue.use(Vonic.app, {
  routes: routes
});
