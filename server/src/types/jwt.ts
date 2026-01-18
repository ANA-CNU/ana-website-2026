export interface TokenUser {
    name: string,
    userid: string,
    admin: boolean,
    isnew?: boolean,
    provider?: 'google' | 'github',
    profileId?: string
}