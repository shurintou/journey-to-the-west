<template>
    <el-main class="hide-scroll-bar" :style="{backgroundImage: 'url(' + horizontalBackground + ')'}">
        <div id="card-module-text">
            <el-progress v-show="timer !== null" :percentage="time" :color="customColors" :show-text="false"></el-progress>
        </div>
        <div id="card-module-top" v-if="getGamePlayer !== null">
            <div v-for="(cardIndex, n) in sortCardList" :key="cardIndex + '' + n" class="poker-card-item" :style="{'margin-left': n === 0 ? ( 50 - 7.5*getGamePlayer.remainCards.length ) + '' + '%': '0%' }">
                <p class="black-color-font" :style="{'font-size': fontSize}">{{cardList[cardIndex].name  +  (cardList[cardIndex].num === 100? '' : ' (' + cardList[cardIndex].suit + ')')}}</p>
                <el-image fit="fill" class="card-item" :class="{'is-card-selected' : selectCard.includes(n), 'card-not-selected' : !selectCard.includes(n)}" :src="require('@/assets/images/poker/' + cardList[cardIndex].src  +'.png')" @click="addSelectCard(n, cardIndex)"></el-image>
            </div>
        </div>
        <div id="card-module-bottom" v-if="getGamePlayer !== null">
            <el-button type="danger" style="float:left;margin-left:2%" :size="buttonSize" :style="{'font-size': fontSize }" @click="discard" :disabled="timer === null || getGamePlayer.online === false">不出</el-button>
            <el-button :type="getGamePlayer.online === false ? 'info': 'warning'" style="float:left; margin-left:2%" :size="buttonSize" :style="{'font-size': fontSize }" :disabled="timer !== null" @click="shiftOnline">{{ getGamePlayer.online === false ? '取消' : '托管' }}</el-button>
            <el-button type="success" style="float:right; margin-right:2%" :size="buttonSize" :style="{'font-size': fontSize }" @click="playCard" :disabled="timer === null || getGamePlayer.online === false">出牌</el-button>
        </div>
    </el-main>
</template>



<script>
import { cardList } from '../../mixins/gameRoom/cardList'
import { playSound } from '../../utils/soundHandler'

export default {
    data(){
        return {
            selectCard:[],
            timer: null,
            time: 100,
            customColors: [
                {color: '#F56C6C', percentage: 25},
                {color: '#E6A23C', percentage: 50},
                {color: '#67C23A', percentage: 75},
                {color: '#409EFF', percentage: 100}
            ],
        }
    },

    props:{
        gameInfo: { type: Object, default: null },
        horizontalBackground: {type: String, default: ''},
        buttonSize: {type: String, default: ''},
        fontSize: {type: String, default: ''},
        ws: { type: WebSocket, default: null},
    },

    watch:{
        'gameInfo.version': {
            immediate: true,
            handler: function(){
                if(this.gameInfo === null || this.getGamePlayer.online === false || this.gameInfo.currentPlayer === -1) return
                if(this.gameInfo.gamePlayer[this.gameInfo.currentPlayer].id === this.$store.state.id){
                    this.time = 100
                    this.selectCard = []
                    if(this.timer > 0){
                        clearInterval(this.timer)
                    }
                    this.$nextTick( function(){
                        this.timer = window.setInterval( () => {
                            this.time = this.time - 1
                        } , 100)
                    })
                }
            }
        },

        time: function(newVal, oldVal){
            if(newVal === 0 && oldVal === 1){
                this.destroyTimer()
            }
        },
    },

    computed:{
        getSeatIndex: function(){
            if(!this.gameInfo) return 10
            for( let i = 0; i < Object.keys(this.gameInfo.gamePlayer).length; i++ ){
                if(this.gameInfo.gamePlayer[i].id === this.$store.state.id){
                    return i
                }
            }
            return 10
        },

        getGamePlayer: function(){
            if(!this.gameInfo) return null
            for( let i = 0; i < Object.keys(this.gameInfo.gamePlayer).length; i++ ){
                if(this.gameInfo.gamePlayer[i].id === this.$store.state.id){
                    return this.gameInfo.gamePlayer[i]
                }
            }
            return null
        },

        sortCardList: function(){
            if(this.getGamePlayer === null) return null
            let sortedList = this.getGamePlayer.remainCards
            return sortedList.sort((a,b) =>{
                if( this.cardList[a].num === this.cardList[b].num){
                    return this.cardList[a].suit - this.cardList[b].suit
                }
                else{
                    return this.cardList[a].num - this.cardList[b].num
                }
            })
        },
    },

    methods:{
        destroyTimer: function(){
            clearInterval(this.timer)
            this.timer = null
            this.time = 100
        },

        addSelectCard: function(n, cardIndex){
            playSound('click')
            if(this.selectCard.length === 0){
                this.selectCard.push(n)
            }
            else{
                /* 已选择的牌则取消选择 */
                if(this.selectCard.includes(n)){
                    this.selectCard = this.selectCard.filter( card => card !== n)
                    return
                }
                /* 判断是否超过长度 */
                if(this.selectCard.length < (this.gameInfo.currentCard.length === 0 ? 5 : this.gameInfo.currentCard.length )){
                    /* 未超过长度，判断牌是否同一类型，是同一类型加入数组 */
                    if(this.cardList[this.sortCardList[this.selectCard[0]]].num === this.cardList[cardIndex].num){
                        this.selectCard.push(n)
                    }
                    /* 不是则清空数组，重新加入新的牌型 */
                    else{
                        while(this.selectCard.length > 0){
                            this.selectCard.pop()
                        }
                        this.selectCard.push(n)
                    }
                }
                else{
                    /* 超过长度，判断牌是否同一类型，是同一类型则弹出最后加入的牌 */
                    if(this.cardList[this.sortCardList[this.selectCard[0]]].num === this.cardList[cardIndex].num){
                        this.selectCard.shift()
                        this.selectCard.push(n)
                    }
                    /* 不是则清空数组，重新加入新的牌型 */
                    else{
                        while(this.selectCard.length > 0){
                            this.selectCard.pop()
                        }
                        this.selectCard.push(n)
                    }
                }
            }
        },

        playCardEmittedByRef: function(){
            if(this.getGamePlayer.online === false){
                this.$message.warning('请先取消托管')
                playSound('click')
                return
            }
            if(this.timer === null){
                if(this.gameInfo.gamePlayer[this.gameInfo.currentPlayer].id === this.$store.state.id){
                    this.$message.warning('出牌时间超时了')
                }
                else{
                    this.$message.warning('还未轮到你出牌')
                }
                playSound('click')
                return
            }
            this.playCard()
        },

        playCard: function(){
            playSound('click')
            if(this.selectCard.length === 0){
                this.$message.warning('请选择要打出的牌')
                return
            }
            if(this.gameInfo.currentCard.length === 0){
                this.sendPlayCard()
                return
            }
            if(this.selectCard.length !== this.gameInfo.currentCard.length){
                this.$message.warning('须打出 ' + this.gameInfo.currentCard.length + ' 张牌')
                return
            }
            if(this.cardList[this.sortCardList[this.selectCard[0]]].num === 100 || this.cardList[this.gameInfo.currentCard[0]].num === 100){
                //打出的牌是反弹牌，或现有牌池是反弹牌，则无须比较
                this.sendPlayCard()
                return
            }
            /* 出的牌号数一样，则比较花色suit大小 */
            if(this.cardList[this.sortCardList[this.selectCard[0]]].num === this.cardList[this.gameInfo.currentCard[0]].num){
                let currentCardList = this.gameInfo.currentCard
                let playCardList = []
                this.selectCard.forEach( item => { playCardList.push( this.sortCardList[item] )})
                if(currentCardList.length > 1){
                    currentCardList = currentCardList.sort((a,b) => {
                        return (this.cardList[a].suit) - (this.cardList[b].suit)
                    })
                }
                if(playCardList.length > 1){
                    playCardList = playCardList.sort((a,b) => {
                        return (this.cardList[a].suit) - (this.cardList[b].suit)
                    })
                }
                let largerFlag = false
                let notSmallerFlag = true
                for(let i = 0; i < playCardList.length; i++){
                    if(this.cardList[playCardList[i]].suit > this.cardList[currentCardList[i]].suit ){
                        largerFlag = true
                        continue
                    }
                    if(this.cardList[playCardList[i]].suit < this.cardList[currentCardList[i]].suit ){
                        notSmallerFlag = false
                        break
                    }
                }
                if(largerFlag && notSmallerFlag){
                    this.sendPlayCard()
                }
                else{
                    this.$message.warning('打出的牌须大于台面牌型')
                }
                return
            }

            /* 出的牌号不一样则分情况比较牌号num大小 */
            /* 都不是师傅的情况下 */
            if(this.cardList[this.sortCardList[this.selectCard[0]]].num < 30 && this.cardList[this.gameInfo.currentCard[0]].num < 30){
                if(this.cardList[this.sortCardList[this.selectCard[0]]].num > this.cardList[this.gameInfo.currentCard[0]].num){
                    this.sendPlayCard()
                }
                else{
                    this.$message.warning('打出的牌须大于台面牌型')
                }
            }
            /* 有一方是师傅的情况下 */
            else{
                /* 打出师傅 */
                if(this.cardList[this.sortCardList[this.selectCard[0]]].num === 31){
                    if(this.cardList[this.gameInfo.currentCard[0]].num > 20){
                        this.sendPlayCard()
                    }
                    else{
                        this.$message.warning('师傅不能打妖怪哦')
                    }
                    return
                }
                /* 台面师傅 */
                if(this.cardList[this.gameInfo.currentCard[0]].num === 31){
                    if(this.cardList[this.sortCardList[this.selectCard[0]]].num < 20){
                        this.sendPlayCard()
                    }
                    else{
                        this.$message.warning('徒弟不能打师傅哦')
                    }
                    return
                }
            }
        },

        sendPlayCard: function(){
            let playCardListValue = []
            this.selectCard.forEach( n => { playCardListValue.push(this.sortCardList[n])})
            playCardListValue.forEach( value => {
                for(let i = 0; i < this.getGamePlayer.remainCards.length; i++){
                    if( this.getGamePlayer.remainCards[i] === value ){
                        this.getGamePlayer.remainCards.splice(i,1)
                        break
                    }
                }
            })
            this.selectCard = []
            this.ws.send(JSON.stringify({ 
                type: 'game',
                action: 'play',
                id: this.gameInfo.id, 
                seatIndex: this.getSeatIndex,
                playCard: playCardListValue,
                remainCards: this.getGamePlayer.remainCards
            }))
            this.destroyTimer()
        },

        discard: function(){
            playSound('click')
            if(this.gameInfo.currentCard.length === 0){
                this.$message.warning('必须打出至少一张牌')
                return
            }
            this.selectCard = []
            this.ws.send(JSON.stringify({ 
                type: 'game',
                action: 'discard',
                id: this.gameInfo.id, 
                seatIndex: this.getSeatIndex,
            }))
            this.destroyTimer()
        },

        shiftOnline: function(){
            playSound('click')
            this.ws.send(JSON.stringify({ 
                type: 'game',
                action: 'shiftOnline',
                id: this.gameInfo.id, 
                seatIndex: this.getSeatIndex,
            }))
        },
    },

    mixins:[ cardList ],
}
</script>

<style>
#card-module-text{
    width: 100%; 
    height: 10%;
    margin: 0;
}

#card-module-top{
    width: 100%;
    height: 50%;
}

#card-module-bottom{
    width: 100%;
    height: 20%;
    margin-top: 3vh;
}

.poker-card-item{
    width: 13%;
    height: 100%;
    margin-right: 2%;
    text-align: center;
    display: inline-block;
}

.is-card-selected{
    border-width: 2%;
    border-radius: 8px;
    border-color: greenyellow;
    border-style: solid;
}

.card-not-selected{
    border-width: 2%;
    border-radius: 8px;
    border-color: rgba(121, 122, 119, 0);
    border-style: solid;
}

.card-item{
    width: 100%; 
    height: 90%;
    
}

.poker-card-item:hover{
    cursor: pointer;
}

.black-color-font{
    color: black;
    margin: 0;
}
</style>