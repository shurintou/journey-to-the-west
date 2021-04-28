<template>
     <el-tabs v-if="playerProfile !== null" type="border-card" v-model="activeViewModuleTabName" @tab-click="handleViewModuleTabClick">
        <el-tab-pane label="个人战绩" name="record">
            <PlayerProfileModule :playerProfile = "playerProfile"></PlayerProfileModule>
        </el-tab-pane>
        <el-tab-pane label="过去对局" name="game">
            <GameResultsListModule :gameResultsList="gameResultsList" :gameResultsPageNum="gameResultsPageNum" :fontSize="fontSize" :isHorizontal="isHorizontal" :currentPage="gameResultListCurrentPage" @pageChanged="getGameRecordsList" @sendGameResultToPlayerInfoTab="function(value){$emit('sendGameResultToPlayerInfo', value)}"></GameResultsListModule>
        </el-tab-pane>
        <el-tab-pane label="成就" name="achievement">暂未开放</el-tab-pane>
        <el-tab-pane label="排行榜" name="rank">
            <RankModule :playerProfile = "playerProfile" :fontSize="fontSize"></RankModule>
        </el-tab-pane>
        <el-tab-pane label="设置" name="setting" v-if="playerProfile.id === $store.state.id">
            <SettingModule :fontSize="fontSize"></SettingModule>
        </el-tab-pane>
    </el-tabs>
</template>

<script>
import PlayerProfileModule from './tabs/PlayerProfileModule'
import GameResultsListModule from './tabs/GameResultsListModule'
import SettingModule from './tabs/SettingModule'
import RankModule from './tabs/RankModule'
import { getGameRecordsList } from '../../api/infoSearch'

export default {
    data() {
        return{
            gameResultsList: [],
            gameResultsPageNum : 0,
            activeViewModuleTabName : 'record',
            gameResultListCurrentPage: 1,
        }
    },

    props:{
        playerProfile: {type: Object, default: null},
        fontSize: {type: String, default: ''},
        isShowing: {type: Boolean, default: false},
        isHorizontal: {type: Boolean, default: false},
    },

    watch:{
        isShowing: function(newVal){
            if(newVal){
                this.activeViewModuleTabName = 'record'
            }
        }
    },

    methods:{
        handleViewModuleTabClick: function(tab){
            if(tab.name === 'game'){
                this.getGameRecordsList(1)
            }
        },

        getGameRecordsList: function(page){
            this.gameResultListCurrentPage = page
            getGameRecordsList({page: page, id: this.playerProfile.id})
            .then( res=> {
                this.gameResultsList = res.list
                this.gameResultsPageNum = res.pageNum
            })
            .catch( () =>{
                this.$message.error('获取数据失败，请稍后重试')
            })
        },
    },

    components:{
        PlayerProfileModule,
        GameResultsListModule,
        SettingModule,
        RankModule,
    },
}
</script>