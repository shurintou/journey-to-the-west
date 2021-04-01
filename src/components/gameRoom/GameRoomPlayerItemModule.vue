<template>
    <!-- todo:正在出牌的玩家加上player-now-play-card类 -->
    <div>
         <el-tooltip effect="light" :placement="tooltipPlacement" :manual="true" v-model="isTooltipShow">
                <div slot="content">
                </div> 
                <el-popover placement="top" width="160" v-model="isPopoverVisible" :disabled="playerLocRoom.status === 0 && player.ready === true">
                    <div style="margin: 0"  :style="{'margin-left': playerLocRoom.owner === $store.state.id ? '0' : '25%'}">
                        <template v-if="playerLocRoom.status === 0 && player.ready === false">
                            <el-button style="margin-left: 10%; margin-right: 10%" type="primary" size="mini" @click="changeSeat">换位</el-button>
                            <el-button v-if="playerLocRoom.owner === $store.state.id" type="danger" size="mini" @click="kickPlayerOff">踢出</el-button>
                        </template>
                        <!-- 开始游戏的时候，点玩家可以发言 -->
                        <template v-if="playerLocRoom.status === 1">
                        </template>
                    </div>
                    <div slot="reference" id="game-room-player-info-box">
                        <div :class="{'game-room-player-info-item-vertical' : !isItemHorizontal, 'game-room-player-info-item-horitonzal' : isItemHorizontal }">
                            <el-image :class="{'game-room-player-info-avatar-vertical' : !isItemHorizontal, 'game-room-player-info-avatar-horizontal' : isItemHorizontal}" :src="getAvatarUrl(getPlayer().avatar_id)"></el-image>
                            <el-tag :type="getPlayerNameTagType" :effect="player.id === 0 ? 'light' : 'dark'" :size="tagSize" :style="{'font-size': fontSize}"><i v-if="player.id === playerLocRoom.owner" class="el-icon-star-on"></i>{{getPlayer().nickname}}</el-tag>
                        </div>
                        <div :class="{'game-room-player-info-item-vertical' : !isItemHorizontal, 'game-room-player-info-item-horitonzal' : isItemHorizontal}" v-if="getPlayer().avatar_id !== 0">
                            <el-tag type="info" effect="dark" :size="tagSize" :style="{'font-size': fontSize}">{{ '吃牌数： ' + player.cards + ' 张' }}</el-tag>
                            <el-tag type="success" effect="dark" :size="tagSize" :style="{'font-size': fontSize}">{{ '吃鸡： ' + player.win + ' 局' }}</el-tag>
                            <el-tag type="danger" effect="dark" :size="tagSize" :style="{'font-size': fontSize}">{{ '拉跨： ' + player.loss + ' 局' }}</el-tag>
                        </div>
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
                /* 游戏开始，游戏时蓝色，托管红色 */
                return ''
            }
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
    background-image: url('../../assets/images/player-frame.png');
    background-color: rgb(119, 187, 17);
    background-size: 100% 100%;
}

</style>