<template>
<div >
  <el-container :style="{backgroundImage: 'url(' + url + ')'}" style="background-size: 100% 100%">
    <el-aside width="200px">Aside</el-aside>
    <el-container>
      <el-main>Main</el-main>
      <el-footer>Footer</el-footer>
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
      inputText: '',
      chatText: [],
      fit: 'fill',
      url: require("@/assets/images/chatroom_background.png")
    }
  },

  mixins:[webSocketMixin],
 
  methods:{
    sendText: function(){
      this.ws.send(JSON.stringify({'text': this.inputText}))
      this.inputText = ""
    },
  },
  
}
</script>


<style scoped>
  .el-header, .el-footer {
    background-color: #B3C0D1;
    color: #333;
    text-align: center;
    line-height: 60px;
    opacity: 0.8
  }
  
  .el-aside {
    background-color: #D3DCE6;
    color: #333;
    text-align: center;
    line-height: 200px;
    opacity: 0.8
  }
  
  .el-main {
    background-color: #E9EEF3;
    color: #333;
    text-align: center;
    line-height: 160px;
    opacity: 0.8
  }
  
  .el-container {
    padding: 0px;
    margin: 0px;
    height: 100vh;
    opacity: 0.8
  }
  
  .el-container:nth-child(5) .el-aside,
  .el-container:nth-child(6) .el-aside {
    line-height: 260px;
  }
  
  .el-container:nth-child(7) .el-aside {
    line-height: 320px;
  }
</style>