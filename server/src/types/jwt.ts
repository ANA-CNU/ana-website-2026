export interface TokenUser {
    name: string,
    userid: string,
    admin: boolean,
    member: boolean,
    isnew?: boolean,
    provider?: 'google' | 'github',
    profileid?: string
}