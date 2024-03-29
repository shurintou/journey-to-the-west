/** 玩家座位号 */
export type GamePlayerSeatIndex = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7

/**
 * @summary 共通列名
 * @type {object}
 * @property {string} createdAt - 创建时间
 * @property {string} updatedAt - 更新时间
 */
export interface DbCommon {
    createdAt: string,
    updatedAt: string,
}

/** @summary 0: 空闲，1: 房间中等待，2: 游戏中 */
export type PlayerStatus = 0 | 1 | 2 