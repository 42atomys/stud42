import { Menu, MenuCategory, MenuItem, useSidebar } from '@components/Sidebar';
import Tooltip from '@components/Tooltip';
import classNames from 'classnames';
import { NextPage } from 'next';
import Head from 'next/head';
import { ClassNameProps } from 'types/globals';

const SettingsPages = [
  'profile',
  'apparence',
  'awesomeness',
  'accounts',
  'about',
  'help',
  'terms',
  'privacy',
] as const;

type PageProps = {
  page: typeof SettingsPages[number];
  children: React.ReactNode;
} & ClassNameProps;

export const SettingsLayout: NextPage<PageProps> = ({
  page,
  children,
  className,
}) => {
  const { SidebarProvider, Sidebar, PageContainer, PageContent } = useSidebar();

  return (
    <SidebarProvider>
      <Head>
        <title>Settings - Stud42</title>
      </Head>
      <PageContainer>
        <Sidebar>
          <Menu size="sm">
            <MenuCategory name="Settings">
              <MenuItem
                active={page === 'profile'}
                // href="/settings/profile"
                icon="fa-user"
                name="Public profile"
                rightText="Soon"
              />
              <MenuItem
                active={page === 'apparence'}
                href="/settings/apparence"
                icon="fa-paintbrush"
                name="Apparence"
              />
              <MenuItem
                active={page === 'awesomeness'}
                // href="/settings/awesomeness"
                icon="fa-sparkles"
                name="Awesomess"
                rightText={
                  <Tooltip
                    text="Sponsors Only"
                    subText="This feature is only accessible for Github Sponsors."
                    direction="right"
                    size="sm"
                    color="fuchsia"
                  >
                    <i className="fa-solid fa-user-astronaut" />
                  </Tooltip>
                }
                className='!text-fuchsia-400 dark:!text-fuchsia-600 hover:!bg-fuchsia-500/20 hover:!text-fuchsia-500 [&_.anchor-sub-text]:hover:!text-fuchsia-500 [&[data-active="true"]]:!bg-fuchsia-500/20 [&[data-active="true"]_.anchor-sub-text]:!text-fuchsia-500 '
              />
            </MenuCategory>
            <MenuCategory name="Access">
              <MenuItem
                active={page === 'accounts'}
                // href="/settings/accounts"
                icon="fa-shield-check"
                name="Accounts"
                rightText="Soon"
              />
            </MenuCategory>
            <MenuCategory name="About">
              <MenuItem
                active={page === 'about'}
                // href="/settings/about"
                icon="fa-info-circle"
                name="About"
              />
              <MenuItem
                active={page === 'help'}
                // href="/settings/help"
                icon="fa-question-circle"
                name="Help"
              />
              <MenuItem
                active={page === 'terms'}
                // href="/settings/terms"
                icon="fa-file-alt"
                name="Terms"
              />
              <MenuItem
                active={page === 'privacy'}
                // href="/settings/privacy"
                icon="fa-file-alt"
                name="Privacy"
              />
            </MenuCategory>
            <hr className="my-2 border-slate-200 dark:border-slate-800" />
            <MenuItem
              href="/auth/signout"
              icon="fa-sign-out-alt"
              name="Logout"
              className='!text-red-400 dark:!text-red-600 hover:!bg-red-500/20 hover:!text-red-500 [&_.anchor-sub-text]:hover:!text-red-500 [&[data-active="true"]]:!bg-red-500/20'
            />
            <hr className="my-2 border-slate-200 dark:border-slate-800" />
            <span className="p-2 text-xs text-slate-400 dark:text-slate-600 italic box-decoration-clone">
              You can create features request and report bugs on the{' '}
              <a
                href="https://github.com/42Atomys/stud42/issues"
                className="text-slate-500"
                target="_blank"
                rel="noopener noreferrer"
              >
                Github Issues
              </a>
              .
            </span>
          </Menu>
        </Sidebar>
        <PageContent
          className={classNames(
            `p-4 flex-1 flex flex-col container mx-auto px-8 max-w-7xl`,
            className
          )}
        >
          {children}
        </PageContent>
      </PageContainer>
    </SidebarProvider>
  );
};

export default SettingsLayout;
