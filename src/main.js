import Vue from 'vue'
import App from './App.vue'
import router from './router/index.js'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

import store from './store/index.js';
import './api/mock.js'
import Cookies from 'js-cookie';


Vue.use(ElementUI);
Vue.config.productionTip = false

router.beforeEach((to,from,next) => {
  // 获取token
  const token = Cookies.get('token')
  //  判断token，不存在且当前不在登陆页，代表没有登陆
  if(!token && to.name !== 'login') {
    next({name:'login'})
  }else if(token && to.name === 'login'){
    next({name:'home'})
  }else {
    next()
  }
})

new Vue({
  
  store,
  router,
  render: h => h(App),
  created() {
    store.commit('addMenu',router)
  }
}).$mount('#app')
