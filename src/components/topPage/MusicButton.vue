<template>
    <el-row type="flex" justify="end" style="margin-bottom: 0; margin-right: 1%">
        <i v-if="$store.state.setting.playBgm" class="el-icon-video-pause" @click="turnOnOffMusic"></i>
        <i v-else class="el-icon-video-play" @click="turnOnOffMusic"></i>
    </el-row>
</template>

<script>
import { playBgm } from '../../utils/soundHandler'

export default {
    data() {
        return{

        }
    },

    methods:{
        turnOnOffMusic: function(){
            let setting = this.$store.state.setting
            let flag = !setting.playBgm
            setting.playBgm = flag
            this.$store.dispatch('mutateSetting', setting)
            .then( () => {
                playBgm()
            })
        }
    }
}
</script>
