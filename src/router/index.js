import Vue from 'vue'
import VueRouter from 'vue-router'

import Main from '@/components/views/Main.vue'
// import Home from '@/components/views/Home.vue'
// import User from '@/components/views/User.vue'
// import Mall from '@/components/views/Mall.vue'
// import PageOne from '@/components/views/PageOne.vue'
// import PageTwo from '@/components/views/PageTwo.vue'
import Login from '@/components/views/Login.vue'

const routes = [
  {path:'/',
  component:Main,
  redirect:'/home',
  name:'main',
  children:[
    // { path: 'home',name:'home', component: Home },
    // { path: 'user',name:'user',  component: User },
    // { path: 'mall', name:'mall', component: Mall },
    // { path: 'page1',name:'page1',  component: PageOne },
    // { path: 'page2',name:'page2',  component: PageTwo },

  ]},
  {path:'/login',name:'login',component:Login}
 
]

const router = new VueRouter({
  routes // (缩写) 相当于 routes: routes
})

Vue.use(VueRouter)

export default router