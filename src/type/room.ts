import { GamePlayerSeatIndex } from '@/type/index'

export interface ChatTextInfo {
    id: number,
    name: string,
    type: 'success' | 'info' | 'warning' | 'error',
    text: string,
}

/** 玩家在游戏房间中方信息时会在头上显示的信息。 */
export interface PlayerLocRomTypeChatMessageObject {
    id: number,
    nickname: string,
    text: string,
}

/** 
 * @description 游戏房间聊天的websocket请求信息。
 * @typedef WebSocketChat
 * @type {object} 
 * @property {string} nickname - 发送信息玩家昵称。
 * @property {string} text - 聊天信息。
 * @property {number} player_loc - 目标房间id。
 */
export interface WebSocketChat {
    nickname: string,
    text: string,
    player_loc: number,
}

export interface EnterRoomDto {
    id: number,
    seatIndex: GamePlayerSeatIndex,
}