import Cookie from "js-cookie";

export default {
  state: {
    // 控制左侧菜单的展开
    isCollapse: false,
    // 存储面包屑的数据
    tabList: [
      {
        path: '/',
        name: 'home',
        label: '首页',
        icon: 's-home',
        url: 'Home/Home'
      },

    ],
    menu: [

    ]
  },
  mutations: {
    collapseMenu(state) {
      state.isCollapse = !state.isCollapse
    },
    // 有两个参数，第一个是state为固定写法，第二个是要接收的值
    selectMenu(state, val) {
      console.log(val);
      if (val.name !== 'home') {
        // 查找tablist中是否有val。name，没有则返回-1
        const index = state.tabList.findIndex(item => item.name === val.name)
        if (index === -1) {
          state.tabList.push(val)


        }
      }

    },
    closeTag(state, item) {
      const index = state.tabList.findIndex(val => val.name === item.name)
      state.tabList.splice(index, 1)
    },
    setMenu(state, val) {
      Cookie.set('menu', JSON.stringify(val))
      state.menu = val
    },
    // 动态注册路由
    addMenu(state, router) {
      // 如果 没 有menu数据则不进行下一步的操作
      // console.log(router,'router');
      if (!Cookie.get('menu')) return
      // 获取cookie中的menu数据
      const menu = JSON.parse(Cookie.get('menu'))
      state.menu = menu
      // 根据menu动态注册路由
      const menuArray = []
      
      menu.forEach(item => {
        if (item.children) {
          // 遍历有子菜单的数据
          item.children = item.children.map(subItem => {
            
            subItem.component = () => import(`../components/views/${subItem.url}`)
            return subItem

          })
          menuArray.push(...item.children)
        } else {
          item.component = () => import(`../components/views/${item.url}`)
          menuArray.push(item)

        }

      });
      console.log(menuArray);
      // 路由的动态添加
      menuArray.forEach(item => {
        router.addRoute('main',item)

      })
      

    }

  }
}