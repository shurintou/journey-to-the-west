<template>
    <div v-if="isItemHorizontal" id="game-room-table-box">
        <div v-if="playerLocRoom.status === 0" id="game-room-table-horizontal-container">
            <div @click="function(){ if(playerLocRoom.owner === player.id) editGameRoomDialogVisible = true }">
                <el-alert :style="{'font-size': fontSize}" :class="{'clickable': playerLocRoom.owner === player.id}" :title="playerLocRoom.name + ( playerLocRoom.owner === player.id ? ' [修改]' : '')" :description="  playerLocRoom.needPassword ? ' 密码： ' +  playerLocRoom.password : '' " type="info" center :closable="false"></el-alert>
            </div>
            <el-tooltip  v-for="n in playerLocRoom.cardNum" :key="n" effect="light" :content="'游戏使用牌数： ' + playerLocRoom.cardNum + '副'" placement="right-start">
                <el-image class="game-room-table-horizontal-poker-pool" :style="{'margin-left': n === 1 ? ( 50 - 5*playerLocRoom.cardNum ) + '' + '%': '0%' }" :src="require('@/assets/images/poker/poker-pool.png')"></el-image>
            </el-tooltip>
            <div id="game-room-table-horizontal-bottom" :style="{'margin-top': playerLocRoom.needPassword ? '14vh' : '20vh'}">
                <el-tag class="game-room-table-horizontal-record-item" type="info" effect="dark" :size="tagSize" :style="{'font-size': fontSize}">{{ '吃牌数： ' + player.cards + ' 张' }}</el-tag>
                <el-tag class="game-room-table-horizontal-record-item" type="success" effect="dark" :size="tagSize" :style="{'font-size': fontSize}">{{ '吃鸡： ' + player.win + ' 局' }}</el-tag>
                <el-tag class="game-room-table-horizontal-record-item" type="danger" effect="dark" :size="tagSize" :style="{'font-size': fontSize}">{{ '拉跨： ' + player.loss + ' 局' }}</el-tag>
            </div>
        </div>
        <div v-else id="game-room-table-horizontal-container">
            <el-image :src="require('@/assets/images/poker/1A.png')"></el-image>
        </div>
        <EditGameRoomDialogModule :editGameRoomDialogVisible="editGameRoomDialogVisible" :playerLocRoom="playerLocRoom" :dialogWidth="dialogWidth" :ws="ws" @editGameRoomDialogVisible="function(value){ editGameRoomDialogVisible = value}"></EditGameRoomDialogModule>
    </div>
    <div v-else id="game-room-table-box">
        <div v-if="playerLocRoom.status === 0" id="game-room-table-vertical-container">
             <div @click="function(){ if(playerLocRoom.owner === player.id) editGameRoomDialogVisible = true }" id="game-room-table-vertical-room-info-top">
                <el-alert :style="{'font-size': fontSize}" :class="{'clickable': playerLocRoom.owner === player.id}" :title="playerLocRoom.name + ( playerLocRoom.owner === player.id ? ' [修改]' : '')" :description="  playerLocRoom.needPassword ? ' 密码： ' +  playerLocRoom.password : '' " type="info" center :closable="false"></el-alert>
            </div>
            <div id="game-room-table-vertical-room-info-middle">
                <el-tooltip  v-for="n in playerLocRoom.cardNum" :key="n" effect="light" :content="'游戏使用牌数： ' + playerLocRoom.cardNum + '副'" placement="right-start">
                    <el-image :fit="'contain'" class="game-room-table-horizontal-poker-pool" :style="{'margin-left': n === 1 ? ( 50 - 5*playerLocRoom.cardNum ) + '' + '%': '0%' }" :src="require('@/assets/images/poker/poker-pool.png')"></el-image>
                </el-tooltip>
            </div>
            <div id="game-room-table-vertical-room-info-bottom">
                <el-tag class="game-room-table-horizontal-record-item" type="info" effect="dark" :size="tagSize" :style="{'font-size': fontSize}">{{ '吃牌数： ' + player.cards + ' 张' }}</el-tag>
                <el-tag class="game-room-table-horizontal-record-item" type="success" effect="dark" :size="tagSize" :style="{'font-size': fontSize}">{{ '吃鸡： ' + player.win + ' 局' }}</el-tag>
                <el-tag class="game-room-table-horizontal-record-item" type="danger" effect="dark" :size="tagSize" :style="{'font-size': fontSize}">{{ '拉跨： ' + player.loss + ' 局' }}</el-tag>
            </div>
        </div>
        <div v-else id="game-room-table-vertical-container">
            <el-image :src="require('@/assets/images/poker/1A.png')"></el-image>
        </div>
        <EditGameRoomDialogModule :editGameRoomDialogVisible="editGameRoomDialogVisible" :playerLocRoom="playerLocRoom" :dialogWidth="dialogWidth" :ws="ws" @editGameRoomDialogVisible="function(value){ editGameRoomDialogVisible = value}"></EditGameRoomDialogModule>
    </div>
</template>

<script>
import EditGameRoomDialogModule from './dialogs/EditGameRoomDialogModule'

export default {
    data() {
        return{
            editGameRoomDialogVisible: false,
        }
    },

    props:{
        dialogWidth: { type: String, default: ''},
        tagSize: { type: String, default: ''},
        fontSize: { type: String, default: ''},
        isItemHorizontal: { type: Boolean, default: false},
        playerLocRoom: { type: Object, default: null},
        player: { type: Object, default: null },
        ws: { type: WebSocket, default: null},
    },

    components:{
        EditGameRoomDialogModule
    },
}
</script>

<style>

#game-room-table-box{
    width: 100%;
    height: 100%;
}

#game-room-table-horizontal-container{
    margin-left: 20%;
    width: 60%; 
    height: 80%;
}

#game-room-table-horizontal-bottom{
    display: inline-block; 
    width: 100%;
}

.game-room-table-horizontal-poker-pool{
    margin-top: 5%; 
    width: 10%; 
    height: 30%;
}

.game-room-table-horizontal-record-item{
    margin-left: 3%;
}

#game-room-table-vertical-container{
    margin-left: 2%;
    width: 100%;
    height: 60vh;
}

#game-room-table-vertical-room-info-top{
    width: 100%;
    height: 10vh;
    padding-top: 10vh;
    text-align: center;
}

#game-room-table-vertical-room-info-middle{
    width: 100%;
    height: 10vh;
    padding-top: 5vh;
}

#game-room-table-vertical-room-info-bottom{
    margin-top: 15vh;
    width: 100%;
    height: 10vh;
}

.clickable:hover{
    cursor: pointer;
}

</style>