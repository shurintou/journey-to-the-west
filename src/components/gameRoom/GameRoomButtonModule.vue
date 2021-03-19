<template>
      <div class="button-box" v-if="whichPattern === 'vertical'">
            <el-button type="success" class="chat-room-aside-button" icon="el-icon-caret-right" :style="{'font-size': largeFontSize}" @click="emitReadyToStartGame" :size="buttonSize" :disabled="isDisabled">{{ playerLocRoom.owner === $store.state.id? '开始游戏': '准备' }}</el-button>
            <el-button type="danger" class="chat-room-aside-button" icon="el-icon-d-arrow-left" :style="{'font-size': largeFontSize}" @click="emitCancelLeaveDialog" :size="buttonSize">离开房间</el-button>
      </div>
      <div style="height: 100%" v-else>
            <el-button type="danger" class="chat-room-header-button" icon="el-icon-d-arrow-left" :style="{'font-size': largeFontSize, 'padding': '0px 0px'}" @click="emitCancelLeaveDialog" :size="buttonSize" round>离开房间</el-button>
            <el-button type="success" class="chat-room-header-button" icon="el-icon-caret-right" :style="{'font-size': largeFontSize, 'padding': '0px 0px'}" @click="emitReadyToStartGame" :size="buttonSize" :disabled="isDisabled" round>{{ playerLocRoom.owner === $store.state.id? '开始游戏': '准备' }}</el-button>
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
    },

    computed:{
        isDisabled: function(){
            /* 房主的情况下 */
            if(this.playerLocRoom.owner === this.$store.state.id){
                var isAllReady = true
                /* 至少两人才能开游戏 */
                if(this.playerLocRoom.playerList.length > 1){
                    /* 除房主之外的人都已准备好 */
                    for(let i = 0; i < this.playerLocRoom.playerList.length; i++){
                        if(this.playerLocRoom.playerList[i].id !== this.$store.state.id && this.playerLocRoom.playerList[i].ready === false){
                            isAllReady = false
                            break
                        }
                    }
                    return isAllReady === false? true: false
                }
                else{
                    return true
                }
            }
            /* 非房主的情况下 */
            else{
               for(let i = 0; i < this.playerLocRoom.playerList.length; i++){
                    if(this.playerLocRoom.playerList[i].id === this.$store.state.id){
                        if(this.playerLocRoom.playerList[i].ready === false){
                            return true
                        }
                        else{
                            return false
                        }
                    }
                }
                return false
            }
        },
    },

    methods:{
        emitCancelLeaveDialog: function(){
            this.$emit('emitCancelLeaveDialog', true)
        },

        emitReadyToStartGame: function(){
            this.$emit('emitReadyToStartGame', true)
        },
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