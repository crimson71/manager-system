<template>
  <div class="login-container">
    
    <el-card class="box-card" style="width:100%;">
  <div slot="header" class="clearfix" style="text-align: center;color: #505458;">
    <h3>系统登陆</h3>
    
  </div>
  <div class="text item">
    <el-form :inline="true" :model="form" :rules="rules" ref="form">
      <el-form-item label-width="70px" label="用户名:"  prop="username">
    <el-input v-model="form.username" autocomplete="off" placeholder="请输入用户名"></el-input>
  </el-form-item>
  <el-form-item label-width="70px" label="密码:" prop="password" >
    <el-input type="password" v-model="form.password" autocomplete="off" placeholder="请输入密码"></el-input>
  </el-form-item><br>
  <el-form-item>
    <el-button type="primary" @click="submit">登 陆</el-button>
    
  </el-form-item>
    </el-form>
  </div>
</el-card>

  </div>
</template>

<script>
import Mock from 'mockjs'
import Cookies from 'js-cookie'
import {getMenu} from '@/api/index.js'
export default {
  name:'MyLogin',
  data() {
    return {
      form:{
        username:'',
        password:''
      },
      rules:{
        username:[
        { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        password:[
        { required: true, message: '请输入密码', trigger: 'blur' }

        ]
      },
    }
  },
  methods: {
    submit() {
      // 用mock生成一段随机数token
      // const token = Mock.Random.guid()
      // 将token存入cookie
      // Cookies.set('token',token)
      const valid = this.$refs.form.validate()
      if(valid) {
        getMenu(this.form).then(({data}) => {
          console.log(data);
          if(data.code === 20000) {
            const token = data.data.token
          Cookies.set('token',token)
          this.$router.push({name:'home'})

          }else {
            this.$message.error(`错了哦，${data.data.message}哦`);
          }
          

        })
      }
      

    },
   
  }

}
</script>

<style lang="less" scoped>
.login-container {
  width: 450px;
  margin: 180px auto;
  text-align: center;
}

</style>