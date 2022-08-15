import classNames from 'classnames';
import React, { useState } from 'react';

/**
 * Tooltip component that displays a tooltip when hovered over
 * @param {string} text - The text to display in the tooltip
 * @param {string} children - The children to display. This is the content that will be hovered over
 * @param {boolean} showArrow - Whether to show the arrow or not
 * @param {string} className - The className to add to the tooltip
 * TODO: @param {string} placement - The placement of the tooltip
 */
export const Tooltip = ({
  children,
  text,
  subText,
  showArrow = true,
  className,
}: {
  children: React.ReactNode;
  className?: string;
  text: string | React.ReactNode;
  subText?: string | React.ReactNode;
  showArrow?: boolean;
}) => {
  const [visible, setVisible] = useState(false);

  return (
    <div
      className={classNames('relative flex items-center', className)}
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
      data-testid="hover-target"
    >
      <div
        className={classNames(
          visible ? 'opacity-100 z-10 ml-4' : '-z-10 opacity-0 ml-1',
          'hidden md:flex absolute left-full bg-gradient-to-r from-indigo-600 to-indigo-500 text-slate-100 dark:text-slate-300 px-4 py-2 rounded transition-all duration-150',
          'max-w-[250px] flex-col w-max items-start'
        )}
        data-testid="tooltip"
      >
        {showArrow && (
          <div
            className="bg-indigo-600 absolute w-3 h-3 whitespace-nowrap"
            style={{ left: '-6px', transform: 'rotate(45deg)' }}
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
