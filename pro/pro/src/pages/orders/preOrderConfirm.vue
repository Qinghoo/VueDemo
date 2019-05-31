<template>
  <div class="page">
    <!-- 收货地址为空的情况 -->
    <router-link to>
      <div class="empty-address">
        <img src="@/assets/icon/location.png" class="location-ico">
        <div class="write-address">请填写收货地址</div>
        <img src="@/assets/icon/arrow-left.png" class="arrow-left-ico">
      </div>
    </router-link>

    <div class="orders splitter">
      <div class="item" v-for="(item,key) in preOrderGoodList" :key="key">
        <img class="items-cover" :src="item.item.cover">
        <div class="item-title">{{item.item.name}}</div>
        <div class="price-info">
          <div class="item-old-line">
            <div class="item-old-price">￥{{item.item.priceNormalYuan}}</div>
          </div>
          <div class="item-price">￥{{item.item.priceDiscountYuan}}</div>
          <div class="item-counts">
            <div>{{item.counts}}</div>
            <div>件</div>
          </div>
        </div>
      </div>
    </div>

    <!-- 配送方式 快递运费 合计 等信息 -->
    <div class="order-info">
      <div class="info-line splitter">
        <div class="lable-words">运送方式:</div>
        <div>全国包邮</div>
      </div>
      <div class="info-line splitter">
        <div class="lable-words">快递费用:</div>
        <div>￥0.00</div>
      </div>
      <div class="info-line splitter">
        <div class="lable-words">合计:</div>
        <div>￥{{totalPrice}}</div>
      </div>
      <div class="remark-info">
        <input
          type="text"
          placeholder="订单备注"
          placeholder-class="remark-holder"
          class="remark"
        >
      </div>
    </div>
    <!-- 底部提交订单 -->
    <div class="bottom-operator">
      <div class="total-info">
        <div class="total-words">总计:</div>
        <div class="total-amount">￥{{totalPrice}}</div>
      </div>
      <div class="submit-order" @click="createOrder">提交订单</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "confirmOrder",
  data() {
    return {
      preOrderGoodList:[],
      totalPrice:0
    };
  },
  created() {
    //从本地存储中获得preOrderGoodList
    this.preOrderGoodList = JSON.parse(window.localStorage.getItem("preOrderGoodList"));
    console.log(this.preOrderGoodList);
    //合计
    this.total();
  },
  methods: {
    total(){
      var totalPrice = 0;
      for (var i=0;i<this.preOrderGoodList.length;i++){
        var itemPrice = 
          parseInt(this.preOrderGoodList[i].counts) *
          this.preOrderGoodList[i].item.priceDiscountYuan;
          totalPrice += itemPrice;
      }
      this.totalPrice = totalPrice;
    },
    createOrder(){
      var addGoodList = JSON.parse(window.localStorage.getItem("addGoodList"));
      var preOrderGoodList = this.preOrderGoodList;
      for(var i= 0; i<preOrderGoodList.length;i++){
        var itemId = preOrderGoodList[i].item.id;
        for(var i=0;i<addGoodList.length;i++){
          if(itemId == addGoodList[i].itemId){
            addGoodList.splice(i,1);
        }
        }
      }

      window.localStorage.setItem("addGoodList",JSON.stringify(addGoodList));
      return this.$router.push('/my');
    }
  }
};
</script>

<style scoped>
page {
  display: flex;
  flex-direction: column;
  background-color: #f2f5f8;
  /* 解决底部遮挡问题 */
  padding-bottom: 50px;
}

/* 收货地址为空 start */
.empty-address {
  margin-top: 5px;
  background-color: white;

  display: flex;
  flex-direction: row;
  /* 纵轴垂直居中 */
  align-items: center;

  padding-top: 15px;
  padding-left: 10px;
  padding-bottom: 15px;
}
.location-ico {
  width: 20px;
  height: 20px;
  /* margin-left: 10rpx; */
}
.write-address {
  color: gray;
  font-size: 13px;
  /* flex 子项的放大比例，撑满后，箭头就靠右了 */
  flex-grow: 1;
  margin-left: 5px;
}
.arrow-left-ico {
  width: 15px;
  height: 15px;
  margin-right: 5px;
}
/* end */

/* 收货地址存在时 start */
.full-address {
  margin-top: 5px;
  background-color: white;
  padding-top: 15px;
  padding-left: 10px;
  padding-bottom: 10px;
}
.contact-info {
  display: flex;
  flex-direction: row;
  font-size: 14px;
  margin-left: 30px;
}

.address-info {
  display: flex;
  flex-direction: row;
  font-size: 13px;
  color: gray;
  margin-top: 8px;
  line-height: 20px;
}
.address-province {
  margin-left: 10px;
}
.address-city {
  margin-left: 5px;
}
.address-district {
  margin-left: 5px;
}
.address-desc {
  flex-grow: 1;
}
/* end */

/* 订单商品 start */
.orders {
  margin-top: 20rpx;
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
}
.items-cover {
  width: 75px;
  height: 100px;
  margin-left: 5px;
  border-radius: 3px;
}
.item-title {
  font-size: 14px;
  width: 205px;
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
  border-color: #e0e0e0;
}
/* end */

/* 配送方式 快递运费 合计 等信息 start */
.order-info {
  display: flex;
  flex-direction: column;
  background-color: white;
  font-size: 14px;
}
.info-line {
  display: flex;
  flex-direction: row;
  padding: 10px;
}
.lable-words {
  flex-grow: 1;
}
.remark-info {
  padding: 10px;
}
.remark {
  background-color: #f4f4f4;
  width: 98%;
  height: 25px;
  border-radius: 3px;
  font-size: 13px;
}
.remark-holder {
  color: #c0c0c0;
  font-size: 13px;
}
/* end */

/* 底部提交订单 start */
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
.total-info {
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  padding: 18px 10px;
  width: 65%;
}
.total-words {
  color: gray;
}
.total-amount {
  color: #f60;
  font-weight: bold;
  margin-left: 5px;
}
.submit-order {
  color: white;
  background-color: #f60;
  width: 35%;
  text-align: center;
  font-size: 16px;
  line-height: 50px;
}
/* end */
</style>