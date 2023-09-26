<template>
    <div v-if="gameResultsList.length > 0">
        <div class="game-result-item" v-for="gameResult in gameResultsList" :key="gameResult.id">
            <el-alert center :closable="false" style="margin: 0; padding: 0"
                :title="getGameDate(new Date(gameResult.createdAt)) + ' 座位 ' + (gameResult.seat_index + 1)"
                type="info"></el-alert>
            <div style="margin-top: 1%; height: 84%">
                <div class="game-result-sub-item">
                    <div><span :style="{ 'font-size': fontSize }">{{ gameResult.nickname }}</span></div>
                    <el-avatar shape="square" :fit="'cover'" :src="getAvatarUrl(gameResult.avatar_id)"></el-avatar>
                </div>
                <div class="game-result-sub-item">
                    <div><span :style="{ 'font-size': fontSize }">总收牌: {{ gameResult.cards }}张</span></div>
                    <el-avatar shape="square" :fit="'cover'"
                        :src="require('@/assets/images/poker/game-result-ammount.png')"></el-avatar>
                </div>
                <div class="game-result-sub-item">
                    <div><span :style="{ 'font-size': fontSize }">最大连击: {{ gameResult.max_combo }}张</span></div>
                    <el-avatar shape="square" :fit="'cover'"
                        :src="require('@/assets/images/poker/game-result-max-combo.png')"></el-avatar>
                </div>
                <div class="game-result-sub-item" @click="getGameResultInfo(gameResult.gameId)">
                    <div><span :style="{ 'font-size': fontSize }">查看详情</span></div>
                    <el-avatar class="view-game-result-button" shape="square" :fit="'cover'"
                        :src="require('@/assets/images/view-game-result-button.png')"></el-avatar>
                </div>
            </div>
        </div>
        <el-pagination style="text-align: center;" background layout="prev, pager, next" :total="gameResultsPageNum"
            :hide-on-single-page="gameResultsPageNum <= 5" :page-size="5" :small="!isHorizontal" :pager-count="5"
            :current-page="currentPage" @current-change="emitPageChanged"></el-pagination>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { PropType } from 'vue'
import { getGameRecord } from '@/api/infoSearch'
import { GameResultsList } from '@/type/game'

export default Vue.extend({
    data() {
        return {

        }
    },

    props: {
        gameResultsList: { type: Array as PropType<GameResultsList>, },
        gameResultsPageNum: { type: Number, default: 0 },
        fontSize: { type: String, default: '' },
        isHorizontal: { type: Boolean, default: false },
        currentPage: { type: Number, default: 0 },
    },

    methods: {
        getGameDate: function (data: Date) {
            return data.getFullYear() + '年' + (data.getMonth() + 1) + '月' + data.getDate() + '日 ' + data.getHours() + '时' + data.getMinutes() + '分'
        },

        getAvatarUrl: function (avatarId: number) {
            return require("@/assets/images/avatar/avatar_" + avatarId + "-min.png")
        },

        emitPageChanged: function (pageNum: number) {
            this.$emit('pageChanged', pageNum)
        },

        getGameResultInfo: function (id: number) {
            getGameRecord({ id: id })
                .then(res => {
                    this.$emit('sendGameResultToPlayerInfoTab', { gameResult: res.gameResult })
                })
                .catch(() => {
                    this.$message.error('获取数据失败，请稍后重试')
                })
        },
    }
})
</script>

<style>
.game-result-item {
    width: 100%;
    height: 20%;
    background-image: url('@/assets/images/icon-select-background.png');
    background-size: 100% 100%;
    border-radius: 3%;
    margin-bottom: 3vh;
}

.game-result-sub-item {
    text-align: center;
    display: inline-block;
    width: 25%;
    height: 100%;
}

.view-game-result-button:hover {
    cursor: pointer;
    filter: brightness(110%);
}
</style>