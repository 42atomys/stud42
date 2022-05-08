import useSidebar, { Menu, MenuCategory, MenuItem } from '@components/Sidebar';
import Link from 'next/link';

/**
 * ClusterSidebar is the sidebar for the cluster page. It contains the cluster
 * menu statically defined. Used accross all cluster pages.
 * @param {string} campus - The campus used to match the current campus
 * @param {string} cluster - The cluster used to match the current cluster
 * @returns {JSX.Element} The sub sidebar component
 */
export const ClusterSidebar = ({
  campus,
  cluster,
}: {
  campus: string;
  cluster: string;
}) => {
  const { Sidebar } = useSidebar();

  return (
    <Sidebar>
      <div>
        <Menu>
          <MenuCategory emoji="🇫🇷" name="Paris">
            <Link href="/clusters/paris/e1" passHref={true}>
              <a>
                <MenuItem
                  active={campus == 'paris' && cluster == 'e1'}
                  name="Metropolis"
                  text="E1"
                />
              </a>
            </Link>
            <Link href="/clusters/paris/e2" passHref={true}>
              <a>
                <MenuItem
                  active={campus == 'paris' && cluster == 'e2'}
                  name="Westeros"
                  text="E2"
                />
              </a>
            </Link>
            <Link href="/clusters/paris/e3" passHref={true}>
              <a>
                <MenuItem
                  active={campus == 'paris' && cluster == 'e3'}
                  name="Tatooine"
                  text="E3"
                />
              </a>
            </Link>
          </MenuCategory>
        </Menu>
        <span className="flex p-2 text-xs text-slate-400 dark:text-slate-600 italic">
          You don&apos;t see your campus ? Go on github and add it !
        </span>
      </div>
    </Sidebar>
  );
};
