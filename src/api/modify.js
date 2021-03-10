import request from '../utils/request'

const baseUrl = '/modify'

export function modifyAvatar(data){
    return request({
        url: baseUrl + '/avatar',
        method: 'put',
        data: data
    })
}

export function modifyNickname(data){
    return request({
        url: baseUrl + '/nickname',
        method: 'put',
        data: data
    })
}