<template>
   <div class="navbar" >
    <div class="navbar-left" v-if="$slots.left">
        <slot name="left">1</slot>
    </div>
    <div class="navbar-center" v-if="$slots.center">
        <slot name="center">2</slot>
    </div>
    <div class="navbar-right" v-if="$slots.right">
        <slot name="right">3</slot>
    </div>
       </div>
</template>

<script>
export default {
  name: 'NavBar'
}
</script>

<style   scoped>
    .navbar{
        display:flex;
        background:#f60;
        height:50px;
        align-items:center;
    }
    .navbar-left,
    .navbar-right{
        padding:0 10px;
    }
    .navbar-center{
        text-align: center;
        flex:1;
    }

</style>