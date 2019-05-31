<template>
  <div id="app" class="container">
    <div class="container-view" >
    <router-view/>
     </div>
    
  </div>
</template>

<script>
import  TabBar from '@/components/TabBar'
export default {
  name: 'App',
  components:{
    TabBar
  }
}
</script>

<style>
 
</style>
