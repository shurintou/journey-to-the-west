import request from '@/utils/request'
import { PlayerRecordResponse, GameRecordsListResponse, GameRecordResponse } from '@/type/request'

export function getPlayerRecord(params: { id: number }): Promise<PlayerRecordResponse> {
    return request({
        url: '/player/record/' + params.id,
        method: 'get',
    })
}

export function getGameRecordsList(params: { id: number, page: number }): Promise<GameRecordsListResponse> {
    return request({
        url: '/game/records/',
        params: { page: params.page, id: params.id },
        method: 'get',
    })
}

export function getGameRecord(params: { id: number }): Promise<GameRecordResponse> {
    return request({
        url: '/game/record/' + params.id,
        method: 'get',
    })
}