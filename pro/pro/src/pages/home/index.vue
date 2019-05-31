<template>
  <div  >
    <nav-bar>
      <i slot="left" class="iconfont icon-scan"></i>
      <div class="search-box" slot="center">
       <i  class="iconfont icon-search"></i>
        <input type="text" class="search-key">
          <i  class="iconfont icon-close"></i>

      </div>
       <i slot="right"  class="iconfont icon-msg"></i>
    </nav-bar>
    <!--轮播图-->
      <swiper :options="options">
        <swiperSlide>
          <img src="@/assets/images/1.jpg">
        </swiperSlide>
        <swiperSlide>
          <img src="@/assets/images/2.jpg">
        </swiperSlide>
        <swiperSlide>
          <img src="@/assets/images/3.jpg">
        </swiperSlide>
        <swiperSlide>
          <img src="@/assets/images/4.jpg">
        </swiperSlide>
        <div class="swiper-pagination" slot="pagination"></div>
      </swiper>
     <!--多行导航-->
          <nav class="nav-hot">
            <ul class="list">
            <li class="item">
              <a href="#" class="link">
                <img src="@/assets/images/nav-item-1.png" class="pic">
                <span class="title">美团</span>
              </a>
            </li>
             <li class="item">
              <a href="#" class="link">
                <img src="@/assets/images/nav-item-2.png" class="pic">
                <span class="title">美团</span>
              </a>
            </li>
             <li class="item">
              <a href="#" class="link">
                <img src="@/assets/images/nav-item-3.png" class="pic">
                <span class="title">美团</span>
              </a>
            </li>
             <li class="item">
              <a href="#" class="link">
                <img src="@/assets/images/nav-item-4.png" class="pic">
                <span class="title">美团</span>
              </a>
            </li>
             <li class="item">
              <a href="#" class="link">
                <img src="@/assets/images/nav-item-5.png" class="pic">
                <span class="title">美团</span>
              </a>
            </li>
             <li class="item">
              <a href="#" class="link">
                <img src="@/assets/images/nav-item-6.png" class="pic">
                <span class="title">美团</span>
              </a>
            </li>
             <li class="item">
              <a href="#" class="link">
                <img src="@/assets/images/nav-item-7.png" class="pic">
                <span class="title">美团</span>
              </a>
            </li>
             <li class="item">
              <a href="#" class="link">
                <img src="@/assets/images/nav-item-8.png" class="pic">
                <span class="title">美团</span>
              </a>
            </li>
            </ul>
          </nav>
      <!--新产品-->
      <product-new></product-new>
      <div class="container-foot">
    <tab-bar></tab-bar>
    </div>
  </div>
</template>
  
<script>
  //新产品组件
  import productNew from '@/pages/home/productNew.vue'
  import NavBar from '@/components/NavBar.vue';
  import {swiper,swiperSlide} from 'vue-awesome-swiper';
  import  TabBar from '@/components/TabBar';
export default {
  name: 'home',
  components:{
    NavBar,
    swiper,
    swiperSlide,
    productNew,
    TabBar
  },
  data() {
    return {
      options:{
        direction:'horizontal',
        loop:true,
        pagination:{
          el:'.swiper-pagination'
        },
        autoplay:{
            delay:2000,
            disableOnInteraction:false
        }
      }
    }
  }
};

</script>

<style   scoped>
  .swiper-container{
    width:100%;
    height:200px;
  }
  .swiper-container img{
    width:100%;
    height:100%;
  }
  .navbar .iconfont{
    font-size:22px;
    color: #fff;
  }
  .search-box{
    display:flex;
    background:#fff;
    border-radius:12px;
    padding:5px 0;
    align-items:center;
  }
  
  .search-box .iconfont{
    color:#aaa;
    font-size:16px;
    padding:0,6px;
  }
  .search-key{
    flex:1;
  }
  .nav-hot{
    width:100%;
    background:#fff;
    padding-top:10px;
  }
  .nav-hot .list{
    display:flex;
    flex-wrap:wrap;
  }
  .nav-hot .item{
    width:25%
  }
  .nav-hot .link{
       
    display:flex;
    flex-direction:column;
    align-items:center;
  }
  .nav-hot .pic{
    width:60%
  }
  .nav-hot .title{
    padding:10px 0;
  }
</style>