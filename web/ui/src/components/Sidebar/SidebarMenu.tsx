import Emoji from '@components/Emoji';
import classNames from 'classnames';
import React from 'react';

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
}: {
  // The list of MenuCategory and/or MenuItem.
  children: React.ReactNode[] | React.ReactNode;
}) => {
  return (
    <ul>
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
  name,
  children,
}: {
  // The emoji to display before the category name.
  emoji?: string;
  // The category name.
  name: string;
  // The list of MenuItem.
  children: React.ReactNode[] | React.ReactNode;
}) => {
  return (
    <li>
      <span className="font-bold my-2 ml-2 flex items-center flex-row-reverse justify-end">
        {emoji && (
          <Emoji
            emoji={emoji}
            size={20}
            containerClassName="flex items-center mx-2"
          />
        )}
        <span>{name}</span>
      </span>
      <ul>
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
  name,
  text,
}: {
  // Whether the menu item is active or not
  active?: boolean;
  // The emoji to display
  emoji?: string;
  // The name of the menu item
  name: string;
  // The additional text to display
  text?: string;
}) => {
  return (
    <li
      className={classNames(
        active ? 'bg-indigo-500/20 text-indigo-500' : '',
        'group empty:hidden transition-all hover:cursor-pointer px-2 py-2 my-1 rounded hover:bg-indigo-500/20 hover:text-indigo-500 flex flex-row items-center'
      )}
    >
      <span className="flex items-center w-full">
        {emoji && (
          <Emoji emoji={emoji} size={24} containerClassName="contents" />
        )}
        <span className="ml-2 flex items-baseline">
          <span className="">{name || text}</span>
          {text && (
            <span
              className={classNames(
                active
                  ? 'text-indigo-500'
                  : 'text-slate-400 dark:text-slate-600',
                'ml-2 text-xs group-hover:text-indigo-500'
              )}
            >
              {text}
            </span>
          )}
        </span>
      </span>
    </li>
  );
};
