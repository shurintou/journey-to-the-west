import request from '@/utils/request'

export function getRankInfo(params) {
    return request({
        url: '/rank/',
        params: { type: params.type, id: params.id },
        method: 'get',
    })
}