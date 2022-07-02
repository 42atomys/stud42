import React from 'react';
import { Menu, MenuCategory, MenuItem, useSidebar } from '@components/Sidebar';
import classNames from 'classnames';
import Head from 'next/head';
import { NextPage } from 'next';
import UserCard from '@components/UserCard';
import { Search } from '@components/Search';
import { MyFollowingsDocument, useMyFollowingsQuery, User } from '@graphql.d';
import Loader from '@components/Loader';
import { isFirstLoading } from '@lib/apollo';

type PageProps = {};

const IndexPage: NextPage<PageProps> = () => {
  const { SidebarProvider, Sidebar, PageContainer, PageContent } = useSidebar();

  const { data, networkStatus } = useMyFollowingsQuery();
  const { me } = data || {};
  const hasFollowing = (me?.following?.length || 0) > 0;

  return (
    <SidebarProvider>
      <Head>
        <title>Friendship - Stud42</title>
      </Head>
      <PageContainer>
        <Sidebar>
          <Search />
          <div>
            <Menu>
              <MenuCategory name="Friends lists">
                {/*
                 * Actually All friends is the only group. When multiple groups feature is available
                 * this will be the place to display the groups. Remove the first argument of classNames
                 * and set it dynamically based on the url
                 */}
                <MenuItem active={true} emoji="👥" name="All friends" />
              </MenuCategory>
            </Menu>
            <span className="flex p-2 text-xs text-slate-400 dark:text-slate-600 italic">
              You can create and manage custom groups in the future
            </span>
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
          {me?.following.map((user) => (
            <UserCard
              key={user?.duoLogin}
              user={user as User}
              location={user?.currentLocation}
              refetchQueries={[MyFollowingsDocument]}
              className="m-2 hover:scale-[102%] hover:border-indigo-500"
            />
          ))}
        </PageContent>
      </PageContainer>
    </SidebarProvider>
  );
};

export const getStaticProps = () => ({
  props: {},
});

export default IndexPage;
