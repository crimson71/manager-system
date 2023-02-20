<template>
  <div class="header-container">
    <div class="l-content">
      <el-button
        icon="el-icon-menu"
        size="mini"
        @click="handlerMenu"
        style="margin-right: 20px"
      ></el-button>

      <!-- 面包屑区域 -->

      <el-breadcrumb separator="/">
        <el-breadcrumb-item
          :to="{ path: item.path }"
          v-for="item in this.tags"
          :key="item.path"
          >{{ item.label }}</el-breadcrumb-item
        >
      </el-breadcrumb>
    </div>
    <div class="r-content">
      <el-dropdown @command="handleCommand">
        <span class="el-dropdown-link">
          <img class="user" src="../assets/images/avatar.jpg" alt="" />
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>个人中心</el-dropdown-item>
          <el-dropdown-item command="logout">退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import Cookie from 'js-cookie'
export default {
  methods: {
    handlerMenu() {
      this.$store.commit('collapseMenu')
    },
    handleCommand(command) {
      if (command === 'logout') {
        Cookie.remove('menu')
        Cookie.remove('token')
        this.$router.push({name:'login'})
      }
    }
  },
  computed: {
    ...mapState({
      tags: (state) => state.tab.tabList
    })
  }
  // mounted() {
  //   console.log(this.tags,'tags');
  // }
}
</script>

<style lang="less" scoped>
.header-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  background: #333;
  height: 60px;

  span {
    color: #fff;
    padding: 0 0px;
  }

  .r-content {
    .user {
      width: 40px;
      height: 40px;
      border-radius: 50%;
    }
  }
  .l-content {
    display: flex;
    align-items: center;

    /deep/.el-breadcrumb__item {
      .el-breadcrumb__inner {
        font-weight: normal;
        &.is-link {
          color: #666;
        }
      }
      &:last-child {
        .el-breadcrumb__inner {
          color: #fff;
        }
      }
    }
  }
}
</style>
