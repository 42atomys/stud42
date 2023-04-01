import { TooltipProps } from '@components/Tooltip';
import Tooltip from '@components/Tooltip/Tooltip';
import { Contribute, Star } from '@lib/github';
import classNames from 'classnames';
import getConfig from 'next/config';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useContext } from 'react';
import { SidebarContext } from './SidebarContext';

/**
 * Menu item component. This is used to create the menu items in the sidebar
 * Apply automacailly the active class if the current path is the same as the href
 * @param {string} href - The href to link to
 * @param {string} icon - The icon to display in the menu item
 * @param {string} name - The name of the menu item
 * @returns {JSX.Element} The menu item component
 */
const MenuItem = ({
  href,
  icon,
  name,
  tooltipColor: tooltipType = 'info',
  className,
}: {
  href: string;
  icon: string;
  name: string;
  tooltipColor?: TooltipProps['color'];
  className?: string;
}) => {
  const { pathname } = useRouter();
  const activeRoute = pathname.split('/')[1] == href.split('/')[1];

  return (
    <Tooltip
      text={name}
      size="md"
      color={tooltipType}
      direction="right"
      tooltipClassName="hidden md:flex"
    >
      <Link
        href={href}
        className={`duration-100 transition-all flex items-center justify-center my-3 text-xl`}
      >
        <div
          className={classNames(
            'group relative flex items-center justify-center text-xl rounded-full w-[50px] h-[50px] border-2 outline-none shadow-outline',
            activeRoute
              ? 'text-white bg-indigo-200 dark:bg-indigo-500/20 border-2 border-indigo-500'
              : 'border-transparent hover:border-slate-600 dark:hover:border-slate-400 hover:bg-slate-900/10 dark:hover:bg-slate-100/10',
            className
          )}
        >
          <i
            className={classNames(
              'relative fa-light',
              activeRoute
                ? 'text-indigo-500'
                : 'text-slate-600 dark:text-slate-400',
              icon
            )}
          />
        </div>
        <span className="visible md:hidden ml-3 md:ml-0">{name}</span>
      </Link>
    </Tooltip>
  );
};

/**
 * Sidebar component. This is used to create the sidebar in the page layout.
 * Small sidebar is generatd when no {chidren} are passed in. The Full version with sub
 * menu items is generated when {children} are passed in.
 * @param {string} children - The children to display as second sidebar content
 * @returns {JSX.Element} The sidebar component
 */
export const Sidebar = ({
  children: subSidebar,
}: {
  children?: React.ReactNode[] | React.ReactNode;
}) => {
  const { open, setOpen } = useContext(SidebarContext);
  const { publicRuntimeConfig } = getConfig();

  return (
    <div className="md:flex flex-row md:flex-row md:min-h-screen w-full md:w-auto drop-shadow-xl md:drop-shadow-none md:sticky md:top-0 md:h-screen z-40">
      <div className="flex flex-col text-slate-600 dark:text-slate-400 bg-slate-200 dark:bg-slate-900 flex-shrink-0">
        <div className="flex-shrink-0 p-4 flex flex-row justify-between">
          <span className="text-lg font-display antialiased font-black tracking-widest text-gray-900 uppercase rounded-lg dark:text-white focus:outline-none focus:shadow-outline">
            <Image
              src="/assets/images/logo.svg"
              alt="logo"
              width={48}
              height={48}
              quality={100}
            />
          </span>
          <button
            className="rounded-lg md:hidden focus:outline-none focus:shadow-outline"
            onClick={() => setOpen(!open)}
          >
            <svg fill="currentColor" viewBox="0 0 20 20" className="w-6 h-6">
              <path
                className={open ? 'hidden' : 'visible'}
                fillRule="evenodd"
                d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM9 15a1 1 0 011-1h6a1 1 0 110 2h-6a1 1 0 01-1-1z"
                clipRule="evenodd"
              ></path>
              <path
                className={open ? 'visible' : 'hidden'}
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              ></path>
            </svg>
          </button>
        </div>
        <nav
          className={`${
            open ? 'block' : 'hidden md:block'
          } flex-grow md:block px-4 pb-4 md:pb-0`}
        >
          <MenuItem href="/feed" icon="fa-seedling" name="Feed" />
          <MenuItem href="/clusters" icon="fa-sitemap" name="Clusters" />
          <MenuItem href="/friends" icon="fa-user-group" name="Friends" />
          <MenuItem href="/statistics" icon="fa-chart-line" name="Statistics" />
          <MenuItem
            href="https://discord.gg/5f864c6hyj"
            icon="fab fa-discord"
            name="Discord"
          />
        </nav>
        <div
          className={`${
            open ? 'block' : 'hidden md:block'
          } flex flex-col justify-center items-center text-center py-2 md:px-4 md:pb-4 `}
        >
          {!subSidebar && (
            <MenuItem
              href="https://github.com/42Atomys/stud42"
              icon="fa-brands fa-github"
              name="Github"
            />
          )}
          <MenuItem
            href="https://github.com/sponsors/42Atomys"
            icon="fa-light fa-heart !text-fuchsia-500"
            className="border-transparent hover:border-fuchsia-500 dark:hover:border-fuchsia-400 hover:bg-fuchsia-500/20 dark:hover:bg-fuchsia-500/20"
            name="Support the project"
            tooltipColor="fuchsia"
          />
          <MenuItem href="/settings" icon="fa-cog" name="Settings" />
          <span className="text-sm text-slate-400 dark:text-slate-600">
            {publicRuntimeConfig.appVersion}
          </span>
        </div>
      </div>
      {subSidebar && (
        <div
          className={`${
            open ? 'block' : 'hidden md:flex'
          } flex flex-col w-full md:w-72 text-slate-600 dark:text-slate-400 bg-slate-200 dark:bg-slate-900 flex-shrink-0 overflow-y-auto`}
          // TODO: put into tailwind when the flex flow is added to tailwind
          style={{ flexFlow: 'column' }}
        >
          <div className="flex py-6 w-full justify-evenly bg-slate-200 dark:bg-slate-900 sticky top-0 z-10">
            <Star />
            <Contribute />
          </div>

          <div className="p-4 flex flex-col flex-auto bg-slate-100/60 dark:bg-slate-800/40 rounded-tl-md relative">
            {React.Children.map(subSidebar, (c) => (
              <>{c}</>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
