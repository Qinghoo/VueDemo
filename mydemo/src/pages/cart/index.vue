<template>
  <div>
    <nav-bar>
      <i class="iconfont icon-back" slot="left" @click="goBack"></i>
      <div slot="center">购物车</div>
      <div slot="right" v-if="!change" @click="del">管理</div>
      <div slot="right" v-if="change" @click="del">完成</div>
      <!-- <i class="iconfont icon-msg" slot="right"></i> -->
    </nav-bar>
    <div class="total">
      <div class="cart-no-good" :class="hasProduct?'isHidden':''">
        <div class="opps">
          <img src="@/assets/icon/pay_pop_img_loading_fail.png" alt>
        </div>
        <p class="empty-title">您的购物车中没有商品，请先去挑选心爱的商品吧！</p>
        <div class="go-shop" @click="goHome">去逛逛</div>
      </div>
      <div :class="hasProduct?'':'isHidden'">
        <div class="cart-wrap">
          <div class="cart-account">
            
            <!-- 店铺描述结束 -->
            <div class="cart-list" v-for="(good,key) in finalGoodList" :key="key">
              <span class="check-icon" @click="touchOne(good)">
                <img :src="good.isSelect?checkIcon:checkNotIcon" alt>
              </span>
              <div class="cart-right">
                <a href="#">
                  <img :src="good.item.cover">
                </a>
                <div class="cart-info">
                  <a href>{{good.item.name}}</a>
                  <div class="cart-pay">
                    <p class="pay-price">
                      ￥
                      <span>{{good.item.priceDiscountYuan}}</span>
                    </p>
                    <div class="pay-btn">
                      <span class="min-btn" @click="reduceCount(good)"></span>
                      <b>{{good.counts}}</b>
                      <span class="max-btn" @click="addCount(good)"></span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="c-footer">
          <div class="c-f-left">
            <div class="qx" @click="chooseCheckAll">
              <span class="check-icon">
                <img :src="chooseAll?checkIcon:checkNotIcon" alt>
              </span>
              <h3>全选</h3>
            </div>            
          </div>
          <div class="c-f-right" v-if="!isDel">
            <div class="totalPrice">
              <p>
              合计:
              <span>￥</span>
              <strong>{{totalPrice}}</strong>
            </p>
            </div>
            
            <div class="c-f-right"  @click="preOrderToConfirm">结算({{totalCount}})</div>
            
          </div>
          <div class="c-f-right" v-if="isDel" @click="deletes">删除</div>       
        </div>
      </div>
    </div>
    <div class="container-footer">
       <tab-bar></tab-bar>
    </div>
  </div>
</template>

