export type User = {
    login: string
    password: string | null
    labels: Labels[]
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

export type Labels = {
    value: string
    parsed: Label[]
}

export type Label = {
    text: string
}