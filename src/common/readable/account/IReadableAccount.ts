export interface IReadableAccount {
    readonly email: string
    readonly fio: string
    readonly phone: string
    accessToken?: string
    readonly expiresAt?: string
}