<script>
import GoodsTool from '@/assets/js/GoodsTool.js'
import TabBar from "@/components/TabBar.vue";
import NavBar from "@/components/NavBar.vue";
import {MessageBox} from 'mint-ui'
export default {
  name: "cart",
  components: { TabBar, NavBar },
  data() {
    return {
      change:false,
      isDel:false,
      hasProduct: false,
      checkNotIcon: require("@/assets/icon/order_not_checked.png"),
      checkIcon: require("@/assets/icon/order_checked.png"),
      chooseAll: false,
      finalGoodList:[],
      totalPrice:0,
      totalCount:0,
      proOrderGoodList:[],
      addGoodList:[]
    };
  },
  created() {
    var addGoodList = JSON.parse(window.localStorage.getItem("addGoodList")) || [];
    this.addGoodList=addGoodList;
    if (addGoodList!=0) {
      this.hasProduct=true;
      var itemIds='';
    for (var index = 0; index < addGoodList.length; index++) {
      itemIds+=addGoodList[index].itemId+",";
    }
    this.$axios.defaults.baseURL="http://localhost:8080"
                this.$axios.post("/api/item/queryItems?itemIds="+itemIds)
                .then(res=>{
                  var isSelect=0;
                  var finalGoodList=[];
                  var finalGoodOne={};
                  for (let index = 0; index < addGoodList.length; index++) {
                    var item=res.data.data[index];
                    var itemId=item.id;              
                    var counts=GoodsTool.getCountsByItemId(addGoodList,itemId);
                    finalGoodOne=GoodsTool.finalGoodListOne(item,counts,isSelect);
                    finalGoodList.push(finalGoodOne);           
                  }
                    this.finalGoodList=finalGoodList;
                })
                .catch(err=>{
                  console.log(err);
                })
    }
    
  },
  methods: {
    deletes(){
      for(var i=0;i<this.finalGoodList.length;i++){
        console.log(this.finalGoodList);
        if(this.finalGoodList[i].isSelect==1){
          var index = GoodsTool.getKeyByItemId(this.addGoodList,this.finalGoodList[i].item.id);
          this.addGoodList.splice(index,1);
          this.finalGoodList.splice(i,1);
        }
      }
      window.localStorage.setItem('addGoodList',JSON.stringify(this.addGoodList));
      if(this.addGoodList==0){this.hasProduct=false;this.change=false};
    },
    del(){
      this.isDel=!this.isDel;
      this.change=!this.change;
    },
    reduceCount(good){
      var addGoodList=this.addGoodList;
      var finalGoodList=this.finalGoodList;
     
      var index = GoodsTool.getKeyByItemId(this.addGoodList,good.item.id);
      for(var i=0;i<finalGoodList.length;i++){      
        if(finalGoodList[i].item.id==good.item.id){
          if(finalGoodList[i].counts==1){
            addGoodList.splice(index,1);
            finalGoodList.splice(i,1);            
          }else{
          addGoodList[index].counts--;
          finalGoodList[i].counts--;                 
          }
        }
      }
      if(addGoodList==0){
        this.hasProduct=false;
      }
      this.addGoodList=addGoodList;
      this.finalGoodList=finalGoodList;
      window.localStorage.setItem("addGoodList",JSON.stringify(addGoodList));  
      /* var counts = good.counts-1;
      console.log(counts);
      var isSelect = good.isSelect;
      var finalGoodOne=GoodsTool.finalGoodListOne(good.item,counts,isSelect);
      var addGoodOne = GoodsTool.addlGoodListOne(good.item.id,counts);
      for (let index = 0; index < this.finalGoodList.length; index++) {
        if(good.item.id==this.finalGoodList[index].item.id){

          this.finalGoodList.splice(index,1,finalGoodOne);
          var index2 = GoodsTool.getKeyByItemId(this.addGoodList,good.item.id);
          this.addGoodList.splice(index2,1, addGoodOne);
          window.localStorage.setItem('addGoodList',JSON.stringify(this.addGoodList));
        }
        
      } */
      console.log(this.finalGoodList);
    
      this.total();
    },
    addCount(good){
      var addGoodList=this.addGoodList;
      var finalGoodList=this.finalGoodList;
     
      var index = GoodsTool.getKeyByItemId(this.addGoodList,good.item.id);
      for(var i=0;i<finalGoodList.length;i++){
        
        if(finalGoodList[i].item.id==good.item.id){    
            addGoodList[index].counts++;
            finalGoodList[i].counts++;
            this.addGoodList=addGoodList;
            this.finalGoodList=finalGoodList;
            window.localStorage.setItem("addGoodList",JSON.stringify(addGoodList));                   
        }
      }
      this.total();
    },
    goBack(){
      return this.$router.go(-1);
    },
    goHome(){
      return this.$router.push("/home");
    },
    //单选
    touchOne(good){
      var isSelect=good.isSelect;
      var selectCount=true;
      if (isSelect==0) {
        isSelect=1;
      }else{
        isSelect=0;
      }
      var finalGoodOne=GoodsTool.finalGoodListOne(good.item,good.counts,isSelect);
      for (let index = 0; index < this.finalGoodList.length; index++) {
        if(good.item.id==this.finalGoodList[index].item.id){
          this.finalGoodList.splice(index,1,finalGoodOne);
        }
        if(this.finalGoodList[index].isSelect==0){
          selectCount=false;
        }
      }
      this.chooseAll=selectCount;
      this.total();
    },
    //全选
    chooseCheckAll(){
      this.chooseAll=!this.chooseAll;
      var isSelect=0;
      if (this.chooseAll) {
        isSelect=1;
      }else{
        isSelect=0;
      }
      for(var i=0;i<this.finalGoodList.length;i++){
        this.finalGoodList[i].isSelect=isSelect;
      }
      this.total();
    },
    total(){
      this.totalPrice=0;
      this.totalCount=0;
      this.proOrderGoodList=[];
      var isSelect=0;
      for(var i=0;i<this.finalGoodList.length;i++){
        isSelect=this.finalGoodList[i].isSelect;
        if(isSelect==1){
          var totalCount = this.finalGoodList[i].counts;
          var totalPrice = this.finalGoodList[i].item.priceDiscountYuan*totalCount;
          this.totalPrice+=totalPrice;
          this.totalCount+=totalCount;
          var orderGoodOne=GoodsTool.finalGoodListOne(this.finalGoodList[i].item,totalCount,null);
          this.proOrderGoodList.push(orderGoodOne);
        }
      }
    },
    preOrderToConfirm(){
      if(this.totalCount<=0){
        MessageBox.alert("请选择要结算的商品")
      }else{
        var user = JSON.parse(window.localStorage.getItem("user"));
        if(user==null){
          MessageBox.alert("请先进行登录！").then(action=>{
            this.$router.push("/login");  
          })         
        }else{
        window.localStorage.setItem("proOrderGoodList",JSON.stringify(this.proOrderGoodList));
        this.$router.push("/preOrderConfirm");
        }
      }
    }
  },
};
</script>
<style scoped>
input[type="checkbox"] {
  display: none;
}
.isHidden {
  display: none;
}
.check-icon {
  display: inline-block;
  height: 40px;
  width: 40px;
}
.check-icon img {
  width: 100%;
}
.cart-no-good {
  padding-top: 10px;
  padding-bottom: 69px;
  margin-top: 0px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
.cart-no-good.isHidden {
  display: none;
}
.opps {
  height: 325px;
  width: 325px;
}
.opps img {
  width: 100%;
}
.empty-title {
  margin-top: 13px;
  font-size: 14px;
}
.go-shop {
  margin-top: 30px;
  width: 120px;
  height: 60px;
  background: #f60;
  color: #fff;
  text-align: center;
  line-height: 60px;
  border-radius: 20px;
}
.navbar {
  display: flex;
  justify-content: space-between;
  height: 40px;
  background: #f60;
  align-items: center;
  color: #fff;
}
.navbar h3 {
  font-size: 16px;
  font-weight: 700;
}
.navbar span {
  font-size: 16px;
}

/* 购物车开始 */
/* 外面大盒子 */
.cart-wrap {
  margin-top: 10px;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
}
/* 店铺描述开始 */
.cart-account {
  width: 100%;
  border-radius: 6px;
  background: #fff;
}
.cart-title,
.cart-list {
  width: 100%;
  justify-content: space-between;
  align-items: center;
  display: flex;
  padding: 0px 5px;
}
.cart-title {
  height: 40px;
  border-bottom: 2px solid #f5f5f5;
}
.cart-title .tcont {
  display: flex;
  align-items: center;
  height: 24px;
}
.cart-title a {
  color: #000;
  font-size: 16px;
}
.cart-title span {
  font-size: 14px;
}
/* 店铺描述结束 */
/* 商品描述开始 */
.cart-list {
  width: 100%;
  height: 140px;
}
.cart-list > input {
  margin-right: 20px;
}

.cart-right {
  width: 100%;
  display: flex;
  flex: 1;
  justify-content: space-between;
}
.cart-right img {
  height: 120px;
}
.cart-info {
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: space-between;
}
.cart-info a {
  font-size: 14px;
}
.cart-info .cart-pay {
  display: flex;
  height: 30px;
  padding-right: 6px;
  align-items: flex-end;
  justify-content: space-between;
}
.cart-info .pay-price {
  color: #f60;
}

.pay-btn {
  display: flex;
  width: 100px;
  height: 40px;
  align-items: center;
  text-align: center;
  cursor: pointer;
}
.pay-btn .min-btn {
  width: 40px;
  height: 40px;
  font-size: 18px;
  display: inline-block;
  background: url("~@/assets/icon/cartReduce.png") no-repeat;
  background-size: 100% 100%;
}
.pay-btn b {
  padding: 0 10px;
}
.pay-btn .max-btn {
  width: 40px;
  height: 40px;
  font-size: 18px;
  display: inline-block;
  background: url("~@/assets/icon/cartAdd.png") no-repeat;
  background-size: 100% 100%;
}

.c-footer {
  position: fixed;
  bottom: 51px;
  width: 100%;
  max-width: 640px;
  min-width: 320px;
  z-index: 999;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 50px;
  background: #fff;
}
.c-f-left {
  width: 50%;
  flex: 1;
  padding: 0px 5px;
  align-items: center;
}
.c-f-right {
  width: 50%;
  flex: 1;
  align-items: center;
}
.totalPrice{
  background: white;
  color: #000;
  height: 100%;
  align-items: center;
  line-height: 50px;
  width: 60%;
}
.qx {
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
.qx input {
  margin-right: 4px;
}
.c-f-left p {
  font-size: 14px;
  padding: 0px 3px;
  color: #000;
}
.c-f-left span,
.c-f-left strong {
  color: #f60;
}
.c-f-left strong {
  font-size: 16px;
}
.c-f-right {
  width: 30%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff;
  font-size: 14px;
  background: #f60;
}
</style>