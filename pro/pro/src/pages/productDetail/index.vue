<template>
  <div class="page">
    <!-- 头部导航 nabbar -->
    <nav-bar>
      <i slot="left" class="iconfont icon-back" @click="goBack"></i>
      <div slot="center">商品详情页</div>
      <i slot="right" class="iconfont icon-msg"></i>
    </nav-bar>
    <!-- 轮播图 -->
    <swiper :options="options" v-if="bool">
      <swiper-slide v-for="(item,key) in headerImages" :key="key">
        <img :src="headerImages[key]">
      </swiper-slide>
      
      <div class="swiper-pagination" slot="pagination"></div>
    </swiper>
    <!-- 商品标题 -->
    <div class="item-title">商品</div>
    <div class="info">
      <!-- 商品价格信息 -->
      <div class="price">
        <div class="item-price-low">￥{{productOne.priceDiscountYuan}}</div>
        <div class="item-price-high">￥{{productOne.priceBormalYuan}}</div>
        <div class="item-price-discount">{{productOne.discounts}}</div>
      </div>
      <!-- 销量 收藏 发货 -->
      <div class="properties">
        <div>销量{{productOne.sellCounts}}</div>
        <div>收藏{{productOne.likeCounts}}人</div>
        <div>72小时发货</div>
      </div>
    </div>

    <!-- 分割线 -->
    <div class="line-outter">
      <div class="line"></div>
    </div>

    <!-- 商品详情页标题栏（同商品列表页） -->
    <div class="item-desc-bar">
      <div class="item-desc-title">商品详情</div>
    </div>
    <!-- 商品详情的具体内容展示 -->
    <div class="item-desc-content">
      <div v-for="(item,key) in contentArr" :key="key">
        <div v-if="item.contentType==1">
          <div :class="item.cssStyle">{{item.words}}</div>
        </div>
        <dir v-if="item.contentType==2">
          <img :class="item.cssStyle" :src="item.url">
        </dir>
      </div>
    </div>

    <div class="bottom-operator">
      <div class="like-img">
        <img :src="isFull?cartfull:cartempty" class="like-ico" @click="goCart">
        <div class="like-words">购物车</div>
      </div>

      <div class="like-img">
        <i class="iconfont icon-msg like-ico"></i>
        <div class="like-words">收藏</div>
      </div>

      <!-- <div class="like-img">
        <i class="iconfont icon-cart like-ico"></i>
        <div class="like-words">取消收藏</div>
      </div>-->

      <div class="add-to-cart">
        <div class="animation-img" @click="addToCart">
          <transition name="ball" @after-enter="afterenter">
            <div class="ball" v-if="isExist" >
              <img :src="headerImages[0]" class="ball-img">
            </div>
          </transition>
          放入购物车</div>
      </div>
      <div class="buy-me">购买</div>
    </div>
  </div>
</template>

<script>
// (1)安装 (2)引入 vue-awesome-swiper 组件
import { swiper, swiperSlide } from "vue-awesome-swiper";
import NavBar from "@/components/NavBar";
// import  TabBar from '@/components/TabBar';
export default {
  name: "product",
  components: {
    swiper,
    swiperSlide,
    NavBar
    // TabBar
  },
  data() {
      return {
          isFull:false,
          cartempty:require('@/assets/icon/cart-empty.png'),
          cartfull:require('@/assets/icon/cart-full.png'),
          isExist:false,
          bool:false,
          itemId:"",
          productOne:[],
          headerImages:[],
          contentArr:[],
          options:{
              direction:"horizontal",
              loop:true,
              pagination:{
                  el:".swiper-pagination"
              },
              autoplay:{
                  deplay:2000,
                  disableOneInteraction:false
              }
          }
      };
  },
  created() {
      this.itemId=this.$route.params.id;
      this.getProductOne();
  },
  methods: {
      goCart(){
        return this.$router.push('/cart');
      },
      goBack(){
        this.$router.go(-1);
      },
      afterenter(){
          this.isExist=false;
          this.isFull=true;
           this.addToGood(this.itemId);
      },
      getProductOne(){
          this.$axios.defaults.baseURL="http://localhost:8080";
          this.$axios
            .post("/api/items/searchById?itemId="+this.itemId)
            .then(res=>{
                this.productOne=res.data.data;
                this.headerImages=JSON.parse(this.productOne.headerImages);
                this.bool=true;
                this.contentArr=JSON.parse(this.productOne.content);
           })
           .catch(err=>{
             console.log(err);
           });
      },
      addToCart(){
       
        this.isExist=true;
      },
      addToGood(itemId){
        var addGoodList = 
          JSON.parse(window.localStorage.getItem("addGoodList"))||[];
          var bool = true;
          for(var i=0;i<addGoodList.length; i++){
            var itemOne = addGoodList[i];
            if(
              itemOne !=null &&
              itemOne !=undefined &&
              itemOne.itemId == itemId
            ){
              var counts = addGoodList[i].counts+1;
              var addGoodNew = {
                itemId:itemId,
                counts:counts
              };
              addGoodList.splice(i,1);
              addGoodList.push(addGoodNew);
              bool = false;
              break;
            }
          }
          if(bool){
            var addFirst = {
              itemId:itemId,
              counts:1
            };
            addGoodList.push(addFirst);
          }
          window.localStorage.setItem("addGoodList",JSON.stringify(addGoodList));
      }
  }
};
</script>

