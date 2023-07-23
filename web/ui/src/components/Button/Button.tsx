import React from 'react';
import { tv } from 'tailwind-variants';
import type { ButtonProps } from './types';

const variants = tv({
  base: 'inline-flex justify-center rounded-md font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 sm:col-start-2 disabled:opacity-50 disabled:pointer-events-none',

  variants: {
    size: {
      sm: 'px-2.5 py-1.5 text-xs',
      md: 'px-3 py-2 text-sm',
      lg: 'px-4 py-2 text-sm',
      xl: 'px-4 py-2 text-base',
    },

    color: {
      primary:
        'bg-indigo-600 hover:bg-indigo-500 focus-visible:ring-indigo-500',
      secondary: 'bg-slate-600 hover:bg-slate-500 focus-visible:ring-slate-500',
      danger: 'bg-red-600 hover:bg-red-500 focus-visible:ring-red-500',
      success: 'bg-green-600 hover:bg-green-500 focus-visible:ring-green-500',
      warning:
        'bg-yellow-600 hover:bg-yellow-500 focus-visible:ring-yellow-500',
      info: 'bg-blue-600 hover:bg-blue-500 focus-visible:ring-blue-500',
      black: 'bg-black hover:bg-slate-950 focus-visible:ring-slate-950',
    },
  },

  defaultVariants: {
    size: 'md',
    color: 'primary',
  },
});

export const Button: React.FC<React.PropsWithChildren<ButtonProps>> = ({
  children,
  color,
  size,
  ...props
}) => (
  <button className={variants({ color, size })} {...props}>
    {children}
  </button>
);
