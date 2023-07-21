import { XOR } from 'types/utils';

/**
 * The properties of the MenuItem component.
 *
 * @typedef {object} MenuItemProps
 * @property {boolean} [active] - Whether the menu item is active or not.
 * @property {string} [emoji] - The emoji to display before the name and icon.
 * @property {string} [icon] - The FontAwesome icon to display before the name.
 * @property {string} [href] - The destination of the menu item. When provided, the menu item is wrapped in a Link component.
 * @property {() => void} [onClick] - onClick handler for the menu item, when is provided, the href is ignored.
 * @property {string} [name] - The name of the menu item.
 * @property {JSX.Element | string} [leftChildren] - The additional text to display on the left.
 * @property {JSX.Element | string} [rightChildren] - The additional text to display on the right.
 * @property {string} [className] - Additional class name to apply to the menu item.
 */
type MenuItemProps = {
  active?: boolean;
  emoji?: string;
  icon?: string;
  rightChildren?: JSX.Element | string;
} & XOR<
  { href: string; linkTarget?: React.HTMLAttributeAnchorTarget },
  { onClick: () => void }
> &
  XOR<
    { name: string; leftChildren?: JSX.Element | string },
    { name?: string; leftChildren: JSX.Element | string }
  > &
  ClassNameProps;

/**
 * The properties of the MenuCategory component.
 *
 * @typedef {object} MenuCategoryProps
 * @property {string} [emoji] - The emoji to display before the name and icon.
 * @property {string} [icon] - The FontAwesome icon to display before the name.
 * @property {string} [name] - The name of the menu item.
 * @property {string} [text] - The additional text to display.
 * @property {boolean} [isCollapsable] - The menu category can be collapsed and expanded.
 * @property {boolean} [collapsed] - The menu is collapsed by default.
 * @property {JSX.Element[]} [children] - The list of MenuItem.
 */
type MenuCategoryProps = {
  emoji?: string;
  icon?: string;
  name: string;
  text?: string;
  isCollapsable?: boolean;
  collapsed?: boolean;
  children: React.ReactNode[] | React.ReactNode;
};

/**
 * The properties of the Menu component.
 * @typedef {object} MenuProps
 * @property {JSX.Element[]} [children] - The list of MenuCategory and/or MenuItem.
 * @property {string} [size] - The size of the menu.
 */
type MenuProps = {
  children: React.ReactNode[] | React.ReactNode;
  size?: 'sm' | 'md';
};
