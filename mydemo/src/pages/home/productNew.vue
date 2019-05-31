<template>
    <div class="product-new">
        <div class="title">新产品</div>
        <ul class="list">
            <li class="item" v-for="(item,key) in productNews" :key="key">
                <router-link  :to="{name:'productDetail',params:{id:item.id}}" class="link">
                    <p class="pic">
                        <img v-lazy="item.cover" class="image">
                    </p>
                    <p class="ptitle">{{item.name}}</p>
                    <del class="originPrice">￥{{item.priceNormalYuan}}</del>
                    <p class="info">
                        <span class="nowPrice">￥{{item.priceDiscountYuan}}</span>
                        <span class="sellCount">{{item.sellCounts}}件已售</span>
                    </p>
                </router-link>
            </li>
        </ul>
    </div>
</template>

<script>
    export default {
        name:'productNew',
        data() {
            return {
                productNews:[]
            };
        },
        created() {
            this.getProductNews();
        },
        methods: {
            getProductNews(){
                this.$axios.defaults.baseURL="http://localhost:8080"
                this.$axios.post("/api/index/items/new")
                .then(res=>{
                    this.productNews=res.data.data;
                })
                .catch(err=>{

                })
            }
        },
    }
</script>

<style scoped>
.title {
  position: relative;
  text-align: center;
  padding: 10px 0;
  font-size: 18px;
}
.title:before,
.title:after {
  content: "";
  position: absolute;
  top: 50%;
  height: 1px;
  width: 40%;
  background: #ccc;
}
.title:before {
  left: 0;
}
.title:after {
  right: 0;
}
.list {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap; /*折行*/
  display: flex;
}
.list .item {
  width: 49%;
  background-color: #fff;
  box-shadow: 0 1px 1px 0 rgba(0, 0, 0, 0.12);
  margin-bottom: 8px;
}
.list .pic {
  position: relative;
  width: 100%;
  padding-top: 100%;
}
.list .pic .image {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
.list .ptitle {
  line-height: 30px;
  font-size: 14px;
  margin-bottom: 5px;
  padding: 0 5px;
}
.list .originPrice {
  display: block;
  font-size: 12px;
  margin-bottom: 5px;
  padding: 0 5px;
}

.list .info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 5px;
}
.list .nowPrice {
  color: #f00;
  font-weight: bold;
  font-size: 22px;
}
.list .sellCount {
  font-size: 14px;
}
</style>