<template>
    <div v-if="isItemHorizontal" id="game-room-table-horizontal-box">
        <div v-if="playerLocRoom.status === 0" id="game-room-table-horizontal-container">
            <!-- 房主可以点击此处更改房间设置 -->
            <el-alert :title="playerLocRoom.name + ( playerLocRoom.needPassword ? ' 密码： ' +  playerLocRoom.password : '' )" type="info" center :closable="false"></el-alert>
            <el-tooltip  v-for="n in playerLocRoom.cardNum" :key="n" effect="light" :content="'游戏使用牌数： ' + playerLocRoom.cardNum + '副'" placement="right-start">
                <el-image class="game-room-table-horizontal-poker-pool" :style="{'margin-left': n === 1 ? ( 50 - 5*playerLocRoom.cardNum ) + '' + '%': '0%' }" :src="require('@/assets/images/poke/poke-pool.png')"></el-image>
            </el-tooltip>
            <div id="game-room-table-horizontal-bottom">
                <el-tag class="game-room-table-horizontal-record-item" type="info" effect="dark" :size="tagSize" :style="{'font-size': fontSize}">{{ '吃牌数： ' + player.cards + ' 张' }}</el-tag>
                <el-tag class="game-room-table-horizontal-record-item" type="success" effect="dark" :size="tagSize" :style="{'font-size': fontSize}">{{ '吃鸡： ' + player.win + ' 局' }}</el-tag>
                <el-tag class="game-room-table-horizontal-record-item" type="danger" effect="dark" :size="tagSize" :style="{'font-size': fontSize}">{{ '拉跨： ' + player.loss + ' 局' }}</el-tag>
            </div>
        </div>
        <div v-else>
            <el-image :src="require('@/assets/images/poke/1A.png')"></el-image>
        </div>
    </div>
    <div v-else>

    </div>
</template>

<script>
export default {
    data() {
        return{

        }
    },

    props:{
        tagSize: { type: String, default: ''},
        fontSize: { type: String, default: ''},
        isItemHorizontal: { type: Boolean, default: false},
        playerLocRoom: { type: Object, default: null},
        player: { type: Object, default: null },
    },
  
}
</script>

<style>

#game-room-table-horizontal-box{
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
    margin-top: 28%; 
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

</style>