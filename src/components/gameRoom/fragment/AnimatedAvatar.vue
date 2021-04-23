<template>
    <el-image :class="[avatarClass, { 'avatar_vibrate' : vibrateFlag, 'heartbeat' : heartbeatFlag, 'heartbeat_slow' : heartbeatSlowFlag, 'heartbeat_fast' : heartbeatFastFlag}]" :src="avatarUrl"></el-image>
</template>

<script>
export default {
    data() {
        return{
            vibrateFlag: false,
            heartbeatSlowFlag: false,
            heartbeatFlag: false,
            heartbeatFastFlag: false,
            actionBoundryList: [0,10,20,30,40],
        }
    },

    props:{
        avatarClass: { type: String, default: ''},
        avatarUrl: { type: String, default: ''},
        currentPlayerCards: { type: Number, default: 0},
        isCurrentPlayer: { type: Boolean, default: false},
        currentGameCombo: { type: Number, default: 0},
    },

    watch:{
        currentPlayerCards: function(newVal, oldVal){
            if(oldVal === null) return
            let vm = this
            let diffVal = newVal - oldVal
            this.vibrateFlag = false
            this.heartbeatFlag = false
            this.heartbeatSlowFlag = false
            this.heartbeatFastFlag = false
            if( diffVal > this.actionBoundryList[0] ){
                window.requestAnimationFrame(function() {
                    window.requestAnimationFrame(function() {
                        vm.vibrateFlag = true
                        let audio = document.querySelector('#audio')
                        audio.src = require('@/assets/musics/discard.mp3')
                        audio.play()
                    })
                })
            }
        },

        isCurrentPlayer: function(newVal){
            if(newVal === true){
                if(this.currentGameCombo > this.actionBoundryList[0] && this.currentGameCombo <= this.actionBoundryList[2]){
                    this.heartbeatFlag = false
                    this.heartbeatSlowFlag = true
                    this.heartbeatFastFlag = false
                }
                else if(this.currentGameCombo > this.actionBoundryList[2] && this.currentGameCombo <= this.actionBoundryList[4]){
                    this.heartbeatFlag = true
                    this.heartbeatSlowFlag = false
                    this.heartbeatFastFlag = false
                }
                else if(this.currentGameCombo > this.actionBoundryList[4]){
                    this.heartbeatFlag = false
                    this.heartbeatSlowFlag = false
                    this.heartbeatFastFlag = true
                }
            }
            else{
                this.vibrateFlag = false
                this.heartbeatFlag = false
                this.heartbeatSlowFlag = false
                this.heartbeatFastFlag = false
            }
        },
    },
}
</script>

<style scoped>
.avatar_vibrate{-webkit-animation:avatar_vibrate .5s linear both;animation:avatar_vibrate .5s linear both}
@-webkit-keyframes avatar_vibrate{0%{-webkit-transform:translate(0);transform:translate(0)}10%{-webkit-transform:translate(-2px,-2px);transform:translate(-2px,-2px)}20%{-webkit-transform:translate(2px,-2px);transform:translate(2px,-2px)}30%{-webkit-transform:translate(-2px,2px);transform:translate(-2px,2px)}40%{-webkit-transform:translate(2px,2px);transform:translate(2px,2px)}50%{-webkit-transform:translate(-2px,-2px);transform:translate(-2px,-2px)}60%{-webkit-transform:translate(2px,-2px);transform:translate(2px,-2px)}70%{-webkit-transform:translate(-2px,2px);transform:translate(-2px,2px)}80%{-webkit-transform:translate(-2px,-2px);transform:translate(-2px,-2px)}90%{-webkit-transform:translate(2px,-2px);transform:translate(2px,-2px)}100%{-webkit-transform:translate(0);transform:translate(0)}}@keyframes avatar_vibrate{0%{-webkit-transform:translate(0);transform:translate(0)}10%{-webkit-transform:translate(-2px,-2px);transform:translate(-2px,-2px)}20%{-webkit-transform:translate(2px,-2px);transform:translate(2px,-2px)}30%{-webkit-transform:translate(-2px,2px);transform:translate(-2px,2px)}40%{-webkit-transform:translate(2px,2px);transform:translate(2px,2px)}50%{-webkit-transform:translate(-2px,-2px);transform:translate(-2px,-2px)}60%{-webkit-transform:translate(2px,-2px);transform:translate(2px,-2px)}70%{-webkit-transform:translate(-2px,2px);transform:translate(-2px,2px)}80%{-webkit-transform:translate(-2px,-2px);transform:translate(-2px,-2px)}90%{-webkit-transform:translate(2px,-2px);transform:translate(2px,-2px)}100%{-webkit-transform:translate(0);transform:translate(0)}}
.heartbeat_slow{-webkit-animation:heartbeat_slow 2s ease-in-out infinite both;animation:heartbeat_slow 2s ease-in-out infinite both}
@-webkit-keyframes heartbeat_slow{from{-webkit-transform:scale(1);transform:scale(1);-webkit-transform-origin:center center;transform-origin:center center;-webkit-animation-timing-function:ease-out;animation-timing-function:ease-out}10%{-webkit-transform:scale(.91);transform:scale(.91);-webkit-animation-timing-function:ease-in;animation-timing-function:ease-in}17%{-webkit-transform:scale(.98);transform:scale(.98);-webkit-animation-timing-function:ease-out;animation-timing-function:ease-out}33%{-webkit-transform:scale(.87);transform:scale(.87);-webkit-animation-timing-function:ease-in;animation-timing-function:ease-in}45%{-webkit-transform:scale(1);transform:scale(1);-webkit-animation-timing-function:ease-out;animation-timing-function:ease-out}}@keyframes heartbeat_slow{from{-webkit-transform:scale(1);transform:scale(1);-webkit-transform-origin:center center;transform-origin:center center;-webkit-animation-timing-function:ease-out;animation-timing-function:ease-out}10%{-webkit-transform:scale(.91);transform:scale(.91);-webkit-animation-timing-function:ease-in;animation-timing-function:ease-in}17%{-webkit-transform:scale(.98);transform:scale(.98);-webkit-animation-timing-function:ease-out;animation-timing-function:ease-out}33%{-webkit-transform:scale(.87);transform:scale(.87);-webkit-animation-timing-function:ease-in;animation-timing-function:ease-in}45%{-webkit-transform:scale(1);transform:scale(1);-webkit-animation-timing-function:ease-out;animation-timing-function:ease-out}}
.heartbeat{-webkit-animation:heartbeat 1s ease-in-out infinite both;animation:heartbeat 1s ease-in-out infinite both}
@-webkit-keyframes heartbeat{from{-webkit-transform:scale(1);transform:scale(1);-webkit-transform-origin:center center;transform-origin:center center;-webkit-animation-timing-function:ease-out;animation-timing-function:ease-out}10%{-webkit-transform:scale(.91);transform:scale(.91);-webkit-animation-timing-function:ease-in;animation-timing-function:ease-in}17%{-webkit-transform:scale(.98);transform:scale(.98);-webkit-animation-timing-function:ease-out;animation-timing-function:ease-out}33%{-webkit-transform:scale(.87);transform:scale(.87);-webkit-animation-timing-function:ease-in;animation-timing-function:ease-in}45%{-webkit-transform:scale(1);transform:scale(1);-webkit-animation-timing-function:ease-out;animation-timing-function:ease-out}}@keyframes heartbeat{from{-webkit-transform:scale(1);transform:scale(1);-webkit-transform-origin:center center;transform-origin:center center;-webkit-animation-timing-function:ease-out;animation-timing-function:ease-out}10%{-webkit-transform:scale(.91);transform:scale(.91);-webkit-animation-timing-function:ease-in;animation-timing-function:ease-in}17%{-webkit-transform:scale(.98);transform:scale(.98);-webkit-animation-timing-function:ease-out;animation-timing-function:ease-out}33%{-webkit-transform:scale(.87);transform:scale(.87);-webkit-animation-timing-function:ease-in;animation-timing-function:ease-in}45%{-webkit-transform:scale(1);transform:scale(1);-webkit-animation-timing-function:ease-out;animation-timing-function:ease-out}}
.heartbeat_fast{-webkit-animation:heartbeat_fast .5s ease-in-out infinite both;animation:heartbeat_fast .5s ease-in-out infinite both}
@-webkit-keyframes heartbeat_fast{from{-webkit-transform:scale(1);transform:scale(1);-webkit-transform-origin:center center;transform-origin:center center;-webkit-animation-timing-function:ease-out;animation-timing-function:ease-out}10%{-webkit-transform:scale(.91);transform:scale(.91);-webkit-animation-timing-function:ease-in;animation-timing-function:ease-in}17%{-webkit-transform:scale(.98);transform:scale(.98);-webkit-animation-timing-function:ease-out;animation-timing-function:ease-out}33%{-webkit-transform:scale(.87);transform:scale(.87);-webkit-animation-timing-function:ease-in;animation-timing-function:ease-in}45%{-webkit-transform:scale(1);transform:scale(1);-webkit-animation-timing-function:ease-out;animation-timing-function:ease-out}}@keyframes heartbeat_fast{from{-webkit-transform:scale(1);transform:scale(1);-webkit-transform-origin:center center;transform-origin:center center;-webkit-animation-timing-function:ease-out;animation-timing-function:ease-out}10%{-webkit-transform:scale(.91);transform:scale(.91);-webkit-animation-timing-function:ease-in;animation-timing-function:ease-in}17%{-webkit-transform:scale(.98);transform:scale(.98);-webkit-animation-timing-function:ease-out;animation-timing-function:ease-out}33%{-webkit-transform:scale(.87);transform:scale(.87);-webkit-animation-timing-function:ease-in;animation-timing-function:ease-in}45%{-webkit-transform:scale(1);transform:scale(1);-webkit-animation-timing-function:ease-out;animation-timing-function:ease-out}}
</style>