<template>
    <div id="game-room-box-horizontal" v-if="isHorizontal">
        <div id="game-room-box-horizontal-header">
            <div class="game-room-box-horizontal-header-item" style="margin-left: 15%; float:left">
                <GameRoomPlayerItemModule :tooltipPlacement="'bottom'" :playerList="playerList" :tagSize="tagSize"
                    :fontSize="fontSize" :ws="ws" :playerLocRoom="playerLocRoom"
                    @gameTextToPlayerSent="gameTextToPlayerHandler"
                    @typeChatMessageSent="function (seatIndex) { sentPlayerLocRomTypeChatMessageObject[seatIndex] = {} }"
                    :sentPlayerLocRomTypeChatMessage="sentPlayerLocRomTypeChatMessageObject[calPlayersSeat(5)]"
                    :gameInfo="gameInfo" :isItemHorizontal="true" :seatIndex="calPlayersSeat(5)"
                    :sentGameTextToPlayer="sentGameTextToPlayerObj[calPlayersSeat(5)]"
                    :localPlayerSeatIndex="playerSeatIndex" :player="playerLocRoom.playerList[calPlayersSeat(5)]">
                </GameRoomPlayerItemModule>
            </div>
            <div class="game-room-box-horizontal-header-item" style="float: left">
                <GameRoomPlayerItemModule :tooltipPlacement="'bottom'" :playerList="playerList" :tagSize="tagSize"
                    :fontSize="fontSize" :ws="ws" :playerLocRoom="playerLocRoom"
                    @gameTextToPlayerSent="gameTextToPlayerHandler"
                    @typeChatMessageSent="function (seatIndex) { sentPlayerLocRomTypeChatMessageObject[seatIndex] = {} }"
                    :sentPlayerLocRomTypeChatMessage="sentPlayerLocRomTypeChatMessageObject[calPlayersSeat(4)]"
                    :gameInfo="gameInfo" :isItemHorizontal="true" :seatIndex="calPlayersSeat(4)"
                    :sentGameTextToPlayer="sentGameTextToPlayerObj[calPlayersSeat(4)]"
                    :localPlayerSeatIndex="playerSeatIndex" :player="playerLocRoom.playerList[calPlayersSeat(4)]">
                </GameRoomPlayerItemModule>
            </div>
            <div class="game-room-box-horizontal-header-item" style="float: left">
                <GameRoomPlayerItemModule :tooltipPlacement="'bottom'" :playerList="playerList" :tagSize="tagSize"
                    :fontSize="fontSize" :ws="ws" :playerLocRoom="playerLocRoom"
                    @gameTextToPlayerSent="gameTextToPlayerHandler"
                    @typeChatMessageSent="function (seatIndex) { sentPlayerLocRomTypeChatMessageObject[seatIndex] = {} }"
                    :sentPlayerLocRomTypeChatMessage="sentPlayerLocRomTypeChatMessageObject[calPlayersSeat(3)]"
                    :gameInfo="gameInfo" :isItemHorizontal="true" :seatIndex="calPlayersSeat(3)"
                    :sentGameTextToPlayer="sentGameTextToPlayerObj[calPlayersSeat(3)]"
                    :localPlayerSeatIndex="playerSeatIndex" :player="playerLocRoom.playerList[calPlayersSeat(3)]">
                </GameRoomPlayerItemModule>
            </div>
        </div>
        <div id="game-room-box-horizontal-body">
            <div class="game-room-box-horizontal-body-aside" style="float: left;">
                <div class="game-room-box-horizontal-body-aside-item-top">
                    <GameRoomPlayerItemModule :tooltipPlacement="'top'" :playerList="playerList" :tagSize="tagSize"
                        :fontSize="fontSize" :ws="ws" :playerLocRoom="playerLocRoom"
                        @gameTextToPlayerSent="gameTextToPlayerHandler"
                        @typeChatMessageSent="function (seatIndex) { sentPlayerLocRomTypeChatMessageObject[seatIndex] = {} }"
                        :sentPlayerLocRomTypeChatMessage="sentPlayerLocRomTypeChatMessageObject[calPlayersSeat(6)]"
                        :gameInfo="gameInfo" :seatIndex="calPlayersSeat(6)"
                        :sentGameTextToPlayer="sentGameTextToPlayerObj[calPlayersSeat(6)]"
                        :localPlayerSeatIndex="playerSeatIndex" :player="playerLocRoom.playerList[calPlayersSeat(6)]">
                    </GameRoomPlayerItemModule>
                </div>
                <div class="game-room-box-horizontal-body-aside-item-bottom">
                    <GameRoomPlayerItemModule :tooltipPlacement="'top'" :playerList="playerList" :tagSize="tagSize"
                        :fontSize="fontSize" :ws="ws" :playerLocRoom="playerLocRoom"
                        @gameTextToPlayerSent="gameTextToPlayerHandler"
                        @typeChatMessageSent="function (seatIndex) { sentPlayerLocRomTypeChatMessageObject[seatIndex] = {} }"
                        :sentPlayerLocRomTypeChatMessage="sentPlayerLocRomTypeChatMessageObject[calPlayersSeat(7)]"
                        :gameInfo="gameInfo" :seatIndex="calPlayersSeat(7)"
                        :sentGameTextToPlayer="sentGameTextToPlayerObj[calPlayersSeat(7)]"
                        :localPlayerSeatIndex="playerSeatIndex" :player="playerLocRoom.playerList[calPlayersSeat(7)]">
                    </GameRoomPlayerItemModule>
                </div>
            </div>
            <div id="game-room-box-horizontal-body-table" style="float: left;">
                <GameRoomTableModule :isItemHorizontal="true" :playerLocRoom="playerLocRoom"
                    @gameTextToPlayerSent="gameTextToPlayerHandler"
                    @typeChatMessageSent="function (seatIndex) { sentPlayerLocRomTypeChatMessageObject[seatIndex] = {} }"
                    :sentPlayerLocRomTypeChatMessage="sentPlayerLocRomTypeChatMessageObject[calPlayersSeat(0)]"
                    :gameInfo="gameInfo" :tagSize="tagSize" :fontSize="fontSize" :largeFontSize="largeFontSize" :ws="ws"
                    :dialogWidth="dialogWidth" :seatIndex="calPlayersSeat(0)"
                    :sentGameTextToPlayer="sentGameTextToPlayerObj[calPlayersSeat(0)]"
                    :player="playerLocRoom.playerList[calPlayersSeat(0)]" @playCard="$emit('playCard')">
                </GameRoomTableModule>
            </div>
            <div class="game-room-box-horizontal-body-aside" style="float: left;">
                <div class="game-room-box-horizontal-body-aside-item-top">
                    <GameRoomPlayerItemModule :tooltipPlacement="'top'" :playerList="playerList" :tagSize="tagSize"
                        :fontSize="fontSize" :ws="ws" :playerLocRoom="playerLocRoom"
                        @gameTextToPlayerSent="gameTextToPlayerHandler"
                        @typeChatMessageSent="function (seatIndex) { sentPlayerLocRomTypeChatMessageObject[seatIndex] = {} }"
                        :sentPlayerLocRomTypeChatMessage="sentPlayerLocRomTypeChatMessageObject[calPlayersSeat(2)]"
                        :gameInfo="gameInfo" :seatIndex="calPlayersSeat(2)"
                        :sentGameTextToPlayer="sentGameTextToPlayerObj[calPlayersSeat(2)]"
                        :localPlayerSeatIndex="playerSeatIndex" :player="playerLocRoom.playerList[calPlayersSeat(2)]">
                    </GameRoomPlayerItemModule>
                </div>
                <div class="game-room-box-horizontal-body-aside-item-bottom">
                    <GameRoomPlayerItemModule :tooltipPlacement="'top'" :playerList="playerList" :tagSize="tagSize"
                        :fontSize="fontSize" :ws="ws" :playerLocRoom="playerLocRoom"
                        @gameTextToPlayerSent="gameTextToPlayerHandler"
                        @typeChatMessageSent="function (seatIndex) { sentPlayerLocRomTypeChatMessageObject[seatIndex] = {} }"
                        :sentPlayerLocRomTypeChatMessage="sentPlayerLocRomTypeChatMessageObject[calPlayersSeat(1)]"
                        :gameInfo="gameInfo" :seatIndex="calPlayersSeat(1)"
                        :sentGameTextToPlayer="sentGameTextToPlayerObj[calPlayersSeat(1)]"
                        :localPlayerSeatIndex="playerSeatIndex" :player="playerLocRoom.playerList[calPlayersSeat(1)]">
                    </GameRoomPlayerItemModule>
                </div>
            </div>
        </div>
    </div>
    <div id="game-room-box-vertical" v-else>
        <div id="game-room-box-vertical-header">
            <div id="game-room-box-vertical-header-item">
                <GameRoomPlayerItemModule :tooltipPlacement="'top'" :playerList="playerList" :tagSize="tagSize"
                    :fontSize="fontSize" :ws="ws" :playerLocRoom="playerLocRoom"
                    @gameTextToPlayerSent="gameTextToPlayerHandler"
                    @typeChatMessageSent="function (seatIndex) { sentPlayerLocRomTypeChatMessageObject[seatIndex] = {} }"
                    :sentPlayerLocRomTypeChatMessage="sentPlayerLocRomTypeChatMessageObject[calPlayersSeat(4)]"
                    :gameInfo="gameInfo" :isItemHorizontal="false" :seatIndex="calPlayersSeat(4)"
                    :sentGameTextToPlayer="sentGameTextToPlayerObj[calPlayersSeat(4)]"
                    :localPlayerSeatIndex="playerSeatIndex" :player="playerLocRoom.playerList[calPlayersSeat(4)]">
                </GameRoomPlayerItemModule>
            </div>
        </div>
        <div id="game-room-box-vertical-body">
            <div class="game-room-box-vertical-body-aside" style="float:left">
                <div class="game-room-box-vertical-body-aside-item">
                    <GameRoomPlayerItemModule :tooltipPlacement="'top'" :playerList="playerList" :tagSize="tagSize"
                        :fontSize="fontSize" :ws="ws" :playerLocRoom="playerLocRoom"
                        @gameTextToPlayerSent="gameTextToPlayerHandler"
                        @typeChatMessageSent="function (seatIndex) { sentPlayerLocRomTypeChatMessageObject[seatIndex] = {} }"
                        :sentPlayerLocRomTypeChatMessage="sentPlayerLocRomTypeChatMessageObject[calPlayersSeat(5)]"
                        :gameInfo="gameInfo" :seatIndex="calPlayersSeat(5)"
                        :sentGameTextToPlayer="sentGameTextToPlayerObj[calPlayersSeat(5)]"
                        :localPlayerSeatIndex="playerSeatIndex" :player="playerLocRoom.playerList[calPlayersSeat(5)]">
                    </GameRoomPlayerItemModule>
                </div>
                <div class="game-room-box-vertical-body-aside-item">
                    <GameRoomPlayerItemModule :tooltipPlacement="'top'" :playerList="playerList" :tagSize="tagSize"
                        :fontSize="fontSize" :ws="ws" :playerLocRoom="playerLocRoom"
                        @gameTextToPlayerSent="gameTextToPlayerHandler"
                        @typeChatMessageSent="function (seatIndex) { sentPlayerLocRomTypeChatMessageObject[seatIndex] = {} }"
                        :sentPlayerLocRomTypeChatMessage="sentPlayerLocRomTypeChatMessageObject[calPlayersSeat(6)]"
                        :gameInfo="gameInfo" :seatIndex="calPlayersSeat(6)"
                        :sentGameTextToPlayer="sentGameTextToPlayerObj[calPlayersSeat(6)]"
                        :localPlayerSeatIndex="playerSeatIndex" :player="playerLocRoom.playerList[calPlayersSeat(6)]">
                    </GameRoomPlayerItemModule>
                </div>
                <div class="game-room-box-vertical-body-aside-item">
                    <GameRoomPlayerItemModule :tooltipPlacement="'top'" :playerList="playerList" :tagSize="tagSize"
                        :fontSize="fontSize" :ws="ws" :playerLocRoom="playerLocRoom"
                        @gameTextToPlayerSent="gameTextToPlayerHandler"
                        @typeChatMessageSent="function (seatIndex) { sentPlayerLocRomTypeChatMessageObject[seatIndex] = {} }"
                        :sentPlayerLocRomTypeChatMessage="sentPlayerLocRomTypeChatMessageObject[calPlayersSeat(7)]"
                        :gameInfo="gameInfo" :seatIndex="calPlayersSeat(7)"
                        :sentGameTextToPlayer="sentGameTextToPlayerObj[calPlayersSeat(7)]"
                        :localPlayerSeatIndex="playerSeatIndex" :player="playerLocRoom.playerList[calPlayersSeat(7)]">
                    </GameRoomPlayerItemModule>
                </div>
            </div>
            <div id="game-room-box-vertical-body-table">
                <GameRoomTableModule :playerLocRoom="playerLocRoom" @gameTextToPlayerSent="gameTextToPlayerHandler"
                    @typeChatMessageSent="function (seatIndex) { sentPlayerLocRomTypeChatMessageObject[seatIndex] = {} }"
                    :sentPlayerLocRomTypeChatMessage="sentPlayerLocRomTypeChatMessageObject[calPlayersSeat(0)]"
                    :gameInfo="gameInfo" :tagSize="tagSize" :fontSize="fontSize" :largeFontSize="largeFontSize" :ws="ws"
                    :dialogWidth="dialogWidth" :seatIndex="calPlayersSeat(0)"
                    :sentGameTextToPlayer="sentGameTextToPlayerObj[calPlayersSeat(0)]"
                    :player="playerLocRoom.playerList[calPlayersSeat(0)]" @playCard="$emit('playCard')">
                </GameRoomTableModule>
            </div>
            <div class="game-room-box-vertical-body-aside" style="float: right">
                <div class="game-room-box-vertical-body-aside-item">
                    <GameRoomPlayerItemModule :tooltipPlacement="'top'" :playerList="playerList" :tagSize="tagSize"
                        :fontSize="fontSize" :ws="ws" :seatIndex="calPlayersSeat(3)"
                        :sentGameTextToPlayer="sentGameTextToPlayerObj[calPlayersSeat(3)]" :playerLocRoom="playerLocRoom"
                        @gameTextToPlayerSent="gameTextToPlayerHandler"
                        @typeChatMessageSent="function (seatIndex) { sentPlayerLocRomTypeChatMessageObject[seatIndex] = {} }"
                        :sentPlayerLocRomTypeChatMessage="sentPlayerLocRomTypeChatMessageObject[calPlayersSeat(3)]"
                        :gameInfo="gameInfo" :localPlayerSeatIndex="playerSeatIndex"
                        :player="playerLocRoom.playerList[calPlayersSeat(3)]"></GameRoomPlayerItemModule>
                </div>
                <div class="game-room-box-vertical-body-aside-item">
                    <GameRoomPlayerItemModule :tooltipPlacement="'top'" :playerList="playerList" :tagSize="tagSize"
                        :fontSize="fontSize" :ws="ws" :seatIndex="calPlayersSeat(2)"
                        :sentGameTextToPlayer="sentGameTextToPlayerObj[calPlayersSeat(2)]" :playerLocRoom="playerLocRoom"
                        @gameTextToPlayerSent="gameTextToPlayerHandler"
                        @typeChatMessageSent="function (seatIndex) { sentPlayerLocRomTypeChatMessageObject[seatIndex] = {} }"
                        :sentPlayerLocRomTypeChatMessage="sentPlayerLocRomTypeChatMessageObject[calPlayersSeat(2)]"
                        :gameInfo="gameInfo" :localPlayerSeatIndex="playerSeatIndex"
                        :player="playerLocRoom.playerList[calPlayersSeat(2)]"></GameRoomPlayerItemModule>
                </div>
                <div class="game-room-box-vertical-body-aside-item">
                    <GameRoomPlayerItemModule :tooltipPlacement="'top'" :playerList="playerList" :tagSize="tagSize"
                        :fontSize="fontSize" :ws="ws" :seatIndex="calPlayersSeat(1)"
                        :sentGameTextToPlayer="sentGameTextToPlayerObj[calPlayersSeat(1)]" :playerLocRoom="playerLocRoom"
                        @gameTextToPlayerSent="gameTextToPlayerHandler"
                        @typeChatMessageSent="function (seatIndex) { sentPlayerLocRomTypeChatMessageObject[seatIndex] = {} }"
                        :sentPlayerLocRomTypeChatMessage="sentPlayerLocRomTypeChatMessageObject[calPlayersSeat(1)]"
                        :gameInfo="gameInfo" :localPlayerSeatIndex="playerSeatIndex"
                        :player="playerLocRoom.playerList[calPlayersSeat(1)]"></GameRoomPlayerItemModule>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
import GameRoomPlayerItemModule from '@/components/gameRoom/GameRoomPlayerItemModule'
import GameRoomTableModule from '@/components/gameRoom/GameRoomTableModule'

export default Vue.extend({
    data() {
        return {
            sentPlayerLocRomTypeChatMessageObject: { 0: {}, 1: {}, 2: {}, 3: {}, 4: {}, 5: {}, 6: {}, 7: {}, },
        }
    },

    props: {
        dialogWidth: { type: String, default: '' },
        ws: { type: WebSocket, default: null },
        playerLocRoom: { type: Object, default: null },
        gameInfo: { type: Object, default: null },
        playerList: Array,
        tagSize: { type: String, default: '' },
        isHorizontal: { type: Boolean, default: true },
        fontSize: { type: String, default: '' },
        largeFontSize: { type: String, default: '' },
        sentGameTextToPlayerObj: { type: Object, default: null },
        playerLocRomTypeChatMessageObject: { type: Object, default: null },
    },

    watch: {
        playerLocRomTypeChatMessageObject: function (newVal) {
            if (this.playerLocRoom === null) return
            for (let i = 0; i < Object.keys(this.playerLocRoom.playerList).length; i++) {
                if (this.playerLocRoom.playerList[this.calPlayersSeat(i)].id === newVal.id) {
                    this.sentPlayerLocRomTypeChatMessageObject[this.calPlayersSeat(i)] = newVal
                    break
                }
            }
        }
    },

    computed: {
        playerSeatIndex: function () {
            for (let i = 0; i < Object.keys(this.playerLocRoom.playerList).length; i++) {
                if (this.playerLocRoom.playerList[i].id === this.$store.state.id) {
                    return i
                }
            }
            return 10
        }
    },

    methods: {
        calPlayersSeat: function (n) {
            if (n + this.playerSeatIndex > 7) {
                return n + this.playerSeatIndex - 8
            }
            return n + this.playerSeatIndex
        },

        gameTextToPlayerHandler: function (seatIndex) {
            this.$emit('gameTextToPlayerSent', seatIndex)
        },
    },

    components: {
        GameRoomPlayerItemModule,
        GameRoomTableModule
    },

})
</script>

<style>
#game-room-box-horizontal {
    background-size: 60vw 66vh;
    background-repeat: no-repeat;
    background-position-x: 8vw;
    background-position-y: 8vh;
    background-image: url('@/assets/images/game-table.png');
    width: 75vw;
    height: 66vh;
}

#game-room-box-horizontal-header {
    width: 75vw;
    height: 15vh;
}

.game-room-box-horizontal-header-item {
    margin-left: 10%;
    width: 20%;
    height: 100%;
    display: inline-block;
}

#game-room-box-horizontal-body {
    width: 100%;
    height: 75%;
}

.game-room-box-horizontal-body-aside {
    width: 15%;
    height: 100%;
    display: inline-block;
}

.game-room-box-horizontal-body-aside-item-top {
    width: 100%;
    height: 33%;
    margin-top: 10%;
}

.game-room-box-horizontal-body-aside-item-bottom {
    width: 100%;
    height: 33%;
    margin-top: 35%;
}

#game-room-box-horizontal-body-table {
    width: 70%;
    height: 100%;
    display: inline-block;
}

#game-room-box-vertical {
    background-size: 60vw 66vh;
    background-repeat: no-repeat;
    background-position-x: 16vw;
    background-position-y: 6vh;
    background-image: url('@/assets/images/game-table-vertical.png');
    width: 95vw;
    height: 71vh;
}

#game-room-box-vertical-header {
    width: 95vw;
    height: 8vh;
}

#game-room-box-vertical-header-item {
    margin-left: 35%;
    width: 30%;
    height: 100%;
}

#game-room-box-vertical-body {
    width: 95vw;
    height: 63vh;
}

.game-room-box-vertical-body-aside {
    width: 25%;
    height: 100%;
}

#game-room-box-vertical-body-table {
    width: 50%;
    height: 100%;
    float: left;
}

.game-room-box-vertical-body-aside-item {
    width: 100%;
    height: 31%;
    margin-top: 10%;
}
</style>