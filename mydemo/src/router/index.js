import Vue from 'vue'
import Router from 'vue-router'
import my from '@/pages/my'
import cart from '@/pages/cart'
import category from '@/pages/category'
import home from '@/pages/home'
import productDetail from '@/pages/productDetail'
import preOrderConfirm from '@/pages/orders/preOrderConfirm'
import login from '@/pages/user/login'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/home',
      name: 'home',
      component: home
    },
    {
      path: '/cart',
      name: 'cart',
      component: cart
    },
    {
      path: '/my',
      name: 'my',
      component: my
    },
    {
      path: '/category',
      name: 'category',
      component: category
    },
    {
      path: '/login',
      name: 'login',
      component: login
    },
    {
      path: '/productDetail/:id',
      name: 'productDetail',
      component: productDetail
    },
    {
      path: '/preOrderConfirm',
      name: 'preOrderConfirm',
      component: preOrderConfirm
    },
    {
      path: '*',
      redirect:'/home'
    },
  ]
})
