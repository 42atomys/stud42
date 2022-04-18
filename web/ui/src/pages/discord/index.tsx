import { Emoji } from '@components/Emoji';
import { Provider, useMeQuery } from '@graphql.d';
import { GetServerSideProps, NextPage } from 'next';
import { Session } from 'next-auth';
import { getSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

const SponsorGithubPart = ({ isGithubSponsor }) => {
  const [invited, setInvited] = useState(false);

  const joinDiscord = () => {
    setInvited(true);
  };

  if (isGithubSponsor) {
    return <div className="flex flex-col justify-center items-center mb-6 text-center">
      <h2 className="text-4xl font-display font-bold mb-4 mt-20 bg-clip-text text-transparent bg-gradient-to-l from-emerald-500 to-cyan-500 w-fit">
        You have unlocked a new feature!
      </h2>
      <small className="font-medium font-display text-xl text-slate-500 flex items-center">
        <span className="mr-2">Just click and open Discord</span>
        <Emoji emoji="👀" size={24} />
      </small>
      <button
        onClick={joinDiscord}
        disabled={invited}
        className="disabled:border-emerald-500 disabled:bg-black disabled:px-8 disabled:text-emerald-500 my-10 py-4 px-6 rounded-lg h-[64px] text-white text-lg bg-black font-medium border-2 border-black hover:px-14 hover:bg-slate-900 hover:border-indigo-500 focus:px-14 focus:border-indigo-500 focus:bg-indigo-500 transition-all"
      >
        {invited ? (
          <>
            <i className="fa-duotone fa-party-horn" />{' '}
            <span className="ml-2">You're inside !</span>
          </>
        ) : (
          <>
            <i className="fa-brands fa-discord" />{' '}
            <span className="ml-2">Join the super secret Discord</span>
          </>
        )}
      </button>
    </div>
  }

  return <div className="flex flex-col justify-center items-center mb-6 text-center">
    <h2 className="text-4xl font-display font-bold mb-4 mt-20 bg-clip-text text-transparent bg-gradient-to-l from-indigo-500 to-fuchsia-500 w-fit">
      Get access to the Discord by becoming a sponsor
    </h2>
    <small className="font-medium font-display text-xl text-slate-500">
      Becoming a sponsor means access to the Discord, to the code, to
      the beta
      <br />
      and to participate in new features before anyone else!
    </small>
    <a
      href="https://github.com/sponsors/42Atomys"
      target="_blank"
      rel="noopener noreferrer"
      className="my-10 py-4 px-6 rounded-lg text-white text-lg bg-black font-medium border-2 border-black hover:px-14 hover:bg-slate-900 hover:border-indigo-500 focus:px-14 focus:border-indigo-500 focus:bg-indigo-500 transition-all"
    >
      Sponsor on Github
    </a>
    <i className="block mt-2 text-sm">
      After sponsoring come back on this page, refresh and see
      <br />
      GitHub Webhooks can takes 2-3 minutes to be sended to Nikolas
      Kage (our impressive discord bot)
    </i>
  </div>

}

interface PageProps {
  session: Session;
  isGithubSponsor: boolean;
}

export const IndexPage: NextPage<PageProps, {}> = ({
  isGithubSponsor,
}) => {
  const { data, loading } = useMeQuery({ pollInterval: 1000 })
  console.log(loading, data)
  const accounts = []


  const discordName = accounts.find(
    (a) => a?.provider === Provider.DISCORD
  )?.username;
  return (
    <div className="w-full h-[100vh] bg-repeat bg-slate-900 bg-grid-400">
      <div className="w-full h-[100vh] bg-gradient-to-b from-slate-900/80 to-transparent p-4">
        <div className="w-full h-full flex flex-col justify-center items-center text-center">
          <div className="flex flex-col justify-center items-center mb-20">
            <Image
              src="/assets/images/logo.svg"
              alt="logo"
              width={128}
              height={128}
              quality={100}
            />
            <h1 className="text-4xl sm:text-8xl font-display font-black my-6 bg-clip-text text-transparent bg-gradient-to-l from-indigo-500 to-fuchsia-500 w-fit">
              Stud42 v3.0+beta
            </h1>
            <small className="font-medium font-display text-2xl sm:text-4xl text-slate-500">
              is comming soon™
            </small>
          </div>

          <div className="w-full md:w-1/2 relative shadow-xl flex rounded-xl bg-slate-900/70 backdrop-blur ring-1 ring-inset ring-white/10">
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
                  3 years later, it's finally time, time to put the project that
                  doesn't need to prove itself anymore in open source, so that
                  this project becomes the project of every student of every
                  campus in the world.
                </span>
                <span className="text-slate-100 font-bold flex items-center justify-center relative">
                  <span className="mr-2">Stud42 V3 Open-Source is born</span>
                  <Emoji emoji="🎉" size={20} />
                </span>
              </code>
            </pre>
          </div>

          {discordName && <div className="flex flex-col justify-center items-center mb-6 text-center">
            <h2 className="text-4xl font-display font-bold mb-4 mt-20 bg-clip-text text-transparent bg-gradient-to-l from-red-500 to-orange-500 w-fit">
              Something is missing...
            </h2>
            <small className="font-medium font-display text-xl text-slate-500">
              To check your rights, please link your Discord account to your account.
              <br />
              Your <b className='text-sky-400'>GitHub</b> account <b className='text-slate-400'>must be linked</b> to your <b className='text-indigo-400'>Discord</b> account.
            </small>
            <div className='flex flex-col justify-around mt-10'>
              <Link href="/auth/signin?callbackUrl=/discord">
                <a
                  className="my-1 py-4 px-6 rounded-lg text-white text-lg bg-black font-medium border-2 border-black hover:px-14 hover:bg-slate-900 hover:border-indigo-500 focus:px-14 focus:border-indigo-500 focus:bg-indigo-500 transition-all"
                >
                  <i className='fa-brands fa-github' />
                  <span className='ml-2'>Link your Github account</span>
                </a>
              </Link>
              <Link href="/auth/signin?callbackUrl=/discord">
                <a
                  className="my-1 py-4 px-6 rounded-lg text-white text-lg bg-black font-medium border-2 border-black hover:px-14 hover:bg-slate-900 hover:border-indigo-500 focus:px-14 focus:border-indigo-500 focus:bg-indigo-500 transition-all"
                >
                  <i className='fa-brands fa-discord' />
                  <span className='ml-2'>Link your Discord account</span>
                </a>
              </Link>

            </div>
          </div>}

          {!discordName && <SponsorGithubPart isGithubSponsor={isGithubSponsor} />}
        </div>
      </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const session = await getSession(ctx);

  return {
    props: {
      session,
    },
  };
};

export default IndexPage;
