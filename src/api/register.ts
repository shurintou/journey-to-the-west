import request from '@/utils/request'
import { ResponseDataCommon } from '@/type/request'

export function register(data: { username: string, password: string }): Promise<ResponseDataCommon> {
    return request({
        url: '/register',
        method: 'post',
        data: data
    })
}