<template>
     <div class="player-profile-box">
            <el-image style="margin-left: 35%; width: 30%" :src="getAvatarUrl(playerProfile.avatar_id)" :fit="'fill'"></el-image>
            <p class="player-profile-line" v-if="playerProfile.id === $store.state.id">
                <el-tooltip effect="light" content="经验值" placement="top">
                     <el-progress :text-inside="true" :percentage="60" :stroke-width="20" status="success"></el-progress>
                </el-tooltip>
            </p>
            <p class="player-profile-line">
                <span>等级：</span>
                <span class="player-profile-line-right">{{ playerProfile.level }}级</span>
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
                <span class="player-profile-line-right">{{  playerProfile.record.num_of_game === 0? 0 : playerProfile.record.experienced_cards / playerProfile.record.num_of_game }}张</span>
            </p> 
            <p class="player-profile-line">
                <span>最少吃牌数：</span>
                <span class="player-profile-line-right">{{  playerProfile.record.min_card }}张</span>
            </p> 
            <p class="player-profile-line">
                <el-tooltip effect="light" content="最少吃牌数所占该局总牌数的比例" placement="right">
                  <span>最少吃牌比：</span>
                </el-tooltip>
                <span class="player-profile-line-right">{{ playerProfile.record.min_card_amount === 0? 0 : playerProfile.record.min_card * 100 / playerProfile.record.min_card_amount }}%</span>
            </p> 
            <p class="player-profile-line">
                <span>最多吃牌数：</span>
                <span class="player-profile-line-right">{{  playerProfile.record.max_card }}张</span>
            </p> 
            <p class="player-profile-line">
                <el-tooltip effect="light" content="最多吃牌数所占该局总牌数的比例" placement="right">
                    <span>最多吃牌比：</span>
                </el-tooltip>
                <span class="player-profile-line-right">{{ playerProfile.record.max_card_amount === 0? 0 : playerProfile.record.max_card * 100 / playerProfile.record.max_card_amount }}%</span>
            </p> 
            <br>
    </div>
</template>

<script>
export default {
    data() {
        return {
             playerProfile:{
                id: 0,
                avatar_id: 0,
                nickname: '',
                level: 0,
                record:{
                    num_of_game: 0,
                    most_game: 0,
                    least_game: 0,
                    experience: 0,
                    experienced_cards: 0,
                    max_card: 0,
                    max_card_amount: 0,
                    min_card: 0,
                    min_card_amount: 0,
                }
             },
        }
    },

    props:{
        playerProfileDto : {type: Object, default: null},
    },

    methods:{
        getAvatarUrl: function(avatarId){
          return require("@/assets/images/avatar_" + avatarId + "-min.png")
        },
    },

    created: function(){
        this.playerProfile =this.playerProfileDto
    }
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