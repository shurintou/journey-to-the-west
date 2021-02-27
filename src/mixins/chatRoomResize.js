export var chatRoomResize = {
    data: function(){
        return {
            asideWidth: '',
            subAsideWidth: '',
            footHeight: '',
            inputSize: '',
            inputText: '',
            avatarSize: 0,
            fontSize: '',
            tagSize: '',
            popupWidth: 160,
            mainImg: require("@/assets/images/chatroom_main_image.png"),
            horizontalBackground: require("@/assets/images/horizontal_background.png"),
            verticalBackground: require("@/assets/images/vertical_background.png"),
        }
    },

    methods:{
        resizeLogic: function(){
            var screen_width = document.body.clientWidth
            if(screen_width < 400){
                this.asideWidth = '0px'
                this.footHeight = '180px'
                this.subAsideWidth = '120px'
                this.inputSize = 'mini'
                this.avatarSize = 20
                this.fontSize = '7px'
                this.tagSize = 'mini'
                this.popupWidth = 160
            }
            else if(screen_width < 800){
                this.asideWidth = '160px'
                this.footHeight = '120px'
                this.subAsideWidth = '150px'
                this.inputSize = 'mini'
                this.avatarSize = 25
                this.fontSize = '8px'
                this.tagSize = 'mini'
                this.popupWidth = 160
            }
            /* iphoneX plus横屏880 */
            else if(screen_width < 900){
                this.asideWidth = '160px'
                this.footHeight = '110px'
                this.subAsideWidth = '150px'
                this.inputSize = 'mini'
                this.avatarSize = 30
                this.fontSize = '9px'
                this.tagSize = 'mini'
                this.popupWidth = 170


            }
            else if(screen_width < 1024){
                this.asideWidth = '200px'
                this.footHeight = '180px'
                this.subAsideWidth = '200px'
                this.inputSize = 'small'
                this.avatarSize = 35
                this.fontSize = '10px'
                this.tagSize = 'small'
                this.popupWidth = 180

            }
            else if(screen_width < 1280){
                this.asideWidth = '250px'
                this.footHeight = '200px'
                this.subAsideWidth = '200px'
                this.inputSize = 'medium'
                this.avatarSize = 40
                this.fontSize = '11px'
                this.tagSize = 'medium'
                this.popupWidth = 190

            }
            /* 电脑 */
            else{
                this.asideWidth = '300px'
                this.footHeight = '220px'
                this.subAsideWidth = '200px'
                this.inputSize = 'medium'
                this.avatarSize = 45
                this.fontSize = '12px'
                this.tagSize = 'medium'
                this.popupWidth = 200

            }
        }
    },

    mounted:function(){
        this.resizeLogic()
        window.addEventListener("resize",this.resizeLogic,false);
    },

    beforeDestroy:function(){
        window.removeEventListener("resize",this.resizeLogic)
    },

}