<template>
<div id="login_root">
  <el-row type="flex" justify="center">
      <el-image :src="require('@/assets/images/head_icon.png')" :fit="fit"></el-image>
  </el-row>

  <el-row type="flex" justify="center">
            <el-card shadow="always">
              <h1 style="text-align: center;">注册信息</h1>
              <el-divider></el-divider>
              <el-form  :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" validate="">
                <el-form-item label="用户名" prop="name">
                    <el-input placeholder="请输入用户名" type="text" v-model="ruleForm.name" autocomplete="off"></el-input>
                </el-form-item>

                <el-form-item label="密码" prop="pass">
                      <el-input placeholder="请输入密码" type="password" v-model="ruleForm.pass" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="确认密码" prop="checkPass">
                      <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off"></el-input>
                </el-form-item>

                <el-form-item label="邀请码" prop="inviteCode" :rules="[{ required: true, message: '邀请码不能为空'},]">
                    <el-input placeholder="请输入邀请码" type="text" v-model="ruleForm.inviteCode" autocomplete="off"></el-input>
                </el-form-item>

                 <el-form-item class="shortMargin" label="验证码" prop="vertificationCode" :rules="[{required: true, trigger: 'blur', validator: vertificationCode}]">
                  <el-input v-model="ruleForm.vertificationCode" type="text" placeholder="请输入验证码" autocomplete="off"></el-input>
                 </el-form-item>

                  <el-form-item class="shortMargin">
                      <el-collapse-transition>
                        <div v-show="vertificationCodeCorrect">
                          <el-alert class="transition-box" title="验证成功" type="success" center show-icon :closable="false"></el-alert>
                        </div>
                      </el-collapse-transition>
                  </el-form-item>

                  <el-form-item class="shortMargin">
                    <div class="shortHeight">
                      <VerificationCodeModule :identifyCode="identifyCode"></VerificationCodeModule>
                      <el-button @click="refreshCode" type='text'>看不清，换一张</el-button>
                    </div>
                  </el-form-item>
              
                <el-button type="primary" @click.stop.prevent="submitForm(ruleForm)" class="two-button-margin">注册</el-button>
                <el-button @click="cancelDialogVisible = true">取消</el-button>
              </el-form>
            </el-card>
  </el-row>

  <el-row type="flex" justify="center">
      <el-image :src="require('@/assets/images/master_and_disciples.gif')" :fit="fit"></el-image>
  </el-row>

  <el-dialog title="提示" :visible.sync="cancelDialogVisible" :width="dialogWidth" center>
      <i class="el-icon-question"></i>
      <span style="text-align:center">确定放弃本次注册？</span>
      <span slot="footer">
          <el-button @click="cancelDialogVisible = false" style="margin-right:10%">取消</el-button>
          <el-button type="danger" @click="cancelRegister()">确定</el-button>
      </span>
  </el-dialog>   
</div>
</template>

<script>
import VerificationCodeModule from '../components/VerificationCode'
import { verificationLogic } from '../mixins/verificationLogic'
import { register } from '../api/register'

export default {
  name: 'Register',
  data() {
      var checkName = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入用户名'));
        }
        else {
          var uPattern = /^[a-zA-Z0-9_-]{4,16}$/
          if(!uPattern.test(value)){
             callback(new Error('使用4到16位字母,数字,下划线,减号'));
          }
          else{
             callback();
          }
          callback();
        }
      };
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          if (this.ruleForm.checkPass !== '') {
            this.$refs.ruleForm.validateField('checkPass');
          }
          callback();
        }
      };
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.ruleForm.pass) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      return {
        fit: 'fill',
        cancelDialogVisible: false,
        ruleForm: {
          name: '',
          pass: '',
          checkPass: '',
          inviteCode: '',
          vertificationCode: ''
        },
        rules: {
          name: [
            { required: true, validator: checkName, trigger: 'blur' }
          ],
          pass: [
            { required: true, validator: validatePass, trigger: 'blur' },
            { min: 6, max: 15, message: '长度在 6 到 15 个字符', trigger: 'blur' }
          ],
          checkPass: [
            { required: true, validator: validatePass2, trigger: 'blur' }
          ],
        }
      }
  },

  computed:{
    dialogWidth: function(){
        var screen_width = document.body.clientWidth
        if(screen_width < 800){
            return '60%'
        }
        else if(screen_width < 1024){
            return '40%'
        }
        else if(screen_width < 1280){
            return '30%'
        }
        else{
            return '20%'
        }
    }
  },

  methods:{
    submitForm: function(data){
       console.log(data)
       this.$refs.ruleForm.validate(valid => {
         if(valid){
           register(this.ruleForm).then( () => {
              this.$message({ message: '注册成功，请登录', type: 'success' });
              this.$router.push({name: 'Login'})
           })
           .catch( () => {})
         }
         else{
            this.$message.error('请正确填写表单');
         }
       })
       this.refreshCode()
    },

    cancelRegister: function(){
       this.$message({
        message: '已取消注册，回到登录页面',
        type: 'info'
       });
       this.$router.push({name: 'Login'})
       this.cancelDialogVisible = false
    },
  },

  components:{
      VerificationCodeModule
  },

  mixins:[ verificationLogic ]

}
</script>

<style scoped>
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
          overflow-x: hidden;
        }

        .el-form-item{
          width: 280px;  
        }

        .two-button-margin{
          margin-left: 20%;
          margin-right: 10%;
        }

        .shortMargin{
          margin-bottom: 9px;
        }

        .shortHeight{
          line-height : 0px
        }

</style>