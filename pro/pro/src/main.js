import Vue from 'vue';
import App from './App';
import router from './router';

import "./assets/css/index.css";
Vue.config.productionTip = false;
import "swiper/dist/css/swiper.min.css";
/* eslint-disable no-new */

import axios from 'axios';
Vue.prototype.$axios = axios;
 // 导入 vue  懒加载
 import VueLazyload from 'vue-lazyload';
 // 使用并且配置懒加载
 Vue.use(VueLazyload, {
   loading: require("./assets/images/loading.gif")
 })
 //导入mint-ui
 import Mint from 'mint-ui';
 Vue.use(Mint);
 import 'mint-ui/lib/style.css';
 //Mint.Indicator.open('加载中...');
 //Mint.Indicator.close();

 //请求拦截器
 axios.interceptors.request.use(function (req){
   Mint.Indicator.open('加载...');
   return req;
 })
 axios.interceptors.response.use(function (res) {
   Mint.Indicator.close();
   return res;
 })
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
