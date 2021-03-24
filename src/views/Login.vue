<template>
<div id="login_root">
  <el-row type="flex" justify="center">
      <el-image :src="require('@/assets/images/head_icon.png')" :fit="fit"></el-image>
  </el-row>

  <el-row type="flex" justify="center">
      <el-card shadow="always" >
        <h1 style="text-align: center;">欢迎登陆</h1>
        <el-divider></el-divider>
        <el-form  :model="validateForm" label-width="100px" ref="validateForm" @keypress.native="enterLogin($event)">
          <el-form-item label="用户名" prop="username" :rules="[{ required: true, validator: checkName, trigger: 'blur'},]">
              <el-input placeholder="请输入用户名" type="text" v-model="validateForm.username" autocomplete="off"></el-input>
          </el-form-item>

          <el-form-item label="密码" prop="password" :rules="[{ required: true, message: '密码不能为空', trigger: 'blur'},{ min: 6, max: 15, message: '长度在 6 到 15 个字符', trigger: 'blur' }]">
              <el-input placeholder="请输入密码" v-model="validateForm.password" show-password></el-input>
          </el-form-item>

           <el-form-item class="shortMargin" label="验证码" prop="vertificationCode" :rules="[{required: true, trigger: 'blur', validator: vertificationCode}]">
               <el-input v-model="validateForm.vertificationCode" type="text" placeholder="请输入验证码" autocomplete="off"></el-input>
           </el-form-item>

           <el-form-item class="shortMargin">
              <el-collapse-transition>
                <div v-show="vertificationCodeCorrect">
                  <el-alert title="验证成功" type="success" center show-icon :closable="false"></el-alert>
                </div>
              </el-collapse-transition>
           </el-form-item>

          <el-form-item class="shortMargin">
            <div class="shortHeight">
              <VerificationCodeModule :identifyCode="identifyCode"></VerificationCodeModule>
              <el-button @click="refreshCode" type='text'>看不清，换一张</el-button>
            </div>
          </el-form-item>
        
          <el-button type="primary" @click="submitForm" class="two-button-margin">登录</el-button>
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
  </el-row>

  <el-row type="flex" justify="center">
      <el-image class="media-icon" :src="require('@/assets/images/wechat-icon-min.png')" :fit="fit" v-on:click="openDialog('wechat')"></el-image>
      <el-image class="media-icon" :src="require('@/assets/images/line-icon-min.png')" :fit="fit" v-on:click="openDialog('line')"></el-image>
      <el-image class="media-icon" :src="require('@/assets/images/mail-icon-min.png')" :fit="fit" v-on:click="mailDialogVisible = true"></el-image>
      <el-image class="media-icon" :src="require('@/assets/images/github-icon-min.png')" :fit="fit" v-on:click="directToGit"></el-image>
  </el-row>

  <el-row type="flex" justify="center">
      <el-dialog title="联系作者" :visible.sync="qrDialogVisible" center width="50%">
          <span>扫一扫下面的二维码</span>
          <el-divider></el-divider>
          <el-image class="qr-code-icon" :src="qrCodeUrl" :fit="fit"></el-image>
      </el-dialog>
  </el-row>

  <el-row type="flex" justify="center">
      <el-dialog title="联系作者" :visible.sync="mailDialogVisible" center width="50%">
          <span>请发送邮件至</span><i class="el-icon-s-promotion"></i>
          <el-link type="info" href="mailto:shurintou@gmail.com?subject = Hello">shurintou@gmail.com</el-link>
          <el-divider></el-divider>
          <el-image :src="require('@/assets/images/mail-background.png')" :fit="fit"></el-image>
      </el-dialog>
  </el-row>

</div>
</template>

<script>
import VerificationCodeModule from '../components/VerificationCode'
import { verificationLogic } from '../mixins/verificationLogic'
import {login} from '../api/login'

export default {
  name: 'Login',
  data() {
      return {
        fit: 'fill',
        validateForm: {
            username: '',
            password: '',
            vertificationCode: ''
        },
        qrDialogVisible: false,
        mailDialogVisible: false,
        duplicateLoginFlag: false,
        qrCodeUrl: '',
        checkName:  (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入用户名'));
        }
        else {
          var uPattern = /^[a-zA-Z0-9_-]{4,16}$/
          if(!uPattern.test(value)){
             callback(new Error('用户名须4到16位字母,数字,下划线,减号'));
          }
          else{
             callback();
          }
          callback();
        }
      }
      }
  },

  methods:{
    submitForm: function(){
       if(this.duplicateLoginFlag) return;
       this.duplicateLoginFlag = true
       this.$refs.validateForm.validate(valid => {
         if(valid){
            login({username: this.validateForm.username, password: this.validateForm.password })
            .then( ( res ) => {
                this.$router.push({name: 'ChatRoom'})
                this.$store.dispatch('initialization', res.account)
            })
            .catch({})
            .finally( ()=> {
                this.duplicateLoginFlag = false
            })
         }
         else{
            this.$message.error('请正确填写登录信息');
            this.duplicateLoginFlag = false
         }
       })
       this.refreshCode()
    },

    goToRgister: function(){
       this.$router.push({name: 'Register'})
    },

    directToGit: function(){
      window.open('https://github.com/shurintou/journey-to-the-west')
    },

    openDialog: function(which){
      this.qrDialogVisible = true
      if(which === 'wechat'){
        this.qrCodeUrl = require('@/assets/images/wechat-qr-code-min.png')
      }
      else if(which === 'line'){
        this.qrCodeUrl = require('@/assets/images/line-qr-code-min.png')
      }
    },

    enterLogin: function(e){
            if(e.keyCode === 13)this.submitForm()
    },
  },

  components:{
      VerificationCodeModule
  },

  mixins:[ verificationLogic ]
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

        .media-icon{
          min-width: 30px;
          min-height: 30px;
          width: 3%;
          height: 3%;
          margin: 1%;
        }

        .media-icon:hover{
          cursor:pointer;
        }

        .qr-code-icon{
          min-width: 60px;
          min-height: 60px;
          width: 40%;
          height: 40%;
          margin-left: 30%;
        }

        .shortMargin{
          margin-bottom: 9px;
        }

        .shortHeight{
          line-height : 0px
        }
</style>