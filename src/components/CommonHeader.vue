<template>
  <div class="header-container">
    <div class="l-content">
      <el-button icon="el-icon-menu" size="mini"></el-button>
      <span>首页</span>
    </div>
    <div class="r-content"></div>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="less" scoped>
.header-container {
  display: flex;
  justify-content:space-between ;
  align-items: center;
  padding: 0 20px;
  background: #333;
  height: 60px;
}
.el-header {
  padding: 0;
}

</style>