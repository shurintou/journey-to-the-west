<template>
    <el-row class="high-light" :class="{ 'award-background': rank < 4 }" type="flex" align="middle" justify="center">
        <el-col :span="1">
            <span v-show="false"></span>
        </el-col>
        <el-col :span="3">
            <el-avatar v-if="rank < 4" shape="square" :fit="'cover'" :src="getRankImg"></el-avatar>
            <span v-else :style="{ 'font-size': fontSize, 'color': rank < 4 ? 'white' : 'black' }"
                style="font-weight: 700;">第{{ rank }}名</span>
        </el-col>
        <el-col :span="3">
            <el-avatar shape="square" :fit="'cover'" :src="getAvatarUrl(avatarId)"></el-avatar>
        </el-col>
        <el-col :span="1">
            <span v-show="false"></span>
        </el-col>
        <el-col :span="12">
            <el-tag :style="{ 'font-size': fontSize }" :type="tagDesign.type" :effect="tagDesign.effect">{{ nickname
            }}</el-tag>
        </el-col>
        <el-col :span="4">
            <span :style="{ 'font-size': fontSize, 'color': rank < 4 ? 'white' : 'black' }"
                style="font-weight: 700; color: white">{{ record }}</span>
        </el-col>
    </el-row>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
    data() {
        return {

        }
    },

    props: {
        fontSize: { type: String, default: '' },
        avatarId: { type: Number, default: 0 },
        nickname: { type: String, default: '' },
        rank: { type: Number, default: 0 },
        record: { type: String, default: '' },
    },

    computed: {
        getRankImg: function () {
            if (this.rank === 1) {
                return require('@/assets/images/gold.png')
            }
            else if (this.rank === 2) {
                return require('@/assets/images/silver.png')
            }
            else if (this.rank === 3) {
                return require('@/assets/images/bronze.png')
            }
            else {
                return require('@/assets/images/award.png')
            }
        },

        tagDesign: function () {
            if (this.rank === 1) {
                return { type: 'warning', effect: 'dark' }
            }
            else if (this.rank === 2) {
                return { type: 'info', effect: 'dark' }
            }
            else if (this.rank === 3) {
                return { type: 'warning', effect: 'light' }
            }
            else {
                return { type: 'info', effect: 'plain' }
            }
        }
    },

    methods: {
        getAvatarUrl: function (avatarId) {
            return require("@/assets/images/avatar/avatar_" + avatarId + "-min.png")
        },
    },
})
</script>

<style scoped>
.award-background {
    background-image: url('@/assets/images/popupBackground.png');
}

.high-light {
    border-radius: 5px;
    background-color: rgb(244, 244, 245);
    margin-bottom: 1%;
}

.high-light:hover {
    filter: brightness(120%);
}
</style>