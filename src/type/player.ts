import { GamePlayerSeatIndex, DbCommon } from '@/type/index'

/**
 * @description WebSocket传来的玩家信息。对应key:player。
 * @typedef WebSocketPlayer
 * @type {object}
 * @property {number} id - 玩家id
 * @property {string} username -  玩家用户名
 * @property {string} nickname - 昵称
 * @property {number} player_loc - 玩家所在房间id
 * @property {1|2} player_status - 玩家状态. 1: 空闲, 2: 游戏中
 * @property {number} avatar_id - 玩家头像id
 */
export interface WebSocketPlayer {
    id: number,
    username: string,
    nickname: string,
    player_loc: number,
    player_status: 0 | 1 | 2,
    avatar_id: number,
}


/**
 * @description 数据库中的游戏中玩家信息。对应table:players。
 * @typedef Player
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
    avatar_id: string,
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

/**
 * @description 玩家战绩信息。对应key:playerRecord
 * @typedef PlayerRecord
 * @type {object}
 * @property {number} id - 玩家战绩id。主key。
 * @property {number} num_of_game -  玩家总局数 
 * @property {number} most_game - 拉跨局数
 * @property {number} least_game - 吃鸡局数
 * @property {number} experience - 经验值
 * @property {number} experienced_cards - 总收牌数
 * @property {number} max_card - 最多收牌比时的收牌数
 * @property {number} max_card_amount - 最多收牌比时该局玩家平均收牌数
 * @property {number} min_card - 最少收牌比时的收牌数
 * @property {number} min_card_amount - 最少收牌比时该局玩家平均收牌数
 * @property {number} max_combo - 一次获得最多的牌数
 * @property {number} least_cards - 一局获得最少的牌数
 * @property {number} most_cards - 一局获得最多的牌数
 * @property {number} accountId - 玩家id。外键，对应table:accounts。
 */
export interface PlayerRecord extends DbCommon {
    id: number,
    num_of_game: number,
    most_game: number,
    least_game: number,
    experience: number,
    experienced_cards: number,
    max_card: number,
    max_card_amount: number,
    min_card: number,
    min_card_amount: number,
    max_combo: number,
    least_cards: number,
    most_cards: number,
    accountId: number,
}