<template>
  <el-row>
    <!-- home左侧区域 -->
    <el-col :span="8" style="padding-right: 10px">
      <!-- 用户信息卡片 -->
      <el-card class="box-card">
        <div class="user">
          <img src="../../assets/images/avatar.jpg" alt="" />
          <div class="user-info">
            <p class="name">Admin</p>
            <p class="access">超级管理员</p>
          </div>
        </div>
        <div class="login-info">
          <p>上次登陆时间：<span>2023-03-01</span></p>
          <p>上次登陆地点：<span>中国</span></p>
        </div>
      </el-card>
      <!-- 销量列表卡片 -->
      <el-card class="box-card" style="margin-top: 15px">
        <el-table :data="tableData" stripe style="width: 100%">
          <el-table-column
            v-for="(v, k) in tableLabel"
            :key="k.name"
            :prop="k"
            :label="v"
          >
          </el-table-column>
        </el-table>
      </el-card>
    </el-col>

    <!-- home右侧区域 -->
    <el-col :span="16" style="padding-left: 10px">
      <!-- 销量情卡片 -->
      <div class="num">
        <el-card
          :body-style="{ display: 'flex' }"
          v-for="item in countData"
          :key="item.name"
        >
          <i
            :class="`el-icon-${item.icon}`"
            :style="{ background: item.color }"
          ></i>
          <div class="detail">
            <p class="desc">{{ item.name }}</p>
            <p class="price">{{ '￥' + item.value }}</p>
          </div>
        </el-card>
      </div>
      <!-- 销量拆线图 -->
      <el-card style="height: 280px">
        <div ref="echarts1" style="height: 280px"></div>
      </el-card>
      <div class="graph">
        <!-- 柱状图 -->
        <el-card style="height: 260px">
          <div ref="echarts2" style="height: 260px"></div>
        </el-card>
        <!-- 饼状图 -->
        <el-card style="height: 260px"> 
        <div ref="echarts3" style="height: 260px">

        </div>
      </el-card>
      </div>
    </el-col>
  </el-row>
</template>

<script>
import { getData } from '../../api/index.js'
import * as echarts from 'echarts'
export default {
  name: 'MyHome',
  data() {
    return {
      tableData: [],
      tableLabel: {
        name: '品牌',
        todayBuy: '日销量',
        monthBuy: '月销量',
        totalBuy: '总销量'
      },
      countData: [
        {
          name: '今日支付订单',
          value: 1234,
          icon: 'success',
          color: '#2ec7c9'
        },
        {
          name: '今日收藏订单',
          value: 210,
          icon: 'star-on',
          color: '#ffb980'
        },
        {
          name: '今日未支付订单',
          value: 1234,
          icon: 's-goods',
          color: '#5ab1ef'
        },
        {
          name: '本月支付订单',
          value: 1234,
          icon: 'success',
          color: '#2ec7c9'
        },
        {
          name: '本月收藏订单',
          value: 210,
          icon: 'star-on',
          color: '#ffb980'
        },
        {
          name: '本月未支付订单',
          value: 1234,
          icon: 's-goods',
          color: '#5ab1ef'
        }
      ]
    }
  },
  mounted() {
    getData().then((data) => {
      // console.log(data.data);
      const { tableData } = data.data
      this.tableData = tableData

      const { orderData, userData,videoData } = data.data

      console.log(videoData)
      // 拆线图的实现
      const echart1 = echarts.init(this.$refs.echarts1)
      let echart1Option = {}

      const xAxis = Object.keys(orderData.data[0])
      const xAxisData = {
        data: xAxis
      }
      echart1Option.xAxis = xAxisData
      echart1Option.legend = xAxisData
      echart1Option.yAxis = {}

      echart1Option.series = []
      xAxis.forEach((key) => {
        echart1Option.series.push({
          name: key,
          data: orderData.data.map((item) => item[key]),
          type: 'line'
        })
      })
      echart1.setOption(echart1Option)

      // 柱状图的实现
      const echarts2 = echarts.init(this.$refs.echarts2)
      let echarts2Option = {
        legend: {
          // 图例文字颜色
          textStyle: {
            color: '#333'
          }
        },
        grid: {
          left: '20%'
        },
        // 提示框
        tooltip: {
          trigger: 'axis'
        },
        xAxis: {
          type: 'category', // 类目轴
          data: userData.map((item) => item.date),
          axisLine: {
            lineStyle: {
              color: '#17b3a3'
            }
          },
          axisLabel: {
            interval: 0,
            color: '#333'
          }
        },
        yAxis: [
          {
            type: 'value',
            axisLine: {
              lineStyle: {
                color: '#17b3a3'
              }
            }
          }
        ],
        color: ['#2ec7c9', '#b6a2de'],
        series: [
          {
            name: '新增用户',
            data: userData.map((item) => item.new),
            type:'bar'

          },
          {
            name: '活跃用户',
            data: userData.map((item) => item.active),
            type:'bar'
          }
        ]
      }
      echarts2.setOption(echarts2Option)

      // 饼 状图 的实现
      const echarts3 = echarts.init(this.$refs.echarts3)
      let echarts3Option ={
        series: [
    {
      type: 'pie',
      data: videoData
      
    }
  ]
      }

      echarts3.setOption(echarts3Option)
    })
  }
}
</script>

<style lang="less" scoped>
/deep/.el-card__body {
  padding: 0px 10px;
}

.user {
  display: flex;
  align-items: center;
  padding: 0;
  border-bottom: 1px solid #ccc;

  img {
    flex: 1;
    width: 150px;
    height: 150px;
    border-radius: 50%;
  }
  .user-info {
    flex: 1;
    margin-left: 20px;
    .name {
      font-size: 32px;
      margin-bottom: 10px;
    }
    .access {
      color: #999999;
    }
  }
}

.login-info {
  p {
    line-height: 28px;
    font-size: 14px;
    color: #999999;
    padding-left: 10px;
    span {
      margin-left: 60px;
    }
  }
}
.num {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;

  i {
    width: 80px;
    height: 80px;
    font-size: 30px;
    color: #fff;
    line-height: 80px;
    text-align: center;
  }
  .detail {
    display: flex;
    margin-left: 15px;
    flex-direction: column;
    justify-content: center;

    .price {
      font-size: 26px;
    }
    .desc {
      margin-top: 20px;
      font-size: 14px;
      color: #ccc;
    }
  }
  .el-card {
    width: 32%;
    margin-bottom: 20px;
  }
}
.graph {
  display: flex;
  margin-top: 20px;
  justify-content: space-between;
  .el-card {
    width: 48%;
  }
}
</style>
