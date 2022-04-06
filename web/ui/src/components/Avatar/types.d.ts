type AvatarSize = 'xs' | 'sm' | 'md' | 'xl' | 'xxl' | 'xxxl'

export type AvatarProps = {
  login: string
  size?: AvatarSize
  rounded?: boolean
  className?: string
}