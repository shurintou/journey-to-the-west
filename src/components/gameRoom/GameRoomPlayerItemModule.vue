<template>
    <div :class="{ 'player-now-play-card' : gameInfo && gameInfo.currentPlayer === seatIndex }">
         <el-tooltip effect="light" :placement="tooltipPlacement" :manual="true" v-model="isTooltipShow">
                <div slot="content">
                    <p v-for="item in gameTextFromPlayer" :key="item">{{ item }}</p>
                </div> 
                <el-popover placement="top" width="160" v-model="isPopoverVisible" :disabled="playerLocRoom.status === 0 && player.ready === true">
                    <div style="margin: 0"  :style="{'margin-left': playerLocRoom.owner === $store.state.id || playerLocRoom.status === 1 ? '0' : '25%'}">
                        <template v-if="playerLocRoom.status === 0 && player.ready === false">
                            <el-button style="margin-left: 10%; margin-right: 10%" type="primary" size="mini" @click="changeSeat">换位</el-button>
                            <el-button v-if="playerLocRoom.owner === $store.state.id" type="danger" size="mini" @click="kickPlayerOff">踢出</el-button>
                        </template>
                        <template v-if="playerLocRoom.status === 1">
                            <el-select size="medium" v-model="gameTextToPlayer" placeholder="向该玩家发言" @change="sentSelectedTextToPlayer">
                                <el-option :disabled="true" label="向该玩家发言" value=""></el-option>
                                <el-option label="收" value="收"></el-option>
                                <el-option label="小小小" value="小小小"></el-option>
                                <el-option label="求师傅" value="求师傅"></el-option>
                                <el-option label="求拉满" value="求拉满"></el-option>
                                <el-option label="求转向" value="求转向"></el-option>
                                <el-option label="你的牌打得太好了" value="你的牌打得太好了"></el-option>
                                <el-option label="我等得花儿都谢了" value="我等得花儿都谢了"></el-option>
                                <el-option label="合作愉快" value="合作愉快"></el-option>
                            </el-select>
                        </template>
                    </div>
                    <div slot="reference" id="game-room-player-info-box">
                        <template v-if="playerLocRoom.status === 0">
                            <div :class="{'game-room-player-info-item-vertical' : !isItemHorizontal, 'game-room-player-info-item-horitonzal' : isItemHorizontal }">
                                <el-image :class="{'game-room-player-info-avatar-vertical' : !isItemHorizontal, 'game-room-player-info-avatar-horizontal' : isItemHorizontal}" :src="getAvatarUrl(getPlayer().avatar_id)"></el-image>
                                <el-tag :type="getPlayerNameTagType" :effect="player.id === 0 ? 'light' : 'dark'" :size="tagSize" :style="{'font-size': fontSize}"><i v-if="player.id === playerLocRoom.owner" class="el-icon-star-on"></i>{{getPlayer().nickname}}</el-tag>
                            </div>
                            <div :class="{'game-room-player-info-item-vertical' : !isItemHorizontal, 'game-room-player-info-item-horitonzal' : isItemHorizontal}" v-if="getPlayer().avatar_id !== 0">
                                <el-tag type="info" effect="dark" :size="tagSize" :style="{'font-size': fontSize}">{{ '收牌数： ' + player.cards + ' 张' }}</el-tag>
                                <el-tag type="success" effect="dark" :size="tagSize" :style="{'font-size': fontSize}">{{ '吃鸡： ' + player.win + ' 局' }}</el-tag>
                                <el-tag type="danger" effect="dark" :size="tagSize" :style="{'font-size': fontSize}">{{ '拉跨： ' + player.loss + ' 局' }}</el-tag>
                            </div>
                        </template>
                        <template v-if="playerLocRoom.status === 1 && gameInfo !== null && getGamePlayer !== null">
                            <div :class="{'game-room-player-info-item-vertical' : !isItemHorizontal, 'game-room-player-info-item-horitonzal' : isItemHorizontal }">
                                <el-image :class="{'game-room-player-info-avatar-vertical' : !isItemHorizontal, 'game-room-player-info-avatar-horizontal' : isItemHorizontal}" :src="getAvatarUrl(getGamePlayer.avatar_id)"></el-image>
                                <el-tag :type="getPlayerNameTagType" effect="dark" :size="tagSize" :style="{'font-size': fontSize}"><i v-if="gameInfo.currentPlayer === seatIndex" class="el-icon-loading"></i>{{getGamePlayer.nickname}}</el-tag>
                            </div>
                            <div :class="{'game-room-player-info-item-vertical' : !isItemHorizontal, 'game-room-player-info-item-horitonzal' : isItemHorizontal}">
                                <el-tag type="success" effect="dark" :size="tagSize" :style="{'font-size': fontSize}">{{ '手牌数： ' + getGamePlayer.remainCards.length + ' 张' }}</el-tag>
                                <el-tag type="info" effect="dark" :size="tagSize" :style="{'font-size': fontSize}">{{ '总收牌： ' + getGamePlayer.cards + ' 张' }}</el-tag>
                                <el-tag type="danger" effect="dark" :size="tagSize" :style="{'font-size': fontSize}">{{ '最大收牌： ' + getGamePlayer.maxCombo + ' 张' }}</el-tag>
                            </div>
                        </template>
                    </div>
                </el-popover>
        </el-tooltip>
    </div>
</template>

<script>
export default {
    data() {
        return{
            isTooltipShow: false,
            isPopoverVisible: false,
            gameTextToPlayer: '',
            gameTextFromPlayer: [],
            timer: 0,           
        }
    },

    props:{
        player: { type: Object, default: null },
        playerList: Array,
        tooltipPlacement: { type: String, default: 'top'},
        tagSize: { type: String, default: ''},
        fontSize: { type: String, default: ''},
        isItemHorizontal: { type: Boolean, default: false},
        playerLocRoom: { type: Object, default: null},
        ws: { type: WebSocket, default: null},
        seatIndex: { type: Number },
        gameInfo: { type: Object, default: null },
        localPlayerSeatIndex: { type: Number },
        sentGameTextToPlayer: { type: Object, default: null },
    },

    watch:{
        sentGameTextToPlayer: function(newVal){
            if(this.gameInfo === null) return
            if(newVal.targetId === this.$store.state.id){
                this.gameTextFromPlayer.push( this.gameInfo.gamePlayer[newVal.source].nickname + ' 对你说: ' + newVal.text )
            }
            else{
                this.gameTextFromPlayer.push( this.gameInfo.gamePlayer[newVal.source].nickname + ' 对' + this.gameInfo.gamePlayer[newVal.target].nickname +  ' 说: ' + newVal.text )
            }
            this.$nextTick(function(){
                if(this.gameTextFromPlayer.length > 0){
                    this.isTooltipShow = true
                    this.gameTextFromPlayerTimer = setTimeout( () => {
                        this.gameTextFromPlayer.shift()
                        if(this.gameTextFromPlayer.length === 0){
                            this.isTooltipShow = false
                        }
                    }, 4000)
                }
            })
        },
    },

    computed:{
        getPlayerNameTagType: function(){
            if(this.player.id === 0 ) return 'info'
            /* 游戏未开始 */
            if(this.playerLocRoom.status === 0){
                if(this.player.id === this.playerLocRoom.owner){
                    return 'warning'
                }
                if(this.player.ready === false){
                    return 'info'
                }
                else{
                    return 'success'
                }
            }
            else{
                if(this.getGamePlayer.online){
                    return 'primary'
                }
                else{
                    return 'danger'
                }
            }
        },

        getGamePlayer: function(){
            if(this.gameInfo === null) return null
            if(this.gameInfo.gamePlayer[this.seatIndex].id > 0){
                return this.gameInfo.gamePlayer[this.seatIndex]
            }
            return null
        },
    },

    methods:{
        getPlayer: function(){
            for(var i = 0; i < this.playerList.length; i++){
                if( this.playerList[i].id === this.player.id ){
                    return this.playerList[i]
                }
            }
            return { nickname: '空位', avatar_id: 0  }
        },

        getAvatarUrl: function(n){
            return require("@/assets/images/avatar/avatar_" + n + "-min.png")
        },

        kickPlayerOff: function(){
            if(this.player.id === 0){
                this.isPopoverVisible = false
                return 
            }
            this.ws.send(JSON.stringify({ type: 'gameRoomList', id: -1 * this.playerLocRoom.id, seatIndex: this.seatIndex }))
            this.isPopoverVisible = false
        },

        changeSeat: function(){
            this.ws.send(JSON.stringify({ type: 'gameRoomList', action: 'changeSeat', id: this.playerLocRoom.id, targetId: this.player.id, sourceId: this.$store.state.id, targetSeatIndex: this.seatIndex, sourceSeatIndex: this.localPlayerSeatIndex, confirm: false }))
            this.isPopoverVisible = false
        },

        sentSelectedTextToPlayer: function(){
            this.isPopoverVisible = false
            this.ws.send(JSON.stringify({ type: 'game', action: 'textToPlayer', id: this.gameInfo.id, source: this.localPlayerSeatIndex, target: this.seatIndex, targetId: this.player.id, sourceId: this.$store.state.id, text: this.gameTextToPlayer }))
            this.gameTextToPlayer = ''
        },
    }
}
</script>

<style>

#game-room-player-info-box:hover{
    cursor: pointer;
}

.game-room-player-info-item-vertical{
    width: 100%;
    height: 33%;
}

.game-room-player-info-item-horitonzal{
    width: 50%;
    height: 33%;
    display: inline-block;
}

.game-room-player-info-avatar-vertical{
    vertical-align: middle;
    width:30%;
    height:100%;
    overflow: unset;
}

.game-room-player-info-avatar-horizontal{
    vertical-align: middle;
    width:70%;
    max-width: 4vw;
    height:100%;
    overflow: unset;
    display: inline-block;
}

.player-now-play-card{
    border-radius: 5px;
    border-style: solid;
    border-color: chartreuse;
    background-color: rgba(127,255,0,0.3);
    background-size: 100% 100%;
}

</style>