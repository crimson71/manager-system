import http from '../utils/request.js'

export const getData = async () => {
   const {data} =await http.get('/home/getData') 
    return data    
}

// 获取用户列表

export const getUser = (params) => {
   return http.get('/user/getuser',params)
}
export const addUser = (data) => {
   return http.post('/user/add',data)
}
export const delUser = (data) => {
   return http.post('/user/delete',data)
}
export const editUser = (data) => {
   return http.post('/user/edit',data)
}
