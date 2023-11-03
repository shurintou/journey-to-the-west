<template>
    <div>
        <div class="setting_item">
            <div>
                <span :style="{ 'font-size': fontSize }">背景音乐</span>
                <el-switch style="float: right" v-model="backgroundMusic" active-color="#13ce66"
                    inactive-color="#ff4949"></el-switch>
            </div>
        </div>
        <div class="setting_item" v-if="!isIphoneOrIpad">
            <span :style="{ 'font-size': fontSize }" style="line-height: 40px">音乐音量</span>
            <el-slider style="width: 70%; float: right;" v-model="bgmVolume" :disabled="!backgroundMusic"
                :show-tooltip="false"></el-slider>
        </div>
        <div class="setting_item">
            <div>
                <span :style="{ 'font-size': fontSize }">游戏音效</span>
                <el-switch style="float: right" v-model="soundEffect" active-color="#13ce66"
                    inactive-color="#ff4949"></el-switch>
            </div>
        </div>
        <div class="setting_item" v-if="!isIphoneOrIpad">
            <span :style="{ 'font-size': fontSize }" style="line-height: 40px">音效音量</span>
            <el-slider style="width: 70%; float: right;" v-model="soundVolume" :disabled="!soundEffect"
                :show-tooltip="false"></el-slider>
        </div>
        <div class="setting_item">
            <div>
                <span :style="{ 'font-size': fontSize }">出牌提示声</span>
                <el-switch style="float: right" v-model="youTurnVoice" active-color="#13ce66" inactive-color="#ff4949"
                    :disabled="!soundEffect"></el-switch>
            </div>
        </div>
        <div class="setting_item">
            <div>
                <span :style="{ 'font-size': fontSize }" style="line-height: 40px">快速发言</span>
                <el-select :multiple-limit="10" value-key="id" v-model="quickChat" multiple collapse-tags
                    style="float: right" placeholder="请选择">
                    <el-option-group v-for="group in messageGroups" :key="group.label" :label="group.label">
                        <el-option v-for="item in group.options" :key="item.id" :label="item.text"
                            :value="item"></el-option>
                    </el-option-group>
                </el-select>
            </div>
        </div>
        <div class="setting_item">
            <div>
                <span :style="{ 'font-size': fontSize }">变身牌边框</span>
                <el-switch style="float: right" v-model="bianshenSwitch" active-color="#13ce66"
                    inactive-color="#ff4949"></el-switch>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { TextToPlayer } from '@/type/setting'
import { playBgm, modifyBgmVolume, modifySoundVolume } from '@/utils/soundHandler'

export default Vue.extend({
    data() {
        return {
            messageGroups: [
                {
                    label: '调侃',
                    options:
                        [
                            { id: 1, music: "1", text: "你的牌打得太好了" },
                            { id: 2, music: "2", text: "我等得花儿都谢了" },
                            { id: 3, music: "3", text: "合作愉快" },
                            { id: 4, music: "4", text: "都别走，大战到天亮" }
                        ]
                },
                {
                    label: '求助',
                    options:
                        [
                            { id: 5, music: "5", text: "小小小" },
                            { id: 6, music: "6", text: "大大大" },
                            { id: 7, music: "7", text: "求师傅" },
                            { id: 8, music: "8", text: "求拉满" },
                            { id: 9, music: "9", text: "求转向" }
                        ]
                },
                {
                    label: '收牌',
                    options:
                        [
                            { id: 10, music: "10", text: "收" },
                            { id: 11, music: "11", text: "我太难了" },
                            { id: 12, music: "12", text: "我人没了" },
                            { id: 13, music: "13", text: "战略性收牌" }
                        ]
                },
                {
                    label: '方言',
                    options:
                        [
                            { id: 14, music: "14", text: "洗" },
                            { id: 15, music: "15", text: "所所所" },
                            { id: 16, music: "16", text: "卷卷卷" },
                            { id: 17, music: "17", text: "小小小(桂)" },
                            { id: 18, music: "18", text: "大大大(桂)" },
                            { id: 19, music: "19", text: "我霉了" },
                            { id: 20, music: "20", text: "牛掰" },
                            { id: 21, music: "21", text: "瘾" },
                            { id: 22, music: "22", text: "我好方啊" },
                            { id: 23, music: "23", text: "来啊" },
                        ]
                }
            ]
        }
    },

    props: {
        fontSize: { type: String, default: '' },
    },

    computed: {
        isIphoneOrIpad: function () {
            const u = navigator.userAgent
            return u.indexOf('iPhone') > -1 || u.indexOf('iPad') > -1
        },

        backgroundMusic: {
            get(): boolean {
                return this.$stock.state.setting.playBgm
            },
            set(value: boolean): void {
                const setting = this.$stock.state.setting
                setting.playBgm = value
                this.$stock.dispatch('mutateSetting', setting)
                    .then(() => {
                        playBgm()
                    })
            }
        },

        soundEffect: {
            get(): boolean {
                return this.$stock.state.setting.playSound
            },
            set(value: boolean): void {
                const setting = this.$stock.state.setting
                setting.playSound = value
                if (value === false) {
                    setting.youTurnVoice = value
                }
                this.$stock.dispatch('mutateSetting', setting)
            }
        },

        bgmVolume: {
            get(): number {
                return this.$stock.state.setting.bgmVolume
            },
            set(value: number): void {
                const setting = this.$stock.state.setting
                setting.bgmVolume = value
                this.$stock.dispatch('mutateSetting', setting)
                    .then(() => {
                        modifyBgmVolume(parseFloat((value / 100).toFixed(1)))
                    })
            }
        },

        soundVolume: {
            get(): number {
                return this.$stock.state.setting.soundVolume
            },
            set(value: number): void {
                const setting = this.$stock.state.setting
                setting.soundVolume = value
                this.$stock.dispatch('mutateSetting', setting)
                    .then(() => {
                        modifySoundVolume(parseFloat((value / 100).toFixed(1)))
                    })
            }
        },

        youTurnVoice: {
            get(): boolean {
                return this.$stock.state.setting.youTurnVoice
            },
            set(value: boolean): void {
                const setting = this.$stock.state.setting
                setting.youTurnVoice = value
                this.$stock.dispatch('mutateSetting', setting)
            }
        },

        quickChat: {
            get(): TextToPlayer[] {
                return this.$stock.state.setting.textToPlayer
            },
            set(value: TextToPlayer[]): void {
                const setting = this.$stock.state.setting
                setting.textToPlayer = value
                this.$stock.dispatch('mutateSetting', setting)
            }
        },

        bianshenSwitch: {
            get(): boolean {
                return this.$stock.state.setting.bianshenBorder
            },
            set(value: boolean): void {
                const setting = this.$stock.state.setting
                setting.bianshenBorder = value
                this.$stock.dispatch('mutateSetting', setting)
            }
        },
    },
})
</script>

<style scoped>
.setting_item {
    margin-bottom: 5%;
    height: 15%;
}
</style>