<style scoped>
.swiper-container {
  width: 100%;
  height: 200px;
}
.swiper-container img {
  width: 100%;
  height: 100%;
}
.navbar {
  background: linear-gradient(#eee, #ccc) !important;
}

.page {
  width: 100%;
  display: flex;
  flex-direction: column;
  background-color: #f2f5f8;
}

/* 横向的封面图 start */
.scroll-item-cover {
  width: 100%;
  background-color: white;
  white-space: nowrap;
}
.items-cover {
  width: 300px;
  height: 443px;
  margin-left: 8px;
  border-radius: 3px;
}
/* end */

/* 商品标题 start */
.item-title {
  font-size: 16px;
  line-height: 20px;
  background-color: white;
  padding: 7px;
}
/* end */

/* 商品价格 start */
.info {
  height: 50px;
  background: linear-gradient(90deg, #ff7f4e, #ff3131);
}
.price {
  display: flex;
  flex-direction: row;
}
.item-price-low {
  color: #fff;
  font-size: 24px;
  line-height: 15px;
  padding: 5px;
}
.item-price-high {
  color: #fff;
  font-size: 12px;
  line-height: 15px;
  padding: 9px 5px 0rpx 5px;
  text-decoration-line: line-through; /* 定义删除线 */
  margin-left: 5px;
}
.item-price-discount {
  background-color: #e40046;
  color: white;
  font-size: 12px;
  line-height: 15px;
  padding: 0px 8px;
  border-radius: 10px;
  height: 14px;
  margin: 8px 5px 0px 10px;
}
/* end */

/* 销量 收藏 72小时发货 start */
.properties {
  display: flex;
  flex-direction: row;

  font-size: 12px;
  justify-content: space-between;
  padding: 7px 6px;
  color: #fff;
}
/* end */

/* 商品特色 start */
.features {
  display: flex;
  flex-direction: row;
  background-color: white;
  font-size: 12px;
  justify-content: space-between;
  padding: 7px 6px;
  color: #696969;
}
.feature-ico {
  width: 10px;
  height: 10px;
  margin-right: 4px;
}
.feature-item {
  margin-left: 10px;
}
/* end */

/* 商品列表的结果文字显示 start  */
.item-desc-bar {
  margin-top: 5px;
  background-color: white;
  font-size: 15px;
  line-height: 30px;
  padding: 5px 0;
  color: #ff3131;
}
.item-desc-title {
  width: 75px;
  border-bottom: solid 2px;
  border-bottom-color: #ff3131;
  margin-left: 15px;
  text-align: center;
}
/* end */

/* 商品详情内容 start */
.item-desc-content {
  background-color: #f6f6f6;
  padding: 15px 0 0 15px;
  /* 固定底部后，商品详情中的最后的50rpx内容会被遮挡 */
  padding-bottom: 50px;
  line-height: 25px;
}
.item-desc-content img {
  width: 100%;
}
/* end */

/* 底部操作栏 start */
.bottom-operator {
  background-color: white;
  height: 50px;
  /* 固定底部不可滑动 */
  position: fixed;
  bottom: 0;
  width: 100%;

  display: flex;
  flex-direction: row;
}
.like-img {
  width: 15%;
  text-align: center;
  padding-top: 7px;
}
.like-ico {
  width: 22px;
  height: 22px;
}
.like-words {
  color: #676767;
  font-size: 12px;
}
.add-to-cart {
  color: #3a3932;
  background-color: #f3a98b;
  width: 35%;
  text-align: center;
  font-size: 16px;
  line-height: 50px;
}
.buy-me {
  color: white;
  background-color: #ff3131;
  width: 35%;
  text-align: center;
  font-size: 16px;
  line-height: 50px;
}
/* end */

/* 为动画实例组件增加样式 */
.ball {
  margin-top: 10px;
  margin-left: 55px;
  height: 18px;
  width: 18px;
  border: solid 2px;
  border-color: #ff3131;
  border-radius: 15px;

  /* 背景图填满div */
  background-size: 100% 100%;
  background-repeat: no-repeat;

  /* 绝对定位 漂浮起来 */
  position: absolute;
}
.ball-img {
  width: 100%;
  height: 100%;
  border-radius: 15px;
}
.ball-enter-active {
  /*给1秒的 事件 让小球 进入的动画效果*/
  animation: bounce-in 1s;
}
.ball-leave {
  /*元素进入以后，透明度0，整个动画都是0*/
  /*元素离开默认是1，所以会闪一下，设置为0*/
  opacity: 0;
}

@keyframes bounce-in {
  0% {
    transform: rotate(0deg) translateX(0px);
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
  100% {
    transform: rotate(-180deg) translateX(148px);
    opacity: 0;
  }
}
</style>