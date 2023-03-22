import { ColorDisplay } from '@components/Form';
import Loader from '@components/Loader';
import { Search } from '@components/Search';
import { Menu, MenuCategory, MenuItem, useSidebar } from '@components/Sidebar';
import UserCard from '@components/UserCard';
import { FriendsGroupAddModal } from '@containers/friends';
import {
  FollowsGroupKind,
  FriendsPageDocument,
  FriendsPageQuery,
  useCreateFriendshipMutation,
  useFriendsPageQuery,
  User,
} from '@graphql.d';
import { isFirstLoading } from '@lib/apollo';
import classNames from 'classnames';
import { NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';

type PageProps = {};
type GroupType = NonNullable<FriendsPageQuery['myFollowsGroups']>[number];

const DefaultEmoji = '👥';

const MenuGroupItem = ({
  currentGroup,
  group,
}: {
  currentGroup: GroupType | undefined;
  group: GroupType;
}) => {
  if (!group) return null;

  return (
    <MenuItem
      key={`group-${group.id}`}
      href={`/friends/${group.slug}`}
      active={currentGroup?.slug === group.slug}
      className="[&_#right-text]:text-base"
      leftChildren={
        <>
          <ColorDisplay color={group.color} />
          <span className="ml-2">{group.name}</span>
        </>
      }
      rightChildren={
        (group.kind === FollowsGroupKind.MANUAL && (
          <span className="invisible group-hover:visible opacity-50 hover:opacity-100">
            <i className="fa-fw fa-light fa-pencil" />
          </span>
        )) ||
        ''
      }
    />
  );
};

const NewFriendGroupMenuItem: React.FC<{}> = () => (
  <FriendsGroupAddModal>
    <MenuItem
      key={`add-friend-group`}
      name="New group"
      icon="[--fa-fw-width:24px] fa-kit fa-fw fa-regular-user-group-circle-plus"
      className="mt-4 bg-slate-200 hover:bg-indigo-100/10 dark:bg-slate-800 dark:hover:bg-indigo-900/10 ring-2 ring-transparent hover:ring-indigo-500 [&>span]:justify-center [&>span>span]:flex-none"
    />
  </FriendsGroupAddModal>
);

const IndexPage: NextPage<PageProps> = () => {
  const { SidebarProvider, Sidebar, PageContainer, PageContent } = useSidebar();
  const {
    query: { groupSlug },
  } = useRouter();

  const [createFriendship] = useCreateFriendshipMutation();
  const { data, networkStatus, refetch } = useFriendsPageQuery({
    fetchPolicy: 'cache-and-network', // Used for first execution
    nextFetchPolicy: 'cache-and-network', // Used for subsequent executions
    variables: {
      followsGroupSlug: groupSlug === 'all' ? null : (groupSlug as string),
    },
  });
  const { myFollowings, myFollowsGroups } = data || {};
  const hasFollowing = (myFollowings?.length || 0) > 0;
  const currentGroup = myFollowsGroups?.find((g) => g?.slug === groupSlug);
  return (
    <SidebarProvider>
      <Head>
        {(currentGroup && (
          <title>
            {currentGroup.emoji} {currentGroup.name} - Friendship - Stud42
          </title>
        )) || <title>All Friendship - Stud42</title>}
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
                emoji={DefaultEmoji}
                name="All friends"
              />
              <MenuCategory
                name="Friends groups"
                isCollapsable={true}
                collapsed={false}
              >
                {myFollowsGroups
                  ?.filter((x) => x?.kind === FollowsGroupKind.MANUAL)
                  .map((group) => (
                    <MenuGroupItem
                      key={`group-${group?.id}`}
                      currentGroup={currentGroup}
                      group={group}
                    />
                  ))}
                <NewFriendGroupMenuItem />
              </MenuCategory>
              <MenuCategory
                name="Dynamic friends groups"
                isCollapsable={true}
                collapsed={true}
              >
                {myFollowsGroups
                  ?.filter((x) => x?.kind === FollowsGroupKind.DYNAMIC)
                  .map((group) => (
                    <MenuGroupItem
                      key={`group-${group?.id}`}
                      currentGroup={currentGroup}
                      group={group}
                    />
                  ))}

                <span className="flex p-2 text-xs text-slate-400 dark:text-slate-600 italic">
                  ⚡️ Dynamic groups are automatically generated based on your
                  cursus, current projects, etc.
                </span>
              </MenuCategory>
            </Menu>
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
            myFollowings?.map((user, i) => (
              <UserCard
                key={`user-${user.id}-${i}`}
                user={user as User}
                location={user?.lastLocation}
                refetchQueries={[FriendsPageDocument]}
                className="m-2 hover:scale-[102%] hover:border-indigo-500"
              />
            ))}
        </PageContent>
      </PageContainer>
    </SidebarProvider>
  );
};

export default IndexPage;
