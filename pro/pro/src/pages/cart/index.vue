<template>
  <div>
    <nav-bar>
      <i class="iconfont icon-back" slot="left" @click="goBack"></i>
      <div slot="center">购物车</div>
      <i class="iconfont icon-msg" slot="right"></i>
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
            <!-- 店铺描述开始 -->
            <!--<div class="cart-title">
              <div class="tcont">
                <span class="check-icon">
                  <img :src="chooseAll?checkIcon:checkNotIcon" alt>
                </span>
                <a href="#">某某xxoo店</a>
              </div>
            </div>-->
            <!-- 店铺描述结束 -->
            <div class="cart-list" v-for="(good,key) in finalGoodList" :key="key">
              <span class="check-icon" @click="touchOne(good.item,good.counts,good.isSelect)">
                <img :src="good.isSelect?checkIcon:checkNotIcon" alt>
              </span>
              <div class="cart-right">
                <a href>
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
                      <!--加减号-->
                      <span class="min-btn" @click="jian(good)"></span>
                      <b>{{good.counts}}</b>
                      <span class="max-btn" @click="add(good)"></span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="c-footer">
          <div class="c-f-left">
            <div class="qx">
              <span class="check-icon" @click="chooseCheckAll">
                <img :src="chooseAll?checkIcon:checkNotIcon" alt>
              </span>
              <h3>全选</h3>
            </div>
            <p>
              合计:
              <span>￥</span>
              <strong>{{totalPrice}}</strong>
            </p>
          </div>
          <div class="c-f-right" @click="cartToConfirm">结算({{totalCount}})</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import GoodsTool from "@/assets/js/GoodsTool.js";
import TabBar from "@/components/TabBar.vue";
import NavBar from "@/components/NavBar.vue";
export default {
  name: "cart",
  components: { TabBar, NavBar },
  data() {
    return {
      hasProduct: true,
      checkNotIcon: require("@/assets/icon/order_not_checked.png"),
      checkIcon: require("@/assets/icon/order_checked.png"),
      chooseAll: false,
      finalGoodList: [],
      totalPrice: 0,
      totalCount: 0,
      preOrderGoodList: []
      //addGoodList:[]
    };
  },
  created() {
    var addGoodList =
      JSON.parse(window.localStorage.getItem("addGoodList")) || [];
    var itemIds = "";
    for (var i = 0; i < addGoodList.length; i++) {
      itemIds += addGoodList[i].itemId + ",";
    }
    if (itemIds == "") {
      this.hasProduct = false;
      return;
    }
    this.$axios.defaults.baseURL = "http://localhost:8080";
    this.$axios.post("/api/item/queryItems?itemIds=" + itemIds).then(res => {
      var isSelect = 0;
      var finalGoodList = [];
      var finalGoodOne = {};
      for (var i = 0; i < addGoodList.length; i++) {
        var item = res.data.data[i];
        //console.log(item);
        var itemId = item.id;
        var counts = GoodsTool.getCountsByItemId(addGoodList, itemId);
        finalGoodOne = GoodsTool.finalGoodListOne(item, counts, isSelect);
        finalGoodList.push(finalGoodOne);
      }
      this.finalGoodList = finalGoodList;
      //console.log(this.finalGoodList);
    });
  },
  methods: {
    jian(good) {
      if (good.counts <= 1) {
        alert("不能再减少了哦！");
      } else {
        good.counts--;
        var addGoodList = JSON.parse(window.localStorage.addGoodList);
        for (var i = 0; i < addGoodList.length; i++) {
          if (addGoodList[i].itemId == good.item.id) {
            addGoodList[i].counts--;
          }
        }
        window.localStorage.setItem("addGoodList", JSON.stringify(addGoodList));
        console.log(this.finalGoodList);
        console.log(addGoodList);
      }
      this.total();
    },
    add(good) {
      good.counts++;
      var addGoodList = JSON.parse(window.localStorage.addGoodList);
      for (var i = 0; i < addGoodList.length; i++) {
        if (addGoodList[i].itemId == good.item.id) {
          addGoodList[i].counts++;
        }
      }
      window.localStorage.setItem("addGoodList", JSON.stringify(addGoodList));
      console.log(this.finalGoodList);
      console.log(addGoodList);
      this.total();
    },
    goHome() {
      return this.$router.push("/home");
    },
    goBack() {
      return this.$router.go(-1);
    },
    touchOne(item, counts, isSelect) {
      var bu = true;
      if (isSelect == 1) {
        isSelect = 0;
        if (this.chooseAll) {
          this.chooseAll = !this.chooseAll;
        }
      } else {
        isSelect = 1;
      }
      var finalGoodOne = GoodsTool.finalGoodListOne(item, counts, isSelect);
      for (var i = 0; i < this.finalGoodList.length; i++) {
        if (item.id == this.finalGoodList[i].item.id) {
          this.finalGoodList.splice(i, 1, finalGoodOne);
        }
        if (this.finalGoodList[i].isSelect == 0) {
          bu=false;
        }
      }
      this.chooseAll=bu;

      this.total();
    },
    chooseCheckAll() {
      //反选
      this.chooseAll = !this.chooseAll;
      var isSelect = 0;
      if (this.chooseAll) {
        isSelect = 1;
      } else {
        isSelect = 0;
      }
      var finalGoodList = this.finalGoodList;
      var newFinalGoodList = [];
      for (var i = 0; i < finalGoodList.length; i++) {
        var item = finalGoodList[i].item;
        var counts = finalGoodList[i].counts;
        var finalGoodOne = GoodsTool.finalGoodListOne(item, counts, isSelect);
        newFinalGoodList.push(finalGoodOne);
      }
      this.finalGoodList = newFinalGoodList;
      this.total();
    },
    total() {
      this.totalPrice = 0;
      this.totalCount = 0;
      for (var i = 0; i < this.finalGoodList.length; i++) {
        var isSelect = this.finalGoodList[i].isSelect;
        if (isSelect == 1) {
          var itemCounts = this.finalGoodList[i].counts;
          var itemPrice =
            this.finalGoodList[i].item.priceDiscountYuan * itemCounts;
          this.totalPrice += itemPrice;
          this.totalCount += itemCounts;

          //构建预处理订单数据对象
          var preOrderOne = GoodsTool.finalGoodListOne(
            this.finalGoodList[i].item,
            itemCounts,
            null
          );
          this.preOrderGoodList.push(preOrderOne);
        }
        //console.log(this.preOrderGoodList);
      }
    },
    cartToConfirm() {
      if (this.totalPrice <= 0) {
        alert("请至少选择一个产品去结算！");
      } else {
        window.localStorage.setItem(
          "preOrderGoodList",
          JSON.stringify(this.preOrderGoodList)
        );
        this.$router.push("/preOrderConfirm");
      }
    }
  }
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
  bottom: 0;
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
  width: 70%;
  display: flex;
  justify-content: space-between;
  padding: 0px 5px;
  align-items: center;
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