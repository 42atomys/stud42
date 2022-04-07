import React from 'react';
import { useSidebar } from '@components/Sidebar';
import Avatar from '@components/Avatar/Avatar';
import Name from '@components/Name';
import { LocationBadge } from '@components/Badge';
import { Location, User } from 'types/globals';
import Twemoji from 'react-twemoji';
import classNames from 'classnames';
import Head from 'next/head';
import { Menu, Transition } from '@headlessui/react';

type PageProps = {};

const IndexPage: NextPage<PageProps> = () => {
  const { SidebarProvider, Sidebar, PageContainer, PageContent } = useSidebar();
  const { data: session } = useSession();

  const data: { friends: User[] } = {
    friends: [
      {
        login: 'noich',
        firstName: 'Noich',
        usualFirstName: null,
        lastName: 'One',
        lastConnectedAt: '2020-01-01 00:00:00',
        currentLocation: null
      },
      {
        login: 'ol',
        firstName: 'Testeur',
        usualFirstName: 'Testeuse',
        lastName: 'Two',
        lastConnectedAt: '2020-09-01 00:00:00',
        currentLocation: {
          campus: 'Paris',
          host: 'e2r1p12'
        }
      },
      {
        login: 'tyrael',
        firstName: 'Testeur',
        usualFirstName: 'staffu',
        lastName: 'One',
        lastConnectedAt: '2021-02-23 00:00:00',
        currentLocation: {
          campus: 'Paris',
          host: 'in Space 🚀'
        }
      },
      {
        login: 'jpeg',
        firstName: 'MMmh',
        usualFirstName: null,
        lastName: 'Curious',
        lastConnectedAt: null,
        currentLocation: null
      },
      {
        login: 'titus',
        firstName: null,
        usualFirstName: null,
        lastName: null,
        lastConnectedAt: null,
        currentLocation: null
      }
    ]
  };

  return (
    <SidebarProvider>
      <Head>
        <title>Friendship - Stud42</title>
      </Head>
      <PageContainer>
        <Sidebar>
          <div className='mb-2'>
            <div className='flex focus-within:border-indigo-500 border-2 border-transparent transition-all flex-row items-center bg-slate-200 dark:bg-slate-900 p-2 rounded'>
              <input className='bg-transparent flex-1 focus:outline-none peer placeholder:text-slate-400 dark:placeholder:text-slate-600' placeholder='Add a friend' maxLength={10} />
              <i className='fa-light fa-user-plus px-2 cursor-pointer transition-all fixed right-5 opacity-100 peer-focus:opacity-0 peer-focus:scale-125 peer-focus:text-indigo-500' />
              <i className='fa-regular fa-user-plus px-2 cursor-pointer transition-all fixed right-5 opacity-0 peer-focus:opacity-100 peer-focus:scale-125 peer-focus:text-indigo-500' />
            </div>
          </div>
          <div>
            <ul>
              <li className='font-bold my-2 ml-2'>Friends lists</li>
              {/* 
              * Actually All friends is the only group. When multiple groups feature is available
              * this will be the place to display the groups. Remove the first argument of classNames
              * and set it dynamically based on the url
            */}
              <li className={classNames('bg-indigo-500/20 text-indigo-500', 'empty:hidden transition-all hover:cursor-pointer px-2 py-2 rounded hover:bg-indigo-500/20 hover:text-indigo-500 flex flex-row items-center')}>
                <Twemoji noWrapper={true} options={{ folder: 'svg', ext: '.svg', className: 'w-[24px] h-[24px]' }}>
                  <i>👥</i>
                  <span className='ml-2'>All friends</span>
                </Twemoji>
              </li>
            </ul>
            <span className='flex p-2 text-xs text-slate-400 dark:text-slate-600 italic'>You can create and manage custom groups in the future</span>
          </div>
        </Sidebar>
        <PageContent className="p-2 flex-1 flex flex-wrap h-fit justify-center">
          {data.friends.map(friend => (
            // <div key={`friend-list-user-${friend.login}`} className='flex flex-col items-center border rounded-md border-slate-500/10 p-4 m-2 text-center grow-[1] max-w-[200px] transition-all hover:scale-[102%] hover:shadow-lg hover:shadow-slate-300/20 dark:hover:shadow-slate-700/20 hover:cursor-pointer hover:border-indigo-500'>

            <div key={`friend-list-user-${friend.login}`} className='flex flex-col relative group items-center p-4 m-2 text-center grow-[1] max-w-[200px] transition-all rounded-lg border-2 border-transparent hover:cursor-pointer hover:scale-[102%] hover:border-indigo-500'>
              <Avatar login={friend.login} size='xxxl' rounded className='mb-4' />
              <h2 className='font-bold uppercase'>{friend.login}</h2>
              <Name className='font-light' user={friend} />
              <LocationBadge {...friend.currentLocation as Location} />
              {/* <i className='fa-light fa-ellipsis-vertical absolute invisible group-hover:visible right-2 top-2 w-[18px] h-[18px] text-lg rounded-full p-2 hover:text-indigo-800 dark:hover:text-indigo-200 hover:bg-indigo-500/20'></i> */}
              <Example />
            </div>
          ))}
        </PageContent>
      </PageContainer>
    </SidebarProvider>
  );
};

const Example = () => {
  return (
    <div className="text-right absolute top-2 right-2">
      <Menu as="div" className="relative inline-block text-left">
        <Menu.Button className="inline-flex justify-center w-full">
          <i className='fa-light fa-ellipsis-vertical invisible group-hover:visible w-[18px] h-[18px] text-lg rounded-full p-2 hover:text-indigo-800 dark:hover:text-indigo-200 hover:bg-indigo-500/20'></i>
        </Menu.Button>
        <Transition
          as={React.Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute invisible group-hover:visible right-0 w-56 mt-2 origin-top-right bg-white dark:bg-slate-900 divide-y divide-gray-100 dark:divide-slate-800 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div className="px-1 py-1">
              <Menu.Item>
                  <button className='hover:bg-red-500 hover:text-white text-red-500 group flex rounded-md items-center w-full px-2 py-2 text-sm'>
                    <i className='fa-light fa-trash pr-2'></i>
                    <span>Delete</span>
                  </button>
              </Menu.Item>
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  )
}

export const getStaticProps = () => ({
  props: {},
});

IndexPage.auth = {
  loading: <></>,
  required: false,
};

export default IndexPage;
