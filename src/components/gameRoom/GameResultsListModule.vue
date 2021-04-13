<template>
    <div v-if="gameResultsList.length > 0">
        <div class="game-result-item" v-for="gameResult in gameResultsList" :key="gameResult.id">
            <!-- <div style="height: 15%; margin: 0; padding: 0;"><span :style="{'font-size': fontSize}">{{getGameDate(new Date(gameResult.createdAt))}}</span></div> -->
             <el-alert :closable="false" style="margin: 0; padding: 0" :title="getGameDate(new Date(gameResult.createdAt)) + ' 座位 ' + (gameResult.seat_index + 1)" type="info"></el-alert>
            <div style="margin-top: 1%; height: 84%">
                <el-tooltip effect="light" content="玩家" placement="top">
                    <div class="game-result-sub-item">
                        <div><span :style="{'font-size': fontSize}">{{gameResult.nickname}}</span></div>
                        <el-avatar shape="square" :fit="'cover'" :src="getAvatarUrl(gameResult.avatar_id)"></el-avatar>
                    </div>
                </el-tooltip>
                <el-tooltip effect="light" content="总收牌" placement="top">
                    <div class="game-result-sub-item">
                        <div><span :style="{'font-size': fontSize}">{{gameResult.cards}}张</span></div>
                        <el-avatar shape="square" :fit="'cover'" :src="require('@/assets/images/poker/game-result-ammount.png')"></el-avatar>
                    </div>
                </el-tooltip>
                <el-tooltip effect="light" content="最大收牌" placement="top">
                    <div class="game-result-sub-item">
                        <div><span :style="{'font-size': fontSize}">{{gameResult.max_combo}}张</span></div>
                        <el-avatar shape="square" :fit="'cover'" :src="require('@/assets/images/poker/game-result-max-combo.png')"></el-avatar>
                    </div>
                </el-tooltip>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return{

        }
    },

    props:{
        gameResultsList: Array,
        gameResultsPageNum : { type: Number, default: 0},
        fontSize: {type: String, default: ''},
    },

    methods:{
        getGameDate: function(data){
            return data.getFullYear() + '年' + (data.getMonth() + 1) + '月' + data.getDate() + '日 ' + data.getHours() + '时' + data.getMinutes() + '分'
        },

        getAvatarUrl: function(n){
            return require("@/assets/images/avatar/avatar_" + n + "-min.png")
        },
    }
}
</script>

<style>
    .game-result-item{
        width: 100%;
        height: 20%;
        background-image: url('../../assets/images/icon-select-background.png');
        background-size: 100% 100%;
        border-radius: 3%;
        margin-bottom: 2vh;
    }

    .game-result-sub-item{
        text-align: center;
        display: inline-block;
        width: 15%;
        height: 100%;
    }
</style>