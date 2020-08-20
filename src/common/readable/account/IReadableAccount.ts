export interface IReadableAccount {
    readonly email: string
    readonly firstName: string
    readonly middleName: string
    readonly lastName: string
    readonly phone: string
    accessToken?: string
    readonly expiresAt?: string
}
