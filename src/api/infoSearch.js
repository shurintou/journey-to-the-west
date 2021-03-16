import request from '../utils/request'

export function getPlayerRecord(params){
    return request({
        url: '/player/record/' + params.id,
        method: 'get',
    })
}