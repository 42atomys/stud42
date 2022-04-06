import { User } from "types/globals"

export type NameProps = {
  firstName: string
  lastName: string
  usualFirstName?: string
  login: string
  hasNickname?: boolean = false
  nickname?: string
}

export type NameUserProps = {
  user: User
}