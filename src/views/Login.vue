<template>
<div id="login_root">
    <el-row type="flex" justify="center">
      <!-- justify 对齐方式 -->
      <el-col :span="6">
        <div class="grid-content"></div>
      </el-col>
    </el-row>

      <el-row type="flex" justify="center">
    <!-- justify 对齐方式 -->
          <el-col :xs="{span:23,offset:0}" :sm="{span:16,offset:4}" :md="{span:12,offset:4}" :lg="{span:12,offset:6}">
              <el-card shadow="always" >
                <h1 style="text-align: center;">欢迎登陆</h1>
                <el-divider></el-divider>
                <!-- form表单 -->
                <el-form  :model="nameValidateForm" ref="nameValidateForm" label-width="100px">
                  <!-- 用户名 -->
                  <el-form-item
                      label="用户名"
                      prop="name"
                      :rules="[
                      { required: true, message: '用户名不能为空'},
                      ]"
                  >
                      <el-input placeholder="请输入用户名" type="text" v-model="nameValidateForm.name" autocomplete="off"></el-input>
                  </el-form-item>

                  <!-- 密码 -->
                  <el-form-item
                      label="密码"
                      prop="password"
                      :rules="[
                      { required: true, message: '密码不能为空'},
                      ]"
                  >
                      <el-input placeholder="请输入密码" v-model="nameValidateForm.password" show-password></el-input>
                  </el-form-item>

               
                  <!-- 按钮 -->
                  <el-form-item>
                      <el-button type="primary" @click="submitForm('nameValidateForm')">登录</el-button>
                      <el-button @click="resetForm('nameValidateForm')">重置</el-button>
                  </el-form-item>
                </el-form>

              </el-card>
          </el-col>
    </el-row>

    <el-row type="flex" justify="center">
    <!-- justify 对齐方式 -->
      <el-col :xs="{span:23,offset:0}" :sm="{span:16,offset:0}" :md="{span:12,offset:1}" :lg="{span:12,offset:0}">
         <el-image
      :src="require('@/assets/images/master_and_disciples.gif')"
      :fit="fit"></el-image>
      </el-col>
    </el-row>

       
</div>
</template>

<script>
export default {
  name: 'Login',
  data() {
      return {
        fit: 'fill',
        nameValidateForm: {
            name: '',
            password: '',
        },
      }
    }
}
</script>

<style scoped>
        .el-container{
            padding: 0px;
            margin: 0px;
            height: 100vh;
        }

        .el-main {
            color: #333;
            text-align: center;
            line-height: 160px;
        }

        .el-card{
          border-radius:30px;
          width: 380px;
        }
        .grid-content {
          border-radius: 4px;
          min-height: 80px;
        }
        .el-row {
          margin-bottom: 20px;
        }
        .el-form-item{
        width: 300px;  
        }

</style>