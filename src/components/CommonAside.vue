<template>
  <div>
    <el-menu
      default-active="1-4-1"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
      :collapse="isCollapse"
    >
    <h3>{{isCollapse ? '后台' :'通用后台管理系统'}}</h3>
      <el-menu-item v-for="item in noChildren" :key="item.name" :index="item.name">
        <i :class="`el-icon-${item.icon}`"></i>
        <span slot="title" @click="menuClick(item)">{{ item.label }}</span>
      </el-menu-item>
      <el-submenu v-for="item in hasChildren" :key="item.label" :index="item.label">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span slot="title">{{ item.label }}</span>
        </template>
        <el-menu-item-group  v-for="x in item.children" :key="x.name">
          <el-menu-item :index="x.name" @click="menuClick(x)">{{ x.label}}</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
    </el-menu>
  </div>
</template>

<script>
import Cookie from "js-cookie";
export default {
  data() {
    return {      
      // MenuData: [
      //   {
      //     path: '/',
      //     name: 'home',
      //     label: '首页',
      //     icon: 's-home',
      //     url: 'Home/Home'
      //   },
      //   {
      //     path: '/mall',
      //     name: 'mall',
      //     label: '商品管理',
      //     icon: 'video-play',
      //     url: 'MallManage/MallManage'
      //   },
      //   {
      //     path: '/user',
      //     name: 'user',
      //     label: '用户管理',
      //     icon: 'user',
      //     url: 'UserManage/UserManage'
      //   },
      //   {
      //     icon: 'location',
      //     label: '其他',
      //     children: [
      //       {
      //         path: '/page1',
      //         name: 'page1',
      //         label: '页面1',
      //         icon: 'setting',
      //         url: 'Other/PageOne'
      //       },
      //       {
      //         path: '/page2',
      //         name: 'page2',
      //         label: '页面2',
      //         icon: 'setting',
      //         url: 'Other/PageTwo'
      //       }
      //     ]
      //   }
      // ]
    }
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath)
    },
    menuClick(item) {
      console.log(item.path);
      // this.$router为当前页面路由
      if(this.$route.path !== item.path && !(item.path === '/' & (item.path === '/home') )) {
        this.$router.push(item.path)
      }
      // 调用this.$store.commit向store传输数据，有两个参数，第一个是mutations对应的方法，第二个是要传输的数据
      this.$store.commit('selectMenu',item)
      
    }
  },
  computed:{
    noChildren() {
      return this.MenuData.filter(item => !item.children)

    },
    hasChildren() {
      return this.MenuData.filter(item => item.children)
    },
    isCollapse() {
      return this.$store.state.tab.isCollapse
    },
    MenuData() {
      return JSON.parse(Cookie.get('menu')) || this.$store.state.tab.menu
    },
    
  },
  // created() {
  //   console.log(this.MenuData,'MenuData');
  // }
}
</script>

<style lang="less" scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
  
 

}
.el-menu {
    height: 100vh;
    border-right:0;
    h3 {
    color:#fff;
    font-weight: 400;
    text-align: center;
    line-height: 48px;
  }
    
  }
</style>
