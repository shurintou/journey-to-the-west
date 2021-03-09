import request from '../utils/request'

export function authorization(params){
    return request({
        url: '/authorization',
        method: 'get',
        params: params
    })
}