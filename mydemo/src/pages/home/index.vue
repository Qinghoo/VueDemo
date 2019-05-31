<template>
  <div>
    <nav-bar>
       <i slot="left" class="iconfont icon-scan"></i>
       <div class="search-box" slot="center">
          <i class="iconfont icon-search"></i>
          <input type="text" class="search-key">
          <i class="iconfont icon-close"></i>
       </div>
       <i slot="right" class="iconfont icon-msg"></i>
    </nav-bar>

    <swiper :options="options" v-if="bool">
      <swiper-slide v-for="(item,key) in carousels" :key="key">
        <img :src="item.imageUrl">
      </swiper-slide>
      <div class="swiper-pagination" slot="pagination"></div>
    </swiper>
    <nav class="nav-hot">
      <ul class="list">
        <li class="item" v-for="(item,key) in imgs" :key="key">
          <a href="#" class="link">
            <img :src="item.imgUrl" class="pic">
            <span class="title">{{item.title}}</span>
          </a>
        </li>
      </ul>
    </nav>
    <product-new></product-new>
    <div class="container-footer">
       <tab-bar></tab-bar>
    </div>
  </div>
</template>

<script>
import TabBar from '@/components/TabBar'
import NavBar from '@/components/NavBar'
import productNew from '@/pages/home/productNew.vue'
import {swiper,swiperSlide} from 'vue-awesome-swiper'
export default {
 name:'home',
 components:{
   NavBar,
   swiper,
   swiperSlide,
   productNew,
   TabBar
 },
 data() {
   return {
     carousels:[],
     bool:false,
     options:{
       direction:"horizontal",
       loop:true,
       pagination:{
         el:".swiper-pagination"
       },
       autoplay:{
         delay:2000,
         disableOnInteraction:false
       }
     },
     imgs:[
       {
         imgUrl:require("@/assets/images/nav-item-1.png"),
         title:"美团"
       },
       {
         imgUrl:require("@/assets/images/nav-item-2.png"),
         title:"美团"
       },
       {
         imgUrl:require("@/assets/images/nav-item-3.png"),
         title:"美团"
       },
       {
         imgUrl:require("@/assets/images/nav-item-4.png"),
         title:"美团"
       },
       {
         imgUrl:require("@/assets/images/nav-item-5.png"),
         title:"美团"
       },
       {
         imgUrl:require("@/assets/images/nav-item-6.png"),
         title:"美团"
       },
       {
         imgUrl:require("@/assets/images/nav-item-7.png"),
         title:"美团"
       },
       {
         imgUrl:require("@/assets/images/nav-item-8.png"),
         title:"美团"
       },
     ]
   }
 },
 created() {
    this.getCarousels();
  },
 methods: {
            getCarousels(){
                this.$axios.defaults.baseURL="http://localhost:8080"
                this.$axios.post("/api/index/carousels")
                .then(res=>{
                    this.carousels=res.data.data;
                    this.bool=true;
                })
                .catch(err=>{
                })
            }
        },
}
</script>
<style scoped>
/* 搜索 */
.navber .iconfont{
  font-size: 22px;
  color: #fff;
}
.search-box{
  display: flex;
  background: #fff;
  border-radius: 12px;
  padding: 5px,0;
  align-items: center;
}
.search-box .iconfont{
  color: #aaa;
  font-size: 16px;
  padding: 0 6px;
}
.search-key{
  flex: 1;
}
/* 热门导航 */
.nav-hot{
  width: 100%;
  background: #fff;
  padding-top: 10px;
}
.nav-hot .list{
  display: flex;
  flex-wrap: wrap;
}
.nav-hot .item{
  width: 25%;
}
.nav-hot .link{
  display: flex;
  flex-direction: column;
  align-items: center;
}
.nav-hot .pic{
  width: 60%;
}
.nav-hot .title{
  padding: 10px 0;
}
/* 轮播图 */
.swiper-container{
  width: 100%;
  height: 200px;
}
.swiper-container img{
  width: 100%;
  height: 100%;
}
</style>