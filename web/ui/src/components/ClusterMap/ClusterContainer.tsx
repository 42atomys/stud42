import Loader from '@components/Loader';
import useSidebar from '@components/Sidebar';
import { UserPopup, PopupConsumer, PopupProvider } from '@components/UserPopup';
import { useClusterViewQuery, User } from '@graphql.d';
import { ClusterSidebar } from '../../containers/clusters/ClusterSidebar';
import { ClusterContainerComponent } from './types';

export const ClusterContainer: ClusterContainerComponent = ({
  campus,
  cluster,
  children,
}) => {
  const { SidebarProvider, PageContainer, PageContent } = useSidebar();
  const { data, loading, error } = useClusterViewQuery({
    variables: { campusName: campus, identifierPrefix: cluster },
  });

  return (
    <SidebarProvider>
      <PageContainer>
        <PopupProvider>
          <>
            <ClusterSidebar campus="paris" cluster={cluster as string} />
            <PageContent
              className={
                'p-2 flex-1 flex justify-center min-h-screen items-center'
              }
            >
              {loading && <Loader />}
              {error && <div>Error!</div>}

              {!loading && data && (
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
                      />
                    </>
                  )}
                </PopupConsumer>
              )}
            </PageContent>
          </>
        </PopupProvider>
      </PageContainer>
    </SidebarProvider>
  );
};
