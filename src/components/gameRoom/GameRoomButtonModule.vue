<template>
      <div class="button-box" v-if="whichPattern === 'vertical'">
            <el-button v-if="playerLocRoom.owner === $store.state.id" :type="isNotReady || isGamePlaying ? 'info' : 'success'" class="chat-room-aside-button" icon="el-icon-caret-right" :style="{'font-size': largeFontSize}" @click="emitStartGame" :size="buttonSize" :disabled="isNotReady || isGamePlaying">开始游戏</el-button>
            <el-button v-else :type="isNotReady && !isGamePlaying ? 'success' : 'info'" class="chat-room-aside-button" :icon="!isNotReady ? 'el-icon-circle-check' : 'el-icon-caret-right'" :style="{'font-size': largeFontSize}" @click="emitReadyToStartGame" :size="buttonSize" :disabled="isGamePlaying">{{!isNotReady?'已':''}}准备</el-button>
            <el-button :type="isGamePlaying ? 'info':'danger'" class="chat-room-aside-button" icon="el-icon-d-arrow-left" :style="{'font-size': largeFontSize}" @click="emitCancelLeaveDialog" :size="buttonSize" :disabled="isGamePlaying">离开房间</el-button>
      </div>
      <div style="height: 100%" v-else>
            <el-button :type="isGamePlaying ? 'info':'danger'" class="chat-room-header-button" icon="el-icon-d-arrow-left" :style="{'font-size': largeFontSize, 'padding': '0px 0px'}" @click="emitCancelLeaveDialog" :size="buttonSize" round :disabled="isGamePlaying">离开房间</el-button>
            <el-button v-if="playerLocRoom.owner === $store.state.id" :type="isNotReady || isGamePlaying ? 'info' : 'success'" class="chat-room-header-button" icon="el-icon-caret-right" :style="{'font-size': largeFontSize, 'padding': '0px 0px'}" @click="emitStartGame" :size="buttonSize" :disabled="isNotReady || isGamePlaying" round>开始游戏</el-button>
            <el-button v-else :type="isNotReady && !isGamePlaying ? 'success' : 'info'" class="chat-room-header-button" :icon="!isNotReady ? 'el-icon-circle-check' : 'el-icon-caret-right'" :style="{'font-size': largeFontSize, 'padding': '0px 0px'}" @click="emitReadyToStartGame" :size="buttonSize" round :disabled="isGamePlaying">{{!isNotReady?'已':''}}准备</el-button>
      </div>
</template>


<script>
export default {
    data() {
        return{

        }
    },

    props:{
        whichPattern: { type: String, default: 'vertical'},
        buttonSize: {type: String, default: ''},
        largeFontSize: {type: String, default: ''},
        playerLocRoom: {type: Object, default: null},
        ws: { type: WebSocket, default: null},
    },

    computed:{
        isGamePlaying: function(){
            return this.playerLocRoom.status === 0? false : true
        },

        isNotReady: function(){
            /* 房主的情况下 */
            if(this.playerLocRoom.owner === this.$store.state.id){
                var isAllReady = true
                /* 至少两人才能开游戏 */
                var playerNum = 0
                for(let i = 0; i < Object.keys(this.playerLocRoom.playerList).length; i++){
                    if(this.playerLocRoom.playerList[i].id === 0){
                        continue
                    }
                    else{
                        playerNum ++
                    }
                }
                if(playerNum < 2){
                    return true
                }
                /* 除房主之外的人都已准备好 */
                for(let i = 0; i < Object.keys(this.playerLocRoom.playerList).length; i++){
                    if(this.playerLocRoom.playerList[i].id === 0){
                        continue
                    }
                    else if(this.playerLocRoom.playerList[i].id !== this.$store.state.id && this.playerLocRoom.playerList[i].ready === false){
                        isAllReady = false
                        break
                    }
                }
                return isAllReady === false? true: false
            }
            else{
                for(let i = 0; i < Object.keys(this.playerLocRoom.playerList).length; i++){
                    if(this.playerLocRoom.playerList[i].id === this.$store.state.id){
                         return this.playerLocRoom.playerList[i].ready ? false : true
                    }
                }
                return false
            }
        },
    },

    methods:{
        emitCancelLeaveDialog: function(){
            this.$emit('leaveRoomDialogVisible', true)
        },

        emitReadyToStartGame: function(){
            this.ws.send(JSON.stringify({ 
                type: 'gameRoomList',
                id: this.playerLocRoom.id, 
                action: 'ready',
            }))
        },

        emitStartGame: function(){
            this.$emit('emitStartGame', true)
        }
    }
}
</script>

<style>
 .button-box{
    margin-top:5%;
    width: 80%;
    height: 20%;
    margin-left: 10%;
    border-radius: 4px;
  }

 .chat-room-header-button{
     float: right;
     width: 20%;
     margin-top: 2%;
     height: 80%;
  }

  .chat-room-header-button:first-of-type{
     margin-right: 5%;
  }

  .chat-room-aside-button{
     width: 100%;
     height: 40%;
     margin-bottom: 5%;
  }
</style>