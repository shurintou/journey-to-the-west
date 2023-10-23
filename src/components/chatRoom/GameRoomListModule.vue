<template>
    <div id="room-list-container">
        <div v-for="(gameRoom, index) in gameRoomList" :key="gameRoom.id" class="room-list-item"
            :style="{ 'width': gameRoomItemWidth + '%', 'margin-left': (100 - gameRoomItemWidth) / 2 + '%', 'margin-top': index === 0 ? '1%' : '0px', }">
            <div class="room-list-title"
                :style="{ 'background-color': gameRoom.status === 0 ? (isRoomFull(gameRoom.playerList) ? '#E6A23C' : '#67c23a') : '#F56C6C' }"
                @click="enterGameRoom(gameRoom, -1)">
                <span class="room-list-text" :style="{ 'font-size': largeFontSize }">{{ (gameRoom.name) + ' （' +
                    (gameRoom.status === 0 ? (isRoomFull(gameRoom.playerList) ? '已满员' : '可进入') : '游戏中') + '）' }}
                    <el-tooltip effect="light" content="进入该房间需要密码" placement="right" v-if="gameRoom.needPassword">
                        <i class="el-icon-lock"></i>
                    </el-tooltip>
                </span>
            </div>
            <div v-for="(player, seatIndex) in gameRoom.playerList" :key="seatIndex" class="room-list-player"
                :style="{ 'margin-left': seatIndex === 0 ? '2%' : 0 }">
                <el-tooltip v-if="player.id !== 0" effect="light" :content="getPlayer(player.id).nickname"
                    placement="bottom">
                    <el-image class="room-list-avatar" :fit="'cover'"
                        :src="getAvatarUrl(getPlayer(player.id).avatar_id)"></el-image>
                </el-tooltip>
                <el-tooltip v-else effect="light" :content="getPlayer(player.id).nickname + (seatIndex + 1)"
                    placement="bottom">
                    <el-image class="room-list-avatar" :fit="'cover'" :src="getAvatarUrl(getPlayer(player.id).avatar_id)"
                        @click="enterGameRoom(gameRoom, seatIndex)"></el-image>
                </el-tooltip>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue'
import { GamePlayerSeatIndex } from '@/type/index'
import { WebSocketPlayer } from '@/type/player'
import { WebSocketGameRoom, RoomPlayers } from '@/type/room'
import { aiPlayerMetaData } from '@/mixins/gameRoom/aiPlayer'

export default Vue.extend({
    data() {
        return {

        }
    },

    props: {
        playerList: { type: Array as PropType<WebSocketPlayer[]>, default: [] },
        gameRoomItemWidth: { type: Number, default: 90 },
        gameRoomList: { type: Array as PropType<WebSocketGameRoom[]>, default: [] },
        largeFontSize: { type: String, default: '' },
        ws: { type: WebSocket, default: null },
    },

    methods: {
        getPlayer: function (n: number): WebSocketPlayer | { nickname: '空位', avatar_id: 0 } {
            if (n < 0) { // id小于0为电脑玩家
                return aiPlayerMetaData[-1 * n]
            }
            for (let i = 0; i < this.playerList.length; i++) {
                if (this.playerList[i].id === n) {
                    return this.playerList[i]
                }
            }
            return { nickname: '空位', avatar_id: 0 }
        },

        getAvatarUrl: function (avatarId: number) {
            return require("@/assets/images/avatar/avatar_" + avatarId + "-min.png")
        },

        isRoomFull: function (playerList: RoomPlayers): boolean {
            let flag = true
            for (let i = 0; i < Object.keys(playerList).length; i++) {
                if (playerList[i as GamePlayerSeatIndex].id === 0) {
                    flag = false
                    break
                }
            }
            return flag
        },

        enterGameRoom: function (gameRoom: WebSocketGameRoom, seatIndex: GamePlayerSeatIndex | -1): void {
            if (this.$stock.state.avatar_id === 0) {
                this.$message.warning('请先设置头像和昵称')
                return
            }
            if (gameRoom.status === 1) {
                this.$message.warning('正在游戏中，无法加入')
                return
            }
            if (this.isRoomFull(gameRoom.playerList)) {
                this.$message.warning('已满员，无法加入')
                return
            }
            if (gameRoom.needPassword) {
                this.$emit('enterGameRoomDialogVisible', true)
                this.$emit('enterRoomDto', { id: gameRoom.id, seatIndex: seatIndex })
            }
            else {
                this.ws?.send(JSON.stringify({
                    type: 'gameRoomList',
                    id: gameRoom.id,
                    seatIndex: seatIndex,
                    action: 'enter',
                }))
            }
        },
    },

})
</script>

<style>
#room-list-container {
    width: 100%;
    height: 100%;
}

.room-list-item {
    height: 32%;
    margin-bottom: 2%;
    background-size: 100% 100%;
    border-radius: 10px;
    background-image: url('~@/assets/images/gameroom_background.png');
}

.room-list-item:hover {
    cursor: pointer;
}

.room-list-title {
    height: 30%;
    width: 100%;
    border-radius: 5px;
}

.room-list-text {
    height: 90%;
    color: #fff;
    margin-top: 10%;
    margin-left: 2%;
}

.room-list-player {
    width: 12%;
    height: 70%;
    display: inline-block;
}

.room-list-avatar {
    height: 90%;
    width: 100%;
    display: inline-block;
}
</style>