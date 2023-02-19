<template>
  <div class="tag-group">
 
  <el-tag
    v-for="(item, index) in tags"
    :key="item.name"
    type=""
    :closable="item.name !== 'home' "
    :effect="$route.name === item.name ? 'dark' : 'plain'"
    size="small"
    @click="changeMenu(item)"
    @close="handleClose(item,index)">
    {{ item.label }}
  </el-tag>
</div>

</template>

<script>
import { mapState,mapMutations } from 'vuex';
export default {
  name:'CommonTag',
  data() {
      return {
       
      }
    },
    computed:{
      ...mapState({
        tags: state => state.tab.tabList
      })
    },
    methods:{
      ...mapMutations(['closeTag']),
      // tag跳转
      changeMenu(val) {
        console.log(val);
        this.$router.push({name:val.name})

      },
      // tag删除
      handleClose(val,i) {        
        this.closeTag(val)
        const length = this.tags.length

        if(this.$route.name !== val.name) return
        // 删除最后一项的情况
        if(i === length) {
          this.$router.push({
            name:this.tags[i-1].name
          })
        }else {
          this.$router.push({
            name:this.tags[i].name
          })
        }

      }
    }

}
</script>

<style lang="less" scoped>
.tag-group {
  padding: 20px;
  .el-tag {
    margin-right: 15px;
    cursor: pointer;
  }
}

</style>