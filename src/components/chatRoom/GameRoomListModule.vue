<template>
    <div id="room-list-container">
        <div v-for="gameRoom in gameRoomList" :key="gameRoom.id" class="room-list-item" :style="{ 'width': gameRoomItemWidth + '%' , 'margin-left': (100 - gameRoomItemWidth)/2  + '%' }">
             <div class="room-list-title" :style="{'background-color': gameRoom.status === 0? (isRoomFull(gameRoom.playerList) ? '#E6A23C' : '#67c23a') : '#F56C6C'}" @click="enterGameRoom(gameRoom)">
                 <span class="room-list-text" :style="{'font-size': largeFontSize}">{{ (gameRoom.name) + '  （' + (gameRoom.status === 0? (isRoomFull(gameRoom.playerList) ? '已满员' : '可进入') : '游戏中') + '）' }}
                      <el-tooltip effect="light" content="进入该房间需要密码" placement="right" v-if="gameRoom.needPassword">
                        <i class="el-icon-lock"></i>
                      </el-tooltip>
                 </span>
             </div>
             <div v-for="(player, seatIndex) in gameRoom.playerList" :key="seatIndex"  class="room-list-player" :style="{'margin-left': seatIndex === 0 ? '2%' : 0}">
                 <el-tooltip v-if="player.id !== 0" effect="light" :content="getPlayer(player.id).nickname" placement="bottom">
                    <el-image class="room-list-avatar" :fit="'cover'" :src="getAvatarUrl(getPlayer(player.id).avatar_id)"></el-image>
                 </el-tooltip>
                 <el-tooltip v-else effect="light" :content="getPlayer(player.id).nickname" placement="bottom">
                    <el-image class="room-list-avatar" :fit="'cover'" :src="getAvatarUrl(getPlayer(player.id).avatar_id)" @click="enterGameRoom(gameRoom)"></el-image>
                 </el-tooltip>
             </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {

        }
    },

    props:{
        playerList: {type: Array, default: null} ,
        gameRoomItemWidth: {type: Number, default: 90},
        gameRoomList: {type: Array, default: null}, //gameRoomList: [{id : 1, name: '', status: 0, needPassword: false, owner: 3, playerList: [ 3, 10 ], },
        largeFontSize: {type: String, default: ''},
        ws: { type: WebSocket, default: null},
    },

    methods:{
        getPlayer: function(n){
            for(var i = 0; i < this.playerList.length; i++){
                if( this.playerList[i].id === n ){
                    return this.playerList[i]
                }
            }
            return { nickname: '空位', avatar_id: 0  }
        },

        getAvatarUrl: function(n){
            return require("@/assets/images/avatar/avatar_" + n + "-min.png")
        },

        isRoomFull: function(playerList){
            let flag = true
            for( let i = 0; i < Object.keys(playerList).length; i++){
                if(playerList[i].id === 0){
                    flag = false
                    break
                }
            }
            return flag
        },

        enterGameRoom: function(gameRoom){
            if(gameRoom.status === 1){
                this.$message.warning('正在游戏中，无法加入')
                return
            }
            if(this.isRoomFull(gameRoom.playerList)){
                this.$message.warning('已满员，无法加入')
                return
            }
            if(gameRoom.needPassword){
                this.$emit('enterGameRoomDialogVisible', true)
                this.$emit('enterRoomId', gameRoom.id)
            }
            else{
                this.ws.send(JSON.stringify({ 
                    type: 'gameRoomList',
                    id: gameRoom.id, 
                    action: 'enter',
                }))
            }
        },
    }
}
</script>

<style>
  #room-list-container{
      width: 100%;
      height: 100%;
  }

  .room-list-item{
    height: 32%;
    margin-bottom: 2%;
    background-size: 100% 100%;
    border-radius: 10px;
    background-image: url('../../assets/images/gameroom_background.png');
  }

  .room-list-item:hover{
      cursor: pointer;
  }

  .room-list-title{
      height: 30%;
      width: 100%;
      border-radius: 5px;
  }

  .room-list-text{
      height: 90%;
      color: #fff;
      margin-top: 10%;
      margin-left: 2%;
  }

  .room-list-player{
      width: 12%;
      height: 70%;
      display: inline-block;
  }

  .room-list-avatar{
      height: 90%;
      width: 100%;
      display: inline-block;
  }
</style>