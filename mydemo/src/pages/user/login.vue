<template>
    <div class="login">
        <nav-bar>
            <i slot="left" class="iconfont icon-back" @click="back"></i>
        </nav-bar>
        <div class="title">登录</div>
        <div class="logins">
            <input type="text" v-model="username" placeholder="请输入11位手机号"><br>
            <input type="text" v-model="password" placeholder="请输入6位验证码"><br>
            <button @click="login" class="submit">登录(格式正确将自动注册)</button>
        </div>
        <div class="image">
            <img src="@/assets/logintype/alipay.png">
            <img src="@/assets/logintype/blog.png">
            <img src="@/assets/logintype/logo.png">
            <img src="@/assets/logintype/qq.png">
            <img src="@/assets/logintype/wechat.png">
        </div>
    </div>
</template>

<script>
    import { Toast } from 'mint-ui';
    import NavBar from "@/components/NavBar.vue";
    export default {
        components:{
            NavBar
        },
        data() {
            return {
                username:'',
                password:'',
            }
        },
        methods: {
            login(){
                
                    if(this.username.length==11&&this.password.length==6){
                        var userOne={
                            username:this.username,
                            password:this.password
                        }
                        window.localStorage.setItem('user',JSON.stringify(userOne));
                        this.$router.go(-1);
                    }else{
                        Toast({
                        message: '账号或密码错误',
                        position: 'bottom',
                        duration: 5000
                        });
                    }
                
            },
            back(){
                return this.$router.go(-1);
            }
        },
    }
</script>

<style scoped>                                                                                                                    .login{
    text-align: center;
}
.navbar{
  background:white !important;
}
.title{   
    height: 70px;
    line-height: 70px;
    background:linear-gradient(rgb(94, 235, 240), rgb(15, 186, 192));
    font-size: 20px;
    font-weight: bold;
    color: red;
}
.logins{
    margin-top:20px;
    color: black;
}
.logins input{
    width: 70%;
    height: 40px;
    margin-bottom: 10px;
}
.submit{
    margin-top: 10px;
    color: white;
    background: #f0f;
    width: 70%;
    height: 40px;
    border-radius: 6px;
}
.image{
    margin-top: 100px;
    height: 40px;
    width: 100%;
}
.image img{
    height: 100%;
    width: 40px;
}
</style>