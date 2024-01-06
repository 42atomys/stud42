import Search from '@components/Search';
import useSidebar, { Menu, MenuCategory, MenuItem } from '@components/Sidebar';
import { useMe } from '@ctx/currentUser';
import { useClusterSidebarDataQuery } from '@graphql.d';
import { isFirstLoading } from '@lib/apollo';
import Campuses, {
  CampusIdentifier,
  ICampus,
  ICluster,
} from '@lib/clustersMap';
import '@lib/prototypes/string';
import { clusterURL } from '@lib/searchEngine';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import '@lib/prototypes/string';

/**
 * ClusterSidebar is the sidebar for the cluster page. It contains the cluster
 * menu statically defined. Used accross all cluster pages.
 * @param {string} activeCampus - The campus used to match the current campus
 * @param {string} activeCluster - The cluster used to match the current cluster
 * @returns {JSX.Element} The sub sidebar component
 */
export const ClusterSidebar = ({
  activeCampus,
  activeCluster,
}: {
  activeCampus: ICampus;
  activeCluster: ICluster;
}) => {
  const { Sidebar } = useSidebar();
  const router = useRouter();
  const campusKeys = Object.keys(Campuses) as Array<CampusIdentifier>;
  const { me } = useMe();
  const { data: { locationsStatsByPrefixes = [] } = {}, networkStatus } =
    useClusterSidebarDataQuery({
      variables: {
        campusName: activeCampus.name(),
        clusterPrefixes: activeCampus.clusters().map((c) => c.identifier()),
      },
    });
  const myCampusidentifier =
    me?.currentCampus?.name?.removeAccents().toCamelCase() || '';
  const freePlacesPerCluster: { [key: string]: number } =
    locationsStatsByPrefixes
      .map((l) => {
        const totalWorkspaces =
          activeCampus.cluster(l.prefix)?.totalWorkspaces() || 0;
        return [l.prefix, totalWorkspaces - l.occupiedWorkspace];
      })
      .reduce(
        (acc, [prefix, freePlaces]) => ({ ...acc, [prefix]: freePlaces }),
        {},
      );

  if (isFirstLoading(networkStatus)) {
    return (
      <Sidebar>
        <div className="animate-pulse flex w-full flex-col">
          <span className="h-11 bg-slate-300 dark:bg-slate-700 rounded mb-4"></span>
          {[...Array(3)].map((_, i) => (
            <React.Fragment key={`loader-sidebar-${i}`}>
              <span className="h-6 bg-slate-300 dark:bg-slate-700 rounded mb-4"></span>
              <span className="h-6 w-1/2 bg-slate-300 dark:bg-slate-700 rounded mb-5 ml-4"></span>
              <span className="h-6 w-1/3 bg-slate-300 dark:bg-slate-700 rounded mb-5 ml-4"></span>
              <span className="h-6 w-2/5 bg-slate-300 dark:bg-slate-700 rounded mb-4 ml-4"></span>
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
            user?.currentLocation?.identifier as string,
          );

          return url ? router.replace(url) : Promise.reject();
        }}
      />
      <div>
        <Menu>
          {campusKeys
            .sort((a, b) => {
              // Sort the campus list in alphabetical order and put the current
              // campus at the top.
              return a?.equalsIgnoreCase(myCampusidentifier)
                ? -1
                : b?.equalsIgnoreCase(myCampusidentifier)
                  ? 1
                  : a.localeCompare(b);
            })
            .map((campusIdentifier) => {
              const campusData = Campuses[campusIdentifier];
              const isMyCampus =
                campusIdentifier?.equalsIgnoreCase(myCampusidentifier);
              const isActiveCampus =
                activeCampus.identifier() == campusData.identifier();

              return (
                <MenuCategory
                  key={`sidebar-campus-${campusData.identifier()}`}
                  emoji={campusData.emoji()}
                  name={campusData.name()}
                  text={isMyCampus ? 'Your campus' : undefined}
                  isCollapsable={!isMyCampus}
                  collapsed={!isActiveCampus && !isMyCampus}
                >
                  {campusData.clusters().map((cluster) => {
                    const clusterIdentifier = cluster.identifier();
                    return (
                      <Link
                        href={`/clusters/${campusData
                          .identifier()
                          .toSafeLink()}/${clusterIdentifier}`}
                        passHref={true}
                        key={`sidebar-clusters-${campusData.identifier()}-${clusterIdentifier}`}
                      >
                        <MenuItem
                          active={
                            isActiveCampus &&
                            clusterIdentifier == activeCluster.identifier()
                          }
                          name={
                            cluster.hasName()
                              ? cluster.name()
                              : clusterIdentifier.toUpperCase()
                          }
                          className="[&>div>span:first-of-type]:overflow-hidden [&>div>span]:whitespace-pre [&>div>span]:text-ellipsis"
                          leftChildren={
                            cluster.hasName()
                              ? clusterIdentifier.toUpperCase()
                              : null
                          }
                          rightChildren={
                            isActiveCampus ? (
                              <>
                                <span className="pr-1 text-xs">
                                  {freePlacesPerCluster[clusterIdentifier]}
                                </span>
                                <i className="fa-light fa-computer text-inherit"></i>
                              </>
                            ) : undefined
                          }
                        />
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
