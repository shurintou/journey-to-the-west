<template>
    <el-collapse v-model="activeName" @change="changeHandler" accordion>
        
        <el-collapse-item name="level">
            <template slot="title">
                <i class="el-icon-medal-1"></i>等级
            </template>
            <template v-if="rankInfo !== null">
                <p>{{showTopThreeLabel}}</p>
                <RankItem v-for="item in rankInfo.rankList" :key="item.id" :rank="item.rank" :avatarId="item.avatarId" :nickname="item.nickname" :record="calLevel(item.record) + '级'" :fontSize="fontSize"></RankItem>
                <p>{{showPlayerName}}</p>
                <RankItem v-if="rankInfo.playerInfo !== null" :rank="rankInfo.playerInfo.rank" :avatarId="rankInfo.playerInfo.avatarId" :nickname="rankInfo.playerInfo.nickname" :record="calLevel(rankInfo.playerInfo.record) + '级'" :fontSize="fontSize"></RankItem>
            </template>
        </el-collapse-item>

        <el-collapse-item name="winner">
            <template slot="title">
                <i class="el-icon-chicken"></i>吃鸡
            </template>
            <template v-if="rankInfo !== null">
                <p>{{showTopThreeLabel}}</p>
                <RankItem v-for="item in rankInfo.rankList" :key="item.id" :rank="item.rank" :avatarId="item.avatarId" :nickname="item.nickname" :record="item.record + '局'" :fontSize="fontSize"></RankItem>
                <p>{{showPlayerName}}</p>
                <RankItem v-if="rankInfo.playerInfo !== null" :rank="rankInfo.playerInfo.rank" :avatarId="rankInfo.playerInfo.avatarId" :nickname="rankInfo.playerInfo.nickname" :record="rankInfo.playerInfo.record + '局'" :fontSize="fontSize"></RankItem>
            </template>
        </el-collapse-item>

        <el-collapse-item name="loser">
            <template slot="title">
                <i class="el-icon-delete"></i>拉跨
            </template>
            <template v-if="rankInfo !== null">
                <p>{{showTopThreeLabel}}</p>
                <RankItem v-for="item in rankInfo.rankList" :key="item.id" :rank="item.rank" :avatarId="item.avatarId" :nickname="item.nickname" :record="item.record + '局'" :fontSize="fontSize"></RankItem>
                <p>{{showPlayerName}}</p>
                <RankItem v-if="rankInfo.playerInfo !== null" :rank="rankInfo.playerInfo.rank" :avatarId="rankInfo.playerInfo.avatarId" :nickname="rankInfo.playerInfo.nickname" :record="rankInfo.playerInfo.record + '局'" :fontSize="fontSize"></RankItem>
            </template>
        </el-collapse-item>

         <el-collapse-item name="sum">
             <template slot="title">
                <i class="el-icon-files"></i>总收牌数
            </template>
            <template v-if="rankInfo !== null">
                <p>{{showTopThreeLabel}}</p>
                <RankItem v-for="item in rankInfo.rankList" :key="item.id" :rank="item.rank" :avatarId="item.avatarId" :nickname="item.nickname" :record="item.record + '张'" :fontSize="fontSize"></RankItem>
                <p>{{showPlayerName}}</p>
                <RankItem v-if="rankInfo.playerInfo !== null" :rank="rankInfo.playerInfo.rank" :avatarId="rankInfo.playerInfo.avatarId" :nickname="rankInfo.playerInfo.nickname" :record="rankInfo.playerInfo.record + '张'" :fontSize="fontSize"></RankItem>
            </template>
        </el-collapse-item>

          <el-collapse-item name="combo">
            <template slot="title">
                <i class="el-icon-tickets"></i>单次最多收牌数
            </template>
            <template v-if="rankInfo !== null">
                <p>{{showTopThreeLabel}}</p>
                <RankItem v-for="item in rankInfo.rankList" :key="item.id" :rank="item.rank" :avatarId="item.avatarId" :nickname="item.nickname" :record="item.record + '张'" :fontSize="fontSize"></RankItem>
                <p>{{showPlayerName}}</p>
                <RankItem v-if="rankInfo.playerInfo !== null" :rank="rankInfo.playerInfo.rank" :avatarId="rankInfo.playerInfo.avatarId" :nickname="rankInfo.playerInfo.nickname" :record="rankInfo.playerInfo.record + '张'" :fontSize="fontSize"></RankItem>
            </template>
        </el-collapse-item>

        <el-collapse-item name="least_cards">
            <template slot="title">
                <i class="el-icon-medal"></i>单局最少收牌数
            </template>
            <template v-if="rankInfo !== null">
                <p>{{showTopThreeLabel}}</p>
                <RankItem v-for="item in rankInfo.rankList" :key="item.id" :rank="item.rank" :avatarId="item.avatarId" :nickname="item.nickname" :record="item.record + '张'" :fontSize="fontSize"></RankItem>
                <p>{{showPlayerName}}</p>
                <RankItem v-if="rankInfo.playerInfo !== null" :rank="rankInfo.playerInfo.rank" :avatarId="rankInfo.playerInfo.avatarId" :nickname="rankInfo.playerInfo.nickname" :record="rankInfo.playerInfo.record + '张'" :fontSize="fontSize"></RankItem>
            </template>
        </el-collapse-item>

        <el-collapse-item name="lowest_rate">
            <template slot="title">
                <i class="el-icon-trophy"></i>单局最低收牌比
            </template>
            <template v-if="rankInfo !== null">
                <p>{{showTopThreeLabel}}</p>
                <RankItem v-for="item in rankInfo.rankList" :key="item.id" :rank="item.rank" :avatarId="item.avatarId" :nickname="item.nickname" :record="(item.record / 10) + '%'" :fontSize="fontSize"></RankItem>
                <p>{{showPlayerName}}</p>
                <RankItem v-if="rankInfo.playerInfo !== null" :rank="rankInfo.playerInfo.rank" :avatarId="rankInfo.playerInfo.avatarId" :nickname="rankInfo.playerInfo.nickname" :record="(rankInfo.playerInfo.record / 10) + '%'" :fontSize="fontSize"></RankItem>
            </template>
        </el-collapse-item>

        <el-collapse-item name="most_cards">
            <template slot="title">
                <i class="el-icon-s-data"></i>单局最多收牌数
            </template>
            <template v-if="rankInfo !== null">
                <p>{{showTopThreeLabel}}</p>
                <RankItem v-for="item in rankInfo.rankList" :key="item.id" :rank="item.rank" :avatarId="item.avatarId" :nickname="item.nickname" :record="item.record + '张'" :fontSize="fontSize"></RankItem>
                <p>{{showPlayerName}}</p>
                <RankItem v-if="rankInfo.playerInfo !== null" :rank="rankInfo.playerInfo.rank" :avatarId="rankInfo.playerInfo.avatarId" :nickname="rankInfo.playerInfo.nickname" :record="rankInfo.playerInfo.record + '张'" :fontSize="fontSize"></RankItem>
            </template>
        </el-collapse-item>

        <el-collapse-item name="highest_rate">
            <template slot="title">
                <i class="el-icon-trophy-1"></i>单局最高收牌比
            </template>
            <template v-if="rankInfo !== null">
                <p>{{showTopThreeLabel}}</p>
                <RankItem v-for="item in rankInfo.rankList" :key="item.id" :rank="item.rank" :avatarId="item.avatarId" :nickname="item.nickname" :record="(item.record / 10) + '%'" :fontSize="fontSize"></RankItem>
                <p>{{showPlayerName}}</p>
                <RankItem v-if="rankInfo.playerInfo !== null" :rank="rankInfo.playerInfo.rank" :avatarId="rankInfo.playerInfo.avatarId" :nickname="rankInfo.playerInfo.nickname" :record="(rankInfo.playerInfo.record / 10) + '%'" :fontSize="fontSize"></RankItem>
            </template>
        </el-collapse-item>

    </el-collapse>
</template>

<script>
import { getRankInfo } from '../../../api/getRank'
import RankItem from '../fragments/RankItem'
import { calExperience } from '../../../utils/calculator'

export default {
    data() {
        return{
            activeName: '',
            rankInfo: null,
        }
    },

    props:{
        fontSize: {type: String, default: ''},
        playerProfile: {type: Object, default: null},
    },

    computed:{
        showPlayerName: function(){
            if(this.playerProfile === null)return ''
            if(this.rankInfo.playerInfo === null){
                if(this.playerProfile.id === this.$store.state.id){
                return '你尚未拥有排名'
            }
                return '玩家尚未拥有排名'
            }
            if(this.playerProfile.id === this.$store.state.id){
                return '你的排名'
            }
            return '玩家排名'
        },

        showTopThreeLabel: function(){
            if(this.playerProfile === null)return ''
            if(this.rankInfo === null || this.rankInfo.rankList.length < 1)return '目前无排名数据'
            return '前三名'
        }
    },

    methods:{
        changeHandler: function(activeName){
            if(activeName === '')return
            getRankInfo({type: activeName, id: this.playerProfile.id })
            .then( (res) =>{
                this.rankInfo = res.rank
            })
            .catch( () => {                 
            })
        },

        calLevel: function(exp){
            let result = calExperience(exp)
            return result.level
        }
    },

    components:{
        RankItem,
    },
}
</script>

