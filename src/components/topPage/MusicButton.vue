<template>
    <el-row type="flex" justify="end" style="margin-bottom: 0; margin-right: 1%">
        <i v-if="$store.state.setting.playBgm" class="el-icon-video-pause" @click="turnOnOffMusic"></i>
        <i v-else class="el-icon-video-play" @click="turnOnOffMusic"></i>
    </el-row>
</template>

<script lang="ts">
import Vue from 'vue'
import { playBgm } from '@/utils/soundHandler'

export default Vue.extend({
    data() {
        return {

        }
    },

    methods: {
        turnOnOffMusic: function () {
            const setting = this.$stock.state.setting
            const flag = !setting.playBgm
            setting.playBgm = flag
            this.$stock.dispatch('mutateSetting', setting)
                .then(() => {
                    playBgm()
                })
        }
    }
})
</script>
