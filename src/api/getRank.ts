import request from '@/utils/request'
import { RankType } from '@/type/rank'
import { RankResponse } from '@/type/request'

export function getRankInfo(params: { id: number, type: RankType }): Promise<RankResponse> {
    return request({
        url: '/rank/',
        params: { type: params.type, id: params.id },
        method: 'get',
    })
}