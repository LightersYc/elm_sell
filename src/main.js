import Vue from 'vue'
import App from './App.vue'
import router from './router'

Vue.config.productionTip = false

import Vant from 'vant';
import '@/styles/iconfont.css'
import 'vant/lib/index.css';

Vue.use(Vant);

import store from './store'

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
