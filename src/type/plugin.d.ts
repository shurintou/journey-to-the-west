import { ElMessage } from 'element-ui/types/message'
import VueRouter from 'vue-router'
import { Store } from 'vuex'
import { SystemSetting } from '@/type/setting'
import { PlayerStatus } from '@/type/index'

type State = {
    id: number,
    username: string,
    avatar_id: number,
    nickname: string,
    isMobile: boolean,
    player_loc: number,  //0为游戏大厅，其余为游戏房间号
    player_status: PlayerStatus, //0空闲1等待2忙碌
    setting: SystemSetting,
}

/** 
 * @see https://github.com/vuejs/vuex/issues/994#issuecomment-604897329
 * 因为直接通过this.$store获取不到类型提示，所以使用这个workaround：以$stock代替$store
 *  */
Object.defineProperty(Vue.prototype, "$stock", {
    get(): Store<State> {
        return this.$store
    }
})

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
