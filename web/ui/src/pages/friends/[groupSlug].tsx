import Loader from '@components/Loader';
import { Search } from '@components/Search';
import { Menu, MenuCategory, MenuItem, useSidebar } from '@components/Sidebar';
import UserCard from '@components/UserCard';
import {
  MyFollowingsDocument,
  useCreateFriendshipMutation,
  useMyFollowingsQuery,
  User,
} from '@graphql.d';
import { isFirstLoading } from '@lib/apollo';
import classNames from 'classnames';
import { NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';

type PageProps = {};

const IndexPage: NextPage<PageProps> = () => {
  const { SidebarProvider, Sidebar, PageContainer, PageContent } = useSidebar();
  const {
    query: { groupSlug },
  } = useRouter();

  const [createFriendship] = useCreateFriendshipMutation();
  const { data, networkStatus, refetch } = useMyFollowingsQuery({
    fetchPolicy: 'network-only', // Used for first execution
    nextFetchPolicy: 'cache-and-network', // Used for subsequent executions
    variables: {
      // TODO(@42Atomys): plug to the backend
      // groupSlug: groupSlug === 'all' ? groupSlug as string : null
    },
  });
  const { myFollowing } = data || {};
  const hasFollowing = (myFollowing?.length || 0) > 0;

  return (
    <SidebarProvider>
      <Head>
        <title>Friendship - Stud42</title>
      </Head>
      <PageContainer>
        <Sidebar>
          <Search
            placeholder="Add a friend"
            icon="fa-user-plus"
            action={async (user) => {
              return createFriendship({
                variables: { userID: user?.id },
                onCompleted: () => refetch(),
              });
            }}
          />
          <div>
            <Menu>
              <MenuItem
                href="/friends/all"
                active={groupSlug === 'all'}
                emoji="👥"
                name="All friends"
              />
              {/* // TODO(@42Atomys): plug to the backend */}
              <MenuCategory name="Friends groups">
                {/* {50 chars max} */}
                <MenuItem
                  href="/friends/groupies"
                  active={groupSlug === 'groupies'}
                  emoji="🔥"
                  name="Groupies"
                />
                <MenuItem
                  href="/friends/bons-gars-avec-qui-trainer-a-00h-en-e1-surtout-le"
                  active={
                    groupSlug ===
                    'bons-gars-avec-qui-trainer-a-00h-en-e1-surtout-le'
                  }
                  emoji="🔮"
                  name="Bons gars avec qui trainer a 00h en E1 surtout le."
                />
                <MenuItem
                  href="/friends/oooooooooooooooooooooooooooooooooooooooooooooooooo"
                  active={
                    groupSlug ===
                    'oooooooooooooooooooooooooooooooooooooooooooooooooo'
                  }
                  emoji="💥"
                  name="OOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO"
                />
              </MenuCategory>
              {/* // TODO(@42Atomys): TBD if we want to split it or merge it */}
              <MenuCategory name="Dynamic friend groups">
                <MenuItem
                  href="/friends/fake-group"
                  active={groupSlug === 'fake-group'}
                  emoji="🛠"
                  name="Fake group"
                  rightText="Dynamic"
                />
              </MenuCategory>
            </Menu>
            {/* <span className="flex p-2 text-xs text-slate-400 dark:text-slate-600 italic">
              You can create and manage custom groups in the future
            </span> */}
          </div>
        </Sidebar>
        <PageContent
          className={classNames(
            `p-2 flex-1 flex flex-wrap justify-center`,
            hasFollowing ? 'h-fit' : 'min-h-screen items-center',
            isFirstLoading(networkStatus) && 'min-h-screen items-center'
          )}
        >
          {isFirstLoading(networkStatus) && <Loader />}
          {!isFirstLoading(networkStatus) && data && !hasFollowing && (
            <div className="text-center">
              <h1 className="text-4xl font-light text-slate-500">
                You are not following anyone
              </h1>
              <span className="text-slate-400 dark:text-slate-600">
                Follow your first friend by entering her login, first name or
                last name on the sidebar
              </span>
            </div>
          )}
          {!isFirstLoading(networkStatus) &&
            myFollowing?.map((user) => (
              <UserCard
                key={user?.duoLogin}
                user={user as User}
                location={user?.lastLocation}
                refetchQueries={[MyFollowingsDocument]}
                className="m-2 hover:scale-[102%] hover:border-indigo-500"
              />
            ))}
        </PageContent>
      </PageContainer>
    </SidebarProvider>
  );
};

// export const getServerSideProps: GetServerSideProps<PageProps> = async ({ query: { groupSlug }, req, res }) => {
//   res.setHeader(
//     'Cache-Control',
//     'public, s-maxage=10, stale-while-revalidate=59'
//   )

//   const { data, } = await queryAuthenticatedSSR<MyFollowingsQuery>(req, {
//     query: MyFollowingsDocument,
//   });

//   return {
//     props: {
//       friends: data.myFollowing
//     },
//   }
// }

export default IndexPage;
