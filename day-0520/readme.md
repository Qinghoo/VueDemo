# Vue.js 框架 （MVVM）

1. 什么是 Vue.js: 是一套构建用户界面的渐进式框架

2. 目标： Vue 的目标是通过尽可能简单的 API 实现响应的数据绑定和组合的视图组件 

3. 引入 Vue

  (1) script 引入

      <script src="vue.js"></script> 或
      cdn
      <script src="https://cdnjs.cloudflare.com/ajax/libs/vue/2.1.8/vue.min.js"></script> 或
  (2) ...项目搭建

  (3) vue 基本语言
   
     - 文本插值
    
     {{数据|表达式|js代码...}}

     - v- 前缀 ： 操作html属性 

     a. v-html :能解析标签
        v-text ：不能解析标签的

     b. v-bind 可以操作所有属性

        v-bind:title
        v-bind:src
        v-bind:class
        v-bind:style

        简写：
         :title
         :src
         :class
         :style

    c.  :class 和 :style区别

        写对象和数组

    d. 条件渲染
       v-if
       v-else
       v-if-else

    e. 循环列表
      
       v-for

    f. 事件

     v-on:click="js代码"
     缩写：
     @click="js代码"

    g. 
    
      事件修饰符
     .prevent 阻止默认行为
     .stop  阻止冒泡

      按键修饰符
      keyup.enter

    h.双向数据绑定

      v-model
      注意：
         使用在表单上
         双向数据绑定:
            - model数据转化view 视图(数据绑定)
            - view视图转化到model数据(事件监听)

         v-model 与 :value和 @input 等同
         

    i. 自定义 v- 前缀 (directives 了解)


(4) 计算属性 (computed)

注意：
    计算属性:实现算法的实现,computed依赖缓存
    methods方法:实现算法的实现


(5) 监听属性(watch )

注意：
   监听单个数据(str,count等)
   不能监听对象或数组数据


(6) 过滤器(filter)

  a. 局部过滤器 filters:{}
  b