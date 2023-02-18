import http from '../utils/request.js'

export const getData = async () => {
   const {data} =await http.get('/home/getData')
  
  
   return data
  
  
}