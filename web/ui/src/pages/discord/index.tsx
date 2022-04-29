import { Emoji } from '@components/Emoji';
import {
  Feature,
  MeWithFeaturesDocument,
  MeWithFeaturesQuery,
  Provider,
  useInviteOnDiscordMutation,
} from '@graphql.d';
import { queryAuthenticatedSSR } from '@lib/apollo';
import classNames from 'classnames';
import { GetServerSideProps, NextPage } from 'next';
import { signIn } from 'next-auth/react';
import Image from 'next/image';
import { useState } from 'react';

const SponsorGithubPart = ({
  hasDiscordAccess,
}: {
  hasDiscordAccess: boolean;
}) => {
  const [invited, setInvited] = useState(false);
  const [joinDiscordMutation] = useInviteOnDiscordMutation({
    onError: () => setInvited(false),
  });

  const joinDiscord = () => {
    joinDiscordMutation();
    setInvited(true);
  };

  if (hasDiscordAccess) {
    return (
      <div className="flex flex-col justify-center items-center mb-6 text-center">
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
              <span className="ml-2">You&apos;re inside !</span>
            </>
          ) : (
            <>
              <i className="fa-brands fa-discord" />{' '}
              <span className="ml-2">Join the super secret Discord</span>
            </>
          )}
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col justify-center items-center mb-6 text-center">
      <h2 className="text-4xl font-display font-bold mb-4 mt-20 bg-clip-text text-transparent bg-gradient-to-l from-indigo-500 to-fuchsia-500 w-fit">
        <span className="mr-2">
          Get early-access to the Discord by becoming a sponsor
        </span>
        <Emoji emoji="🎉" size={28} />
      </h2>
      <small className="font-medium font-display text-xl text-slate-500">
        Becoming a sponsor means access to the Discord, to the code, to the beta
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
        GitHub Webhooks can takes 2-3 minutes to be sended to Nikolas Kage (our
        impressive discord bot)
        <br />
        <span className="block mt-4 text-cyan-500 italic">
          After the release Discord and Github Repository will be accessible
          forever for free.
          <br />
          Sponsoring the project carry the hosting costs and share the love of
          the project with her community.
        </span>
      </i>
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
          done ? 'border-indigo-500' : 'border-slate-500'
        )}
      />
      <div
        className={classNames(
          'absolute -top-5 rounded-full w-10 h-10 flex items-center justify-center text-lg',
          done
            ? 'bg-indigo-500 text-slate-900'
            : next
            ? 'border-2 border-indigo-500 text-indigo-500'
            : 'border-2 border-slate-500 text-slate-500'
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
        icon="fa-brands fa-discord"
        title="Link your Discord account"
      />
      <Step
        done={currentStep >= 3}
        next={currentStep == 2}
        step={3}
        icon="fa-brands fa-github"
        title="Link your Github sponsors account"
      />
      <Step
        done={currentStep >= 4}
        next={currentStep == 3}
        step={4}
        icon="fa-regular fa-mug-hot pl-0.5"
        title="Sponsor 42Atomys on Github"
      />
    </div>
  );
};

interface PageProps {
  me: MeWithFeaturesQuery['me'];
}

export const IndexPage: NextPage<PageProps, {}> = ({ me }) => {
  const hasDiscordAccess = me.features?.some(
    (f) => f === Feature.DISCORD_ACCESS
  );

  let currentStep =
    (me.accounts?.filter(
      (a) => a?.provider === Provider.GITHUB || a?.provider === Provider.DISCORD
    ).length || 0) + 1;

  if (currentStep == 3 && hasDiscordAccess) currentStep = 4;

  if (!me) {
    return <>OUPS</>;
  }

  return (
    <div className="w-full min-h-[100vh] h-[100%] bg-repeat bg-slate-900 bg-grid-400">
      <div className="w-full min-h-[100vh] h-[100%] bg-gradient-to-b from-slate-900/80 to-transparent p-4">
        <div className="w-full min-h-[calc(100vh-2rem)] h-[calc(100%-2rem)] flex flex-col justify-center items-center text-center">
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
                  3 years later, it&apos;s finally time, time to put the project
                  that doesn&apos;t need to prove itself anymore in open source,
                  so that this project becomes the project of every student of
                  every campus in the world.
                </span>
                <span className="text-slate-100 font-bold flex items-center justify-center relative">
                  <span className="mr-2">Stud42 V3 Open-Source is born</span>
                  <Emoji emoji="🎉" size={20} />
                </span>
                <span className="flex items-center justify-center relative text-violet-500 font-bold">
                  <Emoji emoji="🚀" size={20} />
                  <span className="mx-2">
                    Join us today to be a early supporter of the future
                  </span>
                  <Emoji emoji="🚀" size={20} />
                </span>
              </code>
            </pre>
          </div>

          {currentStep != 4 && <Steps currentStep={currentStep} />}

          {currentStep == 1 && (
            <div className="flex flex-col justify-center items-center mb-6 text-center">
              <h2 className="text-4xl font-display font-bold mb-4 mt-20 bg-clip-text text-transparent bg-gradient-to-l from-red-500 to-orange-500 w-fit">
                Who are you ? Please tell us who you are !
              </h2>
              <small className="font-medium font-display text-xl text-slate-500">
                To check your rights, please link your Discord account to your
                account.
                <br />
                Your <b className="text-sky-400">GitHub</b> account{' '}
                <b className="text-slate-400">must be linked</b> to your{' '}
                <b className="text-indigo-400">Discord</b> account.
              </small>
              <div className="flex flex-col justify-around mt-10">
                <button
                  onClick={() => signIn('discord', { callbackUrl: '/discord' })}
                  className="my-1 py-4 px-6 rounded-lg text-white text-lg bg-black font-medium border-2 border-black hover:px-14 hover:bg-slate-900 hover:border-indigo-500 focus:px-14 focus:border-indigo-500 focus:bg-indigo-500 transition-all"
                >
                  <i className="fa-brands fa-discord" />
                  <span className="ml-2">Link your Discord account</span>
                </button>
              </div>
            </div>
          )}

          {currentStep == 2 && (
            <div className="flex flex-col justify-center items-center mb-6 text-center">
              <h2 className="text-4xl font-display font-bold mb-4 mt-20 bg-clip-text text-transparent bg-gradient-to-l from-indigo-500 to-cyan-500 w-fit">
                The last button ? Maybe
              </h2>
              <small className="font-medium font-display text-xl text-slate-500">
                To check your rights, please link your Github account to your
                account.
                <br />
                Your <b className="text-sky-400">GitHub</b> account{' '}
                <b className="text-slate-400">must be linked</b> to your{' '}
                <b className="text-indigo-400">Discord</b> account.
              </small>
              <div className="flex flex-col justify-around mt-10">
                <button
                  onClick={() => signIn('github', { callbackUrl: '/discord' })}
                  className="my-1 py-4 px-6 rounded-lg text-white text-lg bg-black font-medium border-2 border-black hover:px-14 hover:bg-slate-900 hover:border-indigo-500 focus:px-14 focus:border-indigo-500 focus:bg-indigo-500 transition-all"
                >
                  <i className="fa-brands fa-github" />
                  <span className="ml-2">Link your Github account</span>
                </button>
              </div>
            </div>
          )}

          {(currentStep == 3 || currentStep == 4) && (
            <SponsorGithubPart hasDiscordAccess={hasDiscordAccess || false} />
          )}
        </div>
      </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const { data } = await queryAuthenticatedSSR<MeWithFeaturesQuery>(req, {
    query: MeWithFeaturesDocument,
  });

  if (!data) {
    return {
      props: {},
      redirect: {
        destination: '/auth/signin?callbackUrl=/discord',
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
