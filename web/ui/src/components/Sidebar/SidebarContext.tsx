import { createContext } from 'react';

type SidebarContextType = {
  open: boolean
  setOpen: (c: boolean) => void
}

export const SidebarContext = createContext<SidebarContextType>({open: true, setOpen: () => {} });
