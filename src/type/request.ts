import { Account, Player } from '@/type/player'
import { GameResult } from '@/type/game'
import { PlayerRecord } from '@/type/record'
import { RankInfo, RankType } from '@/type/rank'

/** 
 * @summary ajax返回数据的共通属性。
 * @type {object}
 * @property {number} code 状态码。
 * @property {string} message 响应信息。
 */
export interface ResponseDataCommon {
    code: number,
    message: string,
}

/** 
 * @type {object}
 * @property {Account} account。
 */
export interface AuthorizationResponse extends ResponseDataCommon {
    account: Account,
}

/** 
 * @type {object}
 * @property {Account} account。
 */
export interface LoginResponse extends ResponseDataCommon {
    account: Account,
}

/** 
 * @type {object}
 * @property {PlayerRecord} record
 */
export interface PlayerRecordResponse extends ResponseDataCommon {
    record: PlayerRecord
}

/** 
 * @type {object}
 * @property {number} pageNum
 * @property {Player[]} list
 */
export interface GameRecordsListResponse extends ResponseDataCommon {
    pageNum: number,
    list: Player[],
}

/** 
 * @type {object}
 * @property {GameResult} gameResult
 */
export interface GameRecordResponse extends ResponseDataCommon {
    gameResult: GameResult,
}

/** 
 * @type {object}
 * @property {RankType} type
 * @property {RankInfo} rank
 */
export interface RankResponse extends ResponseDataCommon {
    type: RankType,
    rank: RankInfo,
}