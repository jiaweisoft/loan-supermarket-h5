import Vue from 'vue';
import ElementUI from 'element-ui';
import InfraVueUi from 'infra-vue-ui';
import '@/utils/polyfill.js';
import 'element-ui/lib/theme-chalk/index.css';
import 'infra-vue-ui/dist/iconfont/iconfont.css';
import App from './App';
import router from './router';
import '@/css/reset.scss';
import '@/css/common.scss';
Vue.use(ElementUI);
Vue.use(InfraVueUi);
Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: {App},
  template: '<App/>',
  data: {
    Bus: new Vue()
  }
});
