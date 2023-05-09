//   <div className="animate-pulse h-4 bg-gray-200 rounded w-1/4"></div>

import { Avatar } from '@components/Avatar';
import React from 'react';

/**
 * SkeletonLoader is a UI component that displays a skeleton loader for the
 * user profile slideshow when the user profile is loading. It is used in the
 * UserProfile component.
 */
export const SkeletonLoader: React.FC = () => (
  <>
    <div className="animate-pulse rounded-lg text-center flex flex-col items-center">
      <div className="relative mb-12 w-full">
        <div className="animate-pulse bg-slate-200 dark:bg-slate-700 w-full h-[125px] rounded-lg" />
        <div className="absolute bottom-0 left-4 translate-y-1/3 flex flex-row w-[calc(100%_-_1rem)]">
          <Avatar
            profileLink={false}
            size="4xl"
            duoAvatarURL={''}
            className="ring-8 ring-white !bg-slate-200 dark:ring-slate-900 dark:!bg-slate-700"
          />
        </div>
      </div>
    </div>

    <div className="flex flex-col text-left ml-4 !mt-5">
      <h2 className="animate-pulse w-1/3 h-8 rounded-md bg-slate-200 dark:bg-slate-700 mb-4" />
      <p className="animate-pulse w-1/4 h-4 rounded-md bg-slate-200 dark:bg-slate-700"></p>
    </div>

    <ul className="flex flex-row space-x-3 ml-4 justify-start items-center !mb-5">
      <i className="animate-pulse bg-slate-200 dark:bg-slate-700 rounded-lg w-9 h-9" />
      <i className="animate-pulse bg-slate-200 dark:bg-slate-700 rounded-lg w-9 h-9" />
    </ul>

    <div className="flex flex-row space-x-3">
      <div className="animate-pulse h-24 bg-slate-200 dark:bg-slate-950 rounded-lg flex-1" />
      <div className="animate-pulse h-24 bg-slate-200 dark:bg-slate-950 rounded-lg flex-1" />
    </div>

    <div className="animate-pulse h-80 bg-slate-200 dark:bg-slate-950 rounded-lg" />
  </>
);
