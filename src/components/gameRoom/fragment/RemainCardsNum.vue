<template>
    <div v-if="isHorizontal" style="margin-left: 10%;" class="game-room-table-horizontal-box-middle-item">
        <transition leave-active-class="scale-out-top">
            <p v-show="gameInfo.remainCards > 0" class="white-color-font" :style="{'font-size': fontSize}">剩余牌数</p>
        </transition>
        <transition leave-active-class="scale-out-top">
            <el-image v-show="gameInfo.remainCards > 0" :src="require('@/assets/images/poker/poker-pool.png')" style="max-width:3vw"></el-image>
        </transition>
        <div class="white-color-font" :style="{'font-size':fontSize, 'color': gameInfo.remainCards > 0 && gameInfo.remainCards < 10 ? 'red' : 'white'}">{{gameInfo.remainCards > 0 ? gameInfo.remainCards + ' 张' : '已发完'}}</div>
    </div>
    <div v-else class="game-room-table-vertical-box-bottom-item">
        <transition leave-active-class="scale-out-top">
            <div v-show="gameInfo.remainCards > 0" class="white-color-font" :style="{'font-size':fontSize}">剩余牌数</div>
        </transition>
        <transition leave-active-class="scale-out-top">
            <el-image v-show="gameInfo.remainCards > 0" :src="require('@/assets/images/poker/poker-pool.png')" style="max-width:3vw"></el-image>
        </transition>
        <div class="white-color-font" :style="{'font-size':fontSize, 'color': gameInfo.remainCards > 0 && gameInfo.remainCards < 10 ? 'red' : 'white'}">{{gameInfo.remainCards > 0 ? gameInfo.remainCards + ' 张' : '已发完'}}</div>
    </div>
</template>

<script>
export default {
    data() {
        return{

        }
    },

    props:{
        gameInfo: { type: Object, default: null },
        fontSize: { type: String, default: ''},
        isHorizontal: { type: Boolean, default: false},
    },
}
</script>

<style scoped>
.scale-out-top{-webkit-animation:scale-out-top .5s cubic-bezier(.55,.085,.68,.53) both;animation:scale-out-top .5s cubic-bezier(.55,.085,.68,.53) both}
@-webkit-keyframes scale-out-top{0%{-webkit-transform:scale(1);transform:scale(1);-webkit-transform-origin:50% 0;transform-origin:50% 0;opacity:1}100%{-webkit-transform:scale(0);transform:scale(0);-webkit-transform-origin:50% 0;transform-origin:50% 0;opacity:1}}@keyframes scale-out-top{0%{-webkit-transform:scale(1);transform:scale(1);-webkit-transform-origin:50% 0;transform-origin:50% 0;opacity:1}100%{-webkit-transform:scale(0);transform:scale(0);-webkit-transform-origin:50% 0;transform-origin:50% 0;opacity:1}}
</style>