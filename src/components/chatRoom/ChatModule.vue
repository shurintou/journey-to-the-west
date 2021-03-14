<template>
    <el-main class="hide-scroll-bar" :style="{backgroundImage: 'url(' + horizontalBackground + ')'}">
        <div class="chat-box" ref="chatBox">
            <el-alert class="chat-text" v-for="item in chatText" :key="item.id" :title="item.name + '：' + item.text" :type="item.type" :closable="false" show-icon></el-alert>
        </div>
        <el-input class="fill-width input-box" placeholder="请输入聊天内容" v-model="inputText" @keypress.native="enterSendText($event)" :size="buttonSize">
            <i slot="prefix" class="el-input__icon el-icon-edit"></i>
            <el-button id="input-button" slot="append" icon="el-icon-check" type="primary" @click="sendTextToServe()" :size="buttonSize" :disabled="inputText.length === 0">发送</el-button>
        </el-input>
    </el-main>
</template>

<script>
export default {
    data(){
        return {
            inputText: '',
        }
    },

    props:{
        chatText: {type: Array},
        horizontalBackground: {type: String, default: ''},
        verticalBackground: {type: String, default: ''},
        buttonSize: {type: String, default: ''},
        ws: { type: WebSocket, default: null},
    },

    methods:{
        enterSendText: function(e){
            if(e.keyCode === 13)this.sendTextToServe()
        },

        sendTextToServe: function(){
            if(this.inputText.length>0){
                this.ws.send(JSON.stringify({ type: 'chat', nickname: this.$store.state.nickname, text: this.inputText, player_loc: this.$store.state.player_loc }))
                this.inputText = ""
            }
        },

        modifyScrollHeight: function(){
            var e = this.$refs.chatBox
            e.scrollTop = e.scrollHeight
        },
    }
}
</script>