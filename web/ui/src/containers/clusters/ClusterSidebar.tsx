import Search from '@components/Search';
import useSidebar, { Menu, MenuCategory, MenuItem } from '@components/Sidebar';
import { clusterURL } from '@lib/searchEngine';
import Link from 'next/link';
import { useRouter } from 'next/router';

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
  const router = useRouter();

  return (
    <Sidebar>
      <Search
        placeholder="Locate a student"
        icon="fa-magnifying-glass"
        searchVariables={{
          onlyOnline: true,
        }}
        action={async (user) => {
          const url = clusterURL(
            user?.currentLocation?.campus?.name as string,
            user?.currentLocation?.identifier as string
          );

          if (url) {
            router.replace(url);
            return new Promise(() => {});
          }
        }}
      />
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
          <MenuCategory emoji="🇫🇮" name="Helsinki">
            <Link href="/clusters/helsinki/c1" passHref={true}>
              <a>
                <MenuItem
                  active={campus == 'helsinki' && cluster == 'c1'}
                  name="Cluster 1"
                  text="C1"
                />
              </a>
            </Link>
            <Link href="/clusters/helsinki/c2" passHref={true}>
              <a>
                <MenuItem
                  active={campus == 'helsinki' && cluster == 'c2'}
                  name="Cluster 2"
                  text="C2"
                />
              </a>
            </Link>
            <Link href="/clusters/helsinki/c3" passHref={true}>
              <a>
                <MenuItem
                  active={campus == 'helsinki' && cluster == 'c3'}
                  name="Cluster 3"
                  text="C3"
                />
              </a>
            </Link>
          </MenuCategory>
          <MenuCategory emoji="🇪🇸" name="Malaga">
            <Link href="/clusters/malaga/c1" passHref={true}>
              <a>
                <MenuItem
                  active={campus == 'malaga' && cluster == 'c1'}
                  name="Cluster 1"
                  text="C1"
                />
              </a>
            </Link>
            <Link href="/clusters/malaga/c2" passHref={true}>
              <a>
                <MenuItem
                  active={campus == 'malaga' && cluster == 'c2'}
                  name="Cluster 2"
                  text="C2"
                />
              </a>
            </Link>
            <Link href="/clusters/malaga/c3" passHref={true}>
              <a>
                <MenuItem
                  active={campus == 'malaga' && cluster == 'c3'}
                  name="Cluster 3"
                  text="C3"
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
