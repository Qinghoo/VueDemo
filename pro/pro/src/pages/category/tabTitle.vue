<template>
    <div class="tabTitle">
        <ul class="list">
            <li class="item"
                :class="{active:curId==item.id}"
                v-for="(item,key) in tabTitles"
                :v-for="(item,key) in tabTitles"
                :key="key"
                @click="switchTab(item.id)"
            >{{item.name}}</li>
        </ul>
    </div>
</template>

<script>
    export default {
        name:"tabTitle",
        data() {
            return {
                curId:0,
                tabTitles:[]
            };
        },
        created() {
            this.getCateTitle();
        },
        methods: {
            getCateTitle(){
                this.$axios.defaults.baseURL = "http://localhost:8080";
                this.$axios
                    .post("/api/cats")
                    .then(res=>{
                        this.tabTitles=res.data.data;
                    })
                    .catch(err=>{
                        console.log(err);
                    });
            },
            switchTab(id){
                if(this.curId==id){
                    return;
                }
                this.curId=id;
                this.$emit("end",this.curId);
            }
        }
    };
</script>

<style scoped>
  .tabTitle .list {
    display: flex;
    flex-direction: column;
    }
    .tabTitle .list .item {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 45px;
    width: 100%;
    background: #fff;
    border-right: 1px solid #ccc;
    border-bottom: 1px solid #ccc;
    font-weight: bold;
    }
    .tabTitle .list .item.active {
    border-right: 0;
    color: #f60;
    }
</style>