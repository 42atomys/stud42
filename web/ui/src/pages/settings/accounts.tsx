import {
  ThridPartyBadge,
  thirdPartySorted,
  thridPartyData,
} from '@components/Badge';
import { Switch } from '@components/Form';
import { Tooltip } from '@components/Tooltip';
import { SettingsCategory } from '@containers/settings';
import SettingsLayout from '@containers/settings/SettingsLayout';
import { useMe } from '@ctx/currentUser';
import {
  Account,
  AccountProvider,
  useDeleteAccountMutation,
  useUpdateAccountVisibilityMutation,
} from '@graphql.d';
import classNames from 'classnames';
import { motion } from 'framer-motion';
import { NextPage } from 'next';
import { signIn } from 'next-auth/react';
import React from 'react';

type PageProps = {};

const ThridPartyIcon: React.FC<{ provider: AccountProvider }> = ({
  provider,
}) => (
  <Tooltip
    text={thridPartyData[provider].name}
    size="xs"
    direction="top"
    color="black"
  >
    <motion.button
      className="p-3 bg-slate-200 dark:bg-slate-950 rounded-md hover:bg-slate-300 dark:hover:bg-slate-950 transition-colors cursor-pointer"
      initial={{ scale: 1 }}
      whileHover={{ scale: 1.2 }}
      onClick={() =>
        signIn(provider.toLowerCase(), { callbackUrl: '/settings/accounts' })
      }
    >
      <i
        className={classNames(
          'fa-fw text-xl',
          thridPartyData[provider].className
        )}
      ></i>
    </motion.button>
  </Tooltip>
);

const AccountRow: React.FC<
  Pick<Account, 'id' | 'provider' | 'providerAccountId' | 'username' | 'public'>
> = (account) => {
  const { refetchMe } = useMe();
  const [updateVisibility] = useUpdateAccountVisibilityMutation({
    onCompleted: () => refetchMe(),
  });
  const [deleteAccount] = useDeleteAccountMutation({
    onCompleted: () => refetchMe(),
  });

  return (
    <>
      <div className="col-span-2 space-x-4 flex flex-row items-center">
        <ThridPartyBadge {...account} />
        {/* Tweak to display new Discord username */}
        <span>
          {account.username.endsWith('#0')
            ? account.username.replace(/(.*)#0$/, '@$1')
            : account.username}
        </span>
      </div>
      {(account.provider === AccountProvider.DUO && (
        <div className="justify-self-center col-span-2 text-xs opacity-50 italic">
          Primary account cannot be hidden or removed.
        </div>
      )) || (
        <>
          <div className="place-self-center">
            <Switch
              name="account-switch"
              defaultValue={
                account.provider === AccountProvider.DUO ? true : account.public
              }
              disabled={account.provider === AccountProvider.DUO}
              onChange={() =>
                updateVisibility({
                  variables: {
                    input: { id: account.id, public: !account.public },
                  },
                })
              }
            />
          </div>
          <div className="place-self-center justify-self-end">
            <button
              className="p-2 rounded-md text-red-500 hover:bg-red-500 hover:text-white transition-all"
              onClick={() => deleteAccount({ variables: { id: account.id } })}
            >
              <i className="fa-fw fal fa-trash"></i>
            </button>
          </div>
        </>
      )}
    </>
  );
};

const AccountsSettingPage: NextPage<PageProps> = () => {
  const { me } = useMe();
  const accounts = thirdPartySorted(me.accounts);

  return (
    <SettingsLayout page="accounts">
      <SettingsCategory
        title="Third-party accounts"
        description="Add your thrid-party accounts to your S42 account."
        className="bg-transparent"
      >
        <div className="flex space-x-2">
          {/* 
            ! DISABLED UNTIL ALL PROVIDERS ARE APPROVED
            {Object.keys(AccountProvider).
            filter(provider => provider !== AccountProvider.DUO).
            map((provider) => (
              <ThridPartyIcon key={provider} provider={provider as AccountProvider} />
            ))} */}
          <ThridPartyIcon provider={AccountProvider.DISCORD} />
          <ThridPartyIcon provider={AccountProvider.GITHUB} />
          <ThridPartyIcon provider={AccountProvider.GITLAB} />
          <ThridPartyIcon provider={AccountProvider.REDDIT} />
          <ThridPartyIcon provider={AccountProvider.SPOTIFY} />
          <ThridPartyIcon provider={AccountProvider.TWITCH} />
        </div>
      </SettingsCategory>

      <SettingsCategory description="Manage your accounts from the list below.">
        <div className="bg-slate-500/10 rounded-md px-4 py-2 mb-4 space-x-2 flex justify-center items-center">
          <i className="fas fa-fw fa-info-circle"></i>
          <span>
            <b>Remember</b>, when you change your handle on any of your
            accounts, you will need to update it here as well.
          </span>
        </div>
        <div className="grid grid-cols-4 gap-2 font-display font-bold border-b-2 border-b-slate-500/30 mb-4 pb-4">
          <div className="col-span-2">Account</div>
          <div className="text-center">Visiblility</div>
          <div className="text-right">Actions</div>
        </div>
        <div className="grid grid-cols-4 gap-2 items-center">
          {accounts.map((account) => (
            <AccountRow
              key={`${account.provider}-${account.providerAccountId}`}
              {...account}
            />
          ))}
        </div>
      </SettingsCategory>
    </SettingsLayout>
  );
};

export default AccountsSettingPage;
