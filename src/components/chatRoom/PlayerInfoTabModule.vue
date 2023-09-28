<template>
    <el-tabs v-if="playerProfile !== null" type="border-card" v-model="activeViewModuleTabName"
        @tab-click="handleViewModuleTabClick">
        <el-tab-pane label="个人战绩" name="record">
            <PlayerProfileModule :playerProfile="playerProfile"></PlayerProfileModule>
        </el-tab-pane>
        <el-tab-pane label="过去对局" name="game">
            <GameResultsListModule :gameResultsList="gameResultsList" :gameResultsPageNum="gameResultsPageNum"
                :fontSize="fontSize" :isHorizontal="isHorizontal" :currentPage="gameResultListCurrentPage"
                @pageChanged="getGameRecordsList"
                @sendGameResultToPlayerInfoTab="function (value) { $emit('sendGameResultToPlayerInfo', value) }">
            </GameResultsListModule>
        </el-tab-pane>
        <el-tab-pane label="排行榜" name="rank">
            <RankModule :playerProfile="playerProfile" :fontSize="fontSize" :isShowing="isShowing"></RankModule>
        </el-tab-pane>
        <el-tab-pane label="设置" name="setting" v-if="playerProfile.id === $store.state.id">
            <SettingModule :fontSize="fontSize"></SettingModule>
        </el-tab-pane>
        <el-tab-pane v-if="false" label="成就" name="achievement" disabled>暂未开放</el-tab-pane>
    </el-tabs>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue'
import { PlayerProfile } from '@/type/record'
import { GameResultsList } from '@/type/game'
import PlayerProfileModule from '@/components/chatRoom/tabs/PlayerProfileModule.vue'
import GameResultsListModule from '@/components/chatRoom/tabs/GameResultsListModule.vue'
import SettingModule from '@/components/chatRoom/tabs/SettingModule.vue'
import RankModule from '@/components/chatRoom/tabs/RankModule.vue'
import { getGameRecordsList } from '@/api/infoSearch'

export default Vue.extend({
    data() {
        return {
            gameResultsList: [] as GameResultsList,
            gameResultsPageNum: 0,
            activeViewModuleTabName: 'record',
            gameResultListCurrentPage: 1,
        }
    },

    props: {
        playerProfile: { type: Object as PropType<PlayerProfile>, default: null },
        fontSize: { type: String, default: '' },
        isShowing: { type: Boolean, default: false },
        isHorizontal: { type: Boolean, default: false },
    },

    watch: {
        isShowing: function (newVal: boolean) {
            if (newVal) {
                this.activeViewModuleTabName = 'record'
            }
        }
    },

    methods: {
        handleViewModuleTabClick: function (tab: { name: 'record' | 'game' | 'rank' | 'setting' }) {
            if (tab.name === 'game') {
                this.getGameRecordsList(1)
            }
        },

        getGameRecordsList: function (page: number) {
            this.gameResultListCurrentPage = page
            getGameRecordsList({ page: page, id: this.playerProfile.id })
                .then(res => {
                    this.gameResultsList = res.list
                    this.gameResultsPageNum = res.pageNum
                })
                .catch(() => {
                    this.$message.error('获取数据失败，请稍后重试')
                })
        },
    },

    components: {
        PlayerProfileModule,
        GameResultsListModule,
        SettingModule,
        RankModule,
    },
})
</script>