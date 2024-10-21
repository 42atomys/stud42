import Logo from '@assets/images/logo.svg';
import { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';

type PageProps = {};

const HelpPage: NextPage<PageProps> = () => {
  return (
    <div className="">
      <Head>
        <title>Help Center - S42</title>
      </Head>
      <div className="w-100 bg-black p-4 text-slate-200 text-center">
        I&apos;m fine, send me back to the{' '}
        <Link
          className="underline text-indigo-500 hover:cursor-pointer"
          href="/"
        >
          S42 application
        </Link>
      </div>
      <div className="w-100 bg-indigo-500 p-4 text-slate-900 text-center">
        This page stay under construction, thanks for your comprehension.
      </div>
      <div className="p-4 container mx-auto">
        <div className="flex flex-col">
          <div className="flex items-center">
            <Logo
              height={96}
              className="fill-slate-800 -top-3 relative  mr-4 dark:fill-white mt-4 mb-4"
            />
            <h1 className="text-8xl font-black py-5 mb-10 bg-clip-text text-transparent bg-gradient-to-r w-fit from-fuchsia-500 via-indigo-500 to-sky-500">
              Help Center
            </h1>
          </div>
          <div className="my-10">
            <p className="mb-4">
              This help center is not released yet, and only be an index of
              resources and links for the project.
            </p>

            <p className="mb-4">
              Please note that this help center is currently under development.
              <br />
              In the meantime, here is an index of resources and links for the
              project:
            </p>

            <ul>
              <li>
                <strong>Found a bug?</strong> Report it on our{' '}
                <a
                  className="underline hover:cursor-pointer text-indigo-500"
                  href="https://github.com/42atomys/stud42"
                  target="_blank"
                  rel="noreferrer"
                >
                  GitHub page
                </a>
                .
              </li>
              <li>
                <strong>Have an idea or want to share inputs?</strong> Join our
                conversation on{' '}
                <a
                  className="underline hover:cursor-pointer text-indigo-500"
                  href="https://discord.gg/5f864c6hyj"
                  target="_blank"
                  rel="noreferrer"
                >
                  Discord
                </a>
                .
              </li>
              <li>
                <strong>Concerned about your privacy?</strong> Learn more on our{' '}
                <a
                  className="underline hover:cursor-pointer text-indigo-500"
                  href="/about/privacy"
                  target="_blank"
                >
                  Privacy Policy
                </a>{' '}
                page.
              </li>
              <li>
                <strong>Any other questions?</strong> Contact our admins on{' '}
                <a
                  className="underline hover:cursor-pointer text-indigo-500"
                  href="https://discord.gg/5f864c6hyj"
                  target="_blank"
                  rel="noreferrer"
                >
                  Discord
                </a>{' '}
                or email us at{' '}
                <a
                  className="underline hover:cursor-pointer text-indigo-500"
                  href="mailto:admins@s42.app"
                >
                  admins@s42.app
                </a>
                .
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HelpPage;
