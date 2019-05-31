<template>
  <div class="wrapper">
   <nav-bar>
     <i slot="left" class="iconfont icon-back"></i>
     <div slot="center">分类页</div>
     <i slot="right" class="iconfont icon-msg"></i>
   </nav-bar>
   <!-- 内容 -->
   <div class="tab-wrapper">
     <tab-title @end="getCurId">
       
     </tab-title>
     <tab-content :curId="curId" :cateName="cateName"></tab-content>
   </div>
   <div class="container-footer">
       <tab-bar></tab-bar>
    </div>
  </div>
</template>

<script>
import TabBar from '@/components/TabBar'
import NavBar from '@/components/NavBar'
import tabTitle from '@/pages/category/tabTitle'
import tabContent from '@/pages/category/tabContent'
export default {
 name:'catepory',
 components:{
   NavBar,
   tabTitle,
   tabContent,
   TabBar
 },
 data() {
   return {
     curId:0,
     cateName:'奢饰品'
   }
 },
 methods: {
   getCurId(id,cateName){
     this.curId=id;
     this.cateName=cateName;
     console.log(this.curId);
   }
 },
}
</script>
<style scoped>
.navbar{
  background:linear-gradient(#ccc, #aaa) !important;
}
.navbar .center{
  text-align: center;
  flex: 1;
}
.wrapper{
  height: 100%;
}
.tab-wrapper{
  display: flex;
}
.content{
  flex: 1;
}
</style>