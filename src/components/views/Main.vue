<template>
  <div>
    <el-container>
  <el-aside width="auto "><common-aside></common-aside></el-aside>
  <el-container>
    <el-header>
      <common-header></common-header>
    </el-header>
    <el-main><router-view></router-view></el-main>
  </el-container>
</el-container>
    
  </div>
</template>

<script>
import CommonAside from '../CommonAside.vue';
import CommonHeader from '../CommonHeader.vue'
export default {
  name:'MyMain',
  components:{
    CommonAside,
    CommonHeader

  }

}
</script>

<style lang="less" scoped>
.el-header {
  padding: 0;
}
.el-card__body {
    padding: 5px 0px ;
}
</style>