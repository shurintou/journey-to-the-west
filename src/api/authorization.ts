import request from '@/utils/request'
import { AuthorizationResponse } from '@/type/request'

export function authorization(): Promise<AuthorizationResponse> {
    return request({
        url: '/authorization',
        method: 'get',
    })
}