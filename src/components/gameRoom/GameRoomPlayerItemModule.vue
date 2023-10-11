<template>
    <div
        :class="{ 'player-now-play-card': gameInfo && gameInfo.currentPlayer === seatIndex, 'player-now-play-color': showColorChanging }">
        <el-tooltip effect="light" :placement="tooltipPlacement" :manual="true" v-model="isTooltipShow">
            <div slot="content">
                <p v-for="(item, index) in gameTextFromPlayer" :key="index + '' + item">{{ item }}</p>
            </div>
            <el-popover placement="top" width="160" v-model="isPopoverVisible"
                :disabled="playerLocRoom.status === 0 && player.ready === true">
                <div style="margin: 0"
                    :style="{ 'margin-left': playerLocRoom.owner === $store.state.id || playerLocRoom.status === 1 ? '0' : '25%' }">
                    <template v-if="playerLocRoom.status === 0 && player.ready === false">
                        <el-button style="margin-left: 10%; margin-right: 10%" type="primary" size="mini"
                            @click="changeSeat"
                            :disabled="playerLocRoom.playerList[localPlayerSeatIndex].ready === true">换位</el-button>
                        <el-button v-if="playerLocRoom.owner === $store.state.id" type="danger" size="mini"
                            @click="kickPlayerOff">踢出</el-button>
                    </template>
                    <template v-if="playerLocRoom.status === 1">
                        <QuickChatSelector :labelMessage="'向该玩家发言'" @emitSelectedTextToPlayer="sentSelectedTextToPlayer">
                        </QuickChatSelector>
                    </template>
                </div>
                <div slot="reference" id="game-room-player-info-box">
                    <template v-if="playerLocRoom.status === 0">
                        <div
                            :class="{ 'game-room-player-info-item-vertical': !isItemHorizontal, 'game-room-player-info-item-horitonzal': isItemHorizontal }">
                            <el-image
                                :class="{ 'game-room-player-info-avatar-vertical': !isItemHorizontal, 'game-room-player-info-avatar-horizontal': isItemHorizontal }"
                                :src="getAvatarUrl(getPlayer().avatar_id)"></el-image>
                            <el-tag :type="getPlayerNameTagType" :effect="player.id === 0 ? 'light' : 'dark'"
                                :size="tagSize" :style="{ 'font-size': fontSize }"><i
                                    v-if="player.id === playerLocRoom.owner" class="el-icon-star-on"></i>
                                {{ getPlayer().nickname }}
                            </el-tag>
                        </div>
                        <div :class="{ 'game-room-player-info-item-vertical': !isItemHorizontal, 'game-room-player-info-item-horitonzal': isItemHorizontal }"
                            v-if="getPlayer().avatar_id !== 0">
                            <el-tag type="info" effect="dark" :size="tagSize" :style="{ 'font-size': fontSize }">
                                {{ '收牌数： ' }}
                                <CardsNum :value="player.cards" /> {{ ' 张' }}
                            </el-tag>
                            <el-tag type="success" effect="dark" :size="tagSize" :style="{ 'font-size': fontSize }">
                                {{ '吃鸡： ' }}
                                <CardsNum :value="player.win" /> {{ ' 局' }}
                            </el-tag>
                            <el-tag type="danger" effect="dark" :size="tagSize" :style="{ 'font-size': fontSize }">
                                {{ '拉跨： ' }}
                                <CardsNum :value="player.loss" /> {{ ' 局' }}
                            </el-tag>
                        </div>
                    </template>
                    <template v-if="playerLocRoom.status === 1 && gameInfo !== null && getGamePlayer !== null">
                        <div
                            :class="{ 'game-room-player-info-item-vertical': !isItemHorizontal, 'game-room-player-info-item-horitonzal': isItemHorizontal }">
                            <AnimatedAvatar
                                :avatarClass="isItemHorizontal ? 'game-room-player-info-avatar-horizontal' : 'game-room-player-info-avatar-vertical'"
                                :avatarUrl="getAvatarUrl(getGamePlayer.avatar_id)" :currentPlayerCards="getGamePlayer.cards"
                                :isCurrentPlayer="gameInfo.currentPlayer === seatIndex"
                                :currentGameCombo="gameInfo.currentCombo"></AnimatedAvatar>
                            <el-tag :type="getPlayerNameTagType" effect="dark" :size="tagSize"
                                :style="{ 'font-size': fontSize }"><i v-if="gameInfo.currentPlayer === seatIndex"
                                    class="el-icon-alarm-clock"></i>{{ getGamePlayer.nickname }}</el-tag>
                        </div>
                        <div
                            :class="{ 'game-room-player-info-item-vertical': !isItemHorizontal, 'game-room-player-info-item-horitonzal': isItemHorizontal }">
                            <transition leave-active-class="scale-out-top">
                                <el-tag v-show="getGamePlayer.remainCards.length > 0" type="success" effect="dark"
                                    :size="tagSize" :style="{ 'font-size': fontSize }">
                                    {{ '手牌数： ' + getGamePlayer.remainCards.length + ' 张' }}</el-tag>
                            </transition>
                            <el-tag :class="{ 'increase-num': allCardsFlag }" type="info" effect="dark" :size="tagSize"
                                :style="{ 'font-size': fontSize }">{{ '总收牌： ' }}
                                <CardsNum :value="getGamePlayer.cards" @increased="increasedHandler('all')" />
                                {{ ' 张' }}
                            </el-tag>
                            <el-tag :class="{ 'increase-num': comboFlag }" type="danger" effect="dark" :size="tagSize"
                                :style="{ 'font-size': fontSize }">{{ '最大连击： ' }}
                                <CardsNum :value="getGamePlayer.maxCombo" @increased="increasedHandler('combo')" />
                                {{ ' 张' }}
                            </el-tag>
                        </div>
                    </template>
                </div>
            </el-popover>
        </el-tooltip>
    </div>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue'
