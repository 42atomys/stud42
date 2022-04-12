import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useContext } from 'react';
import { SidebarContext } from './SidebarContext';
import Image from 'next/image';
import { Contribute, Star } from '@lib/github';
import classNames from 'classnames';
import Tooltip from '@components/Tooltip/Tooltip';
import { useSession } from 'next-auth/react';
import { Provider } from '@graphql.d';

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
}: {
  href: string;
  icon: string;
  name: string;
}) => {
  const { pathname } = useRouter();
  const activeRoute = pathname == href;

  return (
    <Tooltip text={name}>
      <Link href={href}>
        <a
          className={`duration-100 transition-all flex items-center justify-center my-3 text-xl`}
        >
          <div
            className={`group relative flex items-center justify-center text-xl rounded-full w-[50px] h-[50px] ${
              activeRoute
                ? 'text-white bg-indigo-200 dark:bg-indigo-500/20 border-2 border-indigo-500'
                : 'border-transparent hover:border-slate-600 dark:hover:border-slate-400 hover:bg-slate-900/10 dark:hover:bg-slate-100/10'
            } border-2 outline-none shadow-outline`}
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
        </a>
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
  children?: JSX.Element;
}) => {
  const { open, setOpen } = useContext(SidebarContext);
  const { data: session } = useSession();

  return (
    <div className="md:flex flex-row md:flex-row md:min-h-screen w-full md:w-auto drop-shadow-xl md:drop-shadow-none">
      <div className="flex flex-col text-slate-600 dark:text-slate-400 bg-slate-200 dark:bg-slate-900/80 flex-shrink-0">
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
            open ? 'block' : 'hidden'
          } flex-grow md:block px-4 pb-4 md:pb-0`}
        >
          <MenuItem href="/feed" icon="fa-seedling" name="Feed" />
          <MenuItem href="/clusters" icon="fa-sitemap" name="Clusters" />
          <MenuItem href="/friends" icon="fa-user-group" name="Friends" />
          <MenuItem href="/statistics" icon="fa-chart-line" name="Statistics" />
        </nav>
        <div
          className={`${
            open ? 'block' : 'hidden'
          } flex flex-col justify-center items-center text-center py-2`}
        >
          <span className="text-sm text-slate-400 dark:text-slate-600">
            {!subSidebar && (
              <MenuItem
                href="https://github.com/42Atomys/stud42"
                icon="fa-brands fa-github"
                name="Github"
              />
            )}
            <MenuItem href="/auth/signout" icon="fa-sign-out" name="Logout" />
          </span>
          <span className="text-sm text-slate-400 dark:text-slate-600">
            {
              session?.user.accounts?.find(
                (account) => account?.provider === Provider.DUO
              )?.username
            }
          </span>
          <span className="text-sm text-slate-400 dark:text-slate-600">
            3.0+alpha.1
          </span>
        </div>
      </div>
      {subSidebar && (
        <div
          className={`${
            open ? 'block' : 'hidden'
          } flex flex-col w-full md:w-72 text-slate-600 dark:text-slate-400 bg-slate-200 dark:bg-slate-900/80 flex-shrink-0`}
        >
          <div className="flex my-6 w-full justify-evenly">
            <Star />
            <Contribute />
          </div>

          <div className="p-4 flex h-full bg-slate-100/60 dark:bg-slate-800/60 rounded-tl-md">
            {subSidebar}
          </div>
        </div>
      )}
    </div>
  );
};
