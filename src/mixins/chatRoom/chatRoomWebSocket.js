export var chatRoomWebSocket = {
    data: function(){
        return {
            wsUrl : 'ws://192.168.11.11:3000',
            /* 防止多次重连 */
            lockReconnect :false,
            /* 重连一定次数失败后不再重连 */
            reconnectTimes: 0,
            ws : null,
            timeoutObj: null,
            serverTimeoutObj: null,
            reconnectTimeoutObj: null,
            wsDelay : 3000,
            timeout : 3000,
            chatTextId : 0,
            player_loc: 0,  //0为游戏大厅，其余为游戏房间号
            player_status: 0, //0空闲1等待2忙碌
        }
    },

    computed:{
        /* 判断是否离开了游戏大厅 */
       isLeave: function(){
         return this.$route.path.indexOf('chatroom') === -1
       },
    },

    methods:{
        createWebSocket:function(url){
            var self = this
            this.ws = new WebSocket(url)
            this.ws.onopen = function(){
                self.start()
                self.ws.send(JSON.stringify({ type: 'playerList', nickname: self.$store.state.nickname, avatar_id: self.$store.state.avatar_id , player_loc: self.player_loc, player_status: self.player_status }))
                self.sendMessageToChatRoom({ 'id' : 0, name : '系统消息', type : 'success', 'text' : '进入游戏大厅，成功连接服务器'});
            };
                
            this.ws.onmessage = function (data){ 
                let jsonData = JSON.parse(data.data)
                self.reconnectTimes = 0
                if( jsonData.type === 'chat'){
                    if(jsonData.player_loc === self.player_loc){
                        self.sendMessageToChatRoom({ 'id' : 0, name : jsonData.userId ===  self.$store.state.id ? '你' : jsonData.nickname, type : 'info', 'text' : jsonData.text})
                    }
                }
                else if(jsonData.type === 'playerList'){
                    var newPlayerList = []
                    for(var i =0; i < jsonData.data.length; i++){
                        newPlayerList.push(JSON.parse(jsonData.data[i]))
                    }
                    self.playerList = newPlayerList
                }
                self.reset()
            };
                
            this.ws.onclose = function(close){
                if(close.code === 1000){
                    clearTimeout(self.timeoutObj);
                    clearTimeout(self.serverTimeoutObj);
                    clearTimeout(self.reconnectTimeoutObj);
                    self.sendMessageToChatRoom({ 'id' : 0, name : '系统消息', type : 'error', text : close.reason});
                }
                else{
                    if(self.isLeave === false) 
                    self.reconnect(self.wsUrl);
                }
            };

            this.ws.onerror = function(){
                if(self.isLeave === false) 
                self.reconnect(self.wsUrl);
            };
        },

        reset: function(){
            clearTimeout(this.timeoutObj);
            clearTimeout(this.serverTimeoutObj);
            clearTimeout(this.reconnectTimeoutObj);
            this.start();
        },

        start: function(){
            var self = this
            this.timeoutObj = setTimeout(function(){
                self.ws.send(JSON.stringify({ type: 'ping' }));
                self.serverTimeoutObj = setTimeout(function(){
                    self.ws.close();//如果onclose会执行reconnect，我们执行ws.close()就行了.如果直接执行reconnect 会触发onclose导致重连两次
                }, self.timeout)
            }, this.timeout)
        },

        reconnect: function(){
            var self = this
            if(this.lockReconnect) return;
            this.lockReconnect = true;
            this.reconnectTimeoutObj = setTimeout(function () {     //没连接上会一直重连，设置延迟避免请求过多
                if(self.isLeave === false){
                    if(self.reconnectTimes < 15){//离开页面后则不再刷新心跳
                        self.reconnectTimes = self.reconnectTimes + 1
                        self.sendMessageToChatRoom({ 'id' : 0, name : '系统消息', type : 'warning', text : '与服务器连接断开，尝试重连中...'});
                        self.createWebSocket(self.wsUrl);
                        self.lockReconnect = false;
                    }
                    else{
                        self.$message.error('已与游戏大厅断开连接');
                        self.sendMessageToChatRoom({ 'id' : 0, name : '系统消息', type : 'error', text : '已与游戏大厅断开连接'});
                        clearTimeout(self.timeoutObj);
                        clearTimeout(self.serverTimeoutObj);
                        clearTimeout(self.reconnectTimeoutObj);
                    }
                }
                else{
                    clearTimeout(self.timeoutObj);
                    clearTimeout(self.serverTimeoutObj);
                    clearTimeout(self.reconnectTimeoutObj);
                }
            }, self.wsDelay);
        },


        sendMessageToChatRoom: function(message){
            if(this.isLeave === false){
                this.chatTextId = this.chatTextId + 1
                message.id = this.chatTextId
                this.chatText.push(message);
                this.$nextTick(function(){
                    /* 通过ref层层深入访问到子组件的聊天框，调节其滚动条高度 */
                    this.$refs.chatModule.modifyScrollHeight()
                })
            }
        },

        sendTextToServe: function(text){
            this.ws.send(JSON.stringify({ type: 'chat', nickname: this.$store.state.nickname, text: text, player_loc: this.player_loc }))
        },
    },

    created: function(){
        this.createWebSocket(this.wsUrl);
    },

    beforeDestroy: function(){
        this.ws.close();
    }
}

