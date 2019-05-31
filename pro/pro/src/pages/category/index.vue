<template>
  <div  >
    <!--头部导航-->
    <nav-bar>
      <i slot="left" class="iconfont icon-back" @click="goBack"></i>
      <div slot="center">分类页</div>
      <i slot="right" class="iconfont icon-msg"></i>
    </nav-bar>
    <div class="tab-wrapper">
      <!--tabTitle左侧-->
      <tab-title @end="getCurId"></tab-title>
      <!--tabTitle右侧-->
      <tab-content :curId="curId" :cateName="cateName"></tab-content>
    </div>
    <div class="container-foot">
    <tab-bar></tab-bar>
    </div>
  </div>
</template>

<script>
  import NavBar from "@/components/NavBar";
  import tabTitle from "@/pages/category/tabTitle";
  import tabContent from "@/pages/category/tabContent";
  import  TabBar from '@/components/TabBar';
  export default {
    name: 'category',
    components:{
      NavBar,
      tabTitle,
      tabContent,
      TabBar
    },
    data() {
      return {
        curId:0,
        cateName:"奢侈品"
      };
    },
    methods: {
      goBack(){
        this.$router.go(-1);
      },
      getCurId(id,cateName){
        this.curId=id;
        this.cateName=cateName;
        console.log(this.curId);
      }
    }
  };
</script>

<style   scoped>
  .navbar {
  background: linear-gradient(#eee, #ccc) !important;
}
.navbar .center {
  text-align: center;
}
.tab-wrapper {
  display: flex;
}
.tabTitle {
  width: 80px;
  background: #fff;
}
.content {
  flex: 1;
}
</style>