<template>
     <el-tabs v-if="playerProfile !== null" type="border-card" v-model="activeViewModuleTabName" @tab-click="handleViewModuleTabClick">
        <el-tab-pane label="个人战绩" name="record">
            <PlayerProfileModule :playerProfile = "playerProfile"></PlayerProfileModule>
        </el-tab-pane>
        <el-tab-pane label="过去对局" name="game">
            <GameResultsListModule :gameResultsList="gameResultsList" :gameResultsPageNum="gameResultsPageNum" :fontSize="fontSize" :isHorizontal="isHorizontal" :currentPage="gameResultListCurrentPage" @pageChanged="getGameRecordsList"></GameResultsListModule>
        </el-tab-pane>
        <el-tab-pane label="成就" name="achievement">暂未开放</el-tab-pane>
        <el-tab-pane label="排行榜" name="rank">暂未开放</el-tab-pane>
    </el-tabs>
</template>

<script>
import PlayerProfileModule from '../chatRoom/PlayerProfileModule'
import GameResultsListModule from '../gameRoom/GameResultsListModule'
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
        fontSize: {type: String, default: 'record'},
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
    },
}
</script>