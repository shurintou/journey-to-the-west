<template>
<div>
  <el-container>
    <el-aside :width="asideWidth" v-if="asideWidth !== '0px'" :style="{backgroundImage: 'url(' + verticalBackground + ')'}">
      <div class="player-list-box">
        <PlayerListModule :playerList = "playerList" :avatarSize = "avatarSize" :fontSize = "fontSize" :tagSize = "tagSize" :popupWidth = "popupWidth" :buttonSize = "buttonSize" :dialogWidth = "dialogWidth" :largeDialogWidth = "largeDialogWidth" :largeFontSize = "largeFontSize" :isHorizontal="asideWidth !== '0px'" :playerInfoDialogWidth="playerInfoDialogWidth"></PlayerListModule>
      </div>
      <ChatRoomButtonModule v-if="$store.state.player_loc === 0" :whichPattern="'vertical'" :buttonSize="buttonSize" :largeFontSize="largeFontSize" @cancelLeaveDialogVisible="function(value){cancelLeaveDialogVisible = value}" @createGameRoomDialogVisible="function(value){createGameRoomDialogVisible = value}"></ChatRoomButtonModule>
      <GameRoomButtonModule v-else :whichPattern="'vertical'" :buttonSize="buttonSize" :largeFontSize="largeFontSize" :playerLocRoom="playerLocRoom" :ws="ws" @leaveRoomDialogVisible="function(value){leaveRoomDialogVisible = value}"></GameRoomButtonModule>
    </el-aside>
    <el-container>
      <el-header v-if="asideWidth === '0px'" :style="{backgroundImage: 'url(' + verticalBackground + ')'}">
        <el-popover placement="bottom" :width="popupWidth" trigger="click">
          <PlayerListModule :playerList = "playerList" :avatarSize = "avatarSize" :fontSize = "fontSize" :tagSize = "tagSize" :popupWidth = "popupWidth" :buttonSize = "buttonSize" :dialogWidth = "dialogWidth" :largeDialogWidth = "largeDialogWidth" :largeFontSize = "largeFontSize" :isHorizontal="asideWidth !== '0px'" :playerInfoDialogWidth="playerInfoDialogWidth"></PlayerListModule>
          <el-button slot="reference" class="chat-room-header-button-player-list" type="primary" icon="el-icon-user-solid" :style="{'font-size': largeFontSize, 'padding': '0px 0px'}" :size="buttonSize" round>玩家列表</el-button>
        </el-popover>
        <ChatRoomButtonModule v-if="$store.state.player_loc === 0" :whichPattern="'horizontal'" :buttonSize="buttonSize" :largeFontSize="largeFontSize" @cancelLeaveDialogVisible="function(value){cancelLeaveDialogVisible = value}" @createGameRoomDialogVisible="function(value){createGameRoomDialogVisible = value}"></ChatRoomButtonModule>
        <GameRoomButtonModule v-else :whichPattern="'horizontal'" :buttonSize="buttonSize" :largeFontSize="largeFontSize" :playerLocRoom="playerLocRoom" :ws="ws" @leaveRoomDialogVisible="function(value){leaveRoomDialogVisible = value}"></GameRoomButtonModule>
      </el-header>
      <el-main :style="{backgroundImage: 'url(' + mainImg + ')', padding: '0px 0px 0px 5px'}">
        <GameRoomListModule v-if="$store.state.player_loc === 0" :largeFontSize="largeFontSize" :gameRoomItemWidth="gameRoomItemWidth" :gameRoomList="gameRoomList" :playerList="playerList" :ws="ws" @enterGameRoomDialogVisible="function(value){enterGameRoomDialogVisible = value}" @enterRoomDto="function(value){enterRoomDto= value}"></GameRoomListModule>
        <GameRoomModule v-else :sentGameTextToPlayerObj="sentGameTextToPlayerObj" :playerLocRoom="playerLocRoom" :playerList="playerList" :isHorizontal="asideWidth !== '0px'" :tagSize="tagSize" :fontSize="fontSize" :largeFontSize="largeFontSize" :dialogWidth="dialogWidth" :ws="ws" :gameInfo="gameInfo"></GameRoomModule>
      </el-main>
      <el-footer :height="footHeight">
        <el-container class="fill-height">
            <ChatModule v-if="playerLocRoom? playerLocRoom.status === 0 : true" :horizontalBackground="horizontalBackground" :chatText="chatText" :buttonSize="buttonSize" :ws="ws" ref="chatModule"></ChatModule>
            <CardModule v-else :gameInfo="gameInfo" :horizontalBackground="horizontalBackground" :fontSize="fontSize" :buttonSize="buttonSize" :ws="ws"></CardModule>
            <PlayerInfoModule :playerLocRoom="playerLocRoom" :subAsideWidth="subAsideWidth" :verticalBackground="verticalBackground" :fontSize="largeFontSize" :dialogWidth="dialogWidth" :playerInfoDialogWidth="playerInfoDialogWidth" :ws="ws"></PlayerInfoModule>
        </el-container>
      </el-footer>
    </el-container>
  </el-container>
  <LogoutDialogModule :cancelLeaveDialogVisible="cancelLeaveDialogVisible" :dialogWidth="dialogWidth" @cancelLeaveDialogVisible="function(value){cancelLeaveDialogVisible = value}"></LogoutDialogModule>
  <CreateGameRoomDialogModule :createGameRoomDialogVisible="createGameRoomDialogVisible" :dialogWidth="dialogWidth" :ws="ws" @createGameRoomDialogVisible="function(value){createGameRoomDialogVisible = value}"></CreateGameRoomDialogModule>
  <LeaveRoomDialogModule :leaveRoomDialogVisible="leaveRoomDialogVisible" :dialogWidth="dialogWidth" :playerLocRoom="playerLocRoom" :ws="ws" @leaveRoomDialogVisible="function(value){ leaveRoomDialogVisible = value}"></LeaveRoomDialogModule>
  <EnterGameRoomDialogModule :enterGameRoomDialogVisible="enterGameRoomDialogVisible" :enterRoomDto="enterRoomDto" :dialogWidth="dialogWidth" :ws="ws" @enterGameRoomDialogVisible="function(value){enterGameRoomDialogVisible = value}"></EnterGameRoomDialogModule>
  <AskChangeSeatDialogModule :askChangeSeatDialogVisible="askChangeSeatDialogVisible" :askChangeSeatInfo="askChangeSeatInfo" :playerList="playerList" :buttonSize="buttonSize" :fontSize="fontSize" :dialogWidth="dialogWidth" :ws="ws" @askChangeSeatDialogVisible="function(value){askChangeSeatDialogVisible= value}"></AskChangeSeatDialogModule>
  <GameResultDialogModule :gameResult="gameResult" :gameResultDialogVisible="gameResultDialogVisible" :avatarSize="avatarSize" :fontSize="fontSize" :tagSize="tagSize" :popupWidth="popupWidth" :buttonSize="buttonSize" :dialogWidth="dialogWidth" :largeDialogWidth="largeDialogWidth" :largeFontSize="largeFontSize" @gameResultDialogVisible="function(value){gameResultDialogVisible= value}"></GameResultDialogModule>
</div>
</template>

<script>
import { chatRoomWebSocket } from '../mixins/chatRoom/chatRoomWebSocket'
import { chatRoomResize } from '../mixins/chatRoom/chatRoomResize'
import PlayerListModule from '../components/chatRoom/PlayerListModule'
import PlayerInfoModule from '../components/chatRoom/PlayerInfoModule'
import ChatModule from '../components/chatRoom/ChatModule'
import GameRoomListModule from '../components/chatRoom/GameRoomListModule'
import LogoutDialogModule from '../components/chatRoom/dialogs/LogoutDialogModule'
import CreateGameRoomDialogModule from '../components/chatRoom/dialogs/CreateGameRoomDialogModule'
import ChatRoomButtonModule from '../components/chatRoom/ChatRoomButtonModule'
import GameRoomButtonModule from '../components/gameRoom/GameRoomButtonModule'
import LeaveRoomDialogModule from '../components/gameRoom/dialogs/LeaveRoomDialogModule'
import EnterGameRoomDialogModule from '../components/chatRoom/dialogs/EnterGameRoomDialogModule'
import GameRoomModule from '../components/gameRoom/GameRoomModule'
import AskChangeSeatDialogModule from '../components/gameRoom/dialogs/AskChangeSeatDialogModule'
import GameResultDialogModule from '../components/gameRoom/dialogs/GameResultDialogModule'
import CardModule from '../components/gameRoom/CardModule'

export default {
  name: 'ChatRoom',
  data(){
    return {
      chatText: [],
      cancelLeaveDialogVisible: false,
      createGameRoomDialogVisible: false,
      leaveRoomDialogVisible: false,
      enterGameRoomDialogVisible: false,
      askChangeSeatDialogVisible: false,
      gameResultDialogVisible: false,
      playerList: [],
      gameRoomList: [],
      playerLocRoom: null,
      enterRoomDto: {},
      askChangeSeatInfo: null,
      gameInfo: null,
      gameResult: null,
      sentGameTextToPlayerObj:{
        0: {},
        1: {},
        2: {},
        3: {},
        4: {},
        5: {},
        6: {},
        7: {},
      }
    }
  },

  mixins:[chatRoomWebSocket, chatRoomResize],
 
  methods:{
  },

  components:{
    PlayerListModule,
    PlayerInfoModule,
    ChatModule,
    GameRoomListModule,
    LogoutDialogModule,
    CreateGameRoomDialogModule,
    ChatRoomButtonModule,
    GameRoomButtonModule,
    LeaveRoomDialogModule,
    EnterGameRoomDialogModule,
    GameRoomModule,
    AskChangeSeatDialogModule,
    CardModule,
    GameResultDialogModule,
  },
}
</script>


<style>
  #input-button {
    background-color: #409eff; 
    color: #fff
  }

  .el-header, .el-footer {
    background-color: #B3C0D1;
    color: #333;
    background-size: 100% 100%;
    padding: 0px; 
  }
  
  .el-aside {
    background-color: #D3DCE6;
    color: #333;
    background-size: 100% 100%;
  }
  
  .el-main {
    background-color: #D3DCE6;
    color: #333;
    background-size: 100% 100%;
  }
  
  .el-container {
    padding: 0px;
    margin: 0px;
    height: 100vh;
  }

  .el-avatar {
    background: none
  }

  .player-list-box{
    width: 90%;
    height: 70%;
    margin-left: 5%;
    margin-top: 10%;
    background-color: #edf0f5;
    border-radius: 6px;
    border: 2px solid #ebab0b;
  }

  .chat-room-header-button-player-list{
     float: left;
     width: 20%;
     margin-top: 2%;
     margin-left: 5%;
     height: 80%;
  }

  .chat-box{
    width: 100%;
    height: 80%;
    background-color: #edf0f5;
    float:left;
    overflow-y: auto;
    border-radius: 4px;
  }

  .el-button+.el-button{
    margin-left: 0px;
  }

  .chat-text{
    margin: 0;
    padding: 0px;
  }

  .input-box{
    float: left;
  }

  .hide-scroll-bar {
    overflow-y: hidden;
  }

  .fill-width {
    width: 100%;
  }

  .fill-height {
    height: 100%;
  }
</style>