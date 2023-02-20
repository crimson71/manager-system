// 模拟后端数据请求
import Mock from 'mockjs'
import HomeApi from '../api/mockServeData/home.js'
import UserApi from '../api/mockServeData/user.js'
import permission from './mockServeData/permission.js'

// mock请求拦截
Mock.mock('/api/home/getData',HomeApi.getStatisticalData)

//  获取用户列表
// 增加用户
Mock.mock('/api/user/add','post',UserApi.createUser)
// 删除用户
Mock.mock('/api/user/delete','post',UserApi.deleteUser)
// 编辑用户
Mock.mock('/api/user/edit','post',UserApi.updateUser)
// 获取整张用户列表
Mock.mock(/\/api\/user\/getuser/,UserApi.getUserList)

Mock.mock(/\/api\/permission\/getmenu/,'post',permission.getMenu)