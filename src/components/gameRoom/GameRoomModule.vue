<template>
    <div id="game-room-box-horizontal" v-if="isHorizontal">
        <div id="game-room-box-horizontal-header">
            <div class="game-room-box-horizontal-header-item" style="margin-left: 15%; float:left">
                <GameRoomPlayerItemModule :tooltipPlacement="'bottom'" :playerList="playerList" :tagSize="tagSize" :fontSize="fontSize" :isItemHorizontal="true" :player="playerLocRoom.playerList[calPlayersSeat(5)]"></GameRoomPlayerItemModule>
            </div>
            <div class="game-room-box-horizontal-header-item" style="float: left">
                <GameRoomPlayerItemModule :tooltipPlacement="'bottom'" :playerList="playerList" :tagSize="tagSize" :fontSize="fontSize" :isItemHorizontal="true" :player="playerLocRoom.playerList[calPlayersSeat(4)]"></GameRoomPlayerItemModule>
            </div>
            <div class="game-room-box-horizontal-header-item" style="float: left">
                <GameRoomPlayerItemModule :tooltipPlacement="'bottom'" :playerList="playerList" :tagSize="tagSize" :fontSize="fontSize" :isItemHorizontal="true" :player="playerLocRoom.playerList[calPlayersSeat(3)]"></GameRoomPlayerItemModule>
            </div>
        </div>
        <div id="game-room-box-horizontal-body">
            <div class="game-room-box-horizontal-body-aside" style="float: left;">
                <div class="game-room-box-horizontal-body-aside-item-top">
                    <GameRoomPlayerItemModule :tooltipPlacement="'top'" :playerList="playerList" :tagSize="tagSize" :fontSize="fontSize" :player="playerLocRoom.playerList[calPlayersSeat(6)]"></GameRoomPlayerItemModule>
                </div>
                <div class="game-room-box-horizontal-body-aside-item-bottom">
                    <GameRoomPlayerItemModule :tooltipPlacement="'top'" :playerList="playerList" :tagSize="tagSize" :fontSize="fontSize" :player="playerLocRoom.playerList[calPlayersSeat(7)]"></GameRoomPlayerItemModule>
                </div>
            </div>
            <div id="game-room-box-horizontal-body-table" style="float: left;"> 
                <GameRoomTableModule :isItemHorizontal="true" :playerLocRoom="playerLocRoom" :tagSize="tagSize" :fontSize="fontSize" :player="playerLocRoom.playerList[calPlayersSeat(0)]"></GameRoomTableModule>
            </div>
            <div class="game-room-box-horizontal-body-aside" style="float: left;">
                <div class="game-room-box-horizontal-body-aside-item-top">
                    <GameRoomPlayerItemModule :tooltipPlacement="'top'" :playerList="playerList" :tagSize="tagSize" :fontSize="fontSize" :player="playerLocRoom.playerList[calPlayersSeat(2)]"></GameRoomPlayerItemModule>
                </div>
                <div class="game-room-box-horizontal-body-aside-item-bottom">
                    <GameRoomPlayerItemModule :tooltipPlacement="'top'" :playerList="playerList" :tagSize="tagSize" :fontSize="fontSize" :player="playerLocRoom.playerList[calPlayersSeat(1)]"></GameRoomPlayerItemModule>
                </div>
            </div>
        </div>
    </div>
    <div id="game-room-box-vertical" v-else>
        <div id="game-room-box-vertical-header">
            <div id="game-room-box-vertical-header-item">
                <GameRoomPlayerItemModule :tooltipPlacement="'top'" :playerList="playerList" :tagSize="tagSize" :fontSize="fontSize" :isItemHorizontal="true" :player="playerLocRoom.playerList[calPlayersSeat(4)]"></GameRoomPlayerItemModule>
            </div>
        </div>
        <div id="game-room-box-vertical-body">
            <div class="game-room-box-vertical-body-aside" style="float:left">
                <div class="game-room-box-vertical-body-aside-item">
                    <GameRoomPlayerItemModule :tooltipPlacement="'top'" :playerList="playerList" :tagSize="tagSize" :fontSize="fontSize" :player="playerLocRoom.playerList[calPlayersSeat(5)]"></GameRoomPlayerItemModule>
                </div>
                <div class="game-room-box-vertical-body-aside-item">
                    <GameRoomPlayerItemModule :tooltipPlacement="'top'" :playerList="playerList" :tagSize="tagSize" :fontSize="fontSize" :player="playerLocRoom.playerList[calPlayersSeat(6)]"></GameRoomPlayerItemModule>
                </div>
                <div class="game-room-box-vertical-body-aside-item">
                    <GameRoomPlayerItemModule :tooltipPlacement="'top'" :playerList="playerList" :tagSize="tagSize" :fontSize="fontSize" :player="playerLocRoom.playerList[calPlayersSeat(7)]"></GameRoomPlayerItemModule>
                </div>
            </div>
             <div id="game-room-box-vertical-body-table"> 
            </div>
            <div class="game-room-box-vertical-body-aside" style="float: right">
                <div class="game-room-box-vertical-body-aside-item">
                    <GameRoomPlayerItemModule :tooltipPlacement="'top'" :playerList="playerList" :tagSize="tagSize" :fontSize="fontSize" :player="playerLocRoom.playerList[calPlayersSeat(3)]"></GameRoomPlayerItemModule>
                </div>
                <div class="game-room-box-vertical-body-aside-item">
                    <GameRoomPlayerItemModule :tooltipPlacement="'top'" :playerList="playerList" :tagSize="tagSize" :fontSize="fontSize" :player="playerLocRoom.playerList[calPlayersSeat(2)]"></GameRoomPlayerItemModule>
                </div>
                <div class="game-room-box-vertical-body-aside-item">
                    <GameRoomPlayerItemModule :tooltipPlacement="'top'" :playerList="playerList" :tagSize="tagSize" :fontSize="fontSize" :player="playerLocRoom.playerList[calPlayersSeat(1)]"></GameRoomPlayerItemModule>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import GameRoomPlayerItemModule from '../gameRoom/GameRoomPlayerItemModule'
import GameRoomTableModule from '../gameRoom/GameRoomTableModule'

export default {
    data() {
        return{
        }
    },

    props:{
        playerLocRoom: { type: Object, default: null},
        playerList: Array,
        tagSize: { type: String, default: ''},
        isHorizontal: { type: Boolean, default: true},
        fontSize: { type: String, default: ''},
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
        GameRoomPlayerItemModule,
        GameRoomTableModule
    },

}
</script>

<style>
    #game-room-box-horizontal{
        background-size: 60vw 66vh;
        background-repeat: no-repeat;
        background-position-x: 8vw;
        background-position-y: 8vh;
        background-image: url('../../assets/images/game-table.png');
        width: 75vw;
        height: 66vh;
    }

    #game-room-box-horizontal-header{
        width: 75vw;
        height: 20vh;   
    }

    .game-room-box-horizontal-header-item{
        margin-left: 10%;
        width: 20%;
        height: 100%;
        display: inline-block;
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
    }

    .game-room-box-horizontal-body-aside-item-bottom{
        width: 100%; 
        height: 33%; 
        margin-top: 35%; 
    }

    #game-room-box-horizontal-body-table{
        width: 70%; 
        height: 100%; 
        display: inline-block; 
    }

    #game-room-box-vertical{
        background-size: 60vw 66vh;
        background-repeat: no-repeat;
        background-position-x: 17vw;
        background-position-y: 6vh;
        background-image: url('../../assets/images/game-table-vertical.png');
        width: 100vw;
        height: 71vh;
    }

    #game-room-box-vertical-header{
        width: 100vw;
        height: 8vh;
    }

    #game-room-box-vertical-header-item{
        margin-left: 35%;
        width: 30%;
        height: 100%;
    }

    #game-room-box-vertical-body{
        width: 95vw;
        height: 63vh;
    }

    .game-room-box-vertical-body-aside{
        width: 25%;
        height: 100%; 
    }

    #game-room-box-vertical-body-table{
        width: 50%; 
        height: 100%; 
        float: left;
    }

    .game-room-box-vertical-body-aside-item{
        width: 100%;
        height: 31%; 
        margin-top: 10%; 
    }
</style>