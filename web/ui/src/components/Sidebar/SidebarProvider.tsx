import { useState } from 'react';
import { SidebarContext } from './SidebarContext';

/**
 * Sidebar provider. This is used to open and close the sidebar in mobile view.
 */
export const SidebarProvider = ({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element => {
  const [open, setOpen] = useState(true);

  return (
    <SidebarContext.Provider value={{ open, setOpen }}>
      {children}
    </SidebarContext.Provider>
  );
};
