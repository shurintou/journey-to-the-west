<template>
    <el-main class="hide-scroll-bar" :style="{ backgroundImage: 'url(' + horizontalBackground + ')' }">
        <div id="card-module-text">
            <el-progress v-show="timer !== null && getGamePlayer.remainCards.length > 0" :percentage="time" :color="customColors" :show-text="false"></el-progress>
        </div>
        <div id="card-module-top" v-if="getGamePlayer !== null">
            <div v-for="(cardIndex, n) in sortCardList" :key="cardIndex + '' + n" class="poker-card-item"
                :style="{ 'margin-left': n === 0 ? (50 - 7.5 * getGamePlayer.remainCards.length) + '' + '%' : '0%' }">
                <p class="black-color-font"
                    :style="{ 'font-size': fontSize, 'color': cardIndex < 100 ? 'black' : '#409EFF' }">
                    {{ getIndexOfCardList(cardIndex).name + (getIndexOfCardList(cardIndex).num === 100 ? '' : ' (' +
                        getIndexOfCardList(cardIndex).suit + ')') }}</p>
                <el-image fit="fill" class="card-item"
                    :class="{ 'is-card-selected': selectCard.includes(n) || selectMetamorphoseCard.includes(n), 'card-not-selected': (!selectCard.includes(n) && cardIndex < 100) || (cardIndex >= 100 && !selectCard.includes(n) && !selectMetamorphoseCard.includes(n) && !$store.state.setting.bianshenBorder), 'metamorphose-border': cardIndex >= 100 && !selectCard.includes(n) && !selectMetamorphoseCard.includes(n) && $store.state.setting.bianshenBorder, 'cannot-choose-metamorphose': metamorphoseMode && (cardIndex < 100 || selectCard.includes(n)) }"
                    :src="require('@/assets/images/poker/' + getIndexOfCardList(cardIndex).src + '.png')"
                    @click="addSelectCard(n, cardIndex)"></el-image>
            </div>
        </div>
        <div id="card-module-bottom" v-if="getGamePlayer !== null">
            <el-button type="danger" style="float:left;margin-left:2%" :size="buttonSize"
                :style="{ 'font-size': fontSize, 'padding': paddingSize }" @click="discard"
                :disabled="timer === null || getGamePlayer.online === false || metamorphoseMode">不出</el-button>
            <el-button :type="getGamePlayer.online === false ? 'info' : 'warning'" style="float:left; margin-left:2%"
                :size="buttonSize" :style="{ 'font-size': fontSize, 'padding': paddingSize }" :disabled="timer !== null"
                @click="shiftOnline">{{ getGamePlayer.online === false ? '取消' : '托管' }}</el-button>
            <el-button type="success" style="float:right; margin-right:2%" :size="buttonSize"
                :style="{ 'font-size': fontSize, 'padding': paddingSize }" @click="playCard"
                :disabled="timer === null || getGamePlayer.online === false">出牌</el-button>
            <el-button :type="metamorphoseMode ? 'info' : 'primary'" style="float:right; margin-right:2%" :size="buttonSize"
                :style="{ 'font-size': fontSize, 'padding': paddingSize }" @click="shiftMetamorphoseMode"
                :disabled="timer === null || getGamePlayer.online === false">{{ metamorphoseMode ? '取消' : '变身'
                }}</el-button>
        </div>
    </el-main>
</template>



<script lang="ts">
import { PropType } from 'vue'
import { GamePlayerSeatIndex } from '@/type/index'
import { WebSocketGame, WebSocketPlayerInGame } from '@/type/game'
import { cardList } from '@/mixins/gameRoom/cardList'
import { playSound } from '@/utils/soundHandler'

export default cardList.extend({
    data() {
        return {
            /** 玩家所选择牌在玩家现有牌中的序数数组，值为0~4 */
            selectCard: [] as number[],
            /** 玩家所选择变身牌在玩家现有牌中的序数数组，值为:0~4 */
            selectMetamorphoseCard: [] as number[],
            timer: null as number | null,
            time: 100,
            metamorphoseMode: false,
            customColors: [
                { color: '#F56C6C', percentage: 25 },
                { color: '#E6A23C', percentage: 50 },
                { color: '#67C23A', percentage: 75 },
                { color: '#409EFF', percentage: 100 }
            ],
        }
    },

    props: {
        gameInfo: { type: Object as PropType<WebSocketGame>, default: null },
        horizontalBackground: { type: String, default: '' },
        buttonSize: { type: String, default: '' },
        fontSize: { type: String, default: '' },
        ws: { type: WebSocket, default: null },
    },

    watch: {
        'gameInfo.version': {
            immediate: true,
            handler: function (newVal: number) {
                if (this.gameInfo === null || this.getGamePlayer?.online === false || this.gameInfo.currentPlayer === -1) return
                if (this.gameInfo.gamePlayer[this.gameInfo.currentPlayer].id === this.$stock.state.id) {
                    this.time = 100
                    this.metamorphoseMode = false
                    this.selectMetamorphoseCard = []
                    this.selectCard = []
                    if (this.timer !== null && this.timer > 0) {
                        clearInterval(this.timer)
                    }
                    this.$nextTick(function () {
                        if (this.$stock.state.setting.youTurnVoice) {
                            if (this.gameInfo.gamePlayer[this.gameInfo.currentPlayer as GamePlayerSeatIndex ].remainCards.length > 0 && (this.gameInfo.currentCard.length > 0 || newVal === 0)) {
                                setTimeout(function () {
                                    playSound('youturn')
                                }, 1000)
                            }
                        }
                        this.timer = window.setInterval(() => {
                            this.time = this.time - 1
                        }, 150)//出牌时间修改这里，100是10秒，150是15秒，还要修改GameRoomPlayerItemModule里的动画时间
                    })
                }
            }
        },

        time: function (newVal: number, oldVal: number) {
            if (newVal === 0 && oldVal === 1) {
                this.destroyTimer()
            }
        },
    },

    computed: {
        getSeatIndex: function () {
            if (!this.gameInfo) return 10
            for (let i = 0 as GamePlayerSeatIndex; i < Object.keys(this.gameInfo.gamePlayer).length; i++) {
                if (this.gameInfo.gamePlayer[i].id === this.$stock.state.id) {
                    return i
                }
            }
            return 10
        },

        getGamePlayer: function (): WebSocketPlayerInGame | null {
            if (!this.gameInfo) return null
            for (let i = 0 as GamePlayerSeatIndex; i < Object.keys(this.gameInfo.gamePlayer).length; i++) {
                if (this.gameInfo.gamePlayer[i].id === this.$stock.state.id) {
                    return this.gameInfo.gamePlayer[i]
                }
            }
            return null
        },

        sortCardList: function (): number[] | null {
            if (this.getGamePlayer === null) return null
            const sortedList = this.getGamePlayer.remainCards
            return sortedList.sort((a, b) => {
                if (this.getIndexOfCardList(a).num === this.getIndexOfCardList(b).num) {
                    return this.getIndexOfCardList(a).suit - this.getIndexOfCardList(b).suit
                }
                else {
                    return this.getIndexOfCardList(a).num - this.getIndexOfCardList(b).num
                }
            })
        },

        paddingSize: function () {
            if (this.buttonSize === 'medium') {
                return '10px 20px'
            }
            else if (this.buttonSize === 'small') {
                return '9px 15px'
            }
            else {
                return '7px 10px'
            }
        },
    },

    methods: {
        destroyTimer: function () {
            if (this.timer !== null) clearInterval(this.timer)
            this.timer = null
            this.time = 100
            this.metamorphoseMode = false
            this.selectMetamorphoseCard = []
        },

        addSelectCard: function (n: number, cardIndex: number) {
            playSound('click')
            /* 变身模式 */
            if (this.metamorphoseMode) {
                if (cardIndex < 100 || this.selectCard.includes(n)) {
                    this.$message.warning('请选择变身牌')
                    return
                }
                /* 已选择的牌则取消选择 */
                if (this.selectMetamorphoseCard.includes(n)) {
                    this.selectMetamorphoseCard = this.selectMetamorphoseCard.filter(card => card !== n)
                    return
                }
                /* 判断是否超过长度 */
                if (this.selectMetamorphoseCard.length + this.selectCard.length < (this.gameInfo.currentCard.length === 0 ? 5 : this.gameInfo.currentCard.length)) {
                    /* 未超过长度，加入数组 */
                    this.selectMetamorphoseCard.push(n)
                }
                else {
                    /* 超过长度，弹出最后加入的变身牌 */
                    this.selectMetamorphoseCard.shift()
                    this.selectMetamorphoseCard.push(n)
                }
                return
            }
            /* 非变身模式 */
            if (this.selectCard.length === 0) {
                this.selectCard.push(n)
            }
            else {
                /* 已选择的牌则取消选择 */
                if (this.selectCard.includes(n)) {
                    this.selectCard = this.selectCard.filter(card => card !== n)
                    return
                }
                /* 判断是否超过长度 */
                if (this.selectCard.length < (this.gameInfo.currentCard.length === 0 ? 5 : this.gameInfo.currentCard.length)) {
                    /* 未超过长度，判断牌是否同一类型，是同一类型加入数组 */
                    if (this.sortCardList !== null && this.getIndexOfCardList(this.sortCardList[this.selectCard[0]]).num === this.getIndexOfCardList(cardIndex).num) {
                        this.selectCard.push(n)
                    }
                    /* 不是则清空数组，重新加入新的牌型 */
                    else {
                        while (this.selectCard.length > 0) {
                            this.selectCard.pop()
                        }
                        this.selectCard.push(n)
                    }
                }
                else {
                    /* 超过长度，判断牌是否同一类型，是同一类型则弹出最后加入的牌 */
                    if (this.sortCardList !== null && this.getIndexOfCardList(this.sortCardList[this.selectCard[0]]).num === this.getIndexOfCardList(cardIndex).num) {
                        this.selectCard.shift()
                        this.selectCard.push(n)
                    }
                    /* 不是则清空数组，重新加入新的牌型 */
                    else {
                        while (this.selectCard.length > 0) {
                            this.selectCard.pop()
                        }
                        this.selectCard.push(n)
                    }
                }
            }
        },

        playCardEmittedByRef: function () {
            if (this.getGamePlayer?.online === false) {
                this.$message.warning('请先取消托管')
                playSound('click')
                return
            }
            if (this.timer === null) {
                if (this.gameInfo.currentPlayer !== -1 && this.gameInfo.gamePlayer[this.gameInfo.currentPlayer].id === this.$stock.state.id) {
                    this.$message.warning('出牌时间超时了')
                }
                else {
                    this.$message.warning('还未轮到你出牌')
                }
                playSound('click')
                return
            }
            this.playCard()
        },

        playCard: function () {
            playSound('click')
            if (this.selectCard.length === 0) {
                this.$message.warning('请选择要打出的牌')
                return
            }
            if (this.gameInfo.currentCard.length === 0) {
                if (this.metamorphoseMode && this.selectMetamorphoseCard.length === 0) {
                    this.$message.warning('请选择要打出的变身牌')
                    return
                }
                this.sendPlayCard()
                return
            }
            if (this.selectCard.length + this.selectMetamorphoseCard.length !== this.gameInfo.currentCard.length) {
                this.$message.warning('须打出 ' + this.gameInfo.currentCard.length + ' 张牌')
                return
            }
            if ((this.sortCardList !== null && this.getIndexOfCardList(this.sortCardList[this.selectCard[0]]).num === 100) || this.getIndexOfCardList(this.gameInfo.currentCard[0]).num === 100) {
                //打出的牌是反弹牌，或现有牌池是反弹牌，则无须比较
                this.sendPlayCard()
                return
            }
            /* 出的牌号数一样，则比较花色suit大小 */
            if (this.sortCardList !== null && this.getIndexOfCardList(this.sortCardList[this.selectCard[0]]).num === this.getIndexOfCardList(this.gameInfo.currentCard[0]).num) {
                const currentCardList = this.gameInfo.currentCard
                const playCardList: number[] = []
                this.selectCard.forEach(item => { if (this.sortCardList !== null) playCardList.push(this.sortCardList[item]) })
                if (this.metamorphoseMode) {
                    this.selectMetamorphoseCard.forEach(item => { if (this.sortCardList !== null) playCardList.push(this.sortCardList[item]) })
                }
                if (currentCardList.length > 1) {
                    currentCardList.sort((a, b) => {
                        return (this.getIndexOfCardList(a).suit) - (this.getIndexOfCardList(b).suit)
                    })
                }
                if (playCardList.length > 1) {
                    playCardList.sort((a, b) => {
                        return (this.getIndexOfCardList(a).suit) - (this.getIndexOfCardList(b).suit)
                    })
                }
                let largerFlag = false
                let notSmallerFlag = true
                for (let i = 0; i < playCardList.length; i++) {
                    if (this.getIndexOfCardList(playCardList[i]).suit > this.getIndexOfCardList(currentCardList[i]).suit) {
                        largerFlag = true
                        continue
                    }
                    if (this.getIndexOfCardList(playCardList[i]).suit < this.getIndexOfCardList(currentCardList[i]).suit) {
                        notSmallerFlag = false
                        break
                    }
                }
                if (largerFlag && notSmallerFlag) {
                    this.sendPlayCard()
                }
                else {
                    this.$message.warning('打出的牌须大于台面牌型')
                }
                return
            }

            /* 出的牌号不一样则分情况比较牌号num大小 */
            /* 都不是师傅的情况下 */
            if (this.sortCardList !== null && this.getIndexOfCardList(this.sortCardList[this.selectCard[0]]).num < 30 && this.getIndexOfCardList(this.gameInfo.currentCard[0]).num < 30) {
                if (this.getIndexOfCardList(this.sortCardList[this.selectCard[0]]).num > this.getIndexOfCardList(this.gameInfo.currentCard[0]).num) {
                    this.sendPlayCard()
                }
                else {
                    this.$message.warning('打出的牌须大于台面牌型')
                }
            }
            /* 有一方是师傅的情况下 */
            else {
                /* 打出师傅 */
                if (this.sortCardList !== null && this.getIndexOfCardList(this.sortCardList[this.selectCard[0]]).num === 31) {
                    if (this.getIndexOfCardList(this.gameInfo.currentCard[0]).num > 20) {
                        this.sendPlayCard()
                    }
                    else {
                        this.$message.warning('师傅不能打妖怪哦')
                    }
                    return
                }
                /* 台面师傅 */
                if (this.sortCardList !== null && this.getIndexOfCardList(this.gameInfo.currentCard[0]).num === 31) {
                    if (this.getIndexOfCardList(this.sortCardList[this.selectCard[0]]).num < 20) {
                        this.sendPlayCard()
                    }
                    else {
                        this.$message.warning('徒弟不能打师傅哦')
                    }
                    return
                }
            }
        },

        sendPlayCard: function () {
            /** 
             *  打出牌的牌序数的数组，序数为该牌在{@link cardList}中的index。 
             *  数组中所有牌的num应相等，按suit从小到大排序。
             */
            const playCardListValue: number[] = []
            this.selectCard.forEach(n => { if (this.sortCardList !== null) playCardListValue.push(this.sortCardList[n]) })
            const originLength = playCardListValue.length //原形牌长度
            const originIndex = playCardListValue[0]//原形牌牌面
            if (this.metamorphoseMode) {
                this.selectMetamorphoseCard.forEach(n => { if (this.sortCardList !== null) playCardListValue.push(this.sortCardList[n]) })
            }
            playCardListValue.forEach(value => {
                if (this.getGamePlayer !== null)
                    for (let i = 0; i < this.getGamePlayer.remainCards.length; i++) {
                        if (this.getGamePlayer.remainCards[i] === value) {
                            this.getGamePlayer.remainCards.splice(i, 1)
                            break
                        }
                    }
            })
            for (let i = 0; i < originLength; i++) {
                if (playCardListValue[i] >= 100) {//对作为原形牌的变身牌进行处理，减100
                    playCardListValue[i] = playCardListValue[i] - 100
                }
            }
            for (let j = originLength; j < playCardListValue.length; j++) {//对变身牌进行处理，牌面变为与原形牌相同，再加回100以示为变身牌
                playCardListValue[j] = originIndex + this.getIndexOfCardList(originIndex).suit - this.getIndexOfCardList(playCardListValue[j]).suit
                if (playCardListValue[j] < 100) {
                    playCardListValue[j] = playCardListValue[j] + 100
                }
            }
            playCardListValue.sort((a, b) => {
                return this.getIndexOfCardList(a).suit - this.getIndexOfCardList(b).suit
            })
            this.selectCard = []
            this.ws?.send(JSON.stringify({
                type: 'game',
                action: 'play',
                id: this.gameInfo.id,
                seatIndex: this.getSeatIndex,
                playCard: playCardListValue,
                remainCards: this.getGamePlayer?.remainCards
            }))
            this.destroyTimer()
        },

        discard: function () {
            playSound('click')
            if (this.gameInfo.currentCard.length === 0) {
                this.$message.warning('必须打出至少一张牌')
                return
            }
            this.selectCard = []
            this.ws?.send(JSON.stringify({
                type: 'game',
                action: 'discard',
                id: this.gameInfo.id,
                seatIndex: this.getSeatIndex,
            }))
            this.destroyTimer()
        },

        shiftOnline: function () {
            playSound('click')
            this.ws?.send(JSON.stringify({
                type: 'game',
                action: 'shiftOnline',
                id: this.gameInfo.id,
                seatIndex: this.getSeatIndex,
            }))
        },

        shiftMetamorphoseMode: function () {
            if (this.metamorphoseMode) {
                this.metamorphoseMode = false
                this.selectMetamorphoseCard = []
                return
            }
            if (this.selectCard.length === 0) {
                this.$message.warning('请先选择原形牌')
                return
            }
            const unSelectedCardIndexList = this.sortCardList?.filter((val, index) => {
                return !this.selectCard.includes(index)
            })
            const hasMetamorphoseCard = unSelectedCardIndexList?.some(val => val >= 100)
            if (!hasMetamorphoseCard) {
                this.$message.warning('没有可用的变身牌')
                return
            }
            if (this.sortCardList !== null && this.getIndexOfCardList(this.sortCardList[this.selectCard[0]]).num === 100) {
                this.$message.warning('无法变身观音或如来')
                return
            }
            if (this.gameInfo.currentCard.length === 1) {
                this.$message.warning('出1张牌时不能使用变身')
                return
            }
            if (this.gameInfo.currentCard.length > 1 && this.selectCard.length >= this.gameInfo.currentCard.length) {
                this.$message.warning('选择的原形牌过多')
                return
            }
            this.metamorphoseMode = true
        },
    },

    mixins: [cardList],
})
</script>

<style>
#card-module-text {
    width: 100%;
    height: 10%;
    margin: 0;
}

#card-module-top {
    width: 100%;
    height: 50%;
}

#card-module-bottom {
    width: 100%;
    height: 20%;
    margin-top: 3vh;
}

.poker-card-item {
    width: 13%;
    height: 100%;
    margin-right: 2%;
    text-align: center;
    display: inline-block;
}

.is-card-selected {
    border-width: 2%;
    border-radius: 8px;
    border-color: greenyellow;
    border-style: solid;
}

.card-not-selected {
    border-width: 2%;
    border-radius: 8px;
    border-color: rgba(121, 122, 119, 0);
    border-style: solid;
}

.card-item {
    width: 100%;
    height: 90%;

}

.poker-card-item:hover {
    cursor: pointer;
}

.black-color-font {
    color: black;
    margin: 0;
}

.metamorphose-border {
    border-width: 2%;
    border-radius: 8px;
    border-color: #409EFF;
    border-style: solid;
}

.cannot-choose-metamorphose {
    filter: brightness(60%);
}
</style>