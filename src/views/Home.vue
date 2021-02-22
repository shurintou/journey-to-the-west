<template>
  <div>
    <div>
      <p v-for="item in chatText" :key="item.id">{{item.text}}</p>
    </div>
    <input type="text" v-model="inputText" placeholder="请输入聊天信息">
    <button type="button" v-on:click="sendText()">发送</button>
  </div>
</template>

<script>
import {webSocketMixin} from '../mixins/webSocket'
export default {
  name: 'Home',
  data(){
    return {
      inputText: '',
      chatText: [],
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
