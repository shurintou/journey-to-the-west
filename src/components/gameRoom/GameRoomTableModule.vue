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
        <div v-if="playerLocRoom.status === 1 && gameInfo !== null" id="game-room-table-playing-horizontal-container">
            <div id="game-room-table-horizontal-box-top">
                <template v-if="gameInfo.currentCard.length > 0">
                    <el-tooltip  v-for="(cardIndex, n) in gameInfo.currentCard" :key="n" effect="light" placement="top">
                        <div slot="content">
                            {{ cardList[cardIndex].name }} <br/>来自玩家: {{ gameInfo.gamePlayer[gameInfo.currentCardPlayer].nickname }}
                        </div>
                        <el-image style="width: 20%; height:20vh" :style="{'margin-left': n === 0 ? ( 50 - 10*gameInfo.currentCard.length ) + '' + '%': '0%' }" :src="require('@/assets/images/poker/' + cardList[cardIndex].src  +'.png')"></el-image>
                    </el-tooltip>
                </template>
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
        <div v-if="playerLocRoom.status === 1 && gameInfo !== null" id="game-room-table-vertical-container">
            <div id="game-room-table-vertical-box-top">
                <template v-if="gameInfo.currentCard.length > 0">
                    <el-tooltip  v-for="(cardIndex, n) in gameInfo.currentCard" :key="cardIndex + '' + n" effect="light" placement="top">
                        <div slot="content">
                            {{ cardList[cardIndex].name }} <br/>来自玩家: {{ gameInfo.gamePlayer[gameInfo.currentCardPlayer].nickname }}
                        </div>
                        <el-image style="width: 20%; height:10vh" :style="{'margin-left': n === 0 ? ( 50 - 10*gameInfo.currentCard.length ) + '' + '%': '0%' }" :src="require('@/assets/images/poker/' + cardList[cardIndex].src  +'.png')"></el-image>
                    </el-tooltip>
                </template>
            </div>
            <div id="game-room-table-vertical-box-bottom">
                <el-tooltip effect="light" content="连击牌数" placement="top">
                    <div style="margin-left: 10%;" class="game-room-table-vertical-box-bottom-item">
                        <el-image :src="require('@/assets/images/poker/drop-cards.png')"></el-image>
                        <div class="white-color-font" style="margin-left: 20%;" :style="{'font-size':fontSize}">{{gameInfo.currentCombo}}张</div>
                    </div>
                </el-tooltip>
                <el-tooltip effect="light" content="剩余牌数" placement="top">
                    <div class="game-room-table-vertical-box-bottom-item">
                        <el-image :src="require('@/assets/images/poker/poker-pool.png')" style="max-width:3vw"></el-image>
                        <div class="white-color-font" :style="{'font-size':fontSize}">{{gameInfo.remainCards}}张</div>
                    </div>
                </el-tooltip>
                <el-tooltip effect="light" content="出牌顺序" placement="top">
                    <div class="game-room-table-vertical-box-bottom-item">
                        <el-image v-if="gameInfo.clockwise" :src="require('@/assets/images/clockwise.png')" style="max-width:4vw"></el-image>
                        <el-image v-else :src="require('@/assets/images/anti-clockwise.png')" style="max-width:4vw"></el-image>
                        <div class="white-color-font" :style="{'font-size':fontSize}">{{gameInfo.clockwise ? '顺时针' : '逆时针'}}</div>
                    </div>
                </el-tooltip>
            </div>
        </div>
        <EditGameRoomDialogModule :editGameRoomDialogVisible="editGameRoomDialogVisible" :playerLocRoom="playerLocRoom" :dialogWidth="dialogWidth" :ws="ws" @editGameRoomDialogVisible="function(value){ editGameRoomDialogVisible = value}"></EditGameRoomDialogModule>
    </div>
</template>

<script>
import EditGameRoomDialogModule from './dialogs/EditGameRoomDialogModule'
import { cardList } from '../../mixins/gameRoom/cardList'


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
        gameInfo: { type: Object, default: null },
        ws: { type: WebSocket, default: null},
    },

    components:{
        EditGameRoomDialogModule
    },

    mixins:[ cardList ],
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

#game-room-table-vertical-box-bottom{
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

.game-room-table-vertical-box-bottom-item{
    width: 6vw; 
    height: 5vh; 
    margin-left: 20%;
    margin-top: 10%; 
    display: inline-block;
}

.white-color-font{
    color: white;
}

#game-room-table-vertical-box-top{
    padding-top: 20vh;
    width: 100%;
    height: 20vh;
}

</style>