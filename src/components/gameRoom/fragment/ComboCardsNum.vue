<template>
    <div v-if="isHorizontal" class="game-room-table-horizontal-box-middle-item">
        <p class="white-color-font" :style="{ 'font-size': fontSize }">连击牌数</p>
        <el-image :src="require('@/assets/images/poker/drop-cards.png')"
            :class="{ 'vibrate': vibrateFlag, 'bounce': bounceFlag, 'pulsate': pulsateFlag, 'shake': shakeFlag, 'earthquake': earthquakeFlag, 'relief': reliefFlag }"></el-image>
        <div class="white-color-font" :style="{ 'font-size': fontSize }">
            <CardsNum :value="gameInfo.currentCombo"></CardsNum>张
        </div>
    </div>
    <div v-else class="game-room-table-vertical-box-bottom-item">
        <div class="white-color-font" :style="{ 'font-size': fontSize }">连击牌数</div>
        <el-image :src="require('@/assets/images/poker/drop-cards.png')" style="max-width:8vw"
            :class="{ 'vibrate': vibrateFlag, 'bounce': bounceFlag, 'pulsate': pulsateFlag, 'shake': shakeFlag, 'earthquake': earthquakeFlag, 'relief': reliefFlag }"></el-image>
        <div class="white-color-font" :style="{ 'font-size': fontSize }">
            <CardsNum :value="gameInfo.currentCombo"></CardsNum>张
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
import CardsNum from '@/components/gameRoom/fragment/CardsNum'

export default Vue.extend({
    data() {
        return {
            vibrateFlag: false,
            bounceFlag: false,
            pulsateFlag: false,
            shakeFlag: false,
            earthquakeFlag: false,
            reliefFlag: false,
            actionBoundryList: [0, 10, 20, 30, 40],
        }
    },

    props: {
        gameInfo: { type: Object, default: null },
        fontSize: { type: String, default: '' },
        isHorizontal: { type: Boolean, default: false },
    },

    watch: {
        'gameInfo.currentCombo': function (newVal, oldVal) {
            var vm = this
            if (newVal > oldVal) {
                if (newVal > this.actionBoundryList[0] && newVal <= this.actionBoundryList[1]) {
                    this.vibrateFlag = false
                    this.bounceFlag = false
                    this.pulsateFlag = false
                    this.shakeFlag = false
                    this.earthquakeFlag = false
                    this.reliefFlag = false
                    window.requestAnimationFrame(function () {
                        window.requestAnimationFrame(function () {
                            vm.vibrateFlag = true
                        })
                    })
                }
                else if (newVal > this.actionBoundryList[1] && newVal <= this.actionBoundryList[2]) {
                    this.vibrateFlag = false
                    this.bounceFlag = false
                    this.pulsateFlag = false
                    this.shakeFlag = false
                    this.earthquakeFlag = false
                    this.reliefFlag = false
                    window.requestAnimationFrame(function () {
                        window.requestAnimationFrame(function () {
                            vm.bounceFlag = true
                        })
                    })
                }
                else if (newVal > this.actionBoundryList[2] && newVal <= this.actionBoundryList[3]) {
                    this.vibrateFlag = false
                    this.bounceFlag = false
                    this.pulsateFlag = true
                    this.shakeFlag = false
                    this.earthquakeFlag = false
                    this.reliefFlag = false
                }
                else if (newVal > this.actionBoundryList[3] && newVal <= this.actionBoundryList[4]) {
                    this.vibrateFlag = false
                    this.bounceFlag = false
                    this.pulsateFlag = false
                    this.shakeFlag = true
                    this.earthquakeFlag = false
                    this.reliefFlag = false
                }
                else if (newVal > this.actionBoundryList[4]) {
                    this.pulsateFlag = false
                    this.vibrateFlag = false
                    this.bounceFlag = false
                    this.shakeFlag = false
                    this.earthquakeFlag = true
                    this.reliefFlag = false
                }
            }
            else {
                this.vibrateFlag = false
                this.bounceFlag = false
                this.pulsateFlag = false
                this.shakeFlag = false
                this.earthquakeFlag = false
                this.reliefFlag = false
                if (oldVal > this.actionBoundryList[2]) {
                    window.requestAnimationFrame(function () {
                        window.requestAnimationFrame(function () {
                            vm.reliefFlag = true
                        })
                    })
                }
            }
        }
    },

    components: {
        CardsNum
    }
})
</script>

<style scoped>
.vibrate {
    -webkit-animation: vibrate .3s linear both;
    animation: vibrate .3s linear both
}

@-webkit-keyframes vibrate {
    0% {
        -webkit-transform: translate(0);
        transform: translate(0)
    }

    20% {
        -webkit-transform: translate(-2px, 2px);
        transform: translate(-2px, 2px)
    }

    40% {
        -webkit-transform: translate(-2px, -2px);
        transform: translate(-2px, -2px)
    }

    60% {
        -webkit-transform: translate(2px, 2px);
        transform: translate(2px, 2px)
    }

    80% {
        -webkit-transform: translate(2px, -2px);
        transform: translate(2px, -2px)
    }

    100% {
        -webkit-transform: translate(0);
        transform: translate(0)
    }
}

@keyframes vibrate {
    0% {
        -webkit-transform: translate(0);
        transform: translate(0)
    }

    20% {
        -webkit-transform: translate(-2px, 2px);
        transform: translate(-2px, 2px)
    }

    40% {
        -webkit-transform: translate(-2px, -2px);
        transform: translate(-2px, -2px)
    }

    60% {
        -webkit-transform: translate(2px, 2px);
        transform: translate(2px, 2px)
    }

    80% {
        -webkit-transform: translate(2px, -2px);
        transform: translate(2px, -2px)
    }

    100% {
        -webkit-transform: translate(0);
        transform: translate(0)
    }
}

.bounce {
    -webkit-animation: bounce .9s both;
    animation: bounce .9s both
}

@-webkit-keyframes bounce {
    0% {
        -webkit-transform: translateY(-45px);
        transform: translateY(-45px);
        -webkit-animation-timing-function: ease-in;
        animation-timing-function: ease-in;
        opacity: 1
    }

    24% {
        opacity: 1
    }

    40% {
        -webkit-transform: translateY(-24px);
        transform: translateY(-24px);
        -webkit-animation-timing-function: ease-in;
        animation-timing-function: ease-in
    }

    65% {
        -webkit-transform: translateY(-12px);
        transform: translateY(-12px);
        -webkit-animation-timing-function: ease-in;
        animation-timing-function: ease-in
    }

    82% {
        -webkit-transform: translateY(-6px);
        transform: translateY(-6px);
        -webkit-animation-timing-function: ease-in;
        animation-timing-function: ease-in
    }

    93% {
        -webkit-transform: translateY(-4px);
        transform: translateY(-4px);
        -webkit-animation-timing-function: ease-in;
        animation-timing-function: ease-in
    }

    25%,
    55%,
    75%,
    87% {
        -webkit-transform: translateY(0);
        transform: translateY(0);
        -webkit-animation-timing-function: ease-out;
        animation-timing-function: ease-out
    }

    100% {
        -webkit-transform: translateY(0);
        transform: translateY(0);
        -webkit-animation-timing-function: ease-out;
        animation-timing-function: ease-out;
        opacity: 1
    }
}

@keyframes bounce {
    0% {
        -webkit-transform: translateY(-45px);
        transform: translateY(-45px);
        -webkit-animation-timing-function: ease-in;
        animation-timing-function: ease-in;
        opacity: 1
    }

    24% {
        opacity: 1
    }

    40% {
        -webkit-transform: translateY(-24px);
        transform: translateY(-24px);
        -webkit-animation-timing-function: ease-in;
        animation-timing-function: ease-in
    }

    65% {
        -webkit-transform: translateY(-12px);
        transform: translateY(-12px);
        -webkit-animation-timing-function: ease-in;
        animation-timing-function: ease-in
    }

    82% {
        -webkit-transform: translateY(-6px);
        transform: translateY(-6px);
        -webkit-animation-timing-function: ease-in;
        animation-timing-function: ease-in
    }

    93% {
        -webkit-transform: translateY(-4px);
        transform: translateY(-4px);
        -webkit-animation-timing-function: ease-in;
        animation-timing-function: ease-in
    }

    25%,
    55%,
    75%,
    87% {
        -webkit-transform: translateY(0);
        transform: translateY(0);
        -webkit-animation-timing-function: ease-out;
        animation-timing-function: ease-out
    }

    100% {
        -webkit-transform: translateY(0);
        transform: translateY(0);
        -webkit-animation-timing-function: ease-out;
        animation-timing-function: ease-out;
        opacity: 1
    }
}

.pulsate {
    -webkit-animation: pulsate .7s ease-in-out infinite both;
    animation: pulsate .7s ease-in-out infinite both
}

@-webkit-keyframes pulsate {
    from {
        -webkit-transform: scale(1);
        transform: scale(1);
        -webkit-transform-origin: center center;
        transform-origin: center center;
        -webkit-animation-timing-function: ease-out;
        animation-timing-function: ease-out
    }

    10% {
        -webkit-transform: scale(.91);
        transform: scale(.91);
        -webkit-animation-timing-function: ease-in;
        animation-timing-function: ease-in
    }

    17% {
        -webkit-transform: scale(.98);
        transform: scale(.98);
        -webkit-animation-timing-function: ease-out;
        animation-timing-function: ease-out
    }

    33% {
        -webkit-transform: scale(.87);
        transform: scale(.87);
        -webkit-animation-timing-function: ease-in;
        animation-timing-function: ease-in
    }

    45% {
        -webkit-transform: scale(1);
        transform: scale(1);
        -webkit-animation-timing-function: ease-out;
        animation-timing-function: ease-out
    }
}

@keyframes pulsate {
    from {
        -webkit-transform: scale(1);
        transform: scale(1);
        -webkit-transform-origin: center center;
        transform-origin: center center;
        -webkit-animation-timing-function: ease-out;
        animation-timing-function: ease-out
    }

    10% {
        -webkit-transform: scale(.91);
        transform: scale(.91);
        -webkit-animation-timing-function: ease-in;
        animation-timing-function: ease-in
    }

    17% {
        -webkit-transform: scale(.98);
        transform: scale(.98);
        -webkit-animation-timing-function: ease-out;
        animation-timing-function: ease-out
    }

    33% {
        -webkit-transform: scale(.87);
        transform: scale(.87);
        -webkit-animation-timing-function: ease-in;
        animation-timing-function: ease-in
    }

    45% {
        -webkit-transform: scale(1);
        transform: scale(1);
        -webkit-animation-timing-function: ease-out;
        animation-timing-function: ease-out
    }
}

.shake {
    -webkit-animation: shake .8s cubic-bezier(.455, .03, .515, .955) infinite both;
    animation: shake .8s cubic-bezier(.455, .03, .515, .955) infinite both
}

@-webkit-keyframes shake {

    0%,
    100% {
        -webkit-transform: translateY(0);
        transform: translateY(0)
    }

    10%,
    30%,
    50%,
    70% {
        -webkit-transform: translateY(-8px);
        transform: translateY(-8px)
    }

    20%,
    40%,
    60% {
        -webkit-transform: translateY(8px);
        transform: translateY(8px)
    }

    80% {
        -webkit-transform: translateY(6.4px);
        transform: translateY(6.4px)
    }

    90% {
        -webkit-transform: translateY(-6.4px);
        transform: translateY(-6.4px)
    }
}

@keyframes shake {

    0%,
    100% {
        -webkit-transform: translateY(0);
        transform: translateY(0)
    }

    10%,
    30%,
    50%,
    70% {
        -webkit-transform: translateY(-8px);
        transform: translateY(-8px)
    }

    20%,
    40%,
    60% {
        -webkit-transform: translateY(8px);
        transform: translateY(8px)
    }

    80% {
        -webkit-transform: translateY(6.4px);
        transform: translateY(6.4px)
    }

    90% {
        -webkit-transform: translateY(-6.4px);
        transform: translateY(-6.4px)
    }
}

.earthquake {
    -webkit-animation: earthquake .5s cubic-bezier(.455, .03, .515, .955) infinite both;
    animation: earthquake .6s cubic-bezier(.455, .03, .515, .955) infinite both
}

@-webkit-keyframes earthquake {

    0%,
    100% {
        -webkit-transform: translateY(0);
        transform: translateY(0)
    }

    10%,
    30%,
    50%,
    70% {
        -webkit-transform: translateY(-8px);
        transform: translateY(-8px)
    }

    20%,
    40%,
    60% {
        -webkit-transform: translateY(8px);
        transform: translateY(8px)
    }

    80% {
        -webkit-transform: translateY(6.4px);
        transform: translateY(6.4px)
    }

    90% {
        -webkit-transform: translateY(-6.4px);
        transform: translateY(-6.4px)
    }
}

@keyframes earthquake {

    0%,
    100% {
        -webkit-transform: translateY(0);
        transform: translateY(0)
    }

    10%,
    30%,
    50%,
    70% {
        -webkit-transform: translateY(-8px);
        transform: translateY(-8px)
    }

    20%,
    40%,
    60% {
        -webkit-transform: translateY(8px);
        transform: translateY(8px)
    }

    80% {
        -webkit-transform: translateY(6.4px);
        transform: translateY(6.4px)
    }

    90% {
        -webkit-transform: translateY(-6.4px);
        transform: translateY(-6.4px)
    }
}

.relief {
    -webkit-animation: relief .9s both;
    animation: relief .9s both
}

@-webkit-keyframes relief {
    0% {
        -webkit-transform: scale3d(1, 1, 1);
        transform: scale3d(1, 1, 1)
    }

    30% {
        -webkit-transform: scale3d(1.25, .75, 1);
        transform: scale3d(1.25, .75, 1)
    }

    40% {
        -webkit-transform: scale3d(.75, 1.25, 1);
        transform: scale3d(.75, 1.25, 1)
    }

    50% {
        -webkit-transform: scale3d(1.15, .85, 1);
        transform: scale3d(1.15, .85, 1)
    }

    65% {
        -webkit-transform: scale3d(.95, 1.05, 1);
        transform: scale3d(.95, 1.05, 1)
    }

    75% {
        -webkit-transform: scale3d(1.05, .95, 1);
        transform: scale3d(1.05, .95, 1)
    }

    100% {
        -webkit-transform: scale3d(1, 1, 1);
        transform: scale3d(1, 1, 1)
    }
}

@keyframes relief {
    0% {
        -webkit-transform: scale3d(1, 1, 1);
        transform: scale3d(1, 1, 1)
    }

    30% {
        -webkit-transform: scale3d(1.25, .75, 1);
        transform: scale3d(1.25, .75, 1)
    }

    40% {
        -webkit-transform: scale3d(.75, 1.25, 1);
        transform: scale3d(.75, 1.25, 1)
    }

    50% {
        -webkit-transform: scale3d(1.15, .85, 1);
        transform: scale3d(1.15, .85, 1)
    }

    65% {
        -webkit-transform: scale3d(.95, 1.05, 1);
        transform: scale3d(.95, 1.05, 1)
    }

    75% {
        -webkit-transform: scale3d(1.05, .95, 1);
        transform: scale3d(1.05, .95, 1)
    }

    100% {
        -webkit-transform: scale3d(1, 1, 1);
        transform: scale3d(1, 1, 1)
    }
}
</style>