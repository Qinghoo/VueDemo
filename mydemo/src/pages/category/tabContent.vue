<template>
  <div class="content">
    <div class="cateName">{{cateName}}</div>
    <ul class="list">
      <li class="item" v-for="(item,key) in cateCons" :key="key">
        <router-link :to="{name:'productDetail',params:{id:item.id}}" class="link">
          <p class="pic">
            <img v-lazy="item.cover" class="image">
          </p>
          <p class="ptitle">
            <span  class="tags">{{item.tags}}</span>
          </p>
          <p class="info">
            <span class="nowPrice">¥{{item.priceDiscountYuan}}</span>
            <span class="sellCount">{{item.likeCounts}}已收藏</span>
          </p>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
    export default {
        name:'tabContent',
        props:{
            curId:{
                type:Number
            },
            cateName:{
                type:String
            }
        },
        data() {
            return {
                cateCons:[]
            }
        },
        watch: {
            curId(id){
                this.getCateCon();
            }
        },
        created() {
            this.getCateCon();
        },
        methods: {
            getCateCon(){
                this.$axios.defaults.baseURL="http://localhost:8080"
                this.$axios.post("/api/items/searchByCat?catId="+this.curId)
                .then(res=>{
                    this.cateCons=res.data.data;
                    console.log(res.data)
                })
                .catch(err=>{
                    console.log(err)
                })
            }
        },
    }
</script>

<style scoped>
.cateName {
  color: #000;
  font: bold 14px 微软雅黑;
  padding: 10px 5px;
}
.tags {
  background-color: #f2f5f8;
  font-size: 11px;

  color: gray;
  margin-top: 5px;
  margin-left: 5px;

  padding: 5px 5px;
  height: 15px;
}
.list {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap; /*折行*/
  display: flex;
  margin: 10px 5px;
  background: #fff;
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
  height: 40px;
  line-height: 1.5;
  font-size: 12px;
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
  font-size: 16px;
}
.list .sellCount {
  font-size: 14px;
}
</style>