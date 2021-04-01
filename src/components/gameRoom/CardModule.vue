<template>
    <el-main class="hide-scroll-bar" :style="{backgroundImage: 'url(' + horizontalBackground + ')'}">
        <div style="width:100%; height:20%">
            <el-progress v-show="timer !== null" :percentage="time" :color="customColors" :show-text="false"></el-progress>
        </div>
        <div id="card-module-top" v-if="getGamePlayer !== null">
            <el-tooltip v-for="(cardIndex, n) in sortCardList" :key="cardIndex + '' + n" effect="light" placement="top" :content="cardList[cardIndex].name">
                <div class="poker-card-item" :style="{'margin-left': n === 0 ? ( 50 - 7.5*getGamePlayer.remainCards.length ) + '' + '%': '0%' }">
                    <el-image fit="fill" class="card-item" :class="{'is-card-selected' : selectCard.includes(n), 'card-not-selected' : !selectCard.includes(n)}" :src="require('@/assets/images/poker/' + cardList[cardIndex].src  +'.png')" @click="addSelectCard(n, cardIndex)"></el-image>
                </div>
            </el-tooltip>
        </div>
        <div id="card-module-bottom" v-if="getGamePlayer !== null">
            <el-button type="success" style="float:left; margin-left:2%" :size="buttonSize" :style="{'font-size': fontSize }" @click="playCard">出牌</el-button>
            <!-- :disabled="timer === null" -->
            <el-button type="danger" style="float:right;margin-right:2%" :size="buttonSize" :style="{'font-size': fontSize }" @click="disCard">不出</el-button>
            <el-button type="warning" style="float:right; margin-right:2%" :size="buttonSize" :style="{'font-size': fontSize }">托管</el-button>
        </div>
    </el-main>
</template>



<script>
import { cardList } from '../../mixins/gameRoom/cardList'

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
            gameInfo: {
                id: 0,
                remainCards: 100,
                clockwise: false,
                currentPlayer: 0,
                currentCard: [50],
                currentCardPlayer: 0,
                currentCombo: 0,
                gamePlayer: {
                    0: {id: 10, nickname: '', cards: 0, remainCards: [52,49,35,50,52], maxCombo: 0, online: true, wukong: 0, bajie: 0, shaseng: 0, tangseng: 0, joker: 0},
                    1: {id: 3, nickname: '', cards: 0, remainCards: [50,49,35,51,52], maxCombo: 0, online: true, wukong: 0, bajie: 0, shaseng: 0, tangseng: 0, joker: 0},
                }    
            },
        }
    },

    props:{
        // gameInfo: { type: Object, default: null },
        horizontalBackground: {type: String, default: ''},
        buttonSize: {type: String, default: ''},
        fontSize: {type: String, default: ''},
        ws: { type: WebSocket, default: null},
    },

    watch:{
        'gameInfo.currentPlayer': function(newVal){
            if(this.gameInfo.gamePlayer[newVal].id === this.$store.state.id){
                this.time = 100
                this.selectCard = []
                this.timer = setInterval( () => {
                    this.time = this.time - 1
                } , 100)
            }
        },

        time: function(newVal, oldVal){
            if(newVal === 0 && oldVal === 1){
                this.destroyTimer()
            }
        },
    },

    computed:{
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
                return (this.cardList[a].num + this.cardList[a].suit) - (this.cardList[b].num + this.cardList[b].suit)
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
                if(this.selectCard.length < this.gameInfo.currentCard.length){
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

        playCard: function(){
            if(this.selectCard.length === 0){
                this.$message.warning('请选择要打出的牌')
                return
            }
            if(this.selectCard.length !== this.gameInfo.currentCard.length){
                this.$message.warning('须打出 ' + this.gameInfo.currentCard.length + ' 张牌')
                return
            }
            if(this.cardList[this.sortCardList[this.selectCard[0]]].num === 100){
                this.$message.success('反弹牌可以通过')
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
                    this.$message.success('成功打出')
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
                    this.$message.success('成功打出')
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
                        this.$message.success('成功打出')
                    }
                    else{
                        this.$message.warning('师傅不能打妖怪哦')
                    }
                    return
                }
                /* 台面师傅 */
                if(this.cardList[this.gameInfo.currentCard[0]].num === 31){
                    if(this.cardList[this.sortCardList[this.selectCard[0]]].num < 20){
                        this.$message.success('成功打出')
                    }
                    else{
                        this.$message.warning('徒弟不能打师傅哦')
                    }
                    return
                }
            }
        },

        disCard: function(){
            this.selectCard = [];
        },
    },

    mixins:[ cardList ],
}
</script>

<style>
#card-module-top{
    width: 100%;
    height: 60%;
}

#card-module-bottom{
    width: 100%;
    height: 20%;
}

.poker-card-item{
    width: 13%;
    height: 80%;
    margin-right: 2%;
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
    height: 100%;
    
}

.poker-card-item:hover{
    cursor: pointer;
}
</style>