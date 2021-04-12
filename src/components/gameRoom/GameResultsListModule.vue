<template>
    <div v-if="gameResultsList.length > 0">
        <div class="game-result-item" v-for="gameResult in gameResultsList" :key="gameResult.id">
        {{getGameDate(new Date(gameResult.createdAt))}}
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return{

        }
    },

    props:{
        gameResultsList: Array,
        gameResultsPageNum : { type: Number, default: 0},
    },

    methods:{
        getGameDate: function(data){
            return data.getFullYear() + '年' + (data.getMonth() + 1) + '月' + data.getDate() + '日 ' + data.getHours() + '时' + data.getMinutes() + '分'
        }
    }
}
</script>

<style>
  .game-result-item{
    width: 100;
    height: 15vh;
    background-image: url('../../assets/images/icon-select-background.png');
    background-size: 100% 100%;
    border-radius: 3%;
    margin-bottom: 2vh;
  }
</style>