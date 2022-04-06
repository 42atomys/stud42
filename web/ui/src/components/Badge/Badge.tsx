import classNames from "classnames";
import { Children } from "react";
import { ClassNameProps } from "types/globals";
import BadgeProps, { BadgeChildrenProps, BadgeTextProps } from "./types";

const colorClasses = {
  'purple': 'bg-indigo-500/20 border-indigo-500 text-indigo-700 dark:text-indigo-300 hover:bg-indigo-500/50',
  'blue': 'bg-cyan-500/20 border-cyan-500 text-cyan-700 dark:text-cyan-300 hover:bg-cyan-500/50',
  'green': 'bg-emerald-500/20 border-emerald-500 text-emerald-700 dark:text-emerald-300 hover:bg-emerald-500/50',
  'yellow': 'bg-yellow-500/20 border-yellow-500 text-yellow-700 dark:text-yellow-300 hover:bg-yellow-500/50',
  'red': 'bg-red-500/20 border-red-500 text-red-700 dark:text-red-300 hover:bg-red-500/50',
  'orange': 'bg-orange-500/20 border-orange-500 text-orange-700 dark:text-orange-300 hover:bg-orange-500/50',
  'gray': 'bg-slate-500/20 border-slate-500 text-slate-700 dark:text-slate-300 hover:bg-slate-500/50',
  'white': 'bg-gray-200/20 border-gray-200 text-gray-700 dark:text-gray-300 hover:bg-gray-200/50',
  'black': 'bg-gray-900/20 border-gray-900 text-gray-700 dark:text-gray-300 hover:bg-gray-900/50',
  'transparent': 'bg-transparent border-transparent'
}

export const Badge = ({ ...props }: BadgeProps) => {
  const { color } = props as BadgeTextProps | BadgeChildrenProps
  const { text } = props as BadgeTextProps;
  const { children } = props as BadgeChildrenProps;
  const { className } = props as ClassNameProps

  return <div className={classNames('transition-colors flex w-fit text-gray items-center rounded-full border py-1 px-2 mt-2 text-sm', colorClasses[color], className)}>
    {Children.map(children, c => <>{c}</>) || <span>{text}</span>}
  </div>
}