import Vue from 'vue'
import { WebSocketPlayer } from '@/type/player'

export const aiPlayerMetaData : WebSocketPlayer[] = [
    { id: -1, username: '', nickname: '大力王(AI)', player_loc: 0, player_status: 1, avatar_id: 1 },
    { id: -2, username: '', nickname: '沙僧(AI)', player_loc: 0, player_status: 1, avatar_id: 2 },
    { id: -3, username: '', nickname: '白龙马(AI)', player_loc: 0, player_status: 1, avatar_id: 3 },
    { id: -4, username: '', nickname: '猪八戒(AI)', player_loc: 0, player_status: 1, avatar_id: 4 },
    { id: -5, username: '', nickname: '弼马温(AI)', player_loc: 0, player_status: 1, avatar_id: 5 },
    { id: -6, username: '', nickname: '唐玄奘(AI)', player_loc: 0, player_status: 1, avatar_id: 6 },
    { id: -7, username: '', nickname: '二郎神(AI)', player_loc: 0, player_status: 1, avatar_id: 7 },
    { id: -8, username: '', nickname: '唐僧(AI)', player_loc: 0, player_status: 1, avatar_id: 8 },
    { id: -9, username: '', nickname: '金身罗汉(AI)', player_loc: 0, player_status: 1, avatar_id: 9 },
    { id: -10, username: '', nickname: '行者(AI)', player_loc: 0, player_status: 1, avatar_id: 10 },
    { id: -11, username: '', nickname: '斗战胜佛(AI)', player_loc: 0, player_status: 1, avatar_id: 11 },
    { id: -12, username: '', nickname: '六耳猕猴(AI)', player_loc: 0, player_status: 1, avatar_id: 12 },
    { id: -13, username: '', nickname: '沙和尚(AI)', player_loc: 0, player_status: 1, avatar_id: 13 },
    { id: -14, username: '', nickname: '月老(AI)', player_loc: 0, player_status: 1, avatar_id: 14 },
    { id: -15, username: '', nickname: '龙王(AI)', player_loc: 0, player_status: 1, avatar_id: 15 },
    { id: -16, username: '', nickname: '观音(AI)', player_loc: 0, player_status: 1, avatar_id: 16 },
    { id: -17, username: '', nickname: '美猴王(AI)', player_loc: 0, player_status: 1, avatar_id: 17 },
    { id: -18, username: '', nickname: '如来(AI)', player_loc: 0, player_status: 1, avatar_id: 18 },
    { id: -19, username: '', nickname: '天蓬元帅(AI)', player_loc: 0, player_status: 1, avatar_id: 19 },
    { id: -20, username: '', nickname: '玄奘(AI)', player_loc: 0, player_status: 1, avatar_id: 20 },
    { id: -21, username: '', nickname: '持国天王(AI)', player_loc: 0, player_status: 1, avatar_id: 21 },
    { id: -22, username: '', nickname: '白虎精(AI)', player_loc: 0, player_status: 1, avatar_id: 22 },
    { id: -23, username: '', nickname: '土地(AI)', player_loc: 0, player_status: 1, avatar_id: 23 },
    { id: -24, username: '', nickname: '太上老君(AI)', player_loc: 0, player_status: 1, avatar_id: 24 },
    { id: -25, username: '', nickname: '玉皇大帝(AI)', player_loc: 0, player_status: 1, avatar_id: 25 },
    { id: -26, username: '', nickname: '哪吒(AI)', player_loc: 0, player_status: 1, avatar_id: 26 },
    { id: -27, username: '', nickname: '猪妖(AI)', player_loc: 0, player_status: 1, avatar_id: 27 },
    { id: -28, username: '', nickname: '托塔天王(AI)', player_loc: 0, player_status: 1, avatar_id: 28 },
    { id: -29, username: '', nickname: '齐天大圣(AI)', player_loc: 0, player_status: 1, avatar_id: 29 },
    { id: -30, username: '', nickname: '唐三藏(AI)', player_loc: 0, player_status: 1, avatar_id: 30 },
    { id: -31, username: '', nickname: '铁扇公主(AI)', player_loc: 0, player_status: 1, avatar_id: 31 },
    { id: -32, username: '', nickname: '牛魔王(AI)', player_loc: 0, player_status: 1, avatar_id: 32 },
    { id: -33, username: '', nickname: '紫霞仙子(AI)', player_loc: 0, player_status: 1, avatar_id: 33 },
    { id: -34, username: '', nickname: '瞎子(AI)', player_loc: 0, player_status: 1, avatar_id: 34 },
    { id: -35, username: '', nickname: '至尊宝(AI)', player_loc: 0, player_status: 1, avatar_id: 35 },
]

export const aiPlayer = Vue.extend({
    data: function () {
        return {
            aiPlayerList: aiPlayerMetaData,
            currentAiPlayerIndexList: [] as number[],
        }
    },

})