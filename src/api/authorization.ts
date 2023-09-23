import request from '../utils/request'

export function authorization() {
    return request({
        url: '/authorization',
        method: 'get',
    })
}