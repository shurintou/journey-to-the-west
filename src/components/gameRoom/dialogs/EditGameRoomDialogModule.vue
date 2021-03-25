<template>
    <el-dialog title="修改设置" :visible.sync="editGameRoomDialogVisible" :width="dialogWidth" center :modal="false" :close-on-click-modal="false" :before-close="closeEditGameRoomDialog">
        <el-form  :model="gameRoomValidateForm" ref="gameRoomValidateForm">
          <el-form-item label="房间名" prop="roomName" :rules="[{ required: true, message: '请输入房间名', trigger: 'blur' }]">
              <el-input placeholder="请输入房间名" type="text" v-model="gameRoomValidateForm.roomName" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password" :rules="[{trigger: 'blur', validator: checkPassword}]">
              <el-input placeholder="非必填，4到8位数字" v-model="gameRoomValidateForm.password" autocomplete="off" maxlength="8" show-word-limit></el-input>
          </el-form-item>
        </el-form>
         <div>
          <span>使用牌数：{{ gameRoomValidateForm.cardNum }}副</span>
          <el-slider v-model="gameRoomValidateForm.cardNum" :min="4" :max="10" :step="1" :show-tooltip="false"></el-slider>
        </div>
        <div slot="footer">
            <el-button @click="closeEditGameRoomDialog" style="margin-right:10%">取消</el-button>
            <el-button type="success" @click="editGameRoom">修改</el-button>
        </div>
    </el-dialog>  
</template>


<script>
export default {
    data() {
        return {
            gameRoomValidateForm: {
                roomName: '',
                password: '', 
                cardNum: 4,
            },
            checkPassword:  (rule, value, callback) => {
                if (value === '') {
                    callback();
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
        editGameRoomDialogVisible: { type: Boolean, default: false },
        dialogWidth: { type: String, default: '' },
        ws: { type: WebSocket, default: null},
        playerLocRoom: { type: Object, default: null},
    },

    watch:{
        editGameRoomDialogVisible: function(newVal){
            if(newVal === true){
                this.gameRoomValidateForm.roomName = this.playerLocRoom.name
                this.gameRoomValidateForm.password = this.playerLocRoom.needPassword ? this.playerLocRoom.password : ''
                this.gameRoomValidateForm.cardNum = this.playerLocRoom.cardNum
            }
        }
    },

    methods:{
        editGameRoom: function(){
            this.$refs.gameRoomValidateForm.validate(valid => {
                if(valid){
                    if( this.gameRoomValidateForm.roomName === this.playerLocRoom.name && this.gameRoomValidateForm.password === this.playerLocRoom.password && this.gameRoomValidateForm.cardNum === this.playerLocRoom.cardNum ){
                        this.closeEditGameRoomDialog()
                        return
                    }
                    this.ws.send(JSON.stringify({ 
                        type: 'gameRoomList',
                        action: 'edit',
                        id: this.playerLocRoom.id, 
                        name: this.gameRoomValidateForm.roomName, 
                        needPassword: this.gameRoomValidateForm.password.length > 0 ? true: false,
                        password: this.gameRoomValidateForm.password, 
                        cardNum: this.gameRoomValidateForm.cardNum, 
                    }))
                    this.closeEditGameRoomDialog()
                }
            })
        },

        closeEditGameRoomDialog: function(){
            this.$emit('editGameRoomDialogVisible', false)
            this.$refs.gameRoomValidateForm.clearValidate()
            this.gameRoomValidateForm.roomName = this.playerLocRoom.name
            this.gameRoomValidateForm.password = this.playerLocRoom.needPassword ? this.playerLocRoom.password : ''
            this.gameRoomValidateForm.cardNum = this.playerLocRoom.cardNum
        },
    }
}
</script>