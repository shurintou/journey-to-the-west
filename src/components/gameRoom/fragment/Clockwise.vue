<template>
    <div v-if="isHorizontal" class="game-room-table-horizontal-box-middle-item">
        <p class="white-color-font" :style="{ 'font-size': fontSize }">出牌顺序</p>
        <el-image v-if="gameInfo.clockwise" :src="require('@/assets/images/clockwise.png')" style="max-width:4vw"
            class="clockwise-rotate"></el-image>
        <el-image v-else :src="require('@/assets/images/anti-clockwise.png')" style="max-width:4vw"
            class="anti-clockwise-rotate"></el-image>
        <div class="white-color-font" :style="{ 'font-size': fontSize }">{{ gameInfo.clockwise ? '顺时针' : '逆时针' }}</div>
    </div>
    <div v-else class="game-room-table-vertical-box-bottom-item">
        <div class="white-color-font" :style="{ 'font-size': fontSize }">出牌顺序</div>
        <el-image v-if="gameInfo.clockwise" :src="require('@/assets/images/clockwise.png')" style="max-width:4vw"
            class="clockwise-rotate"></el-image>
        <el-image v-else :src="require('@/assets/images/anti-clockwise.png')" style="max-width:4vw"
            class="anti-clockwise-rotate"></el-image>
        <div class="white-color-font" :style="{ 'font-size': fontSize }">{{ gameInfo.clockwise ? '顺时针' : '逆时针' }}</div>
    </div>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue'
import { WebSocketGame } from '@/type/game'

export default Vue.extend({
    data() {
        return {

        }
    },

    props: {
        gameInfo: { type: Object as PropType<WebSocketGame>, default: null },
        fontSize: { type: String, default: '' },
        isHorizontal: { type: Boolean, default: false },
    },
})
</script>

<style scoped>
.clockwise-rotate {
    -webkit-animation: clockwiseRotate 10s linear infinite;
    animation: clockwiseRotate 10s linear infinite;
}

.anti-clockwise-rotate {
    -webkit-animation: antiClockwiseRotate 10s linear infinite;
    animation: antiClockwiseRotate 10s linear infinite;
}

@-webkit-keyframes clockwiseRotate {
    0% {
        -webkit-transform: rotate(0deg);
    }

    50% {
        -webkit-transform: rotate(180deg);
    }

    100% {
        -webkit-transform: rotate(360deg);
    }
}

@keyframes clockwiseRotate {
    0% {
        -webkit-transform: rotate(0deg);
    }

    50% {
        -webkit-transform: rotate(180deg);
    }

    100% {
        -webkit-transform: rotate(360deg);
    }
}

@-webkit-keyframes antiClockwiseRotate {
    0% {
        -webkit-transform: rotate(0deg);
    }

    50% {
        -webkit-transform: rotate(-180deg);
    }

    100% {
        -webkit-transform: rotate(-360deg);
    }
}

@keyframes antiClockwiseRotate {
    0% {
        -webkit-transform: rotate(0deg);
    }

    50% {
        -webkit-transform: rotate(-180deg);
    }

    100% {
        -webkit-transform: rotate(-360deg);
    }
}
</style>