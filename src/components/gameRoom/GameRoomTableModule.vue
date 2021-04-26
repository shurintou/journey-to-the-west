<template>
    <div v-if="isItemHorizontal" id="game-room-table-box">
        <div v-if="playerLocRoom.status === 0" id="game-room-table-horizontal-container">
            <div @click="function(){ if(playerLocRoom.owner === player.id) editGameRoomDialogVisible = true }">
                <el-alert style="margin-top: 3vh; padding: 0px" :style="{'font-size': fontSize}" :class="{'clickable': playerLocRoom.owner === player.id}" :title="playerLocRoom.name + ( playerLocRoom.owner === player.id ? ' [修改]' : '')" :description="  playerLocRoom.needPassword ? ' 密码： ' +  playerLocRoom.password : '' " type="info" center :closable="false"></el-alert>
            </div>
            <el-tooltip  v-for="n in playerLocRoom.cardNum" :key="n" effect="light" :content="'游戏使用牌数： ' + playerLocRoom.cardNum + '副'" placement="right-start">
                <el-image class="game-room-table-horizontal-poker-pool" :style="{'margin-left': n === 1 ? ( 50 - 5*playerLocRoom.cardNum ) + '' + '%': '0%' }" :src="require('@/assets/images/poker/poker-pool.png')"></el-image>
            </el-tooltip>
            <div id="game-room-table-horizontal-bottom" :style="{'margin-top': playerLocRoom.needPassword ? '14vh' : '20vh'}">
                <el-tag class="game-room-table-horizontal-record-item" type="info" effect="dark" :size="tagSize" :style="{'font-size': fontSize}">{{ '收牌数： '}} <CardsNum :value="player.cards"></CardsNum> {{' 张' }}</el-tag>
                <el-tag class="game-room-table-horizontal-record-item" type="success" effect="dark" :size="tagSize" :style="{'font-size': fontSize}">{{ '吃鸡： '}} <CardsNum :value="player.win"></CardsNum> {{' 局' }}</el-tag>
                <el-tag class="game-room-table-horizontal-record-item" type="danger" effect="dark" :size="tagSize" :style="{'font-size': fontSize}">{{ '拉跨： '}} <CardsNum :value="player.loss"></CardsNum> {{' 局' }}</el-tag>
            </div>
        </div>
        <div v-if="playerLocRoom.status === 1 && gameInfo !== null" id="game-room-table-playing-horizontal-container">
            <div id="game-room-table-horizontal-box-info">
                <p id="game-info-text-box" class="white-color-font" :style="{'font-size': textFontSize}">{{gameTableTexts ? gameTableTexts[0]: ''}}</p>
            </div>
            <div id="game-room-table-horizontal-box-top" @click="$emit('playCard')">
                <template v-if="gameInfo.currentCard.length > 0">
                    <div v-for="(cardIndex, n) in gameInfo.currentCard" :key="cardIndex + '' + n" style="text-align:center; height: 15vh; display: inline-block" :style="{'width': tablePokersWidth, 'margin-left': n === 0 ? tablePokerLeftMargin: '0%' }">
                        <p class="white-color-font" :style="{'font-size': fontSize}">{{ cardList[cardIndex].name  +  (cardList[cardIndex].num === 100? '' : ' (' + cardList[cardIndex].suit + ')') }}</p>
                        <el-image style="height: 15vh" :src="require('@/assets/images/poker/' + cardList[cardIndex].src  +'.png')"></el-image>
                        <p class="white-color-font" :style="{'font-size': fontSize}">来自: {{ gameInfo.gamePlayer[gameInfo.currentCardPlayer].nickname }}</p>
                    </div>
                </template>
                <template v-if="gameInfo.jokerCard.length > 0">
                    <div v-for="(cardIndex, n) in gameInfo.jokerCard" :key="cardIndex + '' + n" style="text-align:center; height: 15vh; display: inline-block"  :style="{'width': tablePokersWidth, 'margin-left': n === 0 && gameInfo.currentCard.length === 0 ? tablePokerLeftMargin: '0%'}">
                        <p class="white-color-font" :style="{'font-size': fontSize}">{{ cardList[cardIndex].name }}</p>
                        <el-image style="height: 15vh" :src="require('@/assets/images/poker/' + cardList[cardIndex].src  +'.png')"></el-image>
                        <p class="white-color-font" :style="{'font-size': fontSize}">来自: {{ gameInfo.gamePlayer[gameInfo.jokerCardPlayer].nickname }}</p>
                    </div>
                </template>
            </div>
            <div id="game-room-table-horizontal-box-middle">
                <RemainCardsNum :isHorizontal="true" :gameInfo="gameInfo" :fontSize="fontSize"></RemainCardsNum>
                <ComboCardsNum :isHorizontal="true" :gameInfo="gameInfo" :fontSize="fontSize"></ComboCardsNum>
                <Clockwise :isHorizontal="true" :gameInfo="gameInfo" :fontSize="fontSize"></Clockwise>
            </div>
            <el-tooltip effect="light" placement="top" :manual="true" v-model="isTooltipShow">
                <div slot="content">
                    <p v-for="(item, index) in gameTextFromPlayer" :key="index + '' + item">{{ item }}</p>
                </div> 
                 <el-popover placement="top" width="160" v-model="isPopoverVisible">
                    <div style="margin: 0">
                        <QuickChatSelector :labelMessage="'向全体发言'" @emitSelectedTextToPlayer="sentSelectedTextToPlayer"></QuickChatSelector>
                    </div>
                    <template  slot="reference">
                        <div id="game-room-table-horizontal-box-bottom">
                            <transition leave-active-class="scale-out-top">
                                <el-tag v-show="getGamePlayer.remainCards.length > 0" class="game-room-table-horizontal-record-item" type="success" effect="dark" :size="tagSize" :style="{'font-size': fontSize}">{{ '手牌数： ' + getGamePlayer.remainCards.length + ' 张' }}</el-tag>
                            </transition>
                            <el-tag :class="{'increase-num' : allCardsFlag}" class="game-room-table-horizontal-record-item" type="info" effect="dark" :size="tagSize" :style="{'font-size': fontSize}">{{ '总收牌： '}} <CardsNum :value="getGamePlayer.cards" @increased="increasedHandler('all')"></CardsNum> {{' 张' }}</el-tag>
                            <el-tag :class="{'increase-num' : comboFlag}" class="game-room-table-horizontal-record-item" type="danger" effect="dark" :size="tagSize" :style="{'font-size': fontSize}">{{ '最大收牌： '}} <CardsNum :value="getGamePlayer.maxCombo" @increased="increasedHandler('combo')"></CardsNum> {{' 张' }}</el-tag>
                        </div>
                    </template>
                 </el-popover>
            </el-tooltip>
        </div>
        <EditGameRoomDialogModule :editGameRoomDialogVisible="editGameRoomDialogVisible" :playerLocRoom="playerLocRoom" :dialogWidth="dialogWidth" :ws="ws" @editGameRoomDialogVisible="function(value){ editGameRoomDialogVisible = value}"></EditGameRoomDialogModule>
    </div>
    <div v-else id="game-room-table-box-vertical">
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
                <el-tag class="game-room-table-horizontal-record-item" type="info" effect="dark" :size="tagSize" :style="{'font-size': fontSize}">{{ '收牌数： '}} <CardsNum :value="player.cards"></CardsNum> {{' 张' }}</el-tag>
                <el-tag class="game-room-table-horizontal-record-item" type="success" effect="dark" :size="tagSize" :style="{'font-size': fontSize}">{{ '吃鸡： '}} <CardsNum :value="player.win"></CardsNum> {{' 局' }}</el-tag>
                <el-tag class="game-room-table-horizontal-record-item" type="danger" effect="dark" :size="tagSize" :style="{'font-size': fontSize}">{{ '拉跨： '}} <CardsNum :value="player.loss"></CardsNum> {{' 局' }}</el-tag>
            </div>
        </div>
        <div v-if="playerLocRoom.status === 1 && gameInfo !== null" id="game-room-table-vertical-container">
            <div id="game-room-table-vertical-box-info">
                <p id="game-info-text-box" class="white-color-font" :style="{'font-size': textFontSize}">{{gameTableTexts? gameTableTexts[0] : ''}}</p>
            </div>
            <div id="game-room-table-vertical-box-top" @click="$emit('playCard')">
                <template v-if="gameInfo.currentCard.length > 0">
                     <div v-for="(cardIndex, n) in gameInfo.currentCard" :key="cardIndex + '' + n" style="text-align:center; height: 10vh; display: inline-block; width: 20%" :style="{'margin-left': n === 0 ? ( 50 - 10*gameInfo.currentCard.length ) + '' + '%': '0%' }">
                        <p class="white-color-font" :style="{'font-size': fontSize}">{{ cardList[cardIndex].name  +  (cardList[cardIndex].num === 100? '' : ' (' + cardList[cardIndex].suit + ')') }}</p>
                        <el-image style="height: 10vh" :src="require('@/assets/images/poker/' + cardList[cardIndex].src  +'.png')"></el-image>
                        <p class="white-color-font" :style="{'font-size': fontSize}">来自: {{ gameInfo.gamePlayer[gameInfo.currentCardPlayer].nickname }}</p>
                    </div>
                </template>
            </div>
            <div id="game-room-table-vertical-box-middle" @click="$emit('playCard')">
                <template v-if="gameInfo.jokerCard.length > 0">
                    <div v-for="(cardIndex, n) in gameInfo.jokerCard" :key="cardIndex + '' + n" style="text-align:center; height: 10vh; display: inline-block; width: 20%"  :style="{'width': tablePokersWidth, 'margin-left': n === 0 ? ( 50 - 10*gameInfo.jokerCard.length ) + '' + '%': '0%' }">
                        <p class="white-color-font" :style="{'font-size': fontSize}">{{ cardList[cardIndex].name }}</p>
                        <el-image style="height: 10vh" :src="require('@/assets/images/poker/' + cardList[cardIndex].src  +'.png')"></el-image>
                        <p class="white-color-font" :style="{'font-size': fontSize}">来自: {{ gameInfo.gamePlayer[gameInfo.jokerCardPlayer].nickname }}</p>
                    </div>
                </template>
            </div>
            <div id="game-room-table-vertical-box-bottom">
                <RemainCardsNum :isHorizontal="false" :gameInfo="gameInfo" :fontSize="fontSize"></RemainCardsNum>
                <ComboCardsNum :isHorizontal="false" :gameInfo="gameInfo" :fontSize="fontSize"></ComboCardsNum>
                <Clockwise :isHorizontal="false" :gameInfo="gameInfo" :fontSize="fontSize"></Clockwise>
            </div>
            <el-tooltip effect="light" placement="right" :manual="true" v-model="isTooltipShow">
                <div slot="content">
                    <p v-for="item in gameTextFromPlayer" :key="item">{{ item }}</p>
                </div> 
                <div id="game-room-table-vertical-info-box-bottom">
                    <transition leave-active-class="scale-out-top">
                        <el-tag v-show="getGamePlayer.remainCards.length > 0" class="game-room-table-horizontal-record-item" type="success" effect="dark" :size="tagSize" :style="{'font-size': fontSize}">{{ '手牌数： ' + getGamePlayer.remainCards.length + ' 张' }}</el-tag>
                    </transition>
                </div>
            </el-tooltip>
             <el-popover placement="top" width="160" v-model="isPopoverVisible">
                    <div style="margin: 0">
                        <QuickChatSelector :labelMessage="'向全体发言'" @emitSelectedTextToPlayer="sentSelectedTextToPlayer"></QuickChatSelector>
                    </div>
                <template  slot="reference">
                    <div id="game-room-table-vertical-info-box-bottom">
                        <el-tag :class="{'increase-num' : allCardsFlag}" class="game-room-table-horizontal-record-item" type="info" effect="dark" :size="tagSize" :style="{'font-size': fontSize}">{{ '总收牌： '}} <CardsNum :value="getGamePlayer.cards" @increased="increasedHandler('all')"></CardsNum> {{' 张' }}</el-tag>
                    </div>
                    <div id="game-room-table-vertical-info-box-bottom">
                        <el-tag :class="{'increase-num' : comboFlag}" class="game-room-table-horizontal-record-item" type="danger" effect="dark" :size="tagSize" :style="{'font-size': fontSize}">{{ '最大收牌： '}} <CardsNum :value="getGamePlayer.maxCombo" @increased="increasedHandler('combo')"></CardsNum> {{' 张' }}</el-tag>
                    </div>
                </template>
             </el-popover>
        </div>
        <EditGameRoomDialogModule :editGameRoomDialogVisible="editGameRoomDialogVisible" :playerLocRoom="playerLocRoom" :dialogWidth="dialogWidth" :ws="ws" @editGameRoomDialogVisible="function(value){ editGameRoomDialogVisible = value}"></EditGameRoomDialogModule>
    </div>
</template>

<script>
import EditGameRoomDialogModule from './dialogs/EditGameRoomDialogModule'
import { cardList } from '../../mixins/gameRoom/cardList'
import RemainCardsNum from './fragment/RemainCardsNum'
import ComboCardsNum from './fragment/ComboCardsNum'
import Clockwise from './fragment/Clockwise'
import CardsNum from './fragment/CardsNum'
import { playSound } from '../../utils/soundHandler'
import QuickChatSelector from './fragment/QuickChatSelector'

export default {
    data() {
        return{
            isTooltipShow: false,
            editGameRoomDialogVisible: false,
            gameTableTexts: [],
            gameTextFromPlayer: [],
            timer: 0,    
            gameTextFromPlayerTimer: 0,
            isPopoverVisible: false,    
            textFontSize: '',
            allCardsFlag: false,
            comboFlag: false,
        }
    },

    props:{
        dialogWidth: { type: String, default: ''},
        tagSize: { type: String, default: ''},
        fontSize: { type: String, default: ''},
        largeFontSize: { type: String, default: ''},
        isItemHorizontal: { type: Boolean, default: false},
        playerLocRoom: { type: Object, default: null},
        player: { type: Object, default: null },
        gameInfo: { type: Object, default: null },
        seatIndex: { type: Number },
        ws: { type: WebSocket, default: null},
        sentGameTextToPlayer: { type: Object, default: null },
    },

    watch:{
        'gameInfo.messages': {
            immediate: true,
            handler: function(newVal){
                if(this.gameInfo === null) return
                clearTimeout(this.timer)
                this.gameTableTexts = newVal
            }
        },

        'gameInfo.currentPlayer': function(newVal, oldVal){
            if(this.gameInfo === null || newVal === -1) return
            if(oldVal === undefined){
                playSound('game-start-voice')
                playSound('card-shuffle')
                return
            }
            //有反弹牌则优先发出反弹牌的音效
            if(this.gameInfo.jokerCard.length > 0){
                if(this.cardList[this.gameInfo.jokerCard[0]].suit === 1){
                    playSound('playCard/guanyin')
                }
                else{
                    playSound('playCard/rulai')
                }
                return
            }
            if(this.cardList[this.gameInfo.currentCard[0]].num === 21){
                playSound('playCard/shaseng')
            }
            else if(this.cardList[this.gameInfo.currentCard[0]].num === 22){
                playSound('playCard/bajie')
            }
            else if(this.cardList[this.gameInfo.currentCard[0]].num === 23){
                playSound('playCard/wukong')
            }
            else if(this.cardList[this.gameInfo.currentCard[0]].num === 31){
                playSound('playCard/shifu')
            }
            else if(this.cardList[this.gameInfo.currentCard[0]].num === 100){
                if(this.cardList[this.gameInfo.currentCard[0]].suit === 1){
                    playSound('playCard/guanyin')
                }
                else{
                    playSound('playCard/rulai')
                }
            }
            else{
                playSound('playCard/card-drop')
            }
        },

        gameTableTexts: function(){
            if(this.gameTableTexts && this.gameTableTexts.length > 1){
                this.timer = setTimeout( () => {
                    this.gameTableTexts.shift()
                }, 2000)
            }
        },

        sentGameTextToPlayer: function(newVal){
            if(this.gameInfo === null) return
            if(newVal.sourceId === this.$store.state.id){
                if(newVal.target === -1){
                    this.gameTextFromPlayer.push( '你说: ' + newVal.text )
                }
                else{
                    this.gameTextFromPlayer.push( '你对 ' + this.gameInfo.gamePlayer[newVal.target].nickname + ' 说: ' + newVal.text )
                }
                playSound('quickChat/' + newVal.soundSrc)
                this.$nextTick(function(){
                    if(this.gameTextFromPlayer.length > 0){
                        this.isTooltipShow = true
                        this.gameTextFromPlayerTimer = setTimeout( () => {
                            this.gameTextFromPlayer.shift()
                            if(this.gameTextFromPlayer.length === 0){
                                this.isTooltipShow = false
                            }
                        }, 6000)
                    }
                })
            }
        },

        largeFontSize: {
            immediate: true,
            handler: function(newVal){
                let str = newVal.split('px')[0]
                let i = parseInt(str)
                this.textFontSize = (i + 2) + '' + 'px' 
            }
        },
    },

    computed:{
        tablePokersWidth: function(){
            if(this.isItemHorizontal){
                if(this.gameInfo.currentCard.length + this.gameInfo.jokerCard.length <= 5){
                    return '20%'
                }
                else{
                    return (100 / (this.gameInfo.currentCard.length + this.gameInfo.jokerCard.length) ) + '' + '%'
                }
            }
            return '20%'
        },

        tablePokerLeftMargin: function(){
            if(this.isItemHorizontal){
                if(this.gameInfo.currentCard.length + this.gameInfo.jokerCard.length <= 5){
                    return ( 50 - 10*(this.gameInfo.currentCard.length + this.gameInfo.jokerCard.length) ) + '' + '%'
                }
                else{
                    return '0%'
                }
            }
            return '0%'
        },

        getGamePlayer: function(){
            if(this.gameInfo === null) return null
            if(this.gameInfo.gamePlayer[this.seatIndex].id > 0){
                return this.gameInfo.gamePlayer[this.seatIndex]
            }
            return null
        }
    },

    methods:{
         sentSelectedTextToPlayer: function(item){
            this.isPopoverVisible = false
            this.ws.send(JSON.stringify({ type: 'game', action: 'textToPlayer', id: this.gameInfo.id, source: this.seatIndex, target: -1, targetId: -1, sourceId: this.$store.state.id, text: item.text, soundSrc: item.music }))
        },

        increasedHandler: function(whichFlag){
            let vm = this
            if(whichFlag === 'all'){
                this.allCardsFlag = false
                window.requestAnimationFrame(function() {
                    window.requestAnimationFrame(function() {
                        vm.allCardsFlag = true
                    })
                })
            }
            else if(whichFlag === 'combo'){
                this.comboFlag = false
                window.requestAnimationFrame(function() {
                    window.requestAnimationFrame(function() {
                        vm.comboFlag = true
                    })
                })
            }
        },
    },

    components:{
        EditGameRoomDialogModule,
        RemainCardsNum,
        ComboCardsNum,
        Clockwise,
        CardsNum,
        QuickChatSelector,
    },

    mixins:[ cardList ],
}
</script>

<style>

#game-room-table-box{
    width: 100%;
    height: 100%;
}

#game-room-table-box-vertical{
    width: 100%;
    height: 80%;
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
    width: 100%;
    height: 50vh;
}

#game-room-table-horizontal-box-info{
    width: 80%;
    margin-left: 10%;
    height: 5vh;
    text-align: center;
    margin-top: 2vh;
}

#game-room-table-vertical-box-info{
    width: 100%;
    margin-top: 10vh;
    height: 2vh;
    text-align: center;
}

#game-info-text-box{
    background-color: #f4f4f5;
    border-radius: 5px;
    color: #909399;
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
    margin-top: 5vh;
}

#game-room-table-vertical-room-info-bottom{
    margin-top: 5vh;
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

#game-room-table-horizontal-box-middle{
    width: 100%;
    height: 10vh;
}

#game-room-table-vertical-box-bottom{
    width: 100%;
    height: 10vh;
}

.game-room-table-horizontal-box-middle-item{
    width: 6vw; 
    height: 10vh; 
    margin-left: 20%;
    margin-top: 3%; 
    display: inline-block;
    text-align: center;
}

.game-room-table-vertical-box-bottom-item{
    width: 15vw; 
    height: 5vh; 
    margin-top: 8%; 
    display: inline-block;
    text-align: center;
}

.white-color-font{
    color: white;
    margin: 0;
}

#game-room-table-vertical-box-top{
    width: 100%;
    height: 10vh;
}

#game-room-table-vertical-box-middle{
    padding-top: 5vh;
    width: 100%;
    height: 10vh;
    padding-bottom: 3vh;
}

#game-room-table-horizontal-box-bottom{
    width: 100%; 
    height: 5vh; 
    margin-top: 10%; 
    margin-left: 20%;
    display: inline-block;
}

#game-room-table-horizontal-box-bottom:hover{
    cursor: pointer;
}

#game-room-table-vertical-info-box-bottom{
    width: 100%; 
    height: 2vh; 
    margin-top: 5%; 
    margin-left: 20%;
}

.increase-num{-webkit-animation:increase-num 1s ease-in-out both;animation:increase-num 1s ease-in-out both}
@-webkit-keyframes increase-num{0%{-webkit-transform:scale(1);transform:scale(1)}50%{-webkit-transform:scale(1.6);transform:scale(1.6)}100%{-webkit-transform:scale(1);transform:scale(1)}}@keyframes increase-num{0%{-webkit-transform:scale(1);transform:scale(1)}50%{-webkit-transform:scale(1.6);transform:scale(1.6)}100%{-webkit-transform:scale(1);transform:scale(1)}}
.scale-out-top{-webkit-animation:scale-out-top .5s cubic-bezier(.55,.085,.68,.53) both;animation:scale-out-top .5s cubic-bezier(.55,.085,.68,.53) both}
@-webkit-keyframes scale-out-top{0%{-webkit-transform:scale(1);transform:scale(1);-webkit-transform-origin:50% 0;transform-origin:50% 0;opacity:1}100%{-webkit-transform:scale(0);transform:scale(0);-webkit-transform-origin:50% 0;transform-origin:50% 0;opacity:1}}@keyframes scale-out-top{0%{-webkit-transform:scale(1);transform:scale(1);-webkit-transform-origin:50% 0;transform-origin:50% 0;opacity:1}100%{-webkit-transform:scale(0);transform:scale(0);-webkit-transform-origin:50% 0;transform-origin:50% 0;opacity:1}}
</style>