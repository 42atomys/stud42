import Loader from '@components/Loader';
import useSidebar from '@components/Sidebar';
import { PopupConsumer, PopupProvider, UserPopup } from '@components/UserPopup';
import { useClusterViewQuery, User } from '@graphql.d';
import { isFirstLoading } from '@lib/apollo';
import { useRouter } from 'next/router';
import { createContext, useEffect, useState } from 'react';
import { ClusterSidebar } from '../../containers/clusters/ClusterSidebar';
import { ClusterContainerComponent, ClusterContextInterface } from './types';

/**
 * ClusterContext is a react context that holds the current cluster
 * information. It is used to share the cluster information between the
 * ClusterContainer and the ClusterMap components.
 */
export const ClusterContext = createContext<ClusterContextInterface>({
  highlight: false,
  hightlightVisibility: (_) => 'DIMMED',
});

/**
 * ClusterContainer component is used to display the cluster map and the cluster
 * sidebar. It is used in the cluster page ONLY. This component give facilities
 * to display the cluster map with popup management.
 * 
 * Children function parameters:
 * - locations: the locations of the cluster and campus
 * - showPopup: a function to show the popup
 * - hidePopup: a function to hide the popup
 * 
 * Example:
 * ```
    <ClusterContainer campus="Paris" cluster={cluster}>
      {({ locations, showPopup, hidePopup }) => (
        <div></div>
      )}
    </ClusterContainer>
 * ```
 *
 * You can see a fully fonctionnal example on Paris cluster map at
 * `src/pages/clusters/paris/[cluster].tsx`
 */
export const ClusterContainer: ClusterContainerComponent = ({
  campus,
  cluster,
  children,
}) => {
  const { SidebarProvider, PageContainer, PageContent } = useSidebar();
  const {
    asPath,
    query: { identifier: highlightedIdentifier },
    replace,
  } = useRouter();
  const [highlight, setHighlight] = useState(false);
  const { data, networkStatus, error } = useClusterViewQuery({
    variables: { campusName: campus, identifierPrefix: cluster },
  });

  useEffect(() => {
    if (highlightedIdentifier) {
      replace(asPath.split('?')[0], undefined, { shallow: true });
      setHighlight(true);
      const timer = setTimeout(() => setHighlight(false), 5000);

      return () => clearTimeout(timer);
    }
  }, [highlightedIdentifier]);

  return (
    <SidebarProvider>
      <PageContainer>
        <PopupProvider>
          <ClusterContext.Provider
            value={{
              highlight: highlight,
              hightlightVisibility: (identifier) =>
                highlightedIdentifier === identifier ? 'HIGHLIGHT' : 'DIMMED',
            }}
          >
            <ClusterSidebar
              campus={campus.toLowerCase()}
              cluster={cluster as string}
            />
            <PageContent
              className={
                'p-2 flex-1 flex justify-center min-h-screen items-center'
              }
            >
              {isFirstLoading(networkStatus) && <Loader />}
              {error && <div>Error!</div>}

              {!isFirstLoading(networkStatus) && data && (
                <PopupConsumer>
                  {([state, dispatch]) => (
                    <>
                      {children({
                        locations: data.locationsByCluster,
                        showPopup: (s) => dispatch('SHOW_POPUP', s),
                        hidePopup: () => dispatch('HIDE_POPUP', null),
                      })}
                      <UserPopup
                        user={state.user as User}
                        location={state.location}
                        position={state.position}
                        onClickOutside={() => dispatch('HIDE_POPUP', null)}
                      />
                    </>
                  )}
                </PopupConsumer>
              )}
            </PageContent>
          </ClusterContext.Provider>
        </PopupProvider>
      </PageContainer>
    </SidebarProvider>
  );
};
