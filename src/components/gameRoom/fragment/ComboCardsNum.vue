<template>
    <div v-if="isHorizontal" class="game-room-table-horizontal-box-middle-item">
        <p class="white-color-font" :style="{'font-size': fontSize}">连击牌数</p>
        <el-image :src="require('@/assets/images/poker/drop-cards.png')"></el-image>
        <div class="white-color-font" :style="{'font-size':fontSize}">{{gameInfo.currentCombo}}张</div>
    </div>
    <div v-else class="game-room-table-vertical-box-bottom-item">
        <div class="white-color-font" :style="{'font-size':fontSize}">连击牌数</div>
        <el-image :src="require('@/assets/images/poker/drop-cards.png')" style="max-width:8vw"></el-image>
        <div class="white-color-font" :style="{'font-size':fontSize}">{{gameInfo.currentCombo}}张</div>
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