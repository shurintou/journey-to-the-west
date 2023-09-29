<template>
    <div v-if="playerList !== null && playerList.length > 0">
        <el-table v-loading="loading" :height="isHorizontal ? '70vh' : null" :data="playerList" style="width: 100%"
            :row-class-name="tableRowClassName" :row-style="rowStyle" :header-row-style="rowStyle"
            @row-click="getRowPlayerInfo">
            <el-table-column prop="avatar_id" label="头像" min-width="30" v-slot="scope">
                <el-avatar shape="square" :size="avatarSize" :src="getAvatarUrl(scope.row.avatar_id)"></el-avatar>
            </el-table-column>
            <el-table-column prop="nickname" label="玩家" min-width="80" v-slot="scope">
                <div slot="reference" class="name-wrapper">
                    <el-tag :type="getType(scope.row.player_status)" effect="dark" :style="rowStyle" :size="tagSize">
                        {{ getStatus(scope.row.player_status) }}
                    </el-tag>
                    <span>{{ ' ' + scope.row.nickname }}</span>
                </div>
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
import Vue, { PropType } from 'vue'
import { PlayerStatus } from '@/type/index'
import { WebSocketPlayer } from '@/type/player'
import { PlayerProfile } from '@/type/record'
import { getPlayerRecord } from '@/api/infoSearch'
import PlayerInfoTabModule from '@/components/chatRoom/PlayerInfoTabModule.vue'

export default Vue.extend({
    name: 'playerListModule',
    data() {
        let isPlayerListNull = true
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
            } as PlayerProfile,
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
        playerList: { type: Array as PropType<WebSocketPlayer[]>, default: [] },
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
        tableRowClassName: function ({ row }: { row: WebSocketPlayer }) {
            return this.getType(row.player_status) + '-row'
        },

        getAvatarUrl: function (avatarId: number) {
            return require("@/assets/images/avatar/avatar_" + avatarId + "-min.png")
        },

        getStatus: function (player_status: PlayerStatus) {
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

        getType: function (player_status: PlayerStatus) {
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

        getPlayerRecord: function (id: number, avatar_id: number, nickname: string) {
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
                .catch()
                .finally(() => {
                    this.duplicateGetInfoFlag = false
                })
        },

        getRowPlayerInfo: function (row: WebSocketPlayer) {
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
    background-image: url('~@/assets/images/popupBackground.png');
    color: #D3DCE6;
    font-size: 18px;
    font-weight: 500;
}
</style>