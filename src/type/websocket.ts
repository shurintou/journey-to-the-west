import { WebSocketChat, WebSocketChangeSeat } from '@/type/room'
import { GamePlayerSeatIndex } from '@/type/index'


/** 
 * @description WebSocket共通响应的信息。
 * @typedef WebSocketResponseRawData
 * @type {object}
 * @property {number} userId - 发送请求的玩家id。
 */
interface WebSocketResponseRawData { userId: number }

export interface WebSocketChatResponseJsonData extends WebSocketChat, WebSocketResponseRawData {
    type: 'chat',
}

export interface WebSocketGameRoomListResponseJsonData extends WebSocketResponseRawData {
    type: 'gameRoomList',
    data: string[] // turned to be WebSocketGameRoom after Json.parse
}

export interface WebSocketMessageResponseJsonData extends WebSocketResponseRawData {
    type: 'message',
    player_loc: number,
    subType: 'success' | 'info' | 'warning' | 'error',
    text: string,
}

export interface WebSocketExceptionMessageResponseJsonData extends WebSocketResponseRawData {
    type: 'error' | 'system',
    player_loc: number,
    text: string,
}

export interface WebSocketChangeSeatResponseJsonData extends WebSocketResponseRawData {
    type: 'askChangeSeat',
    data: WebSocketChangeSeat,
}

export interface WebSocketPlayerListResponseJsonData extends WebSocketResponseRawData {
    type: 'playerList',
    data: string[] // turned to be WebSocketPlayer after Json.parse
}

export type WebSocketGameResponseJsonData = InitializeGameResponseJsonData | ShiftOnlineGameResponseJsonData | TextToPlayerGameResponseJsonData | DeleteGameResponseJsonData | ResultGameResponseJsonData | GetGameResponseJsonData

interface InitializeGameResponseJsonData extends WebSocketResponseRawData {
    type: 'game',
    action: 'initialize',
    data: string, // turned to be WebSocketGame after Json.parse
}

/** 
 * @typedef ShiftOnlineGameResponseJsonData
 * @type {object} 
 * @property {GamePlayerSeatIndex} seatIndex - 玩家的座位号。
 * @property {boolean} online - 玩家是否在线。
 */
interface ShiftOnlineGameResponseJsonData extends WebSocketResponseRawData {
    type: 'game',
    action: 'shiftOnline',
    seatIndex: GamePlayerSeatIndex,
    online: boolean,
}

interface TextToPlayerGameResponseJsonData extends WebSocketResponseRawData {
    type: 'game',
    action: 'textToPlayer',
    /** 
     * @type {object} 
     * @property {GamePlayerSeatIndex} target - 发送游戏内信息玩家的目标玩家座位号。textToPlayer时不为空。
     * @property {number} targetId - 发送游戏内信息目标玩家的的玩家id。textToPlayer时不为空。
     * @property {GamePlayerSeatIndex} source - 发送游戏内信息玩家的座位号。textToPlayer时不为空。
     * @property {number} sourceId - 发送游戏内信息玩家的的玩家id。textToPlayer时不为空。
     * @property {string} soundSrc - 发送游戏内信息对应的语音文件路径。textToPlayer时不为空。
     */
    data: { target: GamePlayerSeatIndex, targetId: number, source: GamePlayerSeatIndex, sourceId: number, soundSrc: string }
}

interface DeleteGameResponseJsonData extends WebSocketResponseRawData {
    type: 'game',
    action: 'delete',
}

interface ResultGameResponseJsonData extends WebSocketResponseRawData {
    type: 'game',
    action: 'result',
    data: string, // turned to be GameResult after Json.parse
}

interface GetGameResponseJsonData extends WebSocketResponseRawData {
    type: 'game',
    action: 'update' | 'get',
    data: string, // turned to be WebSocketGame after Json.parse
}


