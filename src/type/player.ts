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