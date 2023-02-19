<template>
  <div class="manage">
    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      width="50%"
      :before-close="handleClose"
    >
      <!-- 用户表单信息 -->
      <el-form
        ref="form"
        :rules="rules"
        :model="form"
        label-width="80px"
        :inline="true"
       
      >
        <el-form-item label="姓名" prop="name">
          <el-input
            placeholder="请输入姓名"
            v-model.trim="form.name"
          ></el-input>
        </el-form-item>
        <el-form-item label="年龄" prop="age">
          <el-input
            placeholder="请输入年龄"
            v-model.number="form.age"
          ></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="sex">
          <el-select v-model="form.sex" placeholder="请选择性别">
            <el-option label="男" value="1"></el-option>
            <el-option label="女" value="0"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="出生日期" prop="birth">
          <el-date-picker
            type="date"
            placeholder="选择日期"
            v-model="form.birth"
            style="width: 100%"
            value-format="yyyy-MM-DD"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="地址" prop="addr">
          <el-input
            placeholder="请输入地址"
            v-model.trim="form.addr"
          ></el-input>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="submitInfo">确 定</el-button>
      </span>
    </el-dialog>
    <div class="manage-header">
      <el-button type="primary" size="mini" @click="handleAdd"
        >+ 新增
      </el-button>
      <!-- form搜索区 -->
      <el-form :model="userForm"  :inline="true" >
        <el-form-item><el-input
            placeholder="请输入搜索内容"
            v-model.trim="userForm.name"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" size='medium  ' @click="onSubmit">搜 索</el-button>
        </el-form-item>
        
      </el-form>
    </div>
    <div class="common-table" >
      <el-table :data="tableData" style="width: 100%" height="90%"  stripe>
      <el-table-column prop="name" label="姓名" width="100px">
      </el-table-column>
      <el-table-column prop="age" label="年龄" width="50px"> </el-table-column>
      <el-table-column prop="birth" label="生日" width="100px">
      </el-table-column>
      <el-table-column prop="sex" label="性别" width="50px">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{
            scope.row.sex === 1 ? '男' : '女'
          }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="addr" label="地址"> </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页区 -->
    <div class="page">      
      <el-pagination layout="prev, pager, next" :total="total" @current-change="handlePage"> </el-pagination>
    </div>

    </div>

  </div>
</template>

<script>
import { getUser, addUser, delUser, editUser } from '../../api/index.js'
export default {
  name: 'MyUser',
  data() {
    // 定义年龄的校验规则
    let checkAge = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('年龄不能为空'))
      }
      setTimeout(() => {
        if (!Number.isInteger(value)) {
          callback(new Error('请输入数字值'))
        } else {
          if (value < 18) {
            callback(new Error('必须年满18岁'))
          } else {
            callback()
          }
        }
      }, 1000)
    }
    return {
      // 定义数据修改框的展开与收起
      dialogVisible: false,
      // 表单数据的定义
      form: {
        name: '',
        age: '',
        sex: '',
        birth: '',
        addr: ''
      },
      // 表单数据的校验
      rules: {
        name: [
          { required: true, message: '请输入姓名', trigger: 'blur' },
          { min: 2, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
        ],
        age: [
          { validator: checkAge, trigger: 'blur' },
          { required: true, message: '请输入年龄' }
        ],
        sex: [{ required: true, message: '请选择性别', trigger: 'change' }],
        birth: [
          {
            type: 'string',
            required: true,
            message: '请选择日期',
            trigger: 'change'
          }
        ],
        addr: [{ required: true, message: '请填写地址', trigger: 'blur' }]
      },
      tableData: [],
      modalType: 0 ,//0为新增弹窗，1为修改弹窗
      total:0,//定义总页码
      pageData:{
        page:1,
        limit:10
      },
      userForm:{
        name:''
      },
    }
  },
  methods: {
    submitInfo() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          if (this.modalType === 0) {
            addUser(this.form).then(() => {
              this.getUserList()
            })
          } else {
            editUser(this.form).then(() => {
              this.getUserList()
            })
          }
          console.log(this.form)
          this.$refs.form.resetFields()
          this.dialogVisible = false
        }
      })
    },
    handleClose() {
      this.$refs.form.resetFields()
      this.dialogVisible = false
    },
    cancel() {
      this.handleClose()
    },
    handleEdit(row) {
      this.modalType = 1
      this.dialogVisible = true
      this.form = JSON.parse(JSON.stringify(row))
    },
    handleDelete(row) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          delUser({ id: row.id }).then(() => {
            this.getUserList()
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    },
    getUserList() {
      getUser({params:{...this.userForm,...this.pageData}}).then(({ data }) => {
        this.tableData = data.list
        this.total =  data.count || 0
        console.log(this.tableData)
      })
    },
    handleAdd() {
      this.modalType = 0
      this.dialogVisible = true
    },
    handlePage(val) {
      console.log(val,'页码值');
      this.pageData.page = val
      this.getUserList()
    },
    onSubmit() {
      this.getUserList()
    }
  },
  mounted() {
    this.getUserList()
  }
}
</script>

<style lang="less" scoped>
.manage {
  
  height: 90%;
  .manage-header {
  display: flex;
  justify-content:space-between;
  align-content: center;
  .el-button--mini {
    height: 42px;
  }
}
  .common-table {
    position: relative;
    height: calc(100% - 40px);
    .page{
    position: absolute;
    right: 20px;
    bottom: 0px;
  }

  }
  
}

</style>
