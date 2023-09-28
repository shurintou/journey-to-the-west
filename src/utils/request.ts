import axios, { AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios'
import { Message } from 'element-ui'
import router from '@/router/'
import { removeToken } from '@/utils/cookie'

declare module 'axios' {
    interface AxiosInstance {
        (config: AxiosRequestConfig): Promise<any>
    }
}

const request = axios.create({
    baseURL: process.env.VUE_APP_API_URL,
    timeout: process.env.VUE_APP_API_TIMEOUT,
    withCredentials: true
})

request.interceptors.request.use(
    (config: AxiosRequestConfig) => {
        return config
    },
    (error: AxiosError) => {
        return Promise.reject(error)
    }
)

request.interceptors.response.use(
    (response: AxiosResponse) => {
        const res = response.data
        if (res.code === 200) {
            return res
        }
        else if (res.code === 401) {
            Message({ message: res.message ? res.message : '账号信息已过期，请重新登录', type: 'error' })
            removeToken()
            if (location.href.indexOf('login') === -1) {
                router.push({ name: 'Login' })
            }
        }
        else {
            Message({ message: res.message, type: 'error' })
            return Promise.reject('error')
        }
    },
    (error: AxiosError) => {
        Message({ message: error.message, type: 'error' })
        return Promise.reject(error)
    }
)

export default request