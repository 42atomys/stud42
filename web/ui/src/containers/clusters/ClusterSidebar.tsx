import useSidebar, { Menu, MenuCategory, MenuItem } from '@components/Sidebar';
import { useRouter } from 'next/router';

/**
 * ClusterSidebar is the sidebar for the cluster page. It contains the cluster
 * menu statically defined. Used accross all cluster pages.
 * @returns {JSX.Element} The sub sidebar component
 */
export const ClusterSidebar = () => {
  const { Sidebar } = useSidebar();
  const { campus, cluster } = useRouter().query;

  return (
    <Sidebar>
      <div>
        <Menu>
          <MenuCategory emoji="🇫🇷" name="Paris">
            <MenuItem
              active={campus == 'paris' && cluster == 'e1'}
              name="Metropolis"
              text="E1"
            />
            <MenuItem
              active={campus == 'paris' && cluster == 'e2'}
              name="Westeros"
              text="E2"
            />
            <MenuItem
              active={campus == 'paris' && cluster == 'e3'}
              name="Tatooine"
              text="E3"
            />
          </MenuCategory>
        </Menu>
        <span className="flex p-2 text-xs text-slate-400 dark:text-slate-600 italic">
          You don&apos;t see your campus ? Go on github and add it !
        </span>
      </div>
    </Sidebar>
  );
};
