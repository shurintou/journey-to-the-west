<template>
    <div>
        <div class="setting_item">
            <div>
                <span :style="{'font-size': fontSize}">背景音乐</span>
                <el-switch style="float: right" v-model="backgroundMusic" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
            </div>
        </div>
        <div class="setting_item" v-if="!isIphoneOrIpad">
            <span :style="{'font-size': fontSize}" style="line-height: 40px">音乐音量</span>
            <el-slider style="width: 70%; float: right;" v-model="bgmVolume " :disabled="!backgroundMusic" :show-tooltip="false"></el-slider>
        </div>
        <div class="setting_item">
            <div>
                <span :style="{'font-size': fontSize}">游戏音效</span>
                <el-switch style="float: right" v-model="soundEffect" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
            </div>
        </div>
        <div class="setting_item" v-if="!isIphoneOrIpad">
            <span :style="{'font-size': fontSize}" style="line-height: 40px">音效音量</span>
            <el-slider style="width: 70%; float: right;" v-model="soundVolume" :disabled="!soundEffect" :show-tooltip="false"></el-slider>
        </div>
        <div class="setting_item">
            <div>
                <span :style="{'font-size': fontSize}" style="line-height: 40px">快速发言</span>
                <el-select :multiple-limit="10" v-model="quickChat" multiple collapse-tags style="float: right" placeholder="请选择">
                    <el-option-group v-for="group in messageGroups" :key="group.label" :label="group.label">
                        <el-option v-for="item in group.options" :key="item" :label="item" :value="item"></el-option>
                    </el-option-group>
                </el-select>
            </div>
        </div>
    </div>
</template>

<script>
import { playBgm, modifyBgmVolume, modifySoundVolume } from '../../../utils/soundHandler'

export default {
    data() {
        return{
            messageGroups: [ 
                {
                    label: '调侃',
                    options: ["你的牌打得太好了", "我等得花儿都谢了", "合作愉快", "都别走，大战到天亮"]
                },
                {
                    label: '求助',
                    options: ["小小小", "大大大", "求师傅", "求拉满", "求转向"]
                },
                {
                    label: '收牌',
                    options: ["收", "我太难了", "我人没了", "战略性收牌"]
                },
                {
                    label: '方言',
                    options: ["洗", "所所所", "卷卷卷", "我霉了", "牛掰"]
                }
            ]
        }
    },

    props:{
        fontSize: {type: String, default: ''},
    },

    computed: {
        isIphoneOrIpad: function(){
            let u = navigator.userAgent
            return u.indexOf('iPhone') > -1 || u.indexOf('iPad') > -1
        },

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

        bgmVolume : {
            get () {
                return this.$store.state.setting.bgmVolume 
            },
            set (value) {
                let setting = this.$store.state.setting
                setting.bgmVolume  = value
                this.$store.dispatch('mutateSetting', setting)
                .then( () => {
                    modifyBgmVolume ((value / 100).toFixed(1))
                })
            }
        },

        soundVolume : {
            get () {
                return this.$store.state.setting.soundVolume 
            },
            set (value) {
                let setting = this.$store.state.setting
                setting.soundVolume  = value
                this.$store.dispatch('mutateSetting', setting)
                .then( () => {
                    modifySoundVolume ((value / 100).toFixed(1))
                })
            }
        },

        quickChat: {
            get () {
                return this.$store.state.setting.textToPlayer 
            },
            set (value) {
                let setting = this.$store.state.setting
                setting.textToPlayer  = value
                this.$store.dispatch('mutateSetting', setting)
            }
        }
    },
}
</script>

<style scoped>

.setting_item{
    margin-bottom: 5%;
    height: 15%;
}

</style>