import ConditionalWrapper from '@components/ConditionalWrapper';
import Emoji from '@components/Emoji';
import classNames from 'classnames';
import Link from 'next/link';
import React from 'react';
import { ClassNameProps } from 'types/globals';

/**
 * SidebarMenu is the menu available in the sub sidebar part.
 * The Menu component is a list of MenuCategory and MenuItem.
 * @param {React.ReactNode} children - The list of MenuCategory and/or MenuItem
 *
 * Each MenuCategory is a list of MenuItem.
 *
 * Example:
 *  <Menu>
 *    <MenuCategory emoji="🇫🇷" name="Paris">
 *      <MenuItem name="Metropolis" />
 *      <MenuItem name="Westeros" />
 *      <MenuItem name="Tatooine" />
 *    </MenuCategory>
 *    <MenuItem name="Paris" />
 * </Menu>
 */
export const Menu = ({
  children,
  size = 'md',
}: {
  // The list of MenuCategory and/or MenuItem.
  children: React.ReactNode[] | React.ReactNode;
  // The size of the menu.
  size?: 'sm' | 'md';
}) => {
  return (
    <ul
      className={classNames('flex flex-col', {
        '[--menu-padding-y:0.5rem]': size === 'md',
        '[--menu-padding-y:0.25rem]': size === 'sm',
      })}
    >
      {React.Children.map(children, (c) => (
        <>{c}</>
      ))}
    </ul>
  );
};

/**
 * MenuCategory is a list of MenuItem. It is used to group MenuItem.
 * In the future, Category can be collapsed and expanded.
 * @param {string} emoji - The emoji to display in the category
 * @param {string} name - The name of the category
 * @param {React.ReactNode} children - The list of MenuItem
 */
export const MenuCategory = ({
  emoji,
  icon,
  name,
  text,
  isCollapsable = false,
  collapsed = false,
  children,
}: {
  // The emoji to display before the category name.
  emoji?: string;
  // The icon to display before the category name.
  icon?: string;
  // The category name.
  name: string;
  // The additional text to display
  text?: string;
  // The menu category can be collapsed and expanded.
  isCollapsable?: boolean;
  // The menu is collapsed by default.
  collapsed?: boolean;
  // The list of MenuItem.
  children: React.ReactNode[] | React.ReactNode;
}) => {
  const [isCollapsed, setIsCollapsed] = React.useState(
    isCollapsable && collapsed
  );

  return (
    <li>
      <span className="my-[var(--menu-padding-y)] ml-2 flex items-center flex-row justify-end text-slate-400 dark:text-slate-600 text-sm">
        {emoji && (
          <Emoji
            emoji={emoji}
            size={20}
            containerClassName="flex items-center mr-2"
          />
        )}
        {icon && <i className={classNames('fa-fw fa-regular', icon, 'mr-2')} />}
        <span
          className={classNames('flex grow items-baseline', {
            'cursor-pointer': isCollapsable,
          })}
          onClick={
            isCollapsable ? () => setIsCollapsed(!isCollapsed) : undefined
          }
        >
          <span className="grow first-letter:capitalize">{name}</span>
          {text && (
            <span className={classNames('items-stretch ml-2 text-xs')}>
              <span>{text}</span>
            </span>
          )}
          {isCollapsable && (
            <div
              className={classNames(
                'transition-all',
                isCollapsed ? 'rotate-0' : 'rotate-90'
              )}
            >
              <i className="fa-fw fa-light fa-chevron-right" />
            </div>
          )}
        </span>
      </span>
      <ul className={classNames(isCollapsed ? 'hidden' : 'visible')}>
        {React.Children.map(children, (c) => (
          <>{c}</>
        ))}
      </ul>
    </li>
  );
};

/**
 * MenuItem is a link to a page. It can be active or not to define the style.
 * MenuItem cannot have a sub item, use MenuCategory instead.
 * Each MenuItem has a name and a text to display and an emoji.
 * @param {boolean} active - Whether the menu item is active or not
 * @param {string} emoji - The emoji to display before the name
 * @param {string} name - The name of the menu item
 * @param {text} text - The text to display after the name
 */
export const MenuItem = ({
  active = false,
  emoji,
  icon,
  name,
  href,
  onClick,
  leftText,
  rightText,
  className,
}: {
  // Whether the menu item is active or not
  active?: boolean;
  // The emoji to display
  emoji?: string;
  // The FontAwesome icon to display before the name
  icon?: string;
  // The destination of the menu item. When provided, the menu item is wrapped
  // in a Link component.
  href?: string;
  // onClick handler for the menu item, when is provided, the href is ignored.
  onClick?: () => void;
  // The name of the menu item
  name: string;
  // The additional text to display on the left
  leftText?: string;
  // The additional text to display on the right
  rightText?: JSX.Element | string;
} & ClassNameProps) => {
  return (
    <ConditionalWrapper
      condition={!!href && !onClick}
      trueWrapper={(children) => <Link href={href as string}>{children}</Link>}
    >
      <li
        data-active={active}
        className={classNames(
          active ? 'bg-indigo-500/20 text-indigo-500' : '',
          'group empty:hidden transition-all hover:cursor-pointer px-2 py-[var(--menu-padding-y)] my-1 rounded hover:bg-indigo-500/20 hover:text-indigo-500 flex flex-row items-center',
          className
        )}
        onClick={onClick}
      >
        <span className="flex items-center w-full">
          {emoji && (
            <Emoji emoji={emoji} size={24} containerClassName="contents" />
          )}
          {icon && <i className={classNames('fa-fw fa-light', icon)} />}
          <span className="ml-2 flex items-baseline flex-1 justify-between">
            <span>
              <span>{name}</span>
              {leftText && (
                <span
                  data-active={active}
                  className={classNames(
                    active
                      ? 'text-indigo-500'
                      : 'text-slate-400 dark:text-slate-600',
                    'ml-2 text-xs transition-all group-hover:text-indigo-500 anchor-sub-text'
                  )}
                >
                  {leftText}
                </span>
              )}
            </span>
            {rightText && (
              <span
                data-active={active}
                className={classNames(
                  active
                    ? 'text-indigo-500'
                    : 'text-slate-400 dark:text-slate-600',
                  'ml-2 text-xs transition-all group-hover:text-indigo-500 anchor-sub-text'
                )}
              >
                {rightText}
              </span>
            )}
          </span>
        </span>
      </li>
    </ConditionalWrapper>
  );
};
