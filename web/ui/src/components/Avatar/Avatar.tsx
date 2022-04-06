import classNames from "classnames";
import type { AvatarProps } from './types'

/**
 * URL of the 42 cdn to get the avatar of an User.
 * The placeholder for login is `{}`
 */
const CDN_URL = 'https://cdn.intra.42.fr/users/{}.jpg'

/**
 * Size classes to define the size of avatar from simplified props
 */
const sizeClasses = {
  xs: 'w-[16px] h-[16px]',
  sm: 'w-[24px] h-[24px]',
  md: 'w-[32px] h-[32px]',
  xl: 'w-[42px] h-[42px]',
  xxl: 'w-[56px] h-[56px]',
  xxxl: 'w-[96px] h-[96px]'
}


export const Avatar = ({ login, size = 'sm', rounded = false, className }: AvatarProps) => {
  return <div style={{backgroundImage: `url(${CDN_URL.replace('{}', login)})`}} className={classNames(className, rounded ? 'rounded-full' : 'rounded', "bg-clip-border bg-center bg-cover", sizeClasses[size])} />
}


export default Avatar;