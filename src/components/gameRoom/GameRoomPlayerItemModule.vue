<template>
    <div>
         <el-tooltip effect="light" :placement="tooltipPlacement" :manual="true" v-model="isTooltipShow">
                <div slot="content">
                </div> 
                <el-popover
                    placement="top"
                    width="160"
                    v-model="isPopoverVisible">
                    <div style="margin: 0">
                        <el-button style="margin-left: 10%; margin-right: 10%" type="primary" size="mini" @click="isPopoverVisible = false">换位</el-button>
                        <el-button type="danger" size="mini" @click="isPopoverVisible = false">踢出</el-button>
                    </div>
                    <div slot="reference">
                        <div :class="{'game-room-player-info-item-vertical' : !isItemHorizontal, 'game-room-player-info-item-horitonzal' : isItemHorizontal }">
                            <el-image :class="{'game-room-player-info-avatar-vertical' : !isItemHorizontal, 'game-room-player-info-avatar-horizontal' : isItemHorizontal}" :src="getAvatarUrl(getPlayer().avatar_id)"></el-image>
                            <el-tag effect="dark" :size="tagSize">{{getPlayer().nickname}}</el-tag>
                        </div>
                        <div :class="{'game-room-player-info-item-vertical' : !isItemHorizontal, 'game-room-player-info-item-horitonzal' : isItemHorizontal}" v-if="getPlayer().avatar_id !== 0">
                            <el-tag type="info" effect="dark" :size="tagSize">{{ '吃牌数： ' + player.cards + ' 张' }}</el-tag>
                            <el-tag type="success" effect="dark" :size="tagSize">{{ '吃鸡： ' + player.win + ' 局' }}</el-tag>
                            <el-tag type="danger" effect="dark" :size="tagSize">{{ '拉跨： ' + player.loss + ' 局' }}</el-tag>
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
        isItemHorizontal: { type: Boolean, default: false},
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
    }
}
</script>

<style>

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
    height:100%;
    overflow: unset;
    display: inline-block;
}

</style>