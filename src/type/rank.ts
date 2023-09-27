/**
 * @summary rank种类。
 * @type {'level'|'winner'|'loser'|'sum'|'combo'|'highest_rate'|'lowest_rate'|'least_cards'|'most_cards'}
 */
export type RankType = 'level' | 'winner' | 'loser' | 'sum' | 'combo' | 'highest_rate' | 'lowest_rate' | 'least_cards' | 'most_cards'

/**
 * @summary Rank response中的的rank属性值中的playerInfo属性值类型。
 * @type {object}
 * @property {number} id - 玩家id。
 * @property {number} record - 分数。
 * @property {number} rank - 排名。
 */
export interface RankPlayerInfo {
    id: number,
    record: number,
    rank: number,
}

/**
 * @summary Rank response中的的rank属性值中的rankList属性值类型。
 * @type {object}
 * @property {number} id - 玩家id。
 * @property {number} record - 分数。
 * @property {number} rank - 排名。 
 * @property {string} nickname - 昵称。
 * @property {number} avatarId - 玩家头像id。
 */
export interface RankTopPlayerInfo {
    id: number,
    record: number,
    rank: number,
    nickname: string,
    avatarId: number,
}

/**
 * @summary Rank response中的的rank属性值类型。
 * @type {object}
 * @property {RankPlayerInfo} playerInfo - 请求玩家的排名信息。
 * @property {RankTopPlayerInfo[]} rankList - 排行玩家信息列表。
 */
export interface RankInfo {
    playerInfo: RankPlayerInfo,
    rankList: RankTopPlayerInfo[],
}