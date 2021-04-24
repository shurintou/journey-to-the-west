export var verificationLogic = {
     data: function(){
        var vertificationCodeRule = (rule, value, callback) => {
            value = value.toUpperCase()
            if (value === '') {
              this.vertificationCodeCorrect = false
              callback(new Error('请输入验证码'))
            } else if (value !== this.identifyCode) {
              this.vertificationCodeCorrect = false
              callback(new Error('验证码不正确!'))
            } else {
              this.vertificationCodeCorrect = true
              callback()
            }
        };

        return {
            identifyCode: '',
            identifyCodeWords: '123456789ABCDEFGHIJKLMNPQRSTUVWXYZ',
            vertificationCode: vertificationCodeRule,
            vertificationCodeCorrect: false
        }
    },

    methods:{
        // 生成随机数
        randomNum(min, max) {
            return Math.floor(Math.random() * (max - min) + min)
        },
        // 切换验证码
        refreshCode() {
            this.identifyCode = ''
            this.createCode(4)
        },
        // 生成四位随机验证码
        createCode(length) {
            for (let i = 0; i < length; i++) {
                this.identifyCode += this.identifyCodeWords[this.randomNum(0, this.identifyCodeWords.length)]
            }
        }

    },

    mounted: function(){
        this.$nextTick(function(){
            this.createCode(4)
        })
    }
}