import { Account } from '@/type/account'

export interface ResponseDataCommon {
    code: number,
    message: string,
}

export interface AuthorizationResponse extends ResponseDataCommon {
    account: Account,
}