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
                self.ws.send(JSON.stringify({ type: 'gameRoomList', id: 0 }))
                self.ws.send(JSON.stringify({ type: 'playerList', nickname: self.$store.state.nickname, avatar_id: self.$store.state.avatar_id , player_loc: self.$store.state.player_loc, player_status: self.$store.state.player_status }))
                self.sendMessageToChatRoom({ 'id' : 0, name : '【系统消息】', type : 'success', 'text' : '进入游戏大厅，成功连接服务器'});
            };
                
            this.ws.onmessage = function (data){ 
                let jsonData = JSON.parse(data.data)
                self.reconnectTimes = 0
                if( jsonData.type === 'chat'){
                    if(jsonData.player_loc === self.$store.state.player_loc){
                        self.sendMessageToChatRoom({ 'id' : 0, name : jsonData.userId ===  self.$store.state.id ? '你' : jsonData.nickname, type : 'info', 'text' : jsonData.text})
                    }
                }
                else if( jsonData.type === 'system' ){//聊天框显示系统信息
                    if(jsonData.player_loc === self.$store.state.player_loc){
                        self.sendMessageToChatRoom({ 'id' : 0, name : '【系统消息】', type : 'warning', 'text' : jsonData.text})
                    }
                }
                else if( jsonData.type === 'message' ){//上方弹窗显示系统信息
                    if(jsonData.player_loc === self.$store.state.player_loc){
                        self.$message({message: jsonData.text, type: jsonData.subType })
                    }
                }
                else if( jsonData.type === 'error' ){
                    if(jsonData.player_loc === self.$store.state.player_loc){
                        self.sendMessageToChatRoom({ 'id' : 0, name : '【系统消息】', type : 'error', 'text' : jsonData.text})
                        self.$message.error(jsonData.text)
                    }
                }
                else if( jsonData.type === 'askChangeSeat' ){
                    self.askChangeSeatDialogVisible = true
                    self.askChangeSeatInfo = jsonData.data
                }
                else if(jsonData.type === 'playerList'){
                    let newPlayerList = []
                    let player = {}
                    let playerLoc = 0
                    let playerStatus = 0
                    for(let i =0; i < jsonData.data.length; i++){
                        player = JSON.parse(jsonData.data[i])
                        newPlayerList.push(player)
                        /* 获取玩家的位置和状态信息 */
                        if(player.id === self.$store.state.id){
                            playerLoc = player.player_loc
                            playerStatus = player.player_status
                        }
                    }
                    if(playerLoc !== 0){
                        /* 此设定暂时摒弃：在大厅则获取所有玩家信息，不在大厅，但在同一房间，也获取该玩家信息。*/
                        // newPlayerList = newPlayerList.filter( player => player.player_loc === playerLoc )
                        if(self.$store.state.player_loc === 0){
                            self.$message.success('成功进入房间')
                        }
                    }
                    else{
                        if(self.$store.state.player_loc !== 0){
                            self.$message.info('已离开房间，回到游戏大厅')
                        }
                    }
                    self.$store.dispatch('mutatePlayerLoc', playerLoc)
                    self.$store.dispatch('mutatePlayerStatus', playerStatus)
                    self.playerList = newPlayerList
                }
                else if(jsonData.type === 'gameRoomList'){
                    let newGameRoomList = [] 
                    let room = {} //中间变量
                    let playerLoc = 0 //gameRoomList中玩家所在房间id
                    let playerLocRoom = null //gameRoomList中玩家所在房间
                    for(let i = 0; i < jsonData.data.length; i++){
                        room = JSON.parse(jsonData.data[i])
                        newGameRoomList.push(room)
                        /* 获取玩家自身在哪个房间 */
                        for(let j = 0; j < Object.keys(room.playerList).length; j++){
                            if( self.$store.state.id === room.playerList[j].id ){
                                playerLoc = room.id
                                playerLocRoom = room
                                break
                            }
                        }
                    }
                    /* 玩家在某个房间 */
                    if(playerLocRoom !== null){ 
                        self.playerLocRoom = playerLocRoom 
                         /* 如果玩家现在位置和上面获取到的不一样则通过playerList设置为一样，并相应设置玩家状态 */
                        if( self.$store.state.player_loc !== playerLoc ){
                            self.ws.send(JSON.stringify({ type: 'playerList', nickname: self.$store.state.nickname, avatar_id: self.$store.state.avatar_id , player_loc: playerLoc, player_status: playerLoc === 0? 0: playerLocRoom.status === 0 ? 1: 2 }))
                        }
                        /* 如果玩家所在房间正在游戏中且本地没有该游戏信息 */
                        if(playerLocRoom.status === 1 && self.gameInfo === null){
                            self.ws.send(JSON.stringify({ type: 'game', action: 'get', id: playerLocRoom.id }))
                        }
                    }
                    /* 玩家不在任一房间 */
                    else{
                        self.ws.send(JSON.stringify({ type: 'playerList', nickname: self.$store.state.nickname, avatar_id: self.$store.state.avatar_id , player_loc: 0, player_status: 0}))
                    }
                    self.gameRoomList = newGameRoomList
                }
                else if(jsonData.type === 'game'){
                    if(jsonData.action === 'initialize' || self.gameInfo === null){
                        self.gameInfo = JSON.parse(jsonData.data)
                    }
                    else if(jsonData.action === 'shiftOnline'){
                        if(self.gameInfo !== null){
                            self.gameInfo.gamePlayer[jsonData.seatIndex].online = jsonData.online
                        }
                    }
                    else if(jsonData.action === 'textToPlayer'){
                        self.sentGameTextToPlayerObj[jsonData.data.source] = jsonData.data
                    }
                    else if(jsonData.action === 'delete'){
                        self.gameInfo = null
                    }
                    else{
                        let gameData = JSON.parse(jsonData.data)
                        /* 获取到的游戏数据版本高于本地的才接收 */
                        if(gameData.version > self.gameInfo.version){
                            self.gameInfo = gameData
                        }
                    }
                }
                self.reset()
            };
                
            this.ws.onclose = function(close){
                if(close.code === 1000){
                    clearTimeout(self.timeoutObj);
                    clearTimeout(self.serverTimeoutObj);
                    clearTimeout(self.reconnectTimeoutObj);
                    self.sendMessageToChatRoom({ 'id' : 0, name : '【系统消息】', type : 'error', text : close.reason});
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
                        self.sendMessageToChatRoom({ 'id' : 0, name : '【系统消息】', type : 'warning', text : '与服务器连接断开，尝试重连中...'});
                        self.createWebSocket(self.wsUrl);
                        self.lockReconnect = false;
                    }
                    else{
                        self.$message.error('已与游戏大厅断开连接');
                        self.sendMessageToChatRoom({ 'id' : 0, name : '【系统消息】', type : 'error', text : '已与游戏大厅断开连接'});
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
                if(this.chatText.length > 50) this.chatText.shift();
                this.$nextTick(function(){
                    /* 通过ref层层深入访问到子组件的聊天框，调节其滚动条高度 */
                    if(!this.$refs.chatModule)return
                    this.$refs.chatModule.modifyScrollHeight()
                })
            }
        },
    },

    created: function(){
        this.createWebSocket(this.wsUrl);
    },

    beforeDestroy: function(){
        this.ws.close();
    }
}

