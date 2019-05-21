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
       a. 子组件中