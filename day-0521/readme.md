# Vue.js

1. 组件(component)

(1) 全局组件

 a.  Vue.component('组件名称',{
       data(){
           return {
               str:'haha'
           }
       },
       template:'组件内容'
   })

b.使用
   <组件名称></组件名称>

(2) 局部组件
  a. 第一种写法了解
  b. 第二种写法(重要) :生子,挂子,用子


2. 组件传值

 (1) 父组件到子组件传值
    props:[] 数组
    props：{
        fa:{
            type:'String',
            default:'green'
        }
    } 对象

    注意：
     步骤：
        a. <child1 :fa="bg"></child1>  将父组件的变量传递
        b. 子组件 用  props 接收变量 与子组件的data变量一样使用
        c. 使用： template:'<div :class="fa">我是子组件1 {{fa}}</div>'

 (2) 子组件到父组件传值:

    步骤：
       a. 子组件中 自定义事件将变量传出 $emit('事件名称',传值) 
       b. 在父组件中 触发自定义事件并且接收传来值
    
 (3) 子组件之间传值
 
      步骤：
       a. 子组件中 自定义事件将变量传出 $emit('事件名称',传值) 
       b. 在第二子组件中 bus.$on('事件名',fn) 触发事件接收子组件传来的数据

注意： Vue 都是由组件组成


2. 生命周期：(时间轴函数)

(1)
  beforeCreate 组件创建之前
  created  组件创建后

(2) 
  beforeMount  Dom元素加载之前
  mounted   Dom元素加载后

(3)
  beforeUpdate 组件更改之前
  updated  组件更改后

(4) 
   beforeDestroy 组件销毁之前、
   destroyed  组件销毁后

(5) 

   deactivated 组件停用
   activated 组件启用

  注意：created  生命周期 实现 ajax 数据加载
        mounted   Dom元素的操作


3. 路由器(router)

 (1) 路由原理：

    a. 传统url : 多页面应用
    b. SPA :Single Pag Application 单页面应用 (vue.js  react.js 小程序) ,实现前端路由
    注意： 传统url 出现白屏 ,单页面应用不白屏但不利于seo(搜索引擎百度,goolge蜘蛛程序抓关键词)优化

 (2)定义路由步骤

   1) 引入 vue-router.js 包

      <script src="vue-router.js"></script>
      或 https://unpkg.com/vue-router/dist/vue-router.js 


   2）定义子组件(有多少路由基本就有对于的子组件)
     var user ={
         template:'<div>我是用户页面</div>'
     }
     var  product ={
         template:'<div>我是产品页面</div>'
     }

   3） 将 vue-router 添加到 Vue中  Vue.use(Vuerouter)

   4) 实例化vue-router
    var router = new VueRouter({
       // 5) 路由配置
       routes:[
          {
             path:'/user',
             component:user
          },
          {
             path:'/product'
             component:product
          }
       ]
    })


   6) 将 路由挂子 Vue中

   new Vue({
      router
   })

   7) 使用路由 

     vue-router 有两个全局子组件

     a.  <router-link to="..."></router-link> 等同于 (<a href="/user">用户界面</a>)
          注意： to 等同 href

     b. <router-view></router-view>  路由中 子组件的显示出口


 4. Tab选项卡原理：

   (1) 循环变量标题数据

   (2) 显示选中标题 添加 acitve 名称
     
       通过循环数据中 item.id 与 curId当前编号比较相等 有 acitve 
       :class="{active:item.id==curId}

   (3) 通过点击 @click="switchTab(item.id)"

       获得点击的对应当前 id
       this.curId = id
       并且 通过当前编号显示对应的内容
       this.content = this.contents[this.curId].con

    






  