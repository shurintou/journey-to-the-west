import { GamePlayerSeatIndex } from '@/type/index'
import { Player } from '@/type/player'

/**
 * @summary WebSocket传来的在游戏中的玩家信息。对应key:game
 * @type {object}
 * @property {number} id - 玩家id。
 * @property {string} nickname - 昵称。
 * @property {string} avatar_id - 玩家头像id。
 * @property {number} cards - 收牌数。
 * @property {number[]} remainCards - 玩家手中余留牌的序号。
 * @property {number} maxCombo - 一次获得最多的牌数。
 * @property {boolean} online - 玩家是否托管。
 * @property {number} offLineTime - 玩家断连次数(自己该出牌时没有出牌的次数)，达到一定次数则进入托管状态。
 * @property {number} offLinePlayCard - 玩家托管时出的牌。
 * @property {number} wukong - 使用悟空数。
 * @property {number} bajie - 使用八戒数。
 * @property {number} shaseng - 使用沙僧数。
 * @property {number} tangseng - 使用师傅数。
 * @property {number} joker - 使用如来、观音牌数。
 * @property {number} bianshen - 使用变身牌数。
 */
export interface WebSocketPlayerInGame {
    id: number,
    nickname: string,
    avatar_id: string,
    cards: number
    remainCards: number[],
    maxCombo: number,
    online: boolean,
    offLineTime: number,
    offLinePlayCard: number,
    wukong: number,
    bajie: number,
    shaseng: number,
    tangseng: number
    joker: number,
    bianshen: number,
}

/**
 * @summary 游戏中所有玩家状态。
 * @type { [key in GamePlayerSeatIndex]: WebSocketPlayerInGame }
*/
export type GamePlayers = { [key in GamePlayerSeatIndex]: WebSocketPlayerInGame }

/**
 * @summary Redis中的游戏信息。对应key:game。
 * @type {object}
 * @property {number} id - 游戏id
 * @property {boolean} clockwise - 游戏进行方向：true为顺时针，false为逆时针。
 * @property {GamePlayerSeatIndex | -1} currentPlayer - 现在出牌玩家的座位号：0~7，初始为-1。
 * @property {number[]} currentCard - 现在牌池中的牌。
 * @property {GamePlayerSeatIndex | -1} currentCardPlayer - 打出现在牌池中的牌的玩家的座位号：0~7，初始为-1。
 * @property {number} jokerCard - 现在牌池中的反弹牌。
 * @property {GamePlayerSeatIndex | -1} jokerCardPlayer - 打出现在牌池中的反弹牌的玩家的座位号：0~7，初始为-1。
 * @property {number} cardNum - 使用牌副数。
 * @property {number} metamorphoseNum - 每副牌中变身牌数量。
 * @property {number} currentCombo - 现在的连击数。
 * @property {number} version - 数据的版本，用于确认玩家有没有收到过期数据。
 * @property {number} timesCombo - 暴击连击数。
 * @property {number} timesCard - 暴击连击牌得到的额外牌数量。
 * @property {number} timer - 计时器ID。
 * @property {GamePlayers} gamePlayer - 游戏中所有玩家状态。
 * @property {number[]} gamePlayerId - 游戏中所有玩家id。
 * @property {number} remainCards - 在服务器端时为牌堆中余留的牌序号(number[])，发送给客户端时转为该数组长度的数值牌堆中余留的牌数(number)。
 * @property {string[]} messages - 游戏信息。
 */
export interface WebSocketGame {
    id: number,
    clockwise: boolean,
    currentPlayer: GamePlayerSeatIndex | -1,
    currentCard: number[],
    currentCardPlayer: GamePlayerSeatIndex | -1,
    jokerCard: number,
    jokerCardPlayer: GamePlayerSeatIndex | -1,
    cardNum: number,
    metamorphoseNum: number,
    currentCombo: number,
    version: number,
    timesCombo: number,
    timesCard: number,
    gamePlayer: GamePlayers,
    gamePlayerId: number[],
    remainCards: number,
    messages: string[],
}

/**
 * @summary 游戏结果的websocket响应信息。
 * @type {object}
 * @property {number} id - 游戏中玩家id。
 * @property {string} nickname - 昵称。
 * @property {number} avatar_id - 玩家头像id。
 * @property {number} cards - 收牌数。
 * @property {GamePlayerSeatIndex} seat_index - 座位id，下标0-7。
 * @property {number} maxCombo - 一次获得最多的牌数。
 * @property {number} wukong - 使用悟空数。
 * @property {number} bajie - 使用八戒数。
 * @property {number} shaseng - 使用沙僧数。
 * @property {number} tangseng - 使用师傅数。
 * @property {number} bianshen - 使用变身牌数。
 * @property {number} joker - 使用如来、观音牌数。
 */

export interface PlayerRecordInGameResult {
    id: number,
    nickname: string,
    avatar_id: number,
    cards: number
    seatIndex: GamePlayerSeatIndex,
    maxCombo: number,
    wukong: number,
    bajie: number,
    shaseng: number,
    tangseng: number
    joker: number,
    bianshen: number,
}

/** 
 * @summary 玩家获得经验值，id：玩家id, exp：获得经验值。
 * @type {object}
 * @property {number} id 玩家id。
 * @property {number} exp 玩家获得经验值。
 */
export interface PlayerExp {
    id: number,
    exp: number,
}

/**
 * @summary WebSocket传来的游戏结果数据。
 * @type {object}
 * @property {number} id - 游戏id。
 * @property {string} winnerNickname -  吃鸡玩家昵称。
 * @property {number} winnerCards -  吃鸡玩家收牌数。
 * @property {string} loserNickname - 拉跨玩家昵称。
 * @property {number} loserCards - 拉跨玩家收牌数。
 * @property {number} playersNum - 玩家数量。
 * @property {number} cardsNum - 使用牌副数。
 * @property {number} maxCombo - 一次获得最多的牌数。
 * @property {string} maxComboPlayer - 一次获得最多的牌数的玩家昵称。
 * @property {PlayerRecordInGameResult[]} gameResultList - 玩家各项数据列表。
 * @property {PlayerExp[]} playerExpList - 玩家获得经验值列表。
 */
export interface GameResult {
    id: number,
    winnerNickname: string,
    winnerCards: number,
    loserNickname: string,
    loserCards: number,
    playersNum: number,
    cardsNum: number,
    maxCombo: number,
    maxComboPlayer: string,
    gameResultList: PlayerRecordInGameResult[],
    playerExpList: PlayerExp[]
}

/** @summary 一场游戏中所有玩家的战绩。*/
export type GameResultsList = Player[]