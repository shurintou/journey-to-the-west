
import { DbCommon } from '@/type/index'

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

/**
 * @description 玩家战绩介绍。
 * @typedef PlayerProfile
 * @type {object}
 * @property {number} id - 玩家战绩id。
 * @property {string} avatar_id - 玩家头像id。
 * @property {string} nickname - 昵称。
 */
export interface PlayerProfile {
    id: number,
    avatar_id: number,
    nickname: string,
    record: PlayerProfileRecord,
}

/**
 * @description 玩家战绩。
 * @typedef PlayerProfileRecord
 * @type {object}
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
 */
interface PlayerProfileRecord {
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
}