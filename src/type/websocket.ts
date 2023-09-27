import { WebSocketChat, WebSocketChangeSeat } from '@/type/room'
import { GamePlayerSeatIndex } from '@/type/index'


/** 
 * @summary WebSocket共通响应的信息。
 * @type {object}
 * @property {number} userId - 发送请求的玩家id。
 */
interface WebSocketResponseRawData { userId: number }

/** 
 * @type {object} 
 * @property {'chat'} type - 操作类型。
 */
export interface WebSocketChatResponseJsonData extends WebSocketChat, WebSocketResponseRawData {
    type: 'chat',
}

/** 
 * @type {object} 
 * @property {'gameRoomList'} type - 操作类型。
 * @property {string[]} data - 返回的字符串数组可Json parse转换为WebSocketGameRoom。
 */
export interface WebSocketGameRoomListResponseJsonData extends WebSocketResponseRawData {
    type: 'gameRoomList',
    data: string[] // turned to be WebSocketGameRoom after Json.parse
}

/** 
 * @type {object} 
 * @property {'message'} type - 操作类型。
 * @property {number} player_loc - 玩家所在房间id
 * @property {'success' | 'info' | 'warning' | 'error'} subType - 文本类型。
 * @property {string} text - message文本。
 */
export interface WebSocketMessageResponseJsonData extends WebSocketResponseRawData {
    type: 'message',
    player_loc: number,
    subType: 'success' | 'info' | 'warning' | 'error',
    text: string,
}

/** 
 * @type {object} 
 * @property {'error' | 'system'} type - 操作类型。
 * @property {number} player_loc - 玩家所在房间id
 * @property {string} text - message文本。
 */
export interface WebSocketExceptionMessageResponseJsonData extends WebSocketResponseRawData {
    type: 'error' | 'system',
    player_loc: number,
    text: string,
}

/** 
 * @type {object} 
 * @property {'askChangeSeat'} type - 操作类型。
 * @property {WebSocketChangeSeat} data - 返回的交换座位信息。
 */
export interface WebSocketChangeSeatResponseJsonData extends WebSocketResponseRawData {
    type: 'askChangeSeat',
    data: WebSocketChangeSeat,
}

/** 
 * @type {object} 
 * @property {'playerList'} type - 操作类型。
 * @property {string[]} data - 返回的字符串数组可Json parse转换为WebSocketPlayer。
 */
export interface WebSocketPlayerListResponseJsonData extends WebSocketResponseRawData {
    type: 'playerList',
    data: string[] // turned to be WebSocketPlayer after Json.parse
}

/** @summary 所有通过WebSocket返回的数据信息的并集 */
export type WebSocketGameResponseJsonData = InitializeGameResponseJsonData | ShiftOnlineGameResponseJsonData | TextToPlayerGameResponseJsonData | DeleteGameResponseJsonData | ResultGameResponseJsonData | GetGameResponseJsonData

/** 
 * @type {object} 
 * @property {'game'} type - 操作类型。
 * @property {'initialize'} action - 对目标游戏操作的动作。
 * @property {string} data - 返回的字符串可Json parse转换为WebSocketGame。
 */
interface InitializeGameResponseJsonData extends WebSocketResponseRawData {
    type: 'game',
    action: 'initialize',
    data: string, // turned to be WebSocketGame after Json.parse
}

/** 
 * @type {object} 
 * @property {'game'} type - 操作类型。
 * @property {'shiftOnline'} action - 对目标游戏操作的动作。
 * @property {GamePlayerSeatIndex} seatIndex - 玩家的座位号。
 * @property {boolean} online - 玩家是否在线。
 */
interface ShiftOnlineGameResponseJsonData extends WebSocketResponseRawData {
    type: 'game',
    action: 'shiftOnline',
    seatIndex: GamePlayerSeatIndex,
    online: boolean,
}

/** 
 * @type {object} 
 * @property {'game'} type - 操作类型。
 * @property {'textToPlayer'} action - 对目标游戏操作的动作。
 * @property {TextToPlayerGameData} data - 返回的数据。
 */
interface TextToPlayerGameResponseJsonData extends WebSocketResponseRawData {
    type: 'game',
    action: 'textToPlayer',
    data: TextToPlayerGameData,
}

/** 
 * @type {object} 
 * @property {GamePlayerSeatIndex} target - 发送游戏内信息玩家的目标玩家座位号。textToPlayer时不为空。
 * @property {number} targetId - 发送游戏内信息目标玩家的的玩家id。textToPlayer时不为空。
 * @property {GamePlayerSeatIndex} source - 发送游戏内信息玩家的座位号。textToPlayer时不为空。
 * @property {number} sourceId - 发送游戏内信息玩家的的玩家id。textToPlayer时不为空。
 * @property {string} soundSrc - 发送游戏内信息对应的语音文件路径。textToPlayer时不为空。
 */
interface TextToPlayerGameData {
    target: GamePlayerSeatIndex,
    targetId: number,
    source: GamePlayerSeatIndex,
    sourceId: number,
    soundSrc: string
}

/** 
 * @type {object} 
 * @property {'game'} type - 操作类型。
 * @property {'delete'} action - 对目标游戏操作的动作。
 */
interface DeleteGameResponseJsonData extends WebSocketResponseRawData {
    type: 'game',
    action: 'delete',
}

/** 
 * @type {object} 
 * @property {'game'} type - 操作类型。
 * @property {'result'} action - 对目标游戏操作的动作。
 * @property {string} data - 返回的字符串可Json parse转换为WGameResult。
 */
interface ResultGameResponseJsonData extends WebSocketResponseRawData {
    type: 'game',
    action: 'result',
    data: string, // turned to be GameResult after Json.parse
}

/** 
 * @type {object} 
 * @property {'game'} type - 操作类型。
 * @property {'update' | 'get'} action - 对目标游戏操作的动作。
 * @property {string} data - 返回的字符串可Json parse转换为WebSocketGame。
 */
interface GetGameResponseJsonData extends WebSocketResponseRawData {
    type: 'game',
    action: 'update' | 'get',
    data: string, // turned to be WebSocketGame after Json.parse
}


