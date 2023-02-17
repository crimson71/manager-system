import Vue from 'vue'
import VueRouter from 'vue-router'

import Main from '@/components/views/Main.vue'
import Home from '@/components/views/Home.vue'
import User from '@/components/views/User.vue'
import Mall from '@/components/views/Mall.vue'
import PageOne from '@/components/views/PageOne.vue'
import PageTwo from '@/components/views/PageTwo.vue'

const routes = [
  {path:'/',
  component:Main,
  redirect:'/home',
  children:[
    { path: 'home', component: Home },
    { path: 'user', component: User },
    { path: 'mall', component: Mall },
    { path: 'page1', component: PageOne },
    { path: 'page2', component: PageTwo },

  ]},
 
]

const router = new VueRouter({
  routes // (缩写) 相当于 routes: routes
})

Vue.use(VueRouter)

export default router