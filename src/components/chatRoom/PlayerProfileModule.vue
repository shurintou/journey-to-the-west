<template>
     <div class="player-profile-box">
            <el-image style="margin-left: 35%; width: 30%" :src="getAvatarUrl(playerProfile.avatar_id)" :fit="'fill'"></el-image>
            <p class="player-profile-line" v-if="playerProfile.id === $store.state.id">
                <el-tooltip effect="light" :content="'距下次升级：' + playerProfile.record.experience + ' / ' + nextLevelExp" placement="top">
                    <el-progress :text-inside="true" :percentage="expPecent" :stroke-width="20" status="success"></el-progress>
                </el-tooltip>
            </p>
            <p class="player-profile-line">
                <span>等级：</span>
                <span class="player-profile-line-right">{{ level }}级</span>
            </p>
            <p class="player-profile-line">
                <span>局数：</span>
                <span class="player-profile-line-right">{{  playerProfile.record.num_of_game }}局</span>
            </p>
            <p class="player-profile-line">
                <el-tooltip effect="light" content="某局中吃牌数最少" placement="right">
                  <span>吃鸡：</span>
                </el-tooltip>
                <span class="player-profile-line-right">{{ playerProfile.record.least_game }}局</span>
            </p> 
            <p class="player-profile-line">
                <el-tooltip effect="light" content="某局中吃牌数最多" placement="right">
                  <span>拉跨：</span>
                </el-tooltip>
                <span class="player-profile-line-right">{{  playerProfile.record.most_game }}局</span>
            </p> 
            <p class="player-profile-line">
                <span>总吃牌数：</span>
                <span class="player-profile-line-right">{{  playerProfile.record.experienced_cards }}张</span>
            </p> 
            <p class="player-profile-line">
                <span>场均吃牌数：</span>
                <el-tooltip effect="light" :content="playerProfile.record.experienced_cards + ' / ' + playerProfile.record.num_of_game" placement="left">
                <span class="player-profile-line-right">{{  playerProfile.record.num_of_game === 0? 0 : (playerProfile.record.experienced_cards / playerProfile.record.num_of_game).toFixed(1) }}张</span>
                </el-tooltip>
            </p> 
            <p class="player-profile-line">
                <span>最少吃牌数：</span>
                <span class="player-profile-line-right">{{  playerProfile.record.min_card }}张</span>
            </p> 
            <p class="player-profile-line">
                <el-tooltip effect="light" content="最少吃牌数所占该局总牌数的比例" placement="right">
                  <span>最少吃牌比：</span>
                </el-tooltip>
                <el-tooltip effect="light" :content="playerProfile.record.min_card + ' / ' + playerProfile.record.min_card_amount" placement="left">
                <span class="player-profile-line-right">{{ playerProfile.record.min_card_amount === 0? 0 : (playerProfile.record.min_card * 100 / playerProfile.record.min_card_amount).toFixed(1) }}%</span>
                </el-tooltip>
            </p> 
            <p class="player-profile-line">
                <span>最多吃牌数：</span>
                <span class="player-profile-line-right">{{  playerProfile.record.max_card }}张</span>
            </p> 
            <p class="player-profile-line">
                <el-tooltip effect="light" content="最多吃牌数所占该局总牌数的比例" placement="right">
                    <span>最多吃牌比：</span>
                </el-tooltip>
                <el-tooltip effect="light" :content="playerProfile.record.max_card + ' / ' + playerProfile.record.max_card_amount" placement="left">
                <span class="player-profile-line-right">{{ playerProfile.record.max_card_amount === 0? 0 : (playerProfile.record.max_card * 100 / playerProfile.record.max_card_amount).toFixed(1) }}%</span>
                </el-tooltip>
            </p> 
            <br>
    </div>
</template>

<script>
export default {
    data() {
        return {
            level: 0,
            expPecent: 0,
            nextLevelExp: 0,
            levelUpExp: [100, 300, 600, 1000, 1500, 2200, 3000, 3900, 4900, 6000, 7500, 9300, 11500, 14200, 17500]
        }
    },

    watch:{
        'playerProfile.record.experience': {
            immediate: true,
            handler: function(newVal){
            for( var i = 0; i < this.levelUpExp.length; i++){
                if(newVal < this.levelUpExp[i]){
                    this.nextLevelExp = this.levelUpExp[i]
                    this.level = i + 1
                    this.expPecent = Math.round(100 * newVal / this.levelUpExp[i] )
                    return
                }
            }
            this.nextLevelExp = NaN
            this.level = 15
            this.expPecent = 100
        }}
    },

    props:{
        playerProfile : {type: Object, default: null},
    },

    methods:{
        getAvatarUrl: function(avatarId){
          return require("@/assets/images/avatar_" + avatarId + "-min.png")
        },
    },
}
</script>

<style>
    .player-profile-box{
        background-image: url('../../assets/images/icon-select-background.png');
        background-size: 100% 100%;
    }
    .player-profile-line{
        width: 80%;
        padding-left: 10%;
        padding-right: 10%;
        background-color:rgba(211, 197, 197, 0.2);
    }
    .player-profile-line:hover{
        background-color:rgba(243, 230, 230, 0.2);
    }
    .player-profile-line-right{
        float: right;
    }
</style>