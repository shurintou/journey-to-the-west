<template>
    <el-dialog :title="getPlayerNickname() + '想要与你交换位置'" :visible.sync="askChangeSeatDialogVisible" :width="dialogWidth"
        center :before-close="closeAskChangeSeatDialog" :show-close="false">
        <span slot="footer">
            <el-button :size="buttonSize" type="danger" @click="disagreeChangeSeat" style="margin-right:10%">拒绝</el-button>
            <el-button :size="buttonSize" type="success" @click="agreeChangeSeat">同意</el-button>
        </span>
    </el-dialog>
</template>


<script lang="ts">
import Vue, { PropType } from 'vue'
import { WebSocketChangeSeat } from '@/type/room'
import { WebSocketPlayer } from '@/type/player'

export default Vue.extend({
    data() {
        return {

        }
    },

    props: {
        askChangeSeatDialogVisible: { type: Boolean, default: false },
        dialogWidth: { type: String, default: '' },
        askChangeSeatInfo: { type: Object as PropType<WebSocketChangeSeat>, default: null },
        playerList: { type: Array as PropType<WebSocketPlayer[]>, default: [] },
        fontSize: { type: String, default: '' },
        buttonSize: { type: String, default: '' },
        ws: { type: WebSocket, default: null },
    },

    methods: {
        closeAskChangeSeatDialog: function () {
            this.$emit('askChangeSeatDialogVisible', false)
        },

        getPlayerNickname: function () {
            if (this.askChangeSeatInfo) {
                for (let i = 0; i < this.playerList.length; i++) {
                    if (this.playerList[i].id === this.askChangeSeatInfo.sourceId) {
                        return this.playerList[i].nickname
                    }
                }
            }
            return '空位'
        },

        agreeChangeSeat: function () {
            let agreeChangeSeatDto = this.askChangeSeatInfo
            agreeChangeSeatDto.confirm = true
            this.ws?.send(JSON.stringify(agreeChangeSeatDto))
            this.$emit('askChangeSeatDialogVisible', false)
        },

        disagreeChangeSeat: function () {
            this.ws?.send(JSON.stringify({ type: 'gameRoomList', action: 'disagreeChangeSeat', id: this.askChangeSeatInfo.id, playerId: this.askChangeSeatInfo.sourceId, refusePlayerNickname: this.$stock.state.nickname }))
            this.$emit('askChangeSeatDialogVisible', false)
        }

    }
})
</script>