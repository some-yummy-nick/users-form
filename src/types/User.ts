export type User = {
  login: string
  password: string
  labels: Labels[]
  type:UserType
}

export enum UserType {
  LDAP = 'ldap',
  LOCAL = 'local'
}

export type Labels = {
  value: string
  parsed: Label[]
}

export type Label = {
  text: string
}

export type Password = {
  isVisible: boolean
  value: string
}