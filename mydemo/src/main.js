import Vue from 'vue';
import App from './App';
import router from './router';

import './assets/css/index.css';
import 'swiper/dist/css/swiper.min.css';
import axios from 'axios';
import VueLazyload from 'vue-lazyload';

import Mint from 'mint-ui';
Vue.use(Mint);
import 'mint-ui/lib/style.css'

Mint.Indicator.open('加载...');
Mint.Indicator.close();

axios.interceptors.request.use(function (req){
  Mint.Indicator.open('加载...');
  return req;
})

axios.interceptors.response.use(function(res){
  Mint.Indicator.close();
  return res;
})

Vue.use(VueLazyload, {
  loading: require("./assets/images/loading.gif")
})

Vue.config.productionTip = false;

Vue.prototype.$axios = axios;
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
