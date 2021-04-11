<template>
    <el-dialog title="游戏战绩" :visible.sync="gameResultDialogVisible" :width="customDialogWidth" :modal-append-to-body = false center :modal="false" :before-close="closeGameResultDialog">
        <el-tabs v-if="gameResult !== null" type="border-card" v-model="activeGameResultModuleTabName" @tab-click="handleGameResultModuleTabClick">
            <el-tab-pane label="表格数据" name="gameRecord">
                <div style="width: 100%">
                    <div>
                        <el-tag :size="tagSize" type="success" effect="dark" :style="{'font-size': this.largeFontSize}">吃鸡玩家: {{gameResult.winnerNickname}}</el-tag>
                        <el-tag :size="tagSize" type="success" effect="light" :style="{'font-size': this.largeFontSize}" style="margin-right: 2vw">收牌数: {{gameResult.winnerCards}}</el-tag>
                        <el-tag :size="tagSize" type="danger" effect="dark" :style="{'font-size': this.largeFontSize}">拉跨玩家: {{gameResult.loserNickname}}</el-tag>
                        <el-tag :size="tagSize" type="danger" effect="light" :style="{'font-size': this.largeFontSize}" style="margin-right: 2vw">收牌数: {{gameResult.loserCards}}</el-tag>
                        <el-tag :size="tagSize" type="warning" effect="dark" :style="{'font-size': this.largeFontSize}">最大连击玩家: {{gameResult.maxComboPlayer}}</el-tag>
                        <el-tag :size="tagSize" type="warning" effect="light" :style="{'font-size': this.largeFontSize}" style="margin-right: 2vw">连击数: {{gameResult.maxCombo}}</el-tag>
                        <el-tag :size="tagSize" type="info" effect="dark" :style="{'font-size': this.largeFontSize}">使用牌数: {{gameResult.cardsNum}}副</el-tag>
                        <el-tag :size="tagSize" type="info" effect="light" :style="{'font-size': this.largeFontSize}">玩家数: {{gameResult.playersNum}}</el-tag>
                    </div>
                    <el-table :default-sort = "{prop: 'seatIndex', order: 'ascending'}" :data="gameResult.gameResultList" style="width: 100%" :row-class-name="tableRowClassName" :row-style="{'font-size': this.largeFontSize}" :header-row-style="{'font-size': this.fontSize}">
                        <el-table-column align="center" fixed prop="avatar_id" label="头像" min-width="60">
                            <template slot-scope="scope">
                                <el-avatar shape="square" :size="avatarSize" :src="getAvatarUrl(scope.row.avatar_id)"></el-avatar>
                            </template>
                        </el-table-column>
                        <el-table-column align="center" fixed prop="nickname" label="昵称" min-width="80"></el-table-column>
                        <el-table-column align="center" sortable prop="seatIndex" label="座位号" min-width="60">
                            <template slot-scope="scope">
                                <span>{{ scope.row.seatIndex + 1}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column align="center" sortable prop="cards" label="总收牌" min-width="60"></el-table-column>
                        <el-table-column align="center" sortable prop="maxCombo" label="最大收牌" min-width="60"></el-table-column>
                        <el-table-column align="center" sortable prop="wukong" label="使用悟空" min-width="60"></el-table-column>
                        <el-table-column align="center" sortable prop="bajie" label="使用八戒" min-width="60"></el-table-column>
                        <el-table-column align="center" sortable prop="shaseng" label="使用沙僧" min-width="60"></el-table-column>
                        <el-table-column align="center" sortable prop="tangseng" label="使用唐僧" min-width="60"></el-table-column>
                        <el-table-column align="center" sortable prop="joker" label="使用反弹" min-width="60"></el-table-column>
                    </el-table>
                </div>
            </el-tab-pane>
            <el-tab-pane label="图形数据" name="visualData">
                <div id="main" style="width: 80vw; height: 90vh;"></div>
            </el-tab-pane>
        </el-tabs>
        
    </el-dialog>
</template>

<script>
import * as echarts from 'echarts/core'
import { TitleComponent, TooltipComponent, GridComponent, LegendComponent } from 'echarts/components'
import { BarChart } from 'echarts/charts'
import { CanvasRenderer } from 'echarts/renderers'
export default {
    data() {
        return{
            activeGameResultModuleTabName: 'gameRecord',  
            echartDrawed: false,    
            myChart: null,      
        }
    },

    computed:{
        customDialogWidth: function(){
            let str = this.largeDialogWidth.split('%')[0]
            let i = parseInt(str)
            if(i < 80){
                return '80%'
            }
            return this.largeDialogWidth
        },

        gamePlayerList: function(){
            let list = []
            this.gameResult.gameResultList.forEach(gamePlayer => {
                list.push(gamePlayer)
            })
            list.sort(function(b,a){
                return a.seatIndex - b.seatIndex
            })
            return list
        },
    },

    watch:{
        gameResult: function(newVal){
            if(newVal !== null){
                this.echartDrawed = false
            }
        }
    },

    props:{
        gameResult: { type: Object, default: null},
        gameResultDialogVisible: { type: Boolean, default: false},
        avatarSize: {type: Number, default: 20},
        fontSize: {type: String, default: '14px'},
        largeFontSize : {type: String, default: '16px'},
        tagSize: {type: String, default: 'medium'},
        popupWidth: {type: Number, default: 160},
        buttonSize: {type: String, default: 'medium'},
        dialogWidth: {type: String, default: '50%'},
        largeDialogWidth: {type: String, default: '50%'},
    },

    methods:{
        getAvatarUrl: function(avatarId){
            return require("@/assets/images/avatar/avatar_" + avatarId + "-min.png")
        },

        tableRowClassName: function({row}) {
            if(row.id === this.$store.state.id)
            return 'is-local-player-row'
        },

        closeGameResultDialog: function(){
            this.$emit('gameResultDialogVisible', false)
            window.removeEventListener("resize", this.echartResizeLogic)
        },

        echartResizeLogic: function(){
            this.myChart.resize()
        },

        handleGameResultModuleTabClick: function(tab){
            if(tab.name === 'visualData' && this.echartDrawed === false){
                this.echartDrawed = true
                echarts.use([TitleComponent, TooltipComponent, GridComponent, LegendComponent, BarChart, CanvasRenderer])
                var chartDom = document.getElementById('main')
                this.myChart = echarts.init(chartDom)
                window.addEventListener("resize",this.echartResizeLogic,false)
                var option
                option = {
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {
                            type: 'shadow'
                        }
                    },
                    legend: {
                        data: ['总收牌', '最大收牌', '使用悟空','使用八戒','使用沙僧','使用唐僧','使用反弹'],
                        x: 'left',
                    },
                    grid: {
                        left: '0%',
                        right: '3%',
                        bottom: '3%',
                        containLabel: true
                    },
                    xAxis: {
                        type: 'value',
                        boundaryGap: [0, 0.01]
                    },
                    yAxis: {
                        type: 'category',
                        data: this.gamePlayerList.map(function(obj){
                            return obj.nickname
                        })
                    },
                    series: [
                        {
                            name: '总收牌',
                            type: 'bar',
                            data: this.gamePlayerList.map(function(obj){
                                return obj.cards
                            })
                        },
                        {
                            name: '最大收牌',
                            type: 'bar',
                            data: this.gamePlayerList.map(function(obj){
                                return obj.maxCombo
                            })
                        },
                         {
                            name: '使用悟空',
                            type: 'bar',
                            data: this.gamePlayerList.map(function(obj){
                                return obj.wukong
                            })
                        },
                         {
                            name: '使用八戒',
                            type: 'bar',
                            data: this.gamePlayerList.map(function(obj){
                                return obj.bajie
                            })
                        },
                         {
                            name: '使用沙僧',
                            type: 'bar',
                            data: this.gamePlayerList.map(function(obj){
                                return obj.shaseng
                            })
                        },
                         {
                            name: '使用唐僧',
                            type: 'bar',
                            data: this.gamePlayerList.map(function(obj){
                                return obj.tangseng
                            })
                        },
                         {
                            name: '使用反弹',
                            type: 'bar',
                            data: this.gamePlayerList.map(function(obj){
                                return obj.joker
                            })
                        },
                    ]
                }
                option && this.myChart.setOption(option)
            }
        },
    },

    beforeDestroy: function(){
        this.myChart.clear()
        this.myChart.dispose()
        window.removeEventListener("resize", this.echartResizeLogic)
    }
}
</script>

<style>
    .el-table .is-local-player-row {
        background: rgb(240, 249, 235);
    }
</style>