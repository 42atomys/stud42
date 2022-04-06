import React from "react"
import { ClassNameProps } from "types/globals"

export type BadgeProps = BadgeTextProps | BadgeChildrenProps | ClassNameProps

export type BadgeColor = 'purple' | 'blue' | 'green' | 'yellow' | 'red' | 'orange' | 'gray' | 'white' | 'black' | 'transparent'

export type BadgeTextProps = {
  text: string
  color: BadgeColor
}

export type BadgeChildrenProps = {
  color: BadgeColor
  children: React.ReactNode
}

export default BadgeProps;