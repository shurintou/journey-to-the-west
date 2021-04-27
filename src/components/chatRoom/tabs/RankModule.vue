<template>
    <el-collapse v-model="activeNames">
        <el-collapse-item name="level">
            <template slot="title">
                <i class="el-icon-medal-1"></i>等级
            </template>
            <p>前三名：</p>
            <RankItem :rank="1" :avatarId="10" :nickname="'zlt'" :record="'15级'" :fontSize="fontSize"></RankItem>
            <RankItem :rank="2" :avatarId="2" :nickname="'zlt'" :record="'15级'" :fontSize="fontSize"></RankItem>
            <RankItem :rank="3" :avatarId="8" :nickname="'zlt'" :record="'15级'" :fontSize="fontSize"></RankItem>
            <p>玩家排名：</p>
            <RankItem :rank="4" :avatarId="8" :nickname="'zlt'" :record="'15级'" :fontSize="fontSize"></RankItem>
        </el-collapse-item>
        <el-collapse-item name="winner">
            <template slot="title">
                <i class="el-icon-chicken"></i>吃鸡
            </template>

        </el-collapse-item>
        <el-collapse-item name="lowest_rate">
            <template slot="title">
                <i class="el-icon-trophy"></i>最少收牌比
            </template>
        </el-collapse-item>
        <el-collapse-item name="loser">
            <template slot="title">
                <i class="el-icon-delete"></i>拉跨
            </template>
        </el-collapse-item>
         <el-collapse-item name="sum">
             <template slot="title">
                <i class="el-icon-files"></i>总收牌数
            </template>
        </el-collapse-item>
        <el-collapse-item name="combo">
            <template slot="title">
                <i class="el-icon-tickets"></i>单次最大收牌
            </template>
        </el-collapse-item>
        <el-collapse-item name="highest_rate">
            <template slot="title">
                <i class="el-icon-trophy-1"></i>最多收牌比
            </template>
        </el-collapse-item>
    </el-collapse>
</template>

<script>
import RankItem from '../fragments/RankItem'

export default {
    data() {
        return{
            activeNames: ['level'],
        }
    },

    props:{
        fontSize: {type: String, default: ''},

    },

    components:{
        RankItem,
    }
}
</script>

