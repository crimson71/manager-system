export default {
  state:{
    // 控制左侧菜单的展开
    isCollapse:false,
    // 存储面包屑的数据
    tabList:[
      {
        path: '/',
        name: 'home',
        label: '首页',
        icon: 's-home',
        url: 'Home/Home'
      },
    ]
  },
  mutations:{
    collapseMenu(state) {
      state.isCollapse = !state.isCollapse
    },
    // 有两个参数，第一个是state为固定写法，第二个是要接收的值
    selectMenu(state,val) {
      console.log(val);
      if(val.name !== 'home') {
        // 查找tablist中是否有val。name，没有则返回-1
        const index = state.tabList.findIndex(item => item.name === val.name)
        if(index === -1) {
          state.tabList.push(val)
          

        }
      }
      
    },
    closeTag(state,item) {
      const index = state.tabList.findIndex(val => val.name === item.name)
      state.tabList.splice(index,1)
    }

  }
}