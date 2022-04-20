import { GetServerSideProps, NextPage } from 'next';
import Link from 'next/link';
import { BuiltInProviderType } from 'next-auth/providers';
import {
  ClientSafeProvider,
  getProviders,
  LiteralUnion,
  signIn,
} from 'next-auth/react';
import Logo from '@assets/images/logo.svg';
import Logo42 from '@assets/images/logo-42.svg';
import { useRouter } from 'next/router';
import Error from '@components/AuthError/AuthError';

type PageProps = {
  providers: Record<
    LiteralUnion<BuiltInProviderType, string>,
    ClientSafeProvider
  >;
};

export const LoginPage: NextPage<PageProps, {}> = () => {
  const {
    query: { callbackUrl, error, provider },
  } = useRouter();

  return (
    <div className="w-[100vw] h-[100vh] flex items-center">
      <div className="hidden lg:block bg-gradient-to-tr from-fuchsia-500 via-indigo-500 to-sky-500 w-[61.80%] h-[100vh]"></div>
      <div className="lg:flex-1 p-8 lg:p-16 border-t-4 lg:border-t-0 lg:border-l-2 border-indigo-600 bg-gradient-to-tl from-slate-100 to-slate-200 dark:from-slate-900 dark:to-slate-800 w-full h-[100vh] flex flex-col justify-center">
        <div className="flex items-center">
          <Logo
            height={96}
            className="fill-slate-800 -top-3 relative  mr-4 dark:fill-white mt-4 mb-4"
          />
          <h1 className="text-8xl font-black py-5 mb-10 bg-clip-text text-transparent bg-gradient-to-r w-fit from-fuchsia-500 via-indigo-500 to-sky-500">
            Login
          </h1>
        </div>
        <div className="bg-orange-400 px-6 py-4 text-white rounded mb-10">
          <h1 className="text-lg mb-2">Currently in closed beta</h1>
          <p className="text-sm text-orange-800 dark:text-orange-100 mb-2">
            The stud42 v3 beta is currently reserved for project <br />
            sponsors on github.
            <br />
            <br />
            Support the project and become a pioneering contributor to the new
            version
          </p>
          <Link href="https://github.com/sponsors/42Atomys" passHref={true}>
            <a
              className="font-medium underline underline-offset-2"
              target="_blank"
            >
              Sponsor it on Github
            </a>
          </Link>
        </div>
        {error && <Error error={error as ErrorType} />}
        <p>Sign up with your 42 account to enjoy app</p>
        <p className="text-sm text-slate-600 dark:text-slate-400 mb-10">
          Only one step, click bellow !
        </p>

        {(!provider || provider == 'duo') && (
          <button
            className="w-fit flex flex-row group justify-center items-center bg-black hover:bg-white hover:text-black transition-all dark:border-0 border-black border-2 border-transparent text-white py-2 px-8 rounded uppercase my-4"
            onClick={() =>
              signIn('42-school', { callbackUrl: callbackUrl as string })
            }
          >
            <span>Sign in with</span>
            <Logo42
              height={18}
              className="ml-2 transition-all fill-white group-hover:fill-black"
            />
          </button>
        )}

        {provider == 'github' && (
          <button
            className="w-fit flex flex-row group justify-center items-center bg-black hover:bg-white hover:text-black transition-all dark:border-0 border-black border-2 border-transparent text-white py-2 px-8 rounded uppercase my-4"
            onClick={() =>
              signIn('github', { callbackUrl: callbackUrl as string })
            }
          >
            <span className="mr-2">Sign in with</span>
            <i className="fa-brands fa-github "></i>
          </button>
        )}

        {provider == 'discord' && (
          <button
            className="w-fit flex flex-row group justify-center items-center bg-black hover:bg-white hover:text-black transition-all dark:border-0 border-black border-2 border-transparent text-white py-2 px-8 rounded uppercase my-4"
            onClick={() =>
              signIn('discord', { callbackUrl: callbackUrl as string })
            }
          >
            <span className="mr-2">Sign in with</span>
            <i className="fa-brands fa-discord"></i>
          </button>
        )}
      </div>
    </div>
  );
};

// This is the recommended way for Next.js 9.3 or newer
export const getServerSideProps: GetServerSideProps = async () => {
  const providers = await getProviders();
  return {
    props: { providers },
  };
};

export default LoginPage;
