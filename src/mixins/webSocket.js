export var webSocketMixin = {
    data: function(){
        return {
            wsUrl : 'ws://192.168.11.11:8081',
            lockReconnect :false,
            ws : null,
            timeoutObj: null,
            serverTimeoutObj: null,
            wsDelay : 2000,
            timeout : 2000,
        }
    },

    methods:{
        createWebSocket:function(url){
            var self = this
            this.ws = new WebSocket(url)
            this.ws.onopen = function(){
                self.start() 
            };
                
            this.ws.onmessage = function (data){ 
                let jsonData = JSON.parse(data.data)
                if( jsonData.text !== 'pong'){
                    self.chatText.push(jsonData)
                }
                
            };
                
            this.ws.onclose = function(){ 
                self.reconnect(self.wsUrl);
            };

            this.ws.onerror = function(){
                self.reconnect(self.wsUrl);
            };
        },

        reset: function(){
            clearTimeout(this.timeoutObj);
            clearTimeout(this.serverTimeoutObj);
            this.start();
        },

        start: function(){
            var self = this
            this.timeoutObj = setTimeout(function(){
                self.ws.send(JSON.stringify({'text': 'ping'}));
                self.serverTimeoutObj = setTimeout(function(){
                    self.ws.close();//如果onclose会执行reconnect，我们执行ws.close()就行了.如果直接执行reconnect 会触发onclose导致重连两次
                }, self.timeout)
            }, this.timeout)
        },

        reconnect: function(){
            var self = this
            if(this.lockReconnect) return;
            this.lockReconnect = true;
            setTimeout(function () {     //没连接上会一直重连，设置延迟避免请求过多
                if(self.$route.path.indexOf('chatroom') !== -1){//离开页面后则不再刷新心跳
                    self.createWebSocket(self.wsUrl);
                    self.lockReconnect = false;
                }
                else{
                    clearTimeout(self.timeoutObj);
                    clearTimeout(self.serverTimeoutObj);
                }
            }, self.wsDelay);
        },
    },

    created: function(){
        this.createWebSocket(this.wsUrl);
    },

    beforeDestroy: function(){
        this.ws.close();
    }
}

