<template>
    <el-dialog title="提示" :visible.sync="leaveRoomDialogVisible" :width="dialogWidth" center
        :before-close="closeLeaveDialog">
        <i class="el-icon-question"></i>
        <span style="text-align:center">确定要离开房间吗？</span>
        <span slot="footer">
            <el-button @click="closeLeaveDialog" style="margin-right:10%">取消</el-button>
            <el-button type="danger" @click="leaveRoom">确定</el-button>
        </span>
    </el-dialog>
</template>


<script lang="ts">
import Vue, { PropType } from 'vue'
import { WebSocketGameRoom } from '@/type/room'

export default Vue.extend({
    data() {
        return {

        }
    },

    props: {
        leaveRoomDialogVisible: { type: Boolean, default: false },
        dialogWidth: { type: String, default: '' },
        ws: { type: WebSocket, default: null },
        playerLocRoom: { type: Object as PropType<WebSocketGameRoom>, default: null },

    },

    methods: {
        closeLeaveDialog: function () {
            this.$emit('leaveRoomDialogVisible', false)
        },

        leaveRoom: function () {
            let seatIndex = 0
            for (let i = 0; i < Object.keys(this.playerLocRoom.playerList).length; i++) {
                if (this.playerLocRoom.playerList[i].id === this.$stock.state.id) {
                    seatIndex = i
                    break
                }
            }
            this.ws?.send(JSON.stringify({ type: 'gameRoomList', id: -1 * this.playerLocRoom.id, nickname: this.$stock.state.nickname, seatIndex: seatIndex }))
            this.$emit('leaveRoomDialogVisible', false)
        }

    }
})
</script>