export type User = {
  firstName: string | null
  lastName: string | null
  usualFirstName?: string | null
  login: string
  hasNickname?: boolean = false
  nickname?: string
  currentLocation: Location | null
  lastConnectedAt: string | Date | null
}

export type Location = {
  campus: string
  host: string
}

/**
 * Allow to extend the type of the props of a component
 * @typedef {Object} ClassNameProps
 * @property {string} className
 */
export type ClassNameProps = {
  className?: string
}