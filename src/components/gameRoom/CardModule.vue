<template>
    <el-main class="hide-scroll-bar" :style="{backgroundImage: 'url(' + horizontalBackground + ')'}">
        <div id="card-module-top" v-if="getGamePlayer !== null">
            <el-tooltip  v-for="(cardIndex, n) in getGamePlayer.remainCards" :key="n" effect="light" placement="top" :content="cardList[cardIndex].name">
                <el-image fit="contain" style="width: 20%; height:80%" :style="{'margin-left': n === 0 ? ( 50 - 10*getGamePlayer.remainCards.length ) + '' + '%': '0%' }" :src="require('@/assets/images/poker/' + cardList[cardIndex].src  +'.png')"></el-image>
            </el-tooltip>
        </div>
        <div id="card-module-bottom" v-if="getGamePlayer !== null">
            <el-button type="success" style="float:left; margin-left:2%" :size="buttonSize" :style="{'font-size': fontSize }">出牌</el-button>
            <el-button type="danger" style="float:right;margin-right:2%" :size="buttonSize" :style="{'font-size': fontSize }">不出</el-button>
            <el-button type="warning" style="float:right; margin-right:2%" :size="buttonSize" :style="{'font-size': fontSize }">托管</el-button>
        </div>
    </el-main>
</template>



<script>
import { cardList } from '../../mixins/gameRoom/cardList'

export default {
    data(){
        return {
            // gameInfo: {
            //     id: 0,
            //     remainCards: 100,
            //     clockwise: false,
            //     currentPlayer: 0,
            //     currentCard: [15],
            //     currentCardPlayer: 0,
            //     currentCombo: 0,
            //     gamePlayer: {
            //         0: {id: 10, nickname: '', cards: 0, remainCards: [50,49,35,51,52], maxCombo: 0, online: true, wukong: 0, bajie: 0, shaseng: 0, tangseng: 0, joker: 0},
            //     }    
            // },
        }
    },

    props:{
        gameInfo: { type: Object, default: null },
        horizontalBackground: {type: String, default: ''},
        buttonSize: {type: String, default: ''},
        fontSize: {type: String, default: ''},
        ws: { type: WebSocket, default: null},
    },

    computed:{
        getGamePlayer: function(){
            for( let i = 0; i < Object.keys(this.gameInfo.gamePlayer).length; i++ ){
                if(this.gameInfo.gamePlayer[i].id === this.$store.state.id){
                    return this.gameInfo.gamePlayer[i]
                }
            }
            return null
        }
    },

    methods:{
       
    },

    mixins:[ cardList ],
}
</script>

<style>
#card-module-top{
    width: 100%;
    height: 80%;
}

#card-module-bottom{
    width: 100%;
    height: 20%;
}
</style>