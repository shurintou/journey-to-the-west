/** @typedef {0|1|2|3|4|5|6|7} GamePlayerSeatIndex */
export type GamePlayerSeatIndex = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7

/**
 * @description 共通列名
 * @typedef DbCommon
 * @type {object}
 * @property {string} createdAt - 创建时间
 * @property {string} updatedAt - 更新时间
 */
export interface DbCommon {
    createdAt: string,
    updatedAt: string,
}