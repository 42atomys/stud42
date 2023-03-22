import ConditionalWrapper from '@components/ConditionalWrapper';
import Emoji from '@components/Emoji';
import classNames from 'classnames';
import Link from 'next/link';
import React from 'react';
import { MenuCategoryProps, MenuItemProps, MenuProps } from './types';

/**
 * SidebarMenu is the menu available in the sub sidebar part.
 * The Menu component is a list of MenuCategory and MenuItem.
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
export const Menu: React.FC<React.PropsWithChildren<MenuProps>> = ({
  children,
  size = 'md',
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
 */
export const MenuCategory: React.FC<MenuCategoryProps> = ({
  emoji,
  icon,
  name,
  text,
  isCollapsable = false,
  collapsed = false,
  children,
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
export const MenuItem: React.FC<MenuItemProps> = ({
  active = false,
  emoji,
  icon,
  name,
  href,
  onClick,
  leftChildren,
  rightChildren,
  className,
}) => {
  const subTextsClasses = classNames(
    active ? '!text-indigo-500' : 'text-slate-400 dark:text-slate-600',
    'ml-2 text-xs transition-all group-hover:text-indigo-500 anchor-sub-text'
  );

  return (
    <li
      data-active={active}
      className="group empty:hidden transition-all hover:cursor-pointer"
    >
      <div
        className={classNames(
          active ? '!bg-indigo-500/20 !text-indigo-500' : '',
          'px-2 my-1 rounded hover:bg-indigo-500/10 hover:text-indigo-500 flex flex-row items-center w-full',
          className
        )}
        onClick={onClick}
      >
        <ConditionalWrapper
          condition={!!href && !onClick}
          trueWrapper={(children) => (
            <Link
              href={href as string}
              className="flex flex-1 items-center space-x-2 py-[var(--menu-padding-y)]"
            >
              {children}
            </Link>
          )}
          falseWrapper={(children) => (
            <div className="flex flex-1 items-center space-x-2 py-[var(--menu-padding-y)]">
              {children}
            </div>
          )}
        >
          <>
            {emoji && (
              <Emoji emoji={emoji} size={24} containerClassName="contents" />
            )}
            {icon && <i className={classNames('fa-fw fa-light', icon)} />}
            <span className="[word-break:break-word]">{name}</span>
            {leftChildren && (
              <ConditionalWrapper
                condition={typeof leftChildren === 'string'}
                trueWrapper={(children) => (
                  <span data-active={active} className={subTextsClasses}>
                    {children}
                  </span>
                )}
              >
                <>{leftChildren}</>
              </ConditionalWrapper>
            )}
          </>
        </ConditionalWrapper>
        <div className="flex pl-2 py-[var(--menu-padding-y)]">
          {rightChildren && (
            <ConditionalWrapper
              condition={typeof rightChildren === 'string'}
              trueWrapper={(children) => (
                <span data-active={active} className={subTextsClasses}>
                  {children}
                </span>
              )}
            >
              <>{rightChildren}</>
            </ConditionalWrapper>
          )}
        </div>
      </div>
    </li>
  );
};
