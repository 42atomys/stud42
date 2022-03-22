import { createContext } from 'react';

type SidebarContextType = {
  open: boolean;
  setOpen: (c: boolean) => void;
};

/**
 * Sidebar context. This is used to open and close the sidebar in mobile view.
 */
export const SidebarContext = createContext<SidebarContextType>({
  open: true,
  setOpen: () => {},
});
