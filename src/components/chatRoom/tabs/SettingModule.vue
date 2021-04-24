<template>
    <div>
        <div class="setting_item">
            <div>
                <span :style="{'font-size': fontSize}">背景音乐</span>
                <el-switch style="float: right" v-model="backgroundMusic" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
            </div>
        </div>
        <div class="setting_item">
            <div>
                <span :style="{'font-size': fontSize}">游戏音效</span>
                <el-switch style="float: right" v-model="soundEffect" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
            </div>
        </div>
    </div>
</template>

<script>
import { playBgm } from '../../../utils/soundHandler'

export default {
    data() {
        return{
        }
    },

    props:{
        fontSize: {type: String, default: ''},
    },

    computed: {
        backgroundMusic: {
            get () {
                return this.$store.state.setting.playBgm
            },
            set (value) {
                let setting = this.$store.state.setting
                setting.playBgm = value
                this.$store.dispatch('mutateSetting', setting)
                .then( () => {
                    playBgm()
                })
            }
        },

        soundEffect: {
            get () {
                return this.$store.state.setting.playSound
            },
            set (value) {
                let setting = this.$store.state.setting
                setting.playSound = value
                this.$store.dispatch('mutateSetting', setting)
            }
        },
    },
}
</script>

<style scoped>

.setting_item{
    margin-bottom: 5%;
    height: 15%;
}

.setting_item :hover{
    background-color: rgb(244, 244, 245);
}

</style>