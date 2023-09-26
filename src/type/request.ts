import { Account } from '@/type/account'
import { GameResult } from '@/type/game'
import { Player, PlayerRecord } from '@/type/player'

export interface ResponseDataCommon {
    code: number,
    message: string,
}

export interface AuthorizationResponse extends ResponseDataCommon {
    account: Account,
}

export interface PlayerRecordResponse extends ResponseDataCommon {
    record: PlayerRecord[]
}

export interface GameRecordsListResponse extends ResponseDataCommon {
    pageNum: number,
    list: Player[],
}

export interface GameRecordResponse extends ResponseDataCommon {
    gameResult: GameResult,
}