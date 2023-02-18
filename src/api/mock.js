import Mock from 'mockjs'
import HomeApi from '../api/mockServeData/home.js'

Mock.mock('/api/home/getData',HomeApi.getStatisticalData)