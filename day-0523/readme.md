# es基础
##创建Vue项目（主要）

1. 数组的方法

   1) arr.map(fn) ：映射
     
   2) arr.filter(fn) : 过滤,筛选

   3) arr.reduce(fn): 汇总，平均值
        let arr4 = [4,8,12,9];
        arr4.reduce((tmp,item,index)=>{
              return tmp + item
        })
        注意： tmp 初始值累加值        4  12   24
              item 当前值             8   12   9   -> 33
              index 索引值
   4) arr.forEach(fn) 


2. es6 模块化

   export 导出 / import 导入

  (1) export {a,b,run}

     import {a,b,run} from './1.js';
      import * as mod1 from './1.js';


   (2) export default {
        a:18,
        b:28,
        run(){
            console.log('跑');
        }
    }
   import mod1 from './1.js';

3. promise :用同步的写法执行异步操作,解决ajax回调地狱

   $.ajax({
       url:'1.txt',
       type:'get',
       success(res1){
           console.log(res1);
           $.ajax({
               url:'2.txt',
               type:'post',
               success(res2){
                   ...
               }
           })
       },
       error(){

       }
   })

   promise:

   let p1 = new Promise((resolve,reject)=>{
        $.ajax({
            url:'1.txt',
            type:'get',
            success(res){
              // 成功
               resolve(res);
            },
            error(e){
              //失败
               reject(e);
            }
        })
   })
   p1.then((res)=>{
       // 成功代码
        console.log(res);
   },(e)=>{
       // 失败代码
       console.log(e);
   })
     


注意：
  同步是依赖上一步骤 (例如：按顺序完成第一件事，第二件事...)
  异步不依赖上一步骤(例如:并行跑车,没有先后顺序)

# Vue 中使用 ajax 

   - vue-resource  没有promise封装 (不用)

   - axios  (用)


# node.js 中 npm 工具的使用

(1) 下载和安装

(2) 查看
   node -v
   npm -v

注意：

   环境变量配置 :目的在任何盘符下 都可以使用  node.exe 文件

(3)  npm 工具命令：

    a.安装软件(局部安装)
    npm install jquery   下载最新版本
    npm install jquery@1.12.4  下载指定版本

    npm uninstall jquery  卸载

    npm install vue
    npm install vue-router
    npm install axios

    b.初始化配置文件
     
    npm init    package.json

    npm install vue --save   将软件版本记录 package.json 中
    npm install bootstrap --save-dev  将软件版本记录 package.json 中

    注意：
       dependencies  运行依赖文件
       devDependencies 开发依赖文件 (放开发环境的软件包)

    npm  install   读取 package.json包信息

    c. 全局安装

    npm install -g vue-cli 


# Vue 项目搭建 

  (1) 安装 vue 脚手架 (vue-cli)  (只装一次)

      npm install -g  vue-cli

  (2) 初始化项目
     
      vue init webpack  项目名称

  (3) cd mydemo 进入文件夹项目

  (4) npm install  读取 package.json 依赖包 （第一初始化项目时如果选装依赖包可以省。）

  (5) 运行项目   npm run dev


注意：

   修改 下载仓库为淘宝镜像

　 npm config set registry http://registry.npm.taobao.org/
npm config set registry http://registry.npm.taobao.org/
   依赖包都放在  node_modules 里 







   