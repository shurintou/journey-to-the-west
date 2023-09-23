import { ElMessage } from 'element-ui/types/message'
import VueRouter from 'vue-router'
import { Store } from 'vuex'
import { SystemSetting } from './setting'


declare module 'vue/types/vue' {
    interface Vue {
        $message: ElMessage,
        $router: VueRouter,
    }
}

declare module '@vue/runtime-core' {
    interface State {
        id: number,
        username: string,
        avatar_id: number,
        nickname: string,
        isMobile: boolean,
        player_loc: number,  //0为游戏大厅，其余为游戏房间号
        player_status: 0 | 1 | 2, //0空闲1等待2忙碌
        setting: SystemSetting,
    }

    interface ComponentCustomProperties {
        $store: Store<State>
    }
}