<template>
  <div class="page">
    <!-- 用户未登录的时候显示 -->
    <div class="login-block" v-if="!userLogin">
      <div class="btn-login" @click="login">请登录</div>
    </div>

    <!-- 个人信息 用户已登录后显示 -->
    <div v-if="userLogin">
    <div class="userinfo" >
      <img class="avatar" src="@/assets/icon/address-person.png">
      <div class="user-words">
        <div class="nickname">{{user.username}}</div>
      </div>
      <img class="set-ico" src="@/assets/icon/logout.png" @click="logout">
    </div>

    <!-- 历史订单 -->
    <div class="order-tab">
      <div class="every-status">
        <img src="@/assets/icon/orderstatus/all-sel.png" class="order-status-ico">
        <div class="status-words" :style="{color:orderIndex == 0 ? '#f60' : '#868585'}">全 部</div>
      </div>

      <div class="every-status">
        <img src="@/assets/icon/orderstatus/wait-pay.png" class="order-status-ico">
        <div class="status-words" :style="{color:orderIndex == 1 ? '#f60' : '#868585'}">待付款</div>
      </div>

      <div class="every-status" data-order-index="2" data-order-status="20">
        <img src="@/assets/icon/orderstatus/wait-receive.png" class="order-status-ico">
        <div class="status-words" :style="{color:orderIndex == 2 ? '#f60': '#868585'}">待收货</div>
      </div>

      <div class="every-status" data-order-index="3" data-order-status="40">
        <img src="@/assets/icon/orderstatus/done.png" class="order-status-ico">
        <div class="status-words" :style="{color: orderIndex == 3 ? '#f60' : '#868585'}">已完成</div>
      </div>

      <div class="every-status" data-order-index="4" data-order-status="50">
        <img src="@/assets/icon/orderstatus/canceled.png" class="order-status-ico">
        <div class="status-words" :style="{color: orderIndex == 4 ? '#f60' : '#868585'}">已取消</div>
      </div>
    </div>

    <!-- 循环订单 -->
    <div class="orders">
      <div>
        <div class="status-div splitter">
          <div class="gray-words">交易完成</div>
        </div>
      </div>

      <div class="item splitter" v-for="(good,key) in proOrderGoodList" :key="key">
        <img class="items-cover" :src="good.item.cover">
        <div class="item-title">{{good.item.name}}</div>
        <div class="price-info">
          <div class="item-price">￥{{good.item.priceDiscountYuan}}</div>
          <div class="item-counts">
            <div>{{good.counts}}</div>
            <div>件</div>
          </div>
        </div>
      </div>

      <div class="money-div splitter">
        <div class="normal-words">
          <div class="gray-words">全国包邮</div>
          <div class="gray-words">总计:</div>
        </div>
        <div>
          <div class="money-words">￥{{totalPrice}}</div>
        </div>
      </div>

      <div class="go-pay">
        <div>
          <div class="btn-pay">确认收货</div>
        </div>
      </div>
    </div>
  </div>
  <div class="container-footer">
       <tab-bar></tab-bar>
    </div>
  </div>
</template>

<script>
import {MessageBox} from 'mint-ui'
import TabBar from "@/components/TabBar.vue";
export default {
  data() {
    return {
      userLogin: true,
      orderIndex: 0,
      proOrderGoodList:[],
      user:{},
      totalPrice:0
    };
  },
  components:{TabBar},
  created() {
    this.proOrderGoodList=JSON.parse(window.localStorage.getItem('proOrderGoodList'));
    this.user=JSON.parse( window.localStorage.getItem('user'));
    if(this.user==null){this.userLogin=false};
    this.total();
  },
  methods: {
    total(){
        this.totalPrice=0;
        for(var i=0;i<this.proOrderGoodList.length;i++){
            var price=this.proOrderGoodList[i].counts*this.proOrderGoodList[i].item.priceDiscountYuan;
            this.totalPrice+=price;
        }
    },
    login() {
      return this.$router.push("/login");
    },
    logout() {
      MessageBox.alert("已退出").then(action=>{
             this.userLogin=false;
             window.localStorage.removeItem('user');
          }) 
    }
  }
};
</script>

