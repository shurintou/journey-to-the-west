import { GamePlayerSeatIndex, DbCommon } from '@/type/index'
import { PlayerStatus } from '@/type/index'

/**
 * @summary authorization返回的数据类型，不包括password和DbCommon中的属性。
 * @type {object}
 * @property {number} id - 账号id。主key。
 * @property {string} username -  用户名
 * @property {string} nickname - 昵称
 * @property {number} avatar_id - 玩家头像id
 */
export interface Account {
    id: number,
    username: string,
    avatar_id: number,
    nickname: string
}

/**
 * @summary WebSocket传来的玩家信息。对应key:player。
 * @type {object}
 * @property {number} id - 玩家id
 * @property {string} username -  玩家用户名
 * @property {string} nickname - 昵称
 * @property {number} player_loc - 玩家所在房间id
 * @property {PlayerStatus} player_status - 玩家状态. 0:空闲，1: 游戏房间等待中, 2: 游戏中
 * @property {number} avatar_id - 玩家头像id
 */
export interface WebSocketPlayer {
    id: number,
    username: string,
    nickname: string,
    player_loc: number,
    player_status: PlayerStatus,
    avatar_id: number,
}


/**
 * @summary 数据库中的游戏中玩家信息。对应table:players。
 * @type {object}
 * @property {number} id - 游戏中玩家id。主key。
 * @property {string} nickname - 昵称。
 * @property {string} avatar_id - 玩家头像id。
 * @property {GamePlayerSeatIndex} seat_index - 座位id，下标0-7。
 * @property {number} cards - 收牌数。
 * @property {number} max_combo - 一次获得最多的牌数。
 * @property {number} wukong - 使用悟空数。
 * @property {number} bajie - 使用八戒数。
 * @property {number} shaseng - 使用沙僧数。
 * @property {number} tangseng - 使用师傅数。
 * @property {number} bianshen - 使用变身牌数。
 * @property {number} joker - 使用如来、观音牌数。
 * @property {number} accountId - 玩家账号id。外键，对应table:accounts。
 * @property {number} gameId - 游戏id。外键，对应table:games。
 */
export interface Player extends DbCommon {
    id: number,
    nickname: string,
    avatar_id: number,
    seat_index: GamePlayerSeatIndex,
    cards: number,
    max_combo: number,
    wukong: number,
    bajie: number,
    shaseng: number,
    tangseng: number
    joker: number,
    bianshen: number,
    accountId: number,
    gameId: number,
}