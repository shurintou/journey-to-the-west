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
                        <div class="game-room-player-info-item">
                            <el-image class="game-room-player-info-avatar" :src="getAvatarUrl(getPlayer().avatar_id)"></el-image>
                            <el-tag>{{getPlayer().nickname}}</el-tag>
                        </div>
                        <div class="game-room-player-info-item" v-if="getPlayer().avatar_id !== 0">
                            <!-- <el-alert :title="'吃牌数： ' + player.cards + ' 张'" type="info" :closable="false" effect="dark"></el-alert> -->
                            <span>{{'吃牌数： ' + player.cards + ' 张'}}</span>
                        </div>
                        <div class="game-room-player-info-item" v-if="getPlayer().avatar_id !== 0">
                            <!-- <el-alert :title="'吃鸡： ' + player.win + ' 局'" type="success" :closable="false" effect="dark"></el-alert> -->
                            <!-- <el-alert :title="'拉跨： ' + player.loss + ' 局'" type="error" :closable="false" effect="dark"></el-alert> -->
                            <span>{{'吃鸡： ' + player.win + ' 局'}}</span>
                            <span>{{'拉跨： ' + player.loss + ' 局'}}</span>
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

.game-room-player-info-item{
    width: 100%;
    height: 33%;
}

.game-room-player-info-avatar{
    vertical-align: middle;
    width:30%;
    height:100%;
    overflow: unset;
}

</style>