import { NewBadgy } from '@components/Badge';
import { Menu, MenuCategory, MenuItem, useSidebar } from '@components/Sidebar';
import '@lib/prototypes/string';
import classNames from 'classnames';
import { NextPage } from 'next';
import { signOut } from 'next-auth/react';
import Head from 'next/head';
import { PropsWithChildren } from 'react';
import { PropsWithClassName } from 'types/globals';
import { SettingsLayoutProps } from './types';

export const SettingsLayout: NextPage<
  PropsWithClassName<PropsWithChildren<SettingsLayoutProps>>
> = ({ page, children, className }) => {
  const { SidebarProvider, Sidebar, PageContainer, PageContent } = useSidebar();
  const pageTitle = `${page.toSentenceCase()} Settings - S42`;
  return (
    <SidebarProvider>
      <Head>
        <title>{pageTitle}</title>
      </Head>
      <PageContainer>
        <Sidebar>
          <Menu size="sm">
            <MenuCategory name="Settings">
              <MenuItem
                active={page === 'profile'}
                href="/settings/profile"
                icon="fa-id-badge"
                name="Public profile"
                rightChildren={<NewBadgy />}
              />
              <MenuItem
                active={page === 'account'}
                href="/settings/account"
                icon="fa-user"
                name="Account"
                rightChildren={<NewBadgy />}
              />
              <MenuItem
                active={page === 'apparence'}
                href="/settings/apparence"
                icon="fa-paintbrush"
                name="Apparence"
              />
              <MenuItem
                active={page === 'awesomeness'}
                href="/settings/awesomeness"
                icon="fa-sparkles"
                name="Awesomess"
                rightChildren={<NewBadgy />}
                className='!text-fuchsia-400 dark:!text-fuchsia-600 hover:!bg-fuchsia-500/20 hover:!text-fuchsia-500 [&_.anchor-sub-text]:hover:!text-fuchsia-500 [&[data-active="true"]]:!bg-fuchsia-500/20 [&[data-active="true"]_.anchor-sub-text]:!text-fuchsia-500 '
              />
            </MenuCategory>
            <MenuCategory name="About">
              <MenuItem
                active={page === 'about'}
                href="/about"
                linkTarget="_blank"
                icon="fa-info-circle"
                name="About"
                rightChildren={
                  <i className="fa-light fa-arrow-up-right-from-square"></i>
                }
              />
              <MenuItem
                active={page === 'help'}
                href="/about/help"
                linkTarget="_blank"
                icon="fa-question-circle"
                name="Help"
                rightChildren={
                  <i className="fa-light fa-arrow-up-right-from-square"></i>
                }
              />
              <MenuItem
                active={page === 'terms'}
                href="/about/terms"
                linkTarget="_blank"
                icon="fa-file-alt"
                name="Terms"
                rightChildren={
                  <i className="fa-light fa-arrow-up-right-from-square"></i>
                }
              />
              <MenuItem
                active={page === 'privacy'}
                href="/about/privacy"
                linkTarget="_blank"
                icon="fa-file-alt"
                name="Privacy"
                rightChildren={
                  <i className="fa-light fa-arrow-up-right-from-square"></i>
                }
              />
            </MenuCategory>
            <hr className="my-2 border-slate-200 dark:border-slate-800" />
            <MenuItem
              href="/auth/signout"
              onClick={() => signOut()}
              icon="fa-sign-out-alt"
              name="Logout"
              className='!text-red-400 dark:!text-red-600 hover:!bg-red-500/20 hover:!text-red-500 [&_.anchor-sub-text]:hover:!text-red-500 [&[data-active="true"]]:!bg-red-500/20'
            />
            <hr className="my-2 border-slate-200 dark:border-slate-800" />
            <span className="p-2 text-xs text-slate-400 dark:text-slate-600 italic box-decoration-clone">
              You can create features request and report bugs on the{' '}
              <a
                href="https://github.com/42atomys/stud42/issues"
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
            className,
          )}
        >
          {children}
        </PageContent>
      </PageContainer>
    </SidebarProvider>
  );
};

export default SettingsLayout;
