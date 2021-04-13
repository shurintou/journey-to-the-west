import request from '../utils/request'

export function getPlayerRecord(params){
    return request({
        url: '/player/record/' + params.id,
        method: 'get',
    })
}

export function getGameRecordsList(params){
    return request({
        url: '/game/records/',
        params: { page : params.page, id : params.id },
        method: 'get',
    })
}

export function getGameRecord(params){
    return request({
        url: '/game/record/' + params.id,
        method: 'get',
    })
}