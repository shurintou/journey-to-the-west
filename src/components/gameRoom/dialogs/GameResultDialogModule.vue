<template>
    <el-dialog title="游戏战绩" :visible.sync="gameResultDialogVisible" :width="customDialogWidth" :modal-append-to-body=false
        center :modal="false" :before-close="closeGameResultDialog">
        <el-tabs v-if="gameResult !== null" type="border-card" v-model="activeGameResultModuleTabName"
            @tab-click="handleGameResultModuleTabClick">
            <el-tab-pane label="表格数据" name="gameRecord">
                <div style="width: 100%">
                    <div>
                        <el-tag :size="tagSize" type="success" effect="dark"
                            :style="{ 'font-size': this.largeFontSize }">吃鸡玩家: {{ gameResult.winnerNickname }}</el-tag>
                        <el-tag :size="tagSize" type="success" effect="light" :style="{ 'font-size': this.largeFontSize }"
                            style="margin-right: 2vw">收牌数: {{ gameResult.winnerCards }}</el-tag>
                        <el-tag :size="tagSize" type="danger" effect="dark"
                            :style="{ 'font-size': this.largeFontSize }">拉跨玩家:
                            {{ gameResult.loserNickname }}</el-tag>
                        <el-tag :size="tagSize" type="danger" effect="light" :style="{ 'font-size': this.largeFontSize }"
                            style="margin-right: 2vw">收牌数: {{ gameResult.loserCards }}</el-tag>
                        <el-tag :size="tagSize" type="warning" effect="dark"
                            :style="{ 'font-size': this.largeFontSize }">最大连击玩家: {{ gameResult.maxComboPlayer }}</el-tag>
                        <el-tag :size="tagSize" type="warning" effect="light" :style="{ 'font-size': this.largeFontSize }"
                            style="margin-right: 2vw">连击数: {{ gameResult.maxCombo }}</el-tag>
                        <el-tag :size="tagSize" type="info" effect="dark" :style="{ 'font-size': this.largeFontSize }">使用牌数:
                            {{ gameResult.cardsNum }}副</el-tag>
                        <el-tag :size="tagSize" type="info" effect="light" :style="{ 'font-size': this.largeFontSize }">玩家数:
                            {{ gameResult.playersNum }}</el-tag>
                    </div>
                    <el-divider></el-divider>
                    <el-table v-loading="loading" :default-sort="{ prop: 'seatIndex', order: 'ascending' }"
                        :data="gameResult.gameResultList" style="width: 100%"
                        :row-style="{ 'font-size': this.largeFontSize }" :header-row-style="{ 'font-size': this.fontSize }">
                        <el-table-column align="center" fixed prop="avatar_id" label="头像" min-width="60">
                            <template slot-scope="scope">
                                <el-avatar shape="square" :size="avatarSize"
                                    :src="getAvatarUrl(scope.row.avatar_id)"></el-avatar>
                            </template>
                        </el-table-column>
                        <el-table-column align="center" fixed prop="nickname" label="昵称" min-width="80"></el-table-column>
                        <el-table-column align="center" sortable prop="seatIndex" label="座位号" min-width="60">
                            <template slot-scope="scope">
                                <span>{{ scope.row.seatIndex + 1 }}</span>
                            </template>
                        </el-table-column>
                        <el-table-column align="center" sortable prop="cards" label="总收牌" min-width="60"></el-table-column>
                        <el-table-column align="center" sortable prop="maxCombo" label="最大连击"
                            min-width="60"></el-table-column>
                        <el-table-column align="center" sortable prop="wukong" label="使用悟空"
                            min-width="60"></el-table-column>
                        <el-table-column align="center" sortable prop="bajie" label="使用八戒" min-width="60"></el-table-column>
                        <el-table-column align="center" sortable prop="shaseng" label="使用沙僧"
                            min-width="60"></el-table-column>
                        <el-table-column align="center" sortable prop="tangseng" label="使用唐僧"
                            min-width="60"></el-table-column>
                        <el-table-column align="center" sortable prop="joker" label="使用反弹" min-width="60"></el-table-column>
                        <el-table-column align="center" sortable prop="bianshen" label="使用变身"
                            min-width="60"></el-table-column>
                    </el-table>
                </div>
            </el-tab-pane>
            <el-tab-pane label="图形数据" name="visualData">
                <el-button type="primary" :size="buttonSize" round @click="changeEchartSelected('')"
                    style="margin-right: 1vw" :disabled="selectedLegend === ''">综合</el-button>
                <el-button type="danger" :size="buttonSize" round @click="changeEchartSelected('all')"
                    style="margin-right: 1vw" :disabled="selectedLegend === 'all'">总收牌</el-button>
                <el-button type="warning" :size="buttonSize" round @click="changeEchartSelected('max')"
                    style="margin-right: 1vw" :disabled="selectedLegend === 'max'">最大连击</el-button>
                <el-button type="success" :size="buttonSize" round @click="changeEchartSelected('func')"
                    :disabled="selectedLegend === 'func'">功能牌</el-button>
                <el-divider></el-divider>
                <div id="main" style="width: 80vw; height: 90vh;"></div>
            </el-tab-pane>
        </el-tabs>
        <span slot="footer">
            <el-button type="danger" :size="buttonSize" @click="closeGameResultDialog">关闭</el-button>
        </span>
    </el-dialog>
</template>

<script lang="ts">
import Vue from 'vue'
import * as echarts from 'echarts/core'
import { TitleComponent, TooltipComponent, GridComponent, LegendComponent } from 'echarts/components'
import { BarChart } from 'echarts/charts'
import { CanvasRenderer } from 'echarts/renderers'
export default Vue.extend({
    data() {
        return {
            activeGameResultModuleTabName: 'gameRecord',
            echartDrawed: false,
            myChart: null,
            selectedLegend: '',
            loading: true,
        }
    },

    computed: {
        customDialogWidth: function () {
            let str = this.largeDialogWidth.split('%')[0]
            let i = parseInt(str)
            if (i < 80) {
                return '80%'
            }
            return this.largeDialogWidth
        },

        gamePlayerList: function () {
            let list = []
            this.gameResult.gameResultList.forEach(gamePlayer => {
                list.push(gamePlayer)
            })
            list.sort(function (b, a) {
                return a.seatIndex - b.seatIndex
            })
            return list
        },
    },

    watch: {
        gameResult: function (newVal) {
            if (newVal !== null) {
                this.echartDrawed = false
                this.selectedLegend = ''
                this.loading = false
            }
        },

        gameResultDialogVisible: function (newVal) {
            if (!newVal) {
                this.activeGameResultModuleTabName = 'gameRecord'
                if (this.myChart !== null) {
                    this.myChart.clear()
                    this.myChart.dispose()
                    this.selectedLegend = ''
                    window.removeEventListener("resize", this.echartResizeLogic)
                }
            }
        }
    },

    props: {
        gameResult: { type: Object, default: null },
        gameResultDialogVisible: { type: Boolean, default: false },
        avatarSize: { type: Number, default: 20 },
        fontSize: { type: String, default: '14px' },
        largeFontSize: { type: String, default: '16px' },
        tagSize: { type: String, default: 'medium' },
        popupWidth: { type: Number, default: 160 },
        buttonSize: { type: String, default: 'medium' },
        dialogWidth: { type: String, default: '50%' },
        largeDialogWidth: { type: String, default: '50%' },
    },

    methods: {
        getAvatarUrl: function (avatarId) {
            return require("@/assets/images/avatar/avatar_" + avatarId + "-min.png")
        },

        /* 17行el-table加上 :row-class-name="tableRowClassName" 可以给玩家行加颜色 */
        tableRowClassName: function ({ row }) {
            if (row.id === this.$store.state.id)
                return 'is-local-player-row'
        },

        closeGameResultDialog: function () {
            this.$emit('gameResultDialogVisible', false)
            this.selectedLegend = ''
            window.removeEventListener("resize", this.echartResizeLogic)
        },

        echartResizeLogic: function () {
            this.myChart.resize()
        },

        changeEchartSelected: function (type) {
            let selectedArray = null
            this.selectedLegend = type
            if (type === '') {
                selectedArray = {
                    '总收牌': true, '最大连击': true, '使用悟空': true, '使用八戒': true, '使用沙僧': true, '使用唐僧': true, '使用反弹': true, '使用变身': true
                }
            }
            else if (type === 'all') {
                selectedArray = {
                    '总收牌': true, '最大连击': false, '使用悟空': false, '使用八戒': false, '使用沙僧': false, '使用唐僧': false, '使用反弹': false, '使用变身': false
                }
            }
            else if (type === 'max') {
                selectedArray = {
                    '总收牌': false, '最大连击': true, '使用悟空': false, '使用八戒': false, '使用沙僧': false, '使用唐僧': false, '使用反弹': false, '使用变身': false
                }
            }
            else if (type === 'func') {
                selectedArray = {
                    '总收牌': false, '最大连击': false, '使用悟空': true, '使用八戒': true, '使用沙僧': true, '使用唐僧': true, '使用反弹': true, '使用变身': true
                }
            }
            this.myChart.setOption({
                legend: {
                    selected: selectedArray
                },
            })
        },

        handleGameResultModuleTabClick: function (tab) {
            if (tab.name === 'visualData' && this.echartDrawed === false) {
                this.echartDrawed = true
                echarts.use([TitleComponent, TooltipComponent, GridComponent, LegendComponent, BarChart, CanvasRenderer])
                var chartDom = document.getElementById('main')
                this.myChart = echarts.init(chartDom)
                window.addEventListener("resize", this.echartResizeLogic, false)
                let seriesLabelStyle = {
                    show: true,
                    fontWeight: 'bold',
                    fontSize: parseInt(this.largeFontSize.split('px')[0])
                }
                var option
                option = {
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {
                            type: 'shadow'
                        }
                    },
                    color: ['#F56C6C', '#E6A23C', '#91cc75', '#5470c6', '#73c0de', '#3ba272', '#fc8452', '#9a60b4', '#ea7ccc'],
                    legend: {
                        data: ['总收牌', '最大连击', '使用悟空', '使用八戒', '使用沙僧', '使用唐僧', '使用反弹', '使用变身'],
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
                        data: this.gamePlayerList.map(function (obj) {
                            return obj.nickname
                        })
                    },
                    series: [
                        {
                            name: '总收牌',
                            type: 'bar',
                            data: this.gamePlayerList.map(function (obj) {
                                return obj.cards
                            }),
                            label: seriesLabelStyle
                        },
                        {
                            name: '最大连击',
                            type: 'bar',
                            data: this.gamePlayerList.map(function (obj) {
                                return obj.maxCombo
                            }),
                            label: seriesLabelStyle
                        },
                        {
                            name: '使用悟空',
                            type: 'bar',
                            data: this.gamePlayerList.map(function (obj) {
                                return obj.wukong
                            }),
                            label: seriesLabelStyle
                        },
                        {
                            name: '使用八戒',
                            type: 'bar',
                            data: this.gamePlayerList.map(function (obj) {
                                return obj.bajie
                            }),
                            label: seriesLabelStyle
                        },
                        {
                            name: '使用沙僧',
                            type: 'bar',
                            data: this.gamePlayerList.map(function (obj) {
                                return obj.shaseng
                            }),
                            label: seriesLabelStyle
                        },
                        {
                            name: '使用唐僧',
                            type: 'bar',
                            data: this.gamePlayerList.map(function (obj) {
                                return obj.tangseng
                            }),
                            label: seriesLabelStyle
                        },
                        {
                            name: '使用反弹',
                            type: 'bar',
                            data: this.gamePlayerList.map(function (obj) {
                                return obj.joker
                            }),
                            label: seriesLabelStyle
                        },
                        {
                            name: '使用变身',
                            type: 'bar',
                            data: this.gamePlayerList.map(function (obj) {
                                return obj.bianshen
                            }),
                            label: seriesLabelStyle
                        },
                    ]
                }
                option && this.myChart.setOption(option)
            }
        },
    },

    beforeDestroy: function () {
        if (this.myChart === null) return
        this.myChart.clear()
        this.myChart.dispose()
        this.selectedLegend = ''
        window.removeEventListener("resize", this.echartResizeLogic)
    }
})
</script>

<style>
.el-table .is-local-player-row {
    background: rgb(240, 249, 235);
}
</style>