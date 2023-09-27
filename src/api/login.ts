import request from '@/utils/request'
import { LoginResponse } from '@/type/request'

export function login(data: { username: string, password: string }): Promise<LoginResponse> {
    return request({
        url: '/login',
        method: 'post',
        data: data
    })
}

export function logout() {
    return request({
        url: '/logout',
        method: 'delete',
    })
}