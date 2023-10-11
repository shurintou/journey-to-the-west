import { ElMessage } from 'element-ui/types/message'
import VueRouter from 'vue-router'
import { Store } from 'vuex'
import { SystemSetting } from '@/type/setting'
import { PlayerStatus } from '@/type/index'

/**
 * @type {object}
 * @property {number} id - 账号id。
 * @property {string} username -  用户名
 * @property {number} avatar_id - 玩家头像id
 * @property {string} nickname - 昵称
 * @property {boolean} isMobile - 是否是移动端
 * @property {number} player_loc - //0为游戏大厅，其余为游戏房间号
 * @property {PlayerStatus} player_status - //0: 空闲，1: 房间中等待，2: 游戏中
 * @property {SystemSetting} setting - 系统设置
 */
type State = {
    id: number,
    username: string,
    avatar_id: number,
    nickname: string,
    isMobile: boolean,
    player_loc: number,
    player_status: PlayerStatus,
    setting: SystemSetting,
}


declare module 'vue/types/vue' {
    interface Vue {
        $message: ElMessage,
        $router: VueRouter,
        $stock: Store<State>
    }
}

declare module '@vue/runtime-core' {
    interface ComponentCustomProperties {
        $store: Store<State>
    }
}
