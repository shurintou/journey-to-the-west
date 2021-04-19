<template>
    <div v-if="isHorizontal" style="margin-left: 10%;" class="game-room-table-horizontal-box-middle-item">
        <p class="white-color-font" :style="{'font-size': fontSize}">剩余牌数</p>
        <el-image :src="require('@/assets/images/poker/poker-pool.png')" style="max-width:3vw"></el-image>
        <div class="white-color-font" :style="{'font-size':fontSize}">{{gameInfo.remainCards}}张</div>
    </div>
    <div v-else class="game-room-table-vertical-box-bottom-item">
        <div class="white-color-font" :style="{'font-size':fontSize}">剩余牌数</div>
        <el-image :src="require('@/assets/images/poker/poker-pool.png')" style="max-width:3vw"></el-image>
        <div class="white-color-font" :style="{'font-size':fontSize}">{{gameInfo.remainCards}}张</div>
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