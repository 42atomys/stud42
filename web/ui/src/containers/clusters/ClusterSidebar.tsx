import { CampusClusterMapData, CampusNames } from '@components/ClusterMap';
import Search from '@components/Search';
import useSidebar, { Menu, MenuCategory, MenuItem } from '@components/Sidebar';
import { useMeWithFlagsQuery } from '@graphql.d';
import { LocalStorageKeys } from '@lib/localStorageKeys';
import '@lib/prototypes/string';
import { clusterURL } from '@lib/searchEngine';
import useLocalStorage from '@lib/useLocalStorage';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';

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
  const campusKeys = Object.keys(CampusClusterMapData) as Array<CampusNames>;

  const { data: { me } = {}, loading } = useMeWithFlagsQuery();
  // Default to paris in case of any error during the beta and migration of data
  const myCampusNameLowerFromAPI = me?.currentCampus?.name?.toLowerCase() || '';

  const [myCampusNameCached, setMyCampusName] = useLocalStorage(
    LocalStorageKeys.MyCurrentCampusName,
    ''
  );

  useEffect(() => {
    if (myCampusNameCached !== myCampusNameLowerFromAPI) {
      setMyCampusName(myCampusNameLowerFromAPI);
    }
  }, [myCampusNameLowerFromAPI]); // eslint-disable-line react-hooks/exhaustive-deps

  if (loading && !myCampusNameCached) {
    return (
      <Sidebar>
        <div className="animate-pulse flex w-full flex-col">
          <span className="h-11 bg-slate-700 rounded mb-4"></span>
          {[...Array(3)].map((_, i) => (
            <React.Fragment key={`loader-sidebar-${i}`}>
              <span className="h-6 bg-slate-700 rounded mb-4"></span>
              <span className="h-6 w-1/2 bg-slate-700 rounded mb-5 ml-4"></span>
              <span className="h-6 w-1/3 bg-slate-700 rounded mb-5 ml-4"></span>
              <span className="h-6 w-2/5 bg-slate-700 rounded mb-4 ml-4"></span>
            </React.Fragment>
          ))}
        </div>
      </Sidebar>
    );
  }

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
          {campusKeys
            .sort((a, b) => {
              // Sort the campus list in alphabetical order and put the current
              // campus at the top.
              return a?.equalsIgnoreCase(myCampusNameCached)
                ? -1
                : b?.equalsIgnoreCase(myCampusNameCached)
                ? 1
                : a.localeCompare(b);
            })
            .map((campusName) => {
              const campusData = CampusClusterMapData[campusName]._data;

              return (
                <MenuCategory
                  key={`sidebar-campus-${campusName}`}
                  emoji={campusData.emoji}
                  name={campusName}
                  text={
                    myCampusNameCached?.equalsIgnoreCase(campusName)
                      ? 'Your campus'
                      : undefined
                  }
                >
                  {Object.keys(CampusClusterMapData[campusName])
                    .filter((a) => a !== '_data')
                    .map((clusterName) => {
                      const clusterNickname =
                        // @ts-ignore
                        // prettier-ignore
                        CampusClusterMapData[campusName]._data.clusterNames[clusterName];

                      return (
                        <Link
                          href={`/clusters/${campusName}/${clusterName}`}
                          passHref={true}
                          key={`sidebar-clusters-${campusName}-${clusterName}`}
                        >
                          <a>
                            <MenuItem
                              active={
                                campus == campusName && cluster == clusterName
                              }
                              name={clusterNickname}
                              leftText={clusterName.toUpperCase()}
                            />
                          </a>
                        </Link>
                      );
                    })}
                </MenuCategory>
              );
            })}
        </Menu>
        <span className="flex p-2 text-xs text-slate-400 dark:text-slate-600 italic">
          You don&apos;t see your campus ? Go on github and add it !
        </span>
      </div>
    </Sidebar>
  );
};
