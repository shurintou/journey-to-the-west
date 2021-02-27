<template>
  <el-container>
    <el-aside :width="asideWidth" v-if="asideWidth !== '0px'" :style="{backgroundImage: 'url(' + verticalBackground + ')'}">
      <div class="player-list-box">
        <PlayerListModule :playerList = "playerList" :avatarSize = "avatarSize" :fontSize = "fontSize" :tagSize = "tagSize" :popupWidth = "popupWidth"></PlayerListModule>
      </div>
    </el-aside>
    <el-container>
      <el-header v-if="asideWidth === '0px'" :style="{backgroundImage: 'url(' + verticalBackground + ')'}">Header</el-header>
      <el-main :style="{backgroundImage: 'url(' + mainImg + ')'}">Main</el-main>
      <el-footer :height="footHeight">
        <el-container class="fill-height">
          <el-main class="hide-scroll-bar" :style="{backgroundImage: 'url(' + horizontalBackground + ')'}">
            <div class="chat-box" ref="chatBox">
              <el-alert class="chat-text" v-for="item in chatText" :key="item.id" :title="item.name + '：' + item.text" :type="item.type" :closable="false" show-icon></el-alert>
            </div>
            <el-input class="fill-width input-box" placeholder="请输入聊天内容" v-model="inputText" @keypress.native="enterSendText($event)" :size="inputSize">
              <el-button id="input-button" slot="append" icon="el-icon-check" type="primary" @click="sendTextToServe()" :size="inputSize">发送</el-button>
            </el-input>
          </el-main>
          <el-aside class="hide-scroll-bar" :width="subAsideWidth" :style="{backgroundImage: 'url(' + verticalBackground + ')'}">
            subAside
          </el-aside>
        </el-container>
      </el-footer>
    </el-container>
  </el-container>
</template>

<script>
import { chatRoomWebSocket } from '../mixins/chatRoomWebSocket'
import { chatRoomResize } from '../mixins/chatRoomResize'
import PlayerListModule from '../components/ChatRoomPlayerListModule'

export default {
  name: 'ChatRoom',
  data(){
    return {
      chatText: [],
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
    border-radius: 4px;
  }

  .chat-box{
    width: 100%;
    height: 80%;
    background-color: #edf0f5;
    float:left;
    overflow-y: auto;
    border-radius: 4px;
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