import { Emoji } from '@components/Emoji';
import {
  AccountProvider,
  MeWithFlagsDocument,
  MeWithFlagsQuery,
  useInviteOnDiscordMutation,
} from '@graphql.d';
import { queryAuthenticatedSSR } from '@lib/apollo';
import classNames from 'classnames';
import { GetServerSideProps, NextPage } from 'next';
import { signIn } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

const FinalStep = () => {
  const [invited, setInvited] = useState(false);
  const [joinDiscordMutation] = useInviteOnDiscordMutation({
    onError: () => setInvited(false),
  });

  const joinDiscord = () => {
    joinDiscordMutation();
    setInvited(true);
  };

  return (
    <div className="flex flex-col justify-center items-center mt-6 text-center">
      <h2
        className={classNames(
          'text-4xl font-display font-bold mb-4 mt-4 bg-clip-text text-transparent bg-gradient-to-l  w-fit',
          'from-emerald-500 to-cyan-500',
        )}
      >
        <span className="mr-2">You have the power !</span>
        <Emoji emoji="🚀" size={28} />
      </h2>
      <Link
        href="/"
        rel="noopener noreferrer"
        className="my-10 py-4 px-6 rounded-lg text-white text-lg bg-black font-medium border-2 border-black hover:px-14 hover:bg-slate-900 hover:border-indigo-500 focus:px-14 focus:border-indigo-500 focus:bg-indigo-500 transition-all"
      >
        Go to the future
      </Link>

      <button
        onClick={joinDiscord}
        disabled={invited}
        className="disabled:border-emerald-500 disabled:bg-black disabled:px-8 disabled:text-emerald-500 my-10 py-4 px-6 rounded-lg h-[64px] text-white text-lg bg-black font-medium border-2 border-black hover:px-14 hover:bg-slate-900 hover:border-indigo-500 focus:px-14 focus:border-indigo-500 focus:bg-indigo-500 transition-all"
      >
        {invited ? (
          <>
            <i className="fa-duotone fa-party-horn" />{' '}
            <span className="ml-2">You&apos;re inside !</span>
          </>
        ) : (
          <>
            <i className="fa-brands fa-discord" />{' '}
            <span className="ml-2">Join the Discord</span>
          </>
        )}
      </button>
    </div>
  );
};

const Step = ({
  done,
  next = false,
  step,
  icon,
  title,
}: {
  done: boolean;
  next?: boolean;
  step: number;
  icon: string;
  title: string;
}) => (
  <div className="w-full md:w-1/3 px-2 mb-10 md:mb-0 text-left md:text-center">
    <div className="relative">
      <hr
        className={classNames(
          'border-2 rounded-full mb-2 md:mb-4 ml-14',
          done ? 'border-indigo-500' : 'border-slate-500',
        )}
      />
      <div
        className={classNames(
          'absolute -top-5 rounded-full w-10 h-10 flex items-center justify-center text-lg',
          done
            ? 'bg-indigo-500 text-slate-900'
            : next
              ? 'border-2 border-indigo-500 text-indigo-500'
              : 'border-2 border-slate-500 text-slate-500',
        )}
      >
        <i className={icon}></i>
      </div>
    </div>
    <div className="ml-14 md:ml-0">
      <h1 className="font-bold uppercase text-indigo-500">Step {step}</h1>
      <p>{title}</p>
    </div>
  </div>
);

const Steps = ({ currentStep }: { currentStep: number }) => {
  return (
    <div className="mt-20 w-full md:w-2/3 lg:w-1/2 px-4 flex flex-col md:flex-row items-center md:items-start">
      <Step
        done={currentStep >= 1}
        step={1}
        icon="fa fa-check"
        title="Sign up on your 42 account"
      />
      <Step
        done={currentStep >= 2}
        next={currentStep == 1}
        step={2}
        icon="fa-brands fa-github"
        title="Link your Github account"
      />
      <Step
        done={currentStep >= 3}
        next={currentStep == 2}
        step={3}
        icon="fa-brands fa-discord"
        title="Link your Discord account (optional)"
      />
    </div>
  );
};

interface PageProps {
  me: MeWithFlagsQuery['me'];
}

export const IndexPage: NextPage<PageProps, {}> = ({ me }) => {
  let currentStep =
    (me.accounts?.filter(
      (a) =>
        a?.provider === AccountProvider.GITHUB ||
        a?.provider === AccountProvider.DISCORD,
    ).length || 0) + 1;

  if (currentStep >= 3) currentStep = 4;

  if (!me) {
    return <>OUPS</>;
  }

  return (
    <div className="w-full min-h-[100vh] h-[100%] bg-repeat bg-slate-900 bg-grid-400">
      <div className="w-full min-h-[100vh] h-[100%] bg-gradient-to-b from-slate-900/80 to-transparent p-4">
        <div className="w-full min-h-[calc(100vh-2rem)] h-[calc(100%-2rem)] flex flex-col justify-center items-center text-center">
          <div className="flex flex-col justify-center items-center mb-10">
            <Image
              src="/assets/images/logo.svg"
              alt="logo"
              width={128}
              height={128}
              quality={100}
            />
            <h1 className="text-4xl sm:text-8xl font-display font-black my-6 bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-fuchsia-500 w-fit">
              S
              <span className="line-through font-bold text-4xl text-slate-800">
                tud
              </span>
              42.app
            </h1>
            <small className="font-medium font-display text-2xl sm:text-4xl text-slate-500">
              <span className="underline decoration-1 underline-offset-4">
                v3.0+beta
              </span>{' '}
              is now{' '}
              <span className="text-emerald-500 font-bold">
                available to everyone
              </span>{' '}
              !
            </small>
          </div>

          <div className="w-full md:w-2/3 lg:w-1/2 relative shadow-xl flex rounded-xl bg-slate-900/70 backdrop-blur ring-1 ring-inset ring-white/10">
            <pre className="flex text-sm leading-6">
              <code className="flex-auto relative block text-slate-50 pt-4 pb-4 px-4 whitespace-pre-line">
                <span className="text-slate-100 block mb-6">
                  This project is the direct continuation of the{' '}
                  <a
                    href="https://stud42.fr"
                    className="text-indigo-500 hover:underline"
                  >
                    stud42.fr
                  </a>{' '}
                  project. When{' '}
                  <a
                    href="https://github.com/42Atomys"
                    className="text-indigo-500 hover:underline"
                  >
                    @42Atomys
                  </a>{' '}
                  (aka. Atom) created stud42, he announced that the project
                  would be open source when he left 42 staff.
                </span>
                <span className="text-slate-100 block mb-6">
                  4 years later, it&apos;s finally time, time to put the project
                  that doesn&apos;t need to prove itself anymore in open source,
                  so that this project becomes the project of every student of
                  every campus in the world.
                </span>
                <span className="text-slate-100 font-bold flex items-center justify-center relative">
                  <span className="mr-2">Stud42 V3 Open-Source is born</span>
                  <Emoji emoji="🎉" size={20} />
                </span>
              </code>
            </pre>
          </div>

          {currentStep <= 3 && <Steps currentStep={currentStep} />}

          {currentStep == 1 && (
            <div className="flex flex-col justify-center items-center mt-6 text-center">
              <div className="flex flex-col justify-around mb-5">
                <button
                  onClick={() => signIn('github', { callbackUrl: '/beta' })}
                  className="my-1 py-4 px-6 rounded-lg text-white text-lg bg-black font-medium border-2 border-black hover:px-14 hover:bg-slate-900 hover:border-indigo-500 focus:px-14 focus:border-indigo-500 focus:bg-indigo-500 transition-all"
                >
                  <i className="fa-brands fa-github" />
                  <span className="ml-2">Link your Github account</span>
                </button>
              </div>

              <div className="flex p-2 italic border-yellow-500 border rounded-lg text-yellow-100 bg-yellow-800/20 mt-2 mb-5 text-sm">
                <Emoji emoji="🛠" size={64} className="mx-4" />
                <i className="text-left">
                  Link your GitHub account, star and follow project is a
                  requirement to access the beta.
                  <br />
                  You can accept it, and access to the app or not and you will
                  need to wait the end of the beta, when this requirement will
                  ne be exist anymore.
                  <br />
                  This action has automatize to not be boring with 2 extra step
                  for me and you.
                  <br />
                  See FAQ issue for more information{' '}
                  <Link
                    className="text-blue-500"
                    href="https://github.com/42Atomys/stud42/issues/364"
                    target="_blank"
                  >
                    #364
                  </Link>
                </i>
              </div>

              <small className="font-medium font-display text-xl text-slate-500">
                Your <b className="text-sky-400">GitHub</b> account{' '}
                <b className="text-slate-400">must be linked</b> to your{' '}
                <b className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-pink-500">
                  S42
                </b>{' '}
                account.
              </small>
            </div>
          )}

          {currentStep == 2 && (
            <div className="flex flex-col justify-center items-center mt-6 text-center w-full md:w-1/4 lg:w-1/3">
              <div className="flex flex-row justify-between mb-5 text-lg w-full">
                <button
                  onClick={() => signIn('discord', { callbackUrl: '/' })}
                  className="py-4 px-6 flex items-center grow justify-center rounded-lg text-white mr-2 bg-black font-medium border-2 border-black hover:bg-slate-900 hover:border-indigo-500 focus:px-14 focus:border-indigo-500 focus:bg-indigo-500 transition-all"
                >
                  <i className="fa-brands fa-discord" />
                  <span className="ml-2">Link Discord</span>
                </button>
                <Link href="/" passHref={true}>
                  <button className="py-4 px-6 flex items-center grow-0 hover:grow rounded-lg justify-center text-white bg-slate-800/40 font-medium border-2 border-slate-900 hover:bg-slate-900 hover:border-indigo-500 focus:px-14 focus:border-indigo-500 focus:bg-indigo-500 transition-all">
                    <Image
                      src="/assets/images/logo.svg"
                      alt="logo"
                      width={20}
                      height={20}
                      quality={100}
                    />
                    <span className="ml-2">Go to the app now</span>
                  </button>
                </Link>
              </div>

              <small className="font-medium font-display text-xl text-slate-500">
                Your <b className="text-indigo-400">Discord</b> account{' '}
                <b className="text-slate-400">can be linked</b> to your{' '}
                <b className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-pink-500">
                  S42
                </b>{' '}
                account.
              </small>

              <i className="block mt-2 text-sm">
                Link your Discord account will add you to the Discord server.
              </i>
            </div>
          )}

          {(currentStep == 3 || currentStep == 4) && <FinalStep />}
        </div>
      </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const { data } = await queryAuthenticatedSSR<MeWithFlagsQuery>(req, {
    query: MeWithFlagsDocument,
  });

  if (!data) {
    return {
      props: {},
      redirect: {
        destination: '/auth/signin?callbackUrl=/beta',
      },
    };
  }

  return {
    props: {
      me: data.me,
    },
  };
};

export default IndexPage;
