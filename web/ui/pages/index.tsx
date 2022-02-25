import type { NextPage } from 'next';
import Head from 'next/head';
import Link from "next/link";
import Twemoji from 'react-twemoji';

const Home: NextPage = () => {
  return (
    <>
    <Head>
      <title>Stud42 Beta 3.0 - Sponsors Access</title>
    </Head>
    <div className="w-screen h-screen flex justify-center items-center bg-gradient-to-br from-green-300 via-blue-500 to-purple-600">
      <div className="bg-slate-900 border border-white/10 bg-opacity-75 w-full md:max-w-screen-md min-h-[300px] rounded-lg backdrop-filter backdrop-blur-lg backdrop-saturate-200 p-4 md:p-10 flex justify-center items-center flex-col">
        <h1 className="text-slate-900 font-extrabold text-4xl sm:text-5xl lg:text-6xl tracking-tight text-center dark:text-blue-100"><Twemoji className="flex"><span className="mr-4">Hi there</span> 👋</Twemoji></h1>
        <p className="block mt-6 text-blue-700 font-medium text-lg sm:text-lg lg:text-lg tracking-tight text-center dark:text-blue-300"><span className="text-blue-500">Stud42 v3 beta</span> is only available to Sponsors of project on GitHub</p>
        <hr className="border-white/10 my-6 w-full" />
        <div className="flex flex-col sm:flex-row sm:justify-around w-[90%]">
          <Link href="https://github.com/sponsors/42Atomys" passHref>
            <button className="flex text-white bg-[#050708]/30 focus:ring-4 focus:ring-[#333333]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center items-center dark:hover:bg-[#050708]/30 mr-2 my-2">
              <svg aria-hidden="true" height="16" viewBox="0 0 16 16" version="1.1" width="16" data-view-component="true" className="mr-2 -ml-1 w-4 h-4 fill-pink-500">
                  <path fillRule="evenodd" d="M4.25 2.5c-1.336 0-2.75 1.164-2.75 3 0 2.15 1.58 4.144 3.365 5.682A20.565 20.565 0 008 13.393a20.561 20.561 0 003.135-2.211C12.92 9.644 14.5 7.65 14.5 5.5c0-1.836-1.414-3-2.75-3-1.373 0-2.609.986-3.029 2.456a.75.75 0 01-1.442 0C6.859 3.486 5.623 2.5 4.25 2.5zM8 14.25l-.345.666-.002-.001-.006-.003-.018-.01a7.643 7.643 0 01-.31-.17 22.075 22.075 0 01-3.434-2.414C2.045 10.731 0 8.35 0 5.5 0 2.836 2.086 1 4.25 1 5.797 1 7.153 1.802 8 3.02 8.847 1.802 10.203 1 11.75 1 13.914 1 16 2.836 16 5.5c0 2.85-2.045 5.231-3.885 6.818a22.08 22.08 0 01-3.744 2.584l-.018.01-.006.003h-.002L8 14.25zm0 0l.345.666a.752.752 0 01-.69 0L8 14.25z"></path>
              </svg>
              Sponsor project
            </button>
          </Link>
          <button type="button" className="flex text-white bg-[#050708]/30 focus:ring-4 focus:ring-[#333333]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center items-center dark:hover:bg-[#050708]/30 mr-2 my-2">
          <svg className="mr-2 -ml-1 w-4 h-4" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="github" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 496 512"><path fill="currentColor" d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3 .3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5 .3-6.2 2.3zm44.2-1.7c-2.9 .7-4.9 2.6-4.6 4.9 .3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3 .7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3 .3 2.9 2.3 3.9 1.6 1 3.6 .7 4.3-.7 .7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3 .7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3 .7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z"></path></svg>
          Sign in with Github
          </button>
        </div>

      </div>
    </div>
    </>
  );
};

export default Home;