<style  scoped>
.page {
  height: 100%;
  display: flex;
  flex-direction: column; /* 整体竖向排列 */
  background-color:white;
}

/* 用户未登录 start */
.login-block {
  height: 100%;
  background-color: white;
  padding: 13px 0;
  display: flex;
  flex-direction: row;
  justify-content: center;
  border-bottom: 1px solid #ccc;
}
.btn-login {
  width: 70px; /* 绝对设置宽度，避免不同手机屏幕的兼容性问题 */
  color: white;
  background-color: #f60;
  font-size: 13px;
  padding: 8px 15px;
  margin-top: 10px;
  border-radius: 25px;
  text-align: center;
}
/* end */

/* 个人信息 start */
.userinfo {
  
  display: flex;
  flex-direction: row;
  background-color: white;
  padding: 11px 7px;
}
.avatar {
  width: 60px;
  height: 60px;
  margin-right: 10px;
  border-radius: 50%;
}
.user-words {
  display: flex;
  flex-direction: column;
  width: 265px;
}
.nickname {
  font-size: 20px;
  margin-top: 6px;
}
.ico-block {
  display: flex;
  flex-direction: row;
}
.vipcard-ico {
  width: 20px;
  height: 20px;
  margin-top: 5px;
}
.certified-ico {
  width: 50px;
  height: 32px;
}
.set-ico {
  width: 20px;
  height: 20px;
  margin-top: 6px;
}
/* end */

/* 历史订单切换tab */
.order-tab {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  background-color: white;
  margin-top: 10px;
  padding: 11px 8px;
}

.every-status {
  display: flex;
  flex-direction: column;
}

.order-status-ico {
  width: 20px;
  height: 20px;
  align-self: center;
}

.status-words {
  margin-top: 5px;
  font-size: 13px;
  color: #868585;
}

/* 订单信息 start */
.orders {
  margin-top: 10px;
  background-color: white;

  display: flex;
  flex-direction: column;

  padding: 10px;
}
.item {
  display: flex;
  flex-direction: row;
  margin-bottom: 10px;
  margin-top: 5px;
  padding-bottom: 10px;
}
.items-cover {
  width: 75px;
  height: 100px;
  margin-left: 5px;
  border-radius: 3px;
}
.item-title {
  font-size: 14px;
  width: 410rpx;
  margin-left: 10px;
}
.price-info {
  font-size: 13px;
}
.item-old-line {
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
}
.item-old-price {
  font-size: 12px;
  color: gray;
  text-decoration-line: line-through; /* 定义删除线 */
}
.item-price {
  margin-top: 3px;
}
.item-counts {
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  margin-top: 10px;
}
/* end */

/* 下边框横线(分割线) start */
.splitter {
  border-bottom: solid 1px;
  border-color: #e6e6e6;
}
/* end */

/* 待付款 start */
.money-block {
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  background-color: white;
  padding-right: 10px;
  /* padding-bottom: 20rpx;  */
}
.normal-words {
  display: flex;
  flex-direction: row;
  align-items: center; /* 竖向居中 */
}
.gray-words {
  margin-left: 10px;
  color: gray;
  font-size: 13px;
}
.money-words {
  font-size: 20px;
  color: #f60;
}
.go-pay {
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  padding-right: 10px;
}
.btn-pay {
  color: white;
  background-color: #f60;
  font-size: 13px;
  padding: 6px 20px;
  margin-top: 10px;
  border-radius: 25px;
}
.btn-cancel {
  color: #3a3932;
  background-color: #ffe817;
  font-size: 13px;
  padding: 6px 20px;
  margin-top: 10px;
  margin-right: 5px;
  border-radius: 25px;
}
.status-block {
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  padding: 5px;
}
/* end */
</style>