<template>
  <el-row>
    <!-- home左侧区域 -->
    <el-col :span="8" >
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
    <el-col :span="16">
      <div class="num" >
        <el-card :body-style="{ display: 'flex' }" v-for="item in countData" :key="item.name">
          <i :class="`el-icon-${item.icon}`" :style="{background:item.color}"></i>
          <div class="detail">
            <p class="desc">{{ item.name }}</p>
          <p class="price">{{ '￥'+item.value }}</p>
          </div>
        </el-card>
      </div>
    </el-col>
  </el-row>
</template>

<script>
export default {
  name: 'MyHome',
  data() {
    return {
      tableData: [
        {
          name: 'oppo',
          todayBuy: 100,
          monthBuy: 300,
          totalBuy: 800
        },
        {
          name: 'vivo',
          todayBuy: 100,
          monthBuy: 300,
          totalBuy: 800
        },
        {
          name: '苹果',
          todayBuy: 100,
          monthBuy: 300,
          totalBuy: 800
        },
        {
          name: '小米',
          todayBuy: 100,
          monthBuy: 300,
          totalBuy: 800
        },
        {
          name: '三星',
          todayBuy: 100,
          monthBuy: 300,
          totalBuy: 800
        },
        {
          name: '魅族',
          todayBuy: 100,
          monthBuy: 300,
          totalBuy: 800
        }
      ],
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
  justify-content:space-between ;
 
  i {
    width: 80px;
    height: 80px;
    font-size: 30px;
    color: #fff;
    line-height: 80px;
    text-align: center;
  }
  .detail{
   
    display: flex;
    margin-left: 15px;
    flex-direction: column;
    justify-content: center;
    
    .price{
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
</style>
