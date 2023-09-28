import request from '@/utils/request'
import { ResponseDataCommon } from '@/type/request'

export function register(data: { username: string, password: string, invitationCode: string }): Promise<ResponseDataCommon> {
    return request({
        url: '/register',
        method: 'post',
        data: data
    })
}