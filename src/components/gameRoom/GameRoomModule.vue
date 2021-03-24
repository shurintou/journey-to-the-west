<template>
    <div id="game-room-box-horizontal">
        <div id="game-room-box-horizontal-header">
            <div class="game-room-box-horizontal-header-item" style="margin-left: 15%; float:left">
                <GameRoomPlayerItemModule :tooltipPlacement="'top'" :playerList="playerList" :player="playerLocRoom.playerList[calPlayersSeat(5)]"></GameRoomPlayerItemModule>
            </div>
            <div class="game-room-box-horizontal-header-item" style="float: left">
                <GameRoomPlayerItemModule :tooltipPlacement="'top'" :playerList="playerList" :player="playerLocRoom.playerList[calPlayersSeat(4)]"></GameRoomPlayerItemModule>
            </div>
            <div class="game-room-box-horizontal-header-item" style="float: left">
                <GameRoomPlayerItemModule :tooltipPlacement="'top'" :playerList="playerList" :player="playerLocRoom.playerList[calPlayersSeat(3)]"></GameRoomPlayerItemModule>
            </div>
        </div>
        <div id="game-room-box-horizontal-body">
            <div class="game-room-box-horizontal-body-aside" style="float: left;">
                <div class="game-room-box-horizontal-body-aside-item-top">
                    <GameRoomPlayerItemModule :tooltipPlacement="'top'" :playerList="playerList" :player="playerLocRoom.playerList[calPlayersSeat(6)]"></GameRoomPlayerItemModule>
                </div>
                <div class="game-room-box-horizontal-body-aside-item-bottom">
                    <GameRoomPlayerItemModule :tooltipPlacement="'top'" :playerList="playerList" :player="playerLocRoom.playerList[calPlayersSeat(7)]"></GameRoomPlayerItemModule>
                </div>
            </div>
            <div id="game-room-box-horizontal-body-table"> 
                <el-button>默认按钮</el-button>
            </div>
            <div class="game-room-box-horizontal-body-aside" style="float: right;">
                <div class="game-room-box-horizontal-body-aside-item-top">
                    <GameRoomPlayerItemModule :tooltipPlacement="'top'" :playerList="playerList" :player="playerLocRoom.playerList[calPlayersSeat(2)]"></GameRoomPlayerItemModule>
                </div>
                <div class="game-room-box-horizontal-body-aside-item-bottom">
                    <GameRoomPlayerItemModule :tooltipPlacement="'top'" :playerList="playerList" :player="playerLocRoom.playerList[calPlayersSeat(1)]"></GameRoomPlayerItemModule>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import GameRoomPlayerItemModule from '../gameRoom/GameRoomPlayerItemModule'

export default {
    data() {
        return{
        }
    },

    props:{
        playerLocRoom: { type: Object, default: null},
        playerList: Array,
    },

    computed:{
        playerSeatIndex: function(){
            for( let i = 0; i < Object.keys(this.playerLocRoom.playerList).length; i++){
                if( this.playerLocRoom.playerList[i].id === this.$store.state.id ){
                    return i
                }
            }
            return 10
        }
    },

    methods:{
        calPlayersSeat: function(n){
            if( n + this.playerSeatIndex > 7 ){
                return n + this.playerSeatIndex - 8
            }
            return n + this.playerSeatIndex
        },
    },

    components:{
        GameRoomPlayerItemModule
    },

}
</script>

<style>
    #game-room-box-horizontal{
        background-size: 80% 100%;
        background-repeat: no-repeat;
        background-position-x: center;
        background-position-y: 7vh;
        /* background-color: black; */
        background-image: url('../../assets/images/game-table.png');
        width: 100%;
        height: 100%;
    }

    #game-room-box-horizontal-header{
        width: 100%;
        height: 25%;   
    }

    .game-room-box-horizontal-header-item{
        margin-left: 12.5%;
        width: 15%;
        height: 100%;
        display: inline-block;
        /* background-color: red; */
    }

    #game-room-box-horizontal-body{
        width: 100%; 
        height: 75%;
    }

    .game-room-box-horizontal-body-aside{
        width: 15%;
        height: 100%; 
        display: inline-block; 
    }

    .game-room-box-horizontal-body-aside-item-top{
        width: 100%;
        height: 33%; 
        margin-top: 10%; 
        /* background-color: red; */
    }

    .game-room-box-horizontal-body-aside-item-bottom{
        width: 100%; 
        height: 33%; 
        margin-top: 35%; 
        /* background-color: red; */
    }

    #game-room-box-horizontal-body-table{
        width: 70%; 
        height: 100%; 
        display: inline-block; 
        /* background-color: yellow */
    }
</style>