<template>
    <div v-if="playerList !== null && playerList.length > 0">
        <el-table v-loading="loading" :height="isHorizontal ? '70vh' : null" :data="playerList" style="width: 100%"
            :row-class-name="tableRowClassName" :row-style="rowStyle" :header-row-style="rowStyle"
            @row-click="getRowPlayerInfo">
            <el-table-column prop="avatar_id" label="头像" min-width="30">
                <template slot-scope="scope">
                    <el-avatar shape="square" :size="avatarSize" :src="getAvatarUrl(scope.row.avatar_id)"></el-avatar>
                </template>
            </el-table-column>
            <el-table-column prop="nickname" label="玩家" min-width="80">
                <template slot-scope="scope">
                    <div slot="reference" class="name-wrapper">
                        <el-tag :type="getType(scope.row.player_status)" effect="dark" :style="rowStyle" :size="tagSize">
                            {{ getStatus(scope.row.player_status) }}
                        </el-tag>
                        <span>{{ ' ' + scope.row.nickname }}</span>
                    </div>
                </template>
            </el-table-column>
        </el-table>
        <el-dialog :title="playerProfile.nickname" :visible.sync="playerInfoDialogVisible" :width="playerInfoDialogWidth"
            :modal-append-to-body=false center :modal="false">
            <PlayerInfoTabModule :playerProfile="playerProfile" :fontSize="fontSize" :isShowing="playerInfoDialogVisible"
                :isHorizontal="isHorizontal"
                @sendGameResultToPlayerInfo="function (value) { $emit('sendGameResultToChatRoom', value) }">
            </PlayerInfoTabModule>
            <span slot="footer" class="dialog-footer">
                <el-button type="danger" @click="playerInfoDialogVisible = false" :style="{ 'font-size': fontSize }"
                    :size="buttonSize">关闭</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { getPlayerRecord } from '@/api/infoSearch'
import PlayerInfoTabModule from '@/components/chatRoom/PlayerInfoTabModule'

export default Vue.extend({
    name: 'playerListModule',
    data() {
        var isPlayerListNull = true
        if (this.playerList === undefined || this.playerList.length === 0) {
            isPlayerListNull = true
        }
        else {
            isPlayerListNull = false
        }
        return {
            playerInfoDialogVisible: false,
            duplicateGetInfoFlag: false,
            playerProfile: {
                id: 0,
                avatar_id: 0,
                nickname: '',
                record: {
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
            loading: isPlayerListNull,
        }
    },

    computed: {
        rowStyle: function () {
            return { 'font-size': this.fontSize }
        },
    },

    watch: {
        playerList: function () {
            if (this.playerList === undefined || this.playerList.length === 0) return
            this.loading = false
        }
    },

    props: {
        playerList: Array,
        avatarSize: { type: Number, default: 20 },
        fontSize: { type: String, default: '14px' },
        largeFontSize: { type: String, default: '16px' },
        tagSize: { type: String, default: 'medium' },
        popupWidth: { type: Number, default: 160 },
        buttonSize: { type: String, default: 'medium' },
        dialogWidth: { type: String, default: '50%' },
        largeDialogWidth: { type: String, default: '50%' },
        playerInfoDialogWidth: { type: String, default: '50%' },
        isHorizontal: { type: Boolean, default: false },
    },

    methods: {
        tableRowClassName: function ({ row }) {
            return this.getType(row.player_status) + '-row'
        },

        getAvatarUrl: function (avatarId) {
            return require("@/assets/images/avatar/avatar_" + avatarId + "-min.png")
        },

        getStatus: function (player_status) {
            if (player_status === 2) {
                return '忙碌'
            }
            else if (player_status === 1) {
                return '等待'
            }
            else if (player_status === 0) {
                return '空闲'
            }
        },

        getType: function (player_status) {
            if (player_status === 2) {
                return 'danger'
            }
            else if (player_status === 1) {
                return 'warning'
            }
            else if (player_status === 0) {
                return 'success'
            }
        },

        getPlayerRecord: function (id, avatar_id, nickname) {
            if (this.duplicateGetInfoFlag) return;
            this.duplicateGetInfoFlag = true
            this.playerProfile.id = id
            this.playerInfoDialogVisible = true
            this.playerProfile.avatar_id = avatar_id
            this.playerProfile.nickname = nickname
            getPlayerRecord({ id: id })
                .then((res) => {
                    this.playerProfile.record = res.record
                })
                .catch({})
                .finally(() => {
                    this.duplicateGetInfoFlag = false
                })
        },

        getRowPlayerInfo: function (row) {
            this.getPlayerRecord(row.id, row.avatar_id, row.nickname)
        },
    },

    components: {
        PlayerInfoTabModule,
    }
})
</script>

<style>
.el-table .warning-row {
    background: #f3efcb;
}

.el-table .success-row {
    background: #d5f8ca;
}

.el-table .danger-row {
    background: #f0caca;
}

.chat-popover {
    background-size: 100% 100%;
    background-image: url('@/assets/images/popupBackground.png');
    color: #D3DCE6;
    font-size: 18px;
    font-weight: 500;
}
</style>