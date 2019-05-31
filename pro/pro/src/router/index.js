import Vue from 'vue'
import Router from 'vue-router'
import home from '@/pages/home'
import category from '@/pages/category'
import cart from '@/pages/cart'
import my from '@/pages/my'
import productDetail from '@/pages/productDetail'
import preOrderConfirm from '@/pages/orders/preOrderConfirm'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/preOrderConfirm',
      name: 'preOrderConfirm',
      component: preOrderConfirm
    }, 
    {
      path: '/home',
      name: 'home',
      component: home
    }, 
    {
      path: '/category',
      name: 'category',
      component: category
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
      path: '/productDetail/:id',
      name: 'productDetail',
      component: productDetail
    },
    {
      path: '*',
      redirect:'/home'
    }
  ]
})
