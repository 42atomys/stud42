import { NewBadgy } from '@components/Badge';
import { Emoji } from '@components/Emoji';
import { SponsorIcon } from '@components/Sponsors';
import SettingsLayout from '@containers/settings/SettingsLayout';
import { useMe } from '@ctx/currentUser';
import { UserFlag } from '@graphql.d';
import { motion } from 'framer-motion';
import { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';

type PageProps = {};

const AwesomenessSettingPage: NextPage<PageProps> = () => {
  const { me } = useMe();
  return (
    <SettingsLayout page="awesomeness">
      <Head>
        <title>Awesomeness | Settings | S42</title>
      </Head>
      <div className="grid grid-cols-2 gap-4">
        <span className="col-span-2 text-slate-900 dark:text-white font-display text-xl text-center my-10">
          <SponsorIcon />{' '}
          <span className="font-extrabold text-fuchsia-500">Awesomeness</span>{' '}
          is a reward system for our sponsors.
          <br />
          <span className="text-slate-500 mt-4 text-md">
            You can get some cool perks by sponsoring us on GitHub. This is the
            simplest way to support us and help us to keep the project alive.
          </span>
        </span>

        {(me.flags?.includes(UserFlag.SPONSOR) && (
          <div className="col-span-2 text-center p-4 rounded-lg bg-emerald-100 dark:bg-emerald-950 ring-2 ring-emerald-500 text-emerald-500">
            <Emoji emoji="🎉" size={32} className="mx-auto" />
            You are a sponsors, you are awesome! Thanks you for your support!
          </div>
        )) || (
          <Link
            href="https://github.com/sponsors/42atomys"
            target="_blank"
            className="col-span-2"
          >
            <motion.div
              className="text-center p-4 rounded-lg bg-slate-200 dark:bg-slate-950 ring-2 ring-slate-700 text-slate-500"
              animate={{ scale: [1, 0.95, 1] }}
              transition={{
                ease: 'easeInOut',
                duration: 1,
                repeat: Infinity,
                type: 'tween',
              }}
            >
              You don&apos;t seem to be a sponsor yet, but you can become one!
            </motion.div>
          </Link>
        )}
        <Link
          href="https://github.com/sponsors/42atomys"
          target="_blank"
          className="col-span-2 text-center hover:underline"
        >
          Manage your sponsorship on GitHub{' '}
          <i className="fa-light fa-external-link-alt"></i>
        </Link>
      </div>
      <hr className="col-span-2 my-4 border-slate-500/20" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 cursor-pointer">
        <motion.div
          className="col-span-1 md:col-span-2 lg:col-span-3 rounded-lg border border-indigo-500 bg-gradient-to-br from-indigo-200 dark:from-indigo-950 to-transparent text-center p-4"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.9 }}
          transition={{ type: 'spring', duration: 0.4 }}
        >
          <h2 className="text-slate-700 dark:text-white font-display text-xl py-4">
            <i className="fa-light fa-heart text-4xl"></i>
            <br />
            <span className="font-bold">Still alive!</span>
          </h2>
          <p className="text-sm text-indigo-500">
            You will have our eternal gratitude for your support.
            <br />
            The estimated cost of running this project is around 250$/month.
            Help us to keep it alive.
            <br />
            You can also track the cost of the project on our{' '}
            <Link
              href="https://dashboards.s42.app/d/01Wr_e1Vz/finops?orgId=1"
              target="_blank"
              className="text-indigo-700 dark:text-indigo-300 underline"
            >
              finops page
            </Link>
            .
          </p>
        </motion.div>
        <motion.div
          className="relative rounded-lg border border-fuchsia-500 bg-gradient-to-br from-fuchsia-200 dark:from-fuchsia-950 to-transparent text-center p-4"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.9 }}
          transition={{ type: 'spring', duration: 0.4 }}
        >
          <div className="absolute -top-2 -right-2">
            <NewBadgy />
          </div>
          <h2 className="text-slate-700 dark:text-white font-display text-xl py-4">
            <i className="fa-light fa-user-astronaut text-4xl"></i>
            <br />
            <span className="font-bold">Unique badge</span>
          </h2>
          <p className="text-sm text-fuchsia-500">
            You can display a badge on your profile to show that you are a
            sponsor.
          </p>
        </motion.div>
        <motion.div
          className="relative rounded-lg border border-cyan-500 bg-gradient-to-br from-cyan-200 dark:from-cyan-950 to-transparent text-center p-4"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.9 }}
          transition={{ type: 'spring', duration: 0.4 }}
        >
          <h2 className="text-slate-700 dark:text-white font-display text-xl py-4">
            <i className="fa-light fa-square text-4xl"></i>
            <br />
            <span className="font-bold">Glowing Ring</span>
          </h2>
          <p className="text-sm text-cyan-500">
            A ring around your profile picture to show that you are a sponsor.
          </p>
        </motion.div>
        <motion.div
          className="relative rounded-lg border border-emerald-500 bg-gradient-to-br from-emerald-200 dark:from-emerald-950 to-transparent text-center p-4"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.9 }}
          transition={{ type: 'spring', duration: 0.4 }}
        >
          <h2 className="text-slate-700 dark:text-white font-display text-xl py-4">
            <i className="fa-light fa-truck-arrow-right text-4xl"></i>
            <br />
            <span className="font-bold">Early Access</span>
          </h2>
          <p className="text-sm text-emerald-500">
            You will have access to new features before everyone else.
          </p>
        </motion.div>
        <motion.div
          className="relative rounded-lg border border-yellow-500 bg-gradient-to-br from-yellow-200 dark:from-yellow-950 to-transparent text-center p-4"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.9 }}
          transition={{ type: 'spring', duration: 0.4 }}
        >
          <div className="absolute -top-2 -right-2">
            <NewBadgy />
          </div>
          <h2 className="text-slate-700 dark:text-white font-display text-xl py-4">
            <i className="fa-light fa-address-card text-4xl"></i>
            <br />
            <span className="font-bold">AKA You</span>
          </h2>
          <p className="text-sm text-yellow-500">
            You can choose a nickname that will be displayed on every page.
          </p>
        </motion.div>
        <motion.div
          className="relative rounded-lg border border-purple-500 bg-gradient-to-br from-purple-200 dark:from-purple-950 to-transparent text-center p-4"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.9 }}
          transition={{ type: 'spring', duration: 0.4 }}
        >
          <h2 className="text-slate-700 dark:text-white font-display text-xl py-4">
            <i className="fa-brands fa-discord text-4xl"></i>
            <br />
            <span className="font-bold">Discord</span>
          </h2>
          <p className="text-sm text-purple-500">
            You will have access to a private channel on our Discord server.
          </p>
        </motion.div>
        <motion.div
          className="relative rounded-lg border border-slate-500 bg-gradient-to-br from-slate-200 dark:from-slate-950 to-transparent text-center p-4 flex items-center justify-center"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.9 }}
          transition={{ type: 'spring', duration: 0.4 }}
        >
          <p className="text-sm text-slate-500">
            More perks are coming soon...
          </p>
        </motion.div>
      </div>
    </SettingsLayout>
  );
};

export default AwesomenessSettingPage;
