<template>
    <div v-if="isItemHorizontal" id="game-room-table-box">
        <div v-if="playerLocRoom.status === 1" id="game-room-table-horizontal-container">
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
        <div v-else id="game-room-table-playing-horizontal-container">
            <div id="game-room-table-horizontal-box-top">
                <el-tooltip  v-for="(card, n) in gameInfo.currentCard" :key="n" effect="light" placement="top">
                    <div slot="content">
                        {{ card.name }} <br/>来自玩家: {{ gameInfo.gamePlayer[gameInfo.currentCardPlayer].nickname }}
                    </div>
                    <el-image style="width: 20%; height:20vh" :style="{'margin-left': n === 0 ? ( 50 - 10*gameInfo.currentCard.length ) + '' + '%': '0%' }" :src="require('@/assets/images/poker/' + card.src  +'.png')"></el-image>
                </el-tooltip>
            </div>
            <div id="game-room-table-horizontal-box-bottom">
                <el-tooltip effect="light" content="连击牌数" placement="top">
                    <div style="margin-left: 10%;" class="game-room-table-horizontal-box-bottom-item">
                        <el-image :src="require('@/assets/images/poker/drop-cards.png')"></el-image>
                        <div class="white-color-font" style="margin-left: 20%;" :style="{'font-size':fontSize}">{{gameInfo.currentCombo}}张</div>
                    </div>
                </el-tooltip>
                <el-tooltip effect="light" content="剩余牌数" placement="top">
                    <div class="game-room-table-horizontal-box-bottom-item">
                        <el-image :src="require('@/assets/images/poker/poker-pool.png')" style="max-width:3vw"></el-image>
                        <div class="white-color-font" :style="{'font-size':fontSize}">{{gameInfo.remainCards}}张</div>
                    </div>
                </el-tooltip>
                <el-tooltip effect="light" content="出牌顺序" placement="top">
                    <div class="game-room-table-horizontal-box-bottom-item">
                        <el-image v-if="gameInfo.clockwise" :src="require('@/assets/images/clockwise.png')" style="max-width:4vw"></el-image>
                        <el-image v-else :src="require('@/assets/images/anti-clockwise.png')" style="max-width:4vw"></el-image>
                        <div class="white-color-font" :style="{'font-size':fontSize}">{{gameInfo.clockwise ? '顺时针' : '逆时针'}}</div>
                    </div>
                </el-tooltip>
            </div>
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
            gameInfo: {
                id: 0,
                remainCards: 100,
                clockwise: false,
                currentPlayer: 0,
                currentCard: [
                    { id: '01A', src: '2A', name: '妖怪2号' },
                    { id: '01B', src: '2B', name: '妖怪2号' },
                    { id: '01C', src: '2C', name: '妖怪2号' },
                    { id: '01D', src: '2D', name: '妖怪2号' },
                ],
                currentCardPlayer: 0,
                currentCombo: 0,
                gamePlayer: {
                    0: {id: 0, nickname: '', cards: 0, remainCards: [], maxCombo: 0, online: true, wukong: 0, bajie: 0, shaseng: 0, tangseng: 0, joker: 0},

                }    
            },
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

#game-room-table-playing-horizontal-container{
    margin-left: 5%;
    width: 90%; 
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

#game-room-table-horizontal-box-top{
    width: 100%;
    height: 20vh;
}

#game-room-table-horizontal-box-bottom{
    width: 100%;
    height: 10vh;
}

.game-room-table-horizontal-box-bottom-item{
    width: 6vw; 
    height: 10vh; 
    margin-left: 20%;
    margin-top: 10%; 
    display: inline-block;
}

.white-color-font{
    color: white;
}

</style>