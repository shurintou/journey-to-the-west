<template>
  <el-container>
    <el-aside :width="asideWidth" v-if="asideWidth !== '0px'" :style="{backgroundImage: 'url(' + verticalBackground + ')'}">Aside</el-aside>
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
import {webSocketMixin} from '../mixins/webSocket'
export default {
  name: 'ChatRoom',
  data(){
    return {
      asideWidth: '',
      subAsideWidth: '',
      footHeight: '',
      inputSize: '',
      inputText: '',
      chatText: [],
      fit: 'fill',
      user:{id: 0, name: 'zlt', nickname: 'hyf'},
      mainImg: require("@/assets/images/chatroom_main_image.png"),
      horizontalBackground: require("@/assets/images/horizontal_background.png"),
      verticalBackground: require("@/assets/images/vertical_background.png"),
    }
  },

  mounted:function(){
    this.resizeLogic()
    window.addEventListener("resize",this.resizeLogic,false);
  },

  beforeDestroy:function(){
    window.removeEventListener("resize",this.resizeLogic)
  },

  mixins:[webSocketMixin],
 
  methods:{
    enterSendText: function(e){
      if(e.keyCode === 13 && this.inputText.length>0)this.sendTextToServe()
    },

    sendTextToServe: function(){
      this.ws.send(JSON.stringify({name : this.user.nickname, type: 'info', 'text': this.inputText}))
      this.inputText = ""
    },

    resizeLogic: function(){
        var screen_width = document.body.clientWidth
        if(screen_width < 400){
            this.asideWidth = '0px'
            this.footHeight = '180px'
            this.subAsideWidth = '120px'
            this.inputSize = 'mini'
        }
        else if(screen_width < 800){
            this.asideWidth = '160px'
            this.footHeight = '120px'
            this.subAsideWidth = '150px'
            this.inputSize = 'mini'
        }
        else if(screen_width < 1024){
            this.asideWidth = '200px'
            this.footHeight = '180px'
            this.subAsideWidth = '200px'
            this.inputSize = 'small'
        }
        else if(screen_width < 1280){
            this.asideWidth = '250px'
            this.footHeight = '200px'
            this.subAsideWidth = '200px'
            this.inputSize = 'medium'
        }
        /* 电脑 */
        else{
            this.asideWidth = '300px'
            this.footHeight = '220px'
            this.subAsideWidth = '200px'
            this.inputSize = 'medium'
        }
    }
  },
  
}
</script>


<style scoped>
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

  .chat-box{
    width: 100%;
    height: 80%;
    background-color: #fff;
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