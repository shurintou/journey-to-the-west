export var chatRoomResize = {
    data: function(){
        return {
            asideWidth: '',
            subAsideWidth: '',
            footHeight: '',
            inputSize: '',
            inputText: '',
            avatarSize: '',
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
                this.avatarSize = 'mini'
            }
            else if(screen_width < 800){
                this.asideWidth = '160px'
                this.footHeight = '120px'
                this.subAsideWidth = '150px'
                this.inputSize = 'mini'
                this.avatarSize = 'mini'
            }
            /* iphoneX plus横屏880 */
            else if(screen_width < 900){
                this.asideWidth = '160px'
                this.footHeight = '110px'
                this.subAsideWidth = '150px'
                this.inputSize = 'mini'
                this.avatarSize = 'mini'
            }
            else if(screen_width < 1024){
                this.asideWidth = '200px'
                this.footHeight = '180px'
                this.subAsideWidth = '200px'
                this.inputSize = 'small'
                this.avatarSize = 'small'
            }
            else if(screen_width < 1280){
                this.asideWidth = '250px'
                this.footHeight = '200px'
                this.subAsideWidth = '200px'
                this.inputSize = 'medium'
                this.avatarSize = 'medium'
            }
            /* 电脑 */
            else{
                this.asideWidth = '300px'
                this.footHeight = '220px'
                this.subAsideWidth = '200px'
                this.inputSize = 'medium'
                this.avatarSize = 'medium'
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