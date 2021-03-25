<template>
    <el-dialog title="房间密码" :visible.sync="enterGameRoomDialogVisible" :width="dialogWidth" center :modal="false" :close-on-click-modal="false" :before-close="closeEnterGameRoomDialog">
        <el-form  :model="gameRoomValidateForm" ref="gameRoomValidateForm" @submit.native.prevent="enterGameRoom">
          <el-form-item label="密码" prop="password" :rules="[{trigger: 'blur', validator: checkPassword}]">
              <el-input placeholder="4到8位数字" v-model="gameRoomValidateForm.password" autocomplete="off" maxlength="8" show-word-limit></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer">
            <el-button @click="closeEnterGameRoomDialog" style="margin-right:10%">取消</el-button>
            <el-button type="success" @click="enterGameRoom">确定</el-button>
        </div>
  </el-dialog>  
</template>



<script>
export default {
    data() {
        return {
            gameRoomValidateForm: {
                password: '', 
            },
            checkPassword:  (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('密码不能为空'));
                }
                else {
                    var uPattern = /^[0-9]{4,8}$/
                    if(!uPattern.test(value)){
                    callback(new Error('密码须4到8位数字'));
                    }
                    else{
                    callback();
                    }
                    callback();
                }
            },
        }
    },

    props:{
        enterGameRoomDialogVisible: { type: Boolean, default: false },
        dialogWidth: { type: String, default: '' },
        enterRoomDto: { type: Object, default: null },
        ws: { type: WebSocket, default: null},
    },

    watch:{
        enterGameRoomDialogVisible: function(newVal){
            if(newVal === true){
                this.gameRoomValidateForm.password = ''
                this.$refs.gameRoomValidateForm.clearValidate()
            }
        }
    },

    methods:{
        enterGameRoom: function(){
            this.$refs.gameRoomValidateForm.validate(valid => {
                if(valid){
                    this.ws.send(JSON.stringify({ 
                    type: 'gameRoomList',
                    id: this.enterRoomDto.id, 
                    seatIndex: this.enterRoomDto.seatIndex,
                    password: this.gameRoomValidateForm.password,
                    action: 'enter',
                    }))
                    this.closeEnterGameRoomDialog()
                }
            })
        },

        closeEnterGameRoomDialog: function(){
            this.$emit('enterGameRoomDialogVisible', false)
            this.gameRoomValidateForm.password = ''
            this.$refs.gameRoomValidateForm.clearValidate()
        },
    }
}
</script>