import { GamePlayerSeatIndex } from '@/type/index'
import { WebSocketPlayer } from '@/type/player'
import { TextToPlayer } from '@/type/setting'
import { WebSocketGame } from '@/type/game'
import { TextToPlayerGameData } from '@/type/websocket'
import { PlayerLocRomTypeChatMessageObject, WebSocketGameRoom, WebSocketPlayerInRoom } from '@/type/room'
import CardsNum from '@/components/gameRoom/fragment/CardsNum.vue'
import AnimatedAvatar from '@/components/gameRoom/fragment/AnimatedAvatar.vue'
import QuickChatSelector from '@/components/gameRoom/fragment/QuickChatSelector.vue'
import { playSound } from '@/utils/soundHandler'

export default Vue.extend({
    data() {
        return {
            isTooltipShow: false,
            isPopoverVisible: false,
            gameTextFromPlayer: [] as string[],
            showColorChanging: false,
            allCardsFlag: false,
            comboFlag: false,
        }
    },

    props: {
        player: { type: Object as PropType<WebSocketPlayerInRoom>, default: null },
        playerList: { type: Array as PropType<WebSocketPlayer[]>, default: [] },
        tooltipPlacement: { type: String, default: 'top' },
        tagSize: { type: String, default: '' },
        fontSize: { type: String, default: '' },
        isItemHorizontal: { type: Boolean, default: false },
        playerLocRoom: { type: Object as PropType<WebSocketGameRoom>, default: null },
        ws: { type: WebSocket, default: null },
        seatIndex: { type: Number as PropType<GamePlayerSeatIndex> },
        gameInfo: { type: Object as PropType<WebSocketGame>, default: null },
        localPlayerSeatIndex: { type: Number as PropType<GamePlayerSeatIndex> },
        sentGameTextToPlayer: { type: Object as PropType<TextToPlayerGameData>, default: null },
        sentPlayerLocRomTypeChatMessage: { type: Object as PropType<PlayerLocRomTypeChatMessageObject>, default: null },
    },

    watch: {
        sentGameTextToPlayer: function (newVal: TextToPlayerGameData): void {
            if (this.gameInfo === null) return
            if (newVal.source === undefined || newVal.text === undefined || newVal.target === undefined) return
            if (this.gameInfo.gamePlayer[newVal.source] === undefined) return
            this.$emit('gameTextToPlayerSent', this.seatIndex)
            if (newVal.targetId === -1) {
                this.gameTextFromPlayer.push(this.gameInfo.gamePlayer[newVal.source].nickname + ' 说: ' + newVal.text)
            }
            else if (newVal.targetId === this.$stock.state.id) {
                this.gameTextFromPlayer.push(this.gameInfo.gamePlayer[newVal.source].nickname + ' 对你说: ' + newVal.text)
            }
            else {
                this.gameTextFromPlayer.push(this.gameInfo.gamePlayer[newVal.source].nickname + ' 对' + this.gameInfo.gamePlayer[newVal.target as GamePlayerSeatIndex].nickname + ' 说: ' + newVal.text)
            }
            playSound('quickChat/' + newVal.soundSrc)
            this.$nextTick(function () {
                if (this.gameTextFromPlayer.length > 0) {
                    this.isTooltipShow = true
                }
            })
        },

        sentPlayerLocRomTypeChatMessage: function (newVal: PlayerLocRomTypeChatMessageObject) {
            if (this.gameInfo !== null) return
            if (newVal === undefined || newVal.nickname === undefined || newVal === null || newVal.text === undefined || newVal.text === '') return
            this.$emit('typeChatMessageSent', this.seatIndex)
            this.gameTextFromPlayer.push(newVal.nickname + ' 说: ' + newVal.text)
            this.$nextTick(function () {
                if (this.gameTextFromPlayer.length > 0) {
                    this.isTooltipShow = true
                }
            })
        },

        gameInfo: function (newVal) {
            if (newVal === null) return
            if (newVal.currentPlayer === this.seatIndex) {
                this.showColorChanging = false
                const vm = this
                //牌池有牌时不出牌，刷新玩家背景框颜色动画的逻辑
                window.requestAnimationFrame(function () {
                    window.requestAnimationFrame(function () {
                        vm.showColorChanging = true
                    })
                })
            }
            else {
                this.showColorChanging = false
            }
        }
    },

    computed: {
        getPlayerNameTagType: function () {
            if (this.player.id === 0) return 'info'
            /* 游戏未开始 */
            if (this.playerLocRoom.status === 0) {
                if (this.player.id === this.playerLocRoom.owner) {
                    return 'warning'
                }
                if (this.player.ready === false) {
                    return 'info'
                }
                else {
                    return 'success'
                }
            }
            else {
                if (this.getGamePlayer?.online) {
                    return 'primary'
                }
                else {
                    return 'danger'
                }
            }
        },

        getGamePlayer: function () {
            if (this.gameInfo === null) return null
            if (this.gameInfo.gamePlayer[this.seatIndex].id > 0) {
                return this.gameInfo.gamePlayer[this.seatIndex]
            }
            return null
        },
    },

    methods: {
        getPlayer: function (): WebSocketPlayer | { nickname: string, avatar_id: number } {
            for (let i = 0; i < this.playerList.length; i++) {
                if (this.playerList[i].id === this.player.id) {
                    return this.playerList[i]
                }
            }
            return { nickname: '空位' + (this.seatIndex + 1), avatar_id: 0 }
        },

        getAvatarUrl: function (avatarId: number) {
            return require("@/assets/images/avatar/avatar_" + avatarId + "-min.png")
        },

        kickPlayerOff: function () {
            if (this.player.id === 0) {
                this.isPopoverVisible = false
                return
            }
            this.ws?.send(JSON.stringify({ type: 'gameRoomList', id: -1 * this.playerLocRoom.id, seatIndex: this.seatIndex }))
            this.isPopoverVisible = false
        },

        changeSeat: function () {
            this.ws?.send(JSON.stringify({ type: 'gameRoomList', action: 'changeSeat', id: this.playerLocRoom.id, targetId: this.player.id, sourceId: this.$stock.state.id, targetSeatIndex: this.seatIndex, sourceSeatIndex: this.localPlayerSeatIndex, confirm: false }))
            this.isPopoverVisible = false
        },

        sentSelectedTextToPlayer: function (item: TextToPlayer) {
            this.isPopoverVisible = false
            this.ws?.send(JSON.stringify({ type: 'game', action: 'textToPlayer', id: this.gameInfo.id, source: this.localPlayerSeatIndex, target: this.seatIndex, targetId: this.player.id, sourceId: this.$stock.state.id, text: item.text, soundSrc: item.music }))
        },

        increasedHandler: function (whichFlag: 'all' | 'combo') {
            let vm = this
            if (whichFlag === 'all') {
                this.allCardsFlag = false
                window.requestAnimationFrame(function () {
                    window.requestAnimationFrame(function () {
                        vm.allCardsFlag = true
                    })
                })
            }
            else if (whichFlag === 'combo') {
                this.comboFlag = false
                window.requestAnimationFrame(function () {
                    window.requestAnimationFrame(function () {
                        vm.comboFlag = true
                    })
                })
            }
        },
    },

    components: {
        CardsNum,
        AnimatedAvatar,
        QuickChatSelector,
    }
})
</script>

<style scoped>
#game-room-player-info-box:hover {
    cursor: pointer;
}

.game-room-player-info-item-vertical {
    width: 100%;
    height: 33%;
}

.game-room-player-info-item-horitonzal {
    width: 50%;
    height: 33%;
    display: inline-block;
}

.game-room-player-info-avatar-vertical {
    vertical-align: middle;
    width: 30%;
    height: 100%;
    overflow: unset;
}

.game-room-player-info-avatar-horizontal {
    vertical-align: middle;
    width: 70%;
    max-width: 4vw;
    height: 100%;
    overflow: unset;
    display: inline-block;
}

.player-now-play-card {
    border-radius: 1vw;
    border-style: solid;
    background-size: 100% 100%;
}

.player-now-play-color {
    -webkit-animation: player-now-play-color 15s linear alternate both;
    animation: player-now-play-color 15s linear alternate both;
}

@-webkit-keyframes player-now-play-color {
    0% {
        background: rgba(0, 191, 235, 0.3);
        border-color: rgb(0, 191, 235);
    }

    25% {
        background: rgba(127, 255, 0, 0.3);
        border-color: rgb(127, 255, 0);
    }

    50% {
        background: rgba(255, 255, 0, 0.3);
        border-color: rgb(255, 255, 0);
    }

    75% {
        background: rgba(255, 0, 0, 0.3);
        border-color: rgb(255, 0, 0);
    }

    100% {
        background: rgba(0, 0, 0, 0);
        border-color: rgba(0, 0, 0, 0);
    }
}

@keyframes player-now-play-color {
    0% {
        background: rgba(0, 191, 235, 0.3);
        border-color: rgb(0, 191, 235);
    }

    25% {
        background: rgba(127, 255, 0, 0.3);
        border-color: rgb(127, 255, 0);
    }

    50% {
        background: rgba(255, 255, 0, 0.3);
        border-color: rgb(255, 255, 0);
    }

    75% {
        background: rgba(255, 0, 0, 0.3);
        border-color: rgb(255, 0, 0);
    }

    100% {
        background: rgba(0, 0, 0, 0);
        border-color: rgba(0, 0, 0, 0);
    }
}
</style>