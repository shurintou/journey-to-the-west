<template>
<div>
  <el-container :style="{backgroundImage: 'url(' + url + ')'}" style="background-size: 100% 100%">
    <el-aside :width="asideWidth" v-if="asideWidth !== '0px'">Aside</el-aside>
    <el-container>
      <el-header v-if="asideWidth === '0px'">Header</el-header>
      <el-main>Main</el-main>
      <el-footer :height="footHeight" style="padding: 0px;" >
        <el-container style="height: 100%; background: rgba(243,243,243,0)">
          <el-main style="overflow-y: hidden">
            <div style="height:100%; width:100%;">
              <el-input placeholder="请输入聊天内容" v-model="form.text" :size="inputSize">
                  <el-button slot="append" icon="el-icon-check" type="primary" style="background-color: #409eff; color: #fff" @click="sendText()" :size="inputSize">发送</el-button>
              </el-input>
            </div>
          </el-main>
          <el-aside :width="subAsideWidth" style="background: rgba(243,243,243,0); overflow-y: hidden">subAside</el-aside>
        </el-container>
      </el-footer>
    </el-container>
  </el-container>
</div>
    <!-- <div>
      <p v-for="item in chatText" :key="item.id">{{item.text}}</p>
    </div>
    <input type="text" v-model="inputText" placeholder="请输入聊天信息">
    <button type="button" v-on:click="sendText()">发送</button> -->
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
      form:{name: '', text: '',},
      url: require("@/assets/images/chatroom_background.png")
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
    sendText: function(){
      this.ws.send(JSON.stringify({'text': this.inputText}))
      this.inputText = ""
    },

    resizeLogic: function(){
        var screen_width = document.body.clientWidth
        if(screen_width < 800){
          if(screen_width === 796){
            this.asideWidth = '180px'
            this.footHeight = '120px'
            this.subAsideWidth = '150px'
            this.inputSize = 'mini'
          }
          else{
            this.asideWidth = '0px'
            this.footHeight = '180px'
            this.subAsideWidth = '120px'
            this.inputSize = 'mini'
          }
        }
        else if(screen_width < 1024){
            this.asideWidth = '220px'
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
  .el-header, .el-footer {
    /* background-color: #B3C0D1; */
    color: #333;
    text-align: center;
    line-height: 60px;
    /* opacity: 0.9; */
    /* background: rgba(243,243,243,0.8) */
  }
  
  .el-aside {
    /* background-color: #D3DCE6; */
    color: #333;
    text-align: center;
    line-height: 200px;
    /* opacity: 0.9; */
    background: rgba(243,243,243,0.5)
  }
  
  .el-main {
    /* background-color: #E9EEF3; */
    color: #333;
    text-align: center;
    line-height: 160px;
    /* opacity: 0.9; */
    /* background: rgba(243,243,243,0.8) */
  }
  
  .el-container {
    padding: 0px;
    margin: 0px;
    height: 100vh;
    /* opacity: 0.9; */
    background: rgba(243,243,243,0.5)
  }
  
  .el-container:nth-child(5) .el-aside,
  .el-container:nth-child(6) .el-aside {
    line-height: 260px;
  }
  
  .el-container:nth-child(7) .el-aside {
    line-height: 320px;
  }
</style>