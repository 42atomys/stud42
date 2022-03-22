import classNames from 'classnames';
import React, { useState } from 'react';

/**
 * Tooltip component that displays a tooltip when hovered over
 * @param {string} text - The text to display in the tooltip
 * @param {string} children - The children to display. This is the content that will be hovered over
 * TODO: @param {string} className - The className to apply to the tooltip
 * TODO: @param {string} placement - The placement of the tooltip
 */
export const Tooltip = ({
  children,
  text,
}: {
  children: React.ReactNode;
  text: string;
}) => {
  const [visible, setVisible] = useState(false);

  return (
    <div
      className="relative flex items-center"
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
      data-testid="hover-target"
    >
      <div
        className={classNames(
          visible ? 'opacity-100 z-10 ml-4' : '-z-10 opacity-0 ml-1',
          'hidden md:flex left-full absolute whitespace-no-wrap bg-gradient-to-r from-indigo-600 to-indigo-500 text-slate-100 dark:text-slate-300 px-4 py-2 rounded items-center transition-all duration-150'
        )}
        data-testid="tooltip"
      >
        <div
          className="bg-indigo-600 h-3 w-3 absolute"
          style={{ left: '-6px', transform: 'rotate(45deg)' }}
        />
        {text}
      </div>
      {children}
    </div>
  );
};

export default Tooltip;
