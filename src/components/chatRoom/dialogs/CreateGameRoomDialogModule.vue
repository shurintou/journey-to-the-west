<template>
    <el-dialog title="创建房间" :visible.sync="createGameRoomDialogVisible" :width="dialogWidth" center :modal="false"
        :close-on-click-modal="false" :before-close="closeCreateGameRoomDialog">
        <el-form :model="gameRoomValidateForm" ref="gameRoomValidateForm">
            <el-form-item label="房间名" prop="roomName" :rules="[{ required: true, message: '请输入房间名', trigger: 'blur' }]">
                <el-input placeholder="请输入房间名" type="text" v-model="gameRoomValidateForm.roomName" autocomplete="off"
                    maxlength="15" show-word-limit></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password" :rules="[{ trigger: 'blur', validator: checkPassword }]">
                <el-input placeholder="非必填，4到8位数字" v-model="gameRoomValidateForm.password" autocomplete="off" maxlength="8"
                    show-word-limit></el-input>
            </el-form-item>
        </el-form>
        <div>
            <span>使用牌数：{{ gameRoomValidateForm.cardNum }}副</span>
            <el-slider v-model="gameRoomValidateForm.cardNum" :min="2" :max="10" :step="1"
                :show-tooltip="false"></el-slider>
        </div>
        <div>
            <span>变身牌数：{{ gameRoomValidateForm.metamorphoseNum }}张/副</span>
            <el-slider v-model="gameRoomValidateForm.metamorphoseNum" :min="0" :max="10" :step="2"
                :show-tooltip="false"></el-slider>
        </div>
        <div slot="footer">
            <el-button @click="closeCreateGameRoomDialog" style="margin-right:10%">取消</el-button>
            <el-button type="success" @click="createGameRoom">创建</el-button>
        </div>
    </el-dialog>
</template>


<script lang="ts">
import Vue from 'vue'
import { ExecuteValidator, ExecuteValidate } from '@/type/validator'

const checkPassword: ExecuteValidator = (rule, value, callback) => {
    if (value === '') {
        callback();
    }
    else {
        const uPattern = /^[0-9]{4,8}$/
        if (!uPattern.test(value)) {
            callback(new Error('密码须4到8位数字'));
        }
        else {
            callback();
        }
        callback();
    }
}
export default Vue.extend({
    data() {
        return {
            gameRoomValidateForm: {
                roomName: '',
                password: '',
                cardNum: 2,
                metamorphoseNum: 4,
            },
            checkPassword: checkPassword,
        }
    },

    props: {
        createGameRoomDialogVisible: { type: Boolean, default: false },
        dialogWidth: { type: String, default: '' },
        ws: { type: WebSocket, default: null },
    },

    watch: {
        createGameRoomDialogVisible: function (newVal: boolean) {
            if (newVal === true) {
                this.gameRoomValidateForm.roomName = this.$stock.state.nickname + ' 的房间'
            }
        }
    },

    methods: {
        createGameRoom: function () {
            if (this.$stock.state.avatar_id === 0) {
                this.$message.warning('请先设置头像和昵称')
                return
            }
            const gameRoomValidateFormRef = this.$refs.gameRoomValidateForm as Element & ExecuteValidate
            gameRoomValidateFormRef.validate(valid => {
                if (valid) {
                    this?.ws?.send(JSON.stringify({
                        type: 'gameRoomList',
                        id: NaN,
                        name: this.gameRoomValidateForm.roomName,
                        status: 0,
                        needPassword: this.gameRoomValidateForm.password.length > 0 ? true : false,
                        password: this.gameRoomValidateForm.password,
                        cardNum: this.gameRoomValidateForm.cardNum,
                        metamorphoseNum: this.gameRoomValidateForm.metamorphoseNum,
                        owner: this.$stock.state.id,
                        lastLoser: 0,
                        playerList: {
                            0: { id: this.$stock.state.id, cards: 0, win: 0, loss: 0, ready: false },
                            1: { id: 0, cards: 0, win: 0, loss: 0, ready: false },
                            2: { id: 0, cards: 0, win: 0, loss: 0, ready: false },
                            3: { id: 0, cards: 0, win: 0, loss: 0, ready: false },
                            4: { id: 0, cards: 0, win: 0, loss: 0, ready: false },
                            5: { id: 0, cards: 0, win: 0, loss: 0, ready: false },
                            6: { id: 0, cards: 0, win: 0, loss: 0, ready: false },
                            7: { id: 0, cards: 0, win: 0, loss: 0, ready: false },
                        }
                    }))
                    this.closeCreateGameRoomDialog()
                }
            })
        },

        closeCreateGameRoomDialog: function () {
            this.$emit('createGameRoomDialogVisible', false)
            const gameRoomValidateFormRef = this.$refs.gameRoomValidateForm as Element & ExecuteValidate
            gameRoomValidateFormRef.clearValidate()
            this.gameRoomValidateForm.roomName = this.$stock.state.nickname + ' 的房间'
            this.gameRoomValidateForm.password = ''
            this.gameRoomValidateForm.cardNum = 2
            this.gameRoomValidateForm.metamorphoseNum = 4
        },
    }
})
</script>