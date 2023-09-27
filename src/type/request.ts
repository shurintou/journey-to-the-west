import { Account, Player } from '@/type/player'
import { GameResult } from '@/type/game'
import { PlayerRecord } from '@/type/record'
import { RankInfo, RankType } from '@/type/rank'

export interface ResponseDataCommon {
    code: number,
    message: string,
}

export interface AuthorizationResponse extends ResponseDataCommon {
    account: Account,
}

export interface PlayerRecordResponse extends ResponseDataCommon {
    record: PlayerRecord
}

export interface GameRecordsListResponse extends ResponseDataCommon {
    pageNum: number,
    list: Player[],
}

export interface GameRecordResponse extends ResponseDataCommon {
    gameResult: GameResult,
}

export interface RankResponse extends ResponseDataCommon {
    type: RankType,
    rank: RankInfo,
}