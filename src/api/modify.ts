import request from '@/utils/request'
import { ResponseDataCommon } from '@/type/request'

const baseUrl = '/modify'

export function modifyAvatar(data: { avatar_id: number }): Promise<ResponseDataCommon> {
    return request({
        url: baseUrl + '/avatar',
        method: 'put',
        data: data
    })
}

export function modifyNickname(data: { nickname: string }): Promise<ResponseDataCommon> {
    return request({
        url: baseUrl + '/nickname',
        method: 'put',
        data: data
    })
}