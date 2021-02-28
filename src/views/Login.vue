<template>
<div id="login_root">
  <el-row type="flex" justify="center">
        <el-image :src="require('@/assets/images/head_icon.png')" :fit="fit"></el-image>
  </el-row>

  <el-row type="flex" justify="center">
            <el-card shadow="always" >
              <h1 style="text-align: center;">欢迎登陆</h1>
              <el-divider></el-divider>
              <el-form  :model="nameValidateForm" ref="nameValidateForm" label-width="100px">
                <el-form-item label="用户名" prop="name" :rules="[{ required: true, message: '用户名不能为空'},]">
                    <el-input placeholder="请输入用户名" type="text" v-model="nameValidateForm.name" autocomplete="off"></el-input>
                </el-form-item>

                <el-form-item label="密码" prop="password" :rules="[{ required: true, message: '密码不能为空'},]">
                    <el-input placeholder="请输入密码" v-model="nameValidateForm.password" show-password></el-input>
                </el-form-item>
              
                <el-button type="primary" @click="submitForm(nameValidateForm)" class="two-button-margin">登录</el-button>
                <el-button @click="goToRgister()">注册</el-button>
              </el-form>
            </el-card>
  </el-row>

  <el-row type="flex" justify="center">
        <el-image :src="require('@/assets/images/master_and_disciples.gif')" :fit="fit"></el-image>
  </el-row>

  <el-row type="flex" justify="center">
      <el-link type="info">关于本站</el-link>
      <el-link type="info">用户须知</el-link>
      <el-link type="info">联系作者</el-link>
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
  },

  methods:{
    submitForm: function(data){
       console.log(data)
       this.$router.push({name: 'ChatRoom'})
    },

    goToRgister: function(){
       this.$router.push({name: 'Register'})
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
          width: 350px;
        }
        
        .grid-content {
          border-radius: 4px;
          min-height: 80px;
        }

        .el-row {
          margin-bottom: 20px;
        }

        .el-form-item{
          width: 280px;  
        }

        .el-link{
          margin-right: 2%;
        }

        .two-button-margin{
          margin-left: 20%;
          margin-right: 10%;
        }

</style>