<template>
<div id="login_root">
  <el-row type="flex" justify="center">
    <el-col :xs="{span:10,offset:9}" :sm="{span:10,offset:10}" :md="{span:10,offset:10}" :lg="{span:6,offset:10}">
      <el-image :src="require('@/assets/images/head_icon.png')" :fit="fit"></el-image>
    </el-col>
    <el-col :span="6">
      <div class="grid-content"></div>
    </el-col>
  </el-row>

  <el-row type="flex" justify="center">
        <el-col :xs="{span:22,offset:1}" :sm="{span:16,offset:4}" :md="{span:12,offset:4}" :lg="{span:12,offset:6}">
            <el-card shadow="always">
              <h1 style="text-align: center;">注册信息</h1>
              <el-divider></el-divider>
              <el-form  :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px">
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
              
                <el-button type="primary" @click.stop.prevent="submitForm(ruleForm)" class="two-button-margin">注册</el-button>
                <el-button @click="cancelDialogVisible = true">取消</el-button>
              </el-form>

            </el-card>
        </el-col>
  </el-row>

  <el-row type="flex" justify="center">
    <el-col :xs="{span:23,offset:0}" :sm="{span:16,offset:0}" :md="{span:12,offset:1}" :lg="{span:12,offset:0}">
        <el-image :src="require('@/assets/images/master_and_disciples.gif')" :fit="fit"></el-image>
    </el-col>
  </el-row>

  <el-dialog title="提示" :visible.sync="cancelDialogVisible" :width="dialogWidth" center>
      <i class="el-icon-question"></i>
      <span style="text-align:center">确定放弃本次注册？</span>
      <span slot="footer" class="dialog-footer">
          <el-button @click="cancelDialogVisible = false" style="margin-right:10%">取消</el-button>
          <el-button type="primary" @click="cancelRegister()">确定</el-button>
      </span>
  </el-dialog>   
</div>
</template>

<script>
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
        },
        rules: {
          name: [
            { required: true, validator: checkName, trigger: 'blur' }
          ],
          pass: [
            { required: true, validator: validatePass, trigger: 'blur' }
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
       this.$message({
          message: '注册成功，请登录',
          type: 'success'
        });
       this.$router.push({name: 'Login'})
        // this.$message.error('邀请码不正确或已被使用');
    },

    cancelRegister: function(){
       this.$message({
        message: '已取消注册，回到登录页面',
        type: 'info'
       });
       this.$router.push({name: 'Login'})
       this.cancelDialogVisible = false
    },
  }
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

</style>