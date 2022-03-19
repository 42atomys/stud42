import classNames from 'classnames';
import React, { useState } from 'react';

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
    >
      <div
        className={classNames(
          visible ? 'opacity-100 z-10 ml-4' : '-z-10 opacity-0 ml-1',
          'hidden md:flex left-full absolute whitespace-no-wrap bg-gradient-to-r from-indigo-600 to-indigo-500 text-slate-100 dark:text-slate-300 px-4 py-2 rounded items-center transition-all duration-150'
        )}
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
