import axios from "axios";

const http = new axios.create({
  baseURL:'/api',
  timeout:10000,
})

// 请求、响应拦截器
axios.interceptors.request.use(config => {
  console.log(config);
},erro => {
  return  Promise.reject(erro)

})
axios.interceptors.response.use(response => {
  console.log(response);
},erro => {
  return  Promise.reject(erro)

})

export default http