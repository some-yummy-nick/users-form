export type User = {
    login: string
    password: string
    labels: any
    type: UserType
}

export enum UserType {
    LDAP = 'ldap',
    LOCAL = 'local'
}

export enum UserTypeNames {
    LDAP = 'LDAP',
    LOCAL = 'Локальная'
}

export type Label = {
    text: string
}