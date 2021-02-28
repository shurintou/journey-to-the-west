<template>
<div>
  <el-container>
    <el-aside :width="asideWidth" v-if="asideWidth !== '0px'" :style="{backgroundImage: 'url(' + verticalBackground + ')'}">
      <div class="player-list-box">
        <PlayerListModule :playerList = "playerList" :avatarSize = "avatarSize" :fontSize = "fontSize" :tagSize = "tagSize" :popupWidth = "popupWidth"></PlayerListModule>
      </div>
      <div class="button-box">
        <el-button type="success" class="chat-room-aside-button" icon="el-icon-circle-plus" :style="{'font-size': buttonFontSize}" :size="buttonSize">创建房间</el-button>
        <el-button type="danger" class="chat-room-aside-button" icon="el-icon-d-arrow-left" :style="{'font-size': buttonFontSize}" @click="cancelLeaveDialogVisible = true" :size="buttonSize">登出离开</el-button>
      </div>
    </el-aside>
    <el-container>
      <el-header v-if="asideWidth === '0px'" :style="{backgroundImage: 'url(' + verticalBackground + ')'}">
        <el-popover placement="bottom" :width="popupWidth" trigger="click">
          <PlayerListModule :playerList = "playerList" :avatarSize = "avatarSize" :fontSize = "fontSize" :tagSize = "tagSize" :popupWidth = "popupWidth"></PlayerListModule>
          <el-button slot="reference" class="chat-room-header-button-player-list" type="primary" icon="el-icon-user-solid" :style="{'font-size': buttonFontSize, 'padding': '0px 0px'}" :size="buttonSize" round>玩家列表</el-button>
        </el-popover>
        <el-button type="danger" class="chat-room-header-button" icon="el-icon-d-arrow-left" :style="{'font-size': buttonFontSize, 'padding': '0px 0px'}" @click="cancelLeaveDialogVisible = true" :size="buttonSize" round>登出离开</el-button>
        <el-button type="success" class="chat-room-header-button" icon="el-icon-circle-plus" :style="{'font-size': buttonFontSize, 'padding': '0px 0px'}" :size="buttonSize" round>创建房间</el-button>
      </el-header>
      <el-main :style="{backgroundImage: 'url(' + mainImg + ')'}">Main</el-main>
      <el-footer :height="footHeight">
        <el-container class="fill-height">
          <el-main class="hide-scroll-bar" :style="{backgroundImage: 'url(' + horizontalBackground + ')'}">
            <div class="chat-box" ref="chatBox">
              <el-alert class="chat-text" v-for="item in chatText" :key="item.id" :title="item.name + '：' + item.text" :type="item.type" :closable="false" show-icon></el-alert>
            </div>
            <el-input class="fill-width input-box" placeholder="请输入聊天内容" v-model="inputText" @keypress.native="enterSendText($event)" :size="buttonSize">
              <el-button id="input-button" slot="append" icon="el-icon-check" type="primary" @click="sendTextToServe()" :size="buttonSize">发送</el-button>
            </el-input>
          </el-main>
          <el-aside class="hide-scroll-bar" :width="subAsideWidth" :style="{backgroundImage: 'url(' + verticalBackground + ')'}">
            subAside
          </el-aside>
        </el-container>
      </el-footer>
    </el-container>
  </el-container>
  <el-dialog
        title="提示"
        :visible.sync="cancelLeaveDialogVisible"
        :width="dialogWidth"
        center>
        <i class="el-icon-question"></i>
        <span style="text-align:center">确定要登出并离开游戏大厅吗？</span>
        <span slot="footer" class="dialog-footer">
            <el-button @click="cancelLeaveDialogVisible = false" style="margin-right:10%">取消</el-button>
            <el-button type="primary" @click="logOut()">确定</el-button>
        </span>
    </el-dialog>   
</div>
</template>

<script>
import { chatRoomWebSocket } from '../mixins/chatRoomWebSocket'
import { chatRoomResize } from '../mixins/chatRoomResize'
import PlayerListModule from '../components/PlayerListModule'

export default {
  name: 'ChatRoom',
  data(){
    return {
      chatText: [],
      cancelLeaveDialogVisible: false,
      user:{id: 0, name: 'zlt', nickname: 'hyf'},
      playerList:[{nickname:'zlt', avatar: 5, wins:5, max:100, min:0, status: 'playing'},{nickname:'hyf', avatar: 8, wins:0, max:100, min:0, status: 'waiting'},{nickname:'啊啊啊啊啊', avatar: 12, wins:0, max:10, min:0, status: 'free'}],
    }
  },

  mixins:[chatRoomWebSocket, chatRoomResize],
 
  methods:{
    enterSendText: function(e){
      if(e.keyCode === 13 && this.inputText.length>0)this.sendTextToServe()
    },

    sendTextToServe: function(){
      // alert(document.body.clientWidth)
      this.ws.send(JSON.stringify({name : this.user.nickname, type: 'info', 'text': this.inputText}))
      this.inputText = ""
    },

    logOut: function(){
      this.$message({
        message: '已登出，回到登录页面',
        type: 'info'
       });
      this.$router.push({name: 'Login'})
      this.cancelLeaveDialogVisible = false
    },
  },

  components:{
    PlayerListModule
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

  .button-box{
    margin-top:5%;
    width: 80%;
    height: 20%;
    margin-left: 10%;
    border-radius: 4px;
  }

  .chat-room-aside-button{
     width: 100%;
     height: 40%;
     margin-bottom: 5%;
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