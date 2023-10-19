import Loader from '@components/Loader';
import useSidebar from '@components/Sidebar';
import { PopupConsumer, PopupProvider, UserPopup } from '@components/UserPopup';
import { User, useClusterViewQuery } from '@graphql.d';
import { isFetchLoading } from '@lib/apollo';
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
  hightlightVisibility: () => 'DIMMED',
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
  const { data, error, networkStatus } = useClusterViewQuery({
    variables: {
      campusName: campus.name(),
      identifierPrefix: cluster.identifier(),
    },
    fetchPolicy: 'network-only',
    // This is a workaround due to missing websocket implementation.
    // TODO: Remove this when websocket is implemented.
    // See https://github.com/42Atomys/stud42/issues/259
    pollInterval: 1000 * 60, // 1 minute
  });

  useEffect(() => {
    if (highlightedIdentifier) {
      setHighlight(true);
      const timer = setTimeout(() => {
        replace(asPath.split('?')[0], undefined, { shallow: true });
        setHighlight(false);
      }, 5000);

      return () => clearTimeout(timer);
    }
    // Workaround due to this bug
    // https://github.com/vercel/next.js/issues/18127#issuecomment-950907739
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
            <ClusterSidebar activeCampus={campus} activeCluster={cluster} />
            <PageContent
              className={
                'p-2 flex-1 flex justify-center min-h-screen items-center'
              }
            >
              {isFetchLoading(networkStatus) && <Loader />}
              {error && <div>Error!</div>}

              {!isFetchLoading(networkStatus) && data && (
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
