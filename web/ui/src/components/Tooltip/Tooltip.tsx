import classNames from 'classnames';
import { useState } from 'react';
import { TooltipComponent } from './types';

/**
 * Tooltip component that displays a tooltip when hovered over
 * @param {string} text - The text to display in the tooltip
 * @param {string} subText - The sub text to display in the tooltip
 * @param {string} size - The size of the tooltip
 * @param {string} type - The type of the tooltip (colors)
 * @param {string} direction - The direction of the tooltip
 * @param {string} children - The children to display. This is the content that will be hovered over
 * @param {boolean} showArrow - Whether to show the arrow or not
 * @param {string} className - The className to add to the tooltip container
 */
export const Tooltip: TooltipComponent = ({
  children,
  size = 'md',
  color = 'black',
  direction,
  text,
  subText,
  showArrow = true,
  allowInteractions = false,
  className,
}) => {
  const [visible, setVisible] = useState(false);

  const containerClasses = {
    // Colors
    'from-indigo-400 dark:from-indigo-600 to-indigo-500 dark:to-indigo-500':
      color === 'info',
    'from-green-400 dark:from-green-600 to-green-500 dark:to-green-500':
      color === 'green',
    'from-red-400 dark:from-red-600 to-red-500 dark:to-red-500':
      color === 'red',
    'from-fuchsia-400 dark:from-fuchsia-600 to-fuchsia-500 dark:to-fuchsia-500':
      color === 'fuchsia',
    'from-orange-400 dark:from-orange-700 to-orange-500 dark:to-orange-600':
      color === 'orange',
    'bg-black': color === 'black',
    // Sizes
    'px-4 py-2': size === 'md',
    'px-3 py-1 text-sm': size === 'sm',
    'px-2 py-0.5 text-xs': size === 'xs',
    // Direction
    'bottom-full [--tooltip-mb:0.5rem] bg-gradient-to-b dark:bg-gradient-to-t':
      direction === 'top',
    'top-full [--tooltip-mt:0.5rem] bg-gradient-to-t dark:bg-gradient-to-b':
      direction === 'bottom',
    'right-full [--tooltip-mr:1rem] bg-gradient-to-r dark:bg-gradient-to-l':
      direction === 'left',
    'left-full [--tooltip-ml:1rem] bg-gradient-to-l dark:bg-gradient-to-r':
      direction === 'right',
    // Allow interactions
    'pointer-events-none': !allowInteractions,
  };

  const arrowClasses = {
    // Colors
    'bg-indigo-500 dark:bg-indigo-600': color === 'info',
    'bg-green-500 dark:bg-green-600': color === 'green',
    'bg-red-500 dark:bg-red-600': color === 'red',
    'bg-fuchsia-500 dark:bg-fuchsia-600': color === 'fuchsia',
    'bg-orange-500 dark:bg-orange-700': color === 'orange',
    'bg-black text-slate-100 dark:text-slate-300': color === 'black',
    // Sizes
    '[--tooltip-size:0.75rem]': size === 'md',
    '[--tooltip-size:0.5rem]': size === 'sm',
    '[--tooltip-size:0.25rem]': size === 'xs',
    // Direction
    'bottom-[calc(var(--tooltip-size)/2*-1)] left-[calc((100%-var(--tooltip-size))/2)]':
      direction === 'top',
    'top-[calc(var(--tooltip-size)/2*-1)] left-[calc((100%-var(--tooltip-size))/2)]':
      direction === 'bottom',
    'right-[calc(var(--tooltip-size)/2*-1)] top-[calc((100%-var(--tooltip-size))/2)]':
      direction === 'left',
    'left-[calc(var(--tooltip-size)/2*-1)] top-[calc((100%-var(--tooltip-size))/2)]':
      direction === 'right',
  };

  return (
    <div
      className={classNames(
        'relative flex items-center justify-center group',
        className
      )}
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
      data-testid="hover-target"
    >
      <div
        className={classNames(
          visible ? 'visible' : 'invisible',
          'md:flex absolute rounded transition-all duration-150 text-slate-100 opacity-0',
          'max-w-[250px] flex-col w-max items-start m-1 z-10',
          'group-hover:pointer-events-auto group-hover:opacity-100 group-hover:ml-[var(--tooltip-ml)] group-hover:mr-[var(--tooltip-mr)] group-hover:mt-[var(--tooltip-mt)] group-hover:mb-[var(--tooltip-mb)]',
          containerClasses
        )}
        data-testid="tooltip"
        onMouseEnter={allowInteractions ? undefined : () => setVisible(false)}
      >
        {showArrow && (
          <div
            className={classNames(
              'absolute whitespace-nowrap rotate-45',
              'w-[var(--tooltip-size)] h-[var(--tooltip-size)]',
              '',
              arrowClasses
            )}
          />
        )}
        <span className={subText ? 'font-extrabold text-xs' : ''}>{text}</span>
        {subText && (
          <span className="block font-normal text-xs">{subText}</span>
        )}
      </div>
      {children}
    </div>
  );
};

export default Tooltip;
