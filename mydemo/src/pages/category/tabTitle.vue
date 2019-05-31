<template>
    <div>
        <ul class="title">
            <li v-for="(item,key) in cats" :key="key" :class="{active:item.id==curId}" @click="change(item.id)">{{item.name}}</li>
        </ul>
    </div>
</template>

<script>
    export default {
        name:'tabTitle',
        data(){
                return{
                    curId:0,
                    cats:[]               
                } 
         },
         created() {
            this.getCats();
        },
         methods:{
                change(id){
                    if(this.curId==id){
                        return;
                    }
                   this.curId = id;
                   this.$emit("end",this.curId,this.cats[this.curId].name);
                },
                getCats(){
                this.$axios.defaults.baseURL="http://localhost:8080"
                this.$axios.post("/api/cats")
                .then(res=>{
                    this.cats=res.data.data;
                })
                .catch(err=>{

                })
                }
            } 
       }
</script>

<style scoped>
ul{
    list-style:none;
}
.title{           
    width:80px;
}
.title li{     
    font-weight: bold;
    color: black;
    line-height: 35px;
     border-bottom:1px solid #ccc;
    border-right:1px solid #ccc;
}
.title li.active{
    border-right:0;
    color:rgb(255, 0, 0);
}
</style>