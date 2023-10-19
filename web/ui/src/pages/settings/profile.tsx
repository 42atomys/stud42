import {
  ThridPartyBadge,
  thirdPartySorted,
  thridPartyData,
} from '@components/Badge';
import { Button } from '@components/Button';
import { FileInput, SelectInput, Switch, TextInput } from '@components/Form';
import { Loader } from '@components/Loader';
import { Tooltip } from '@components/Tooltip';
import { UserProfile } from '@components/UserProfile';
import {
  SettingsCategory,
  SettingsTable,
  SettingsTableRow,
} from '@containers/settings';
import SettingsLayout from '@containers/settings/SettingsLayout';
import { useMe } from '@ctx/currentUser';
import { useNotification } from '@ctx/notifications';
import {
  Account,
  AccountProvider,
  PresignedUploadUrlKind,
  UserFlag,
  UserPronoun,
  useDeleteAccountMutation,
  usePresignedUploadUrlLazyQuery,
  useUpdateAccountVisibilityMutation,
  useUpdateMeMutation,
} from '@graphql.d';
import classNames from 'classnames';
import { motion } from 'framer-motion';
import { NextPage } from 'next';
import { signIn } from 'next-auth/react';
import { useState } from 'react';

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
      className="p-3 bg-slate-200 dark:bg-slate-900 rounded-md hover:bg-slate-300 dark:hover:bg-slate-800 transition-colors cursor-pointer"
      initial={{ scale: 1 }}
      whileHover={{ scale: 1.2 }}
      onClick={() =>
        signIn(provider.toLowerCase(), { callbackUrl: '/settings/accounts' })
      }
    >
      <i
        className={classNames(
          'fa-fw text-xl',
          thridPartyData[provider].className,
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

const ProfileSettingPage: NextPage<PageProps> = () => {
  const { me, refetchMe } = useMe();
  const accounts = thirdPartySorted(me.accounts);
  const { addNotification } = useNotification();
  const [showProfile, setShowProfile] = useState(false);
  const [presignedUrl] = usePresignedUploadUrlLazyQuery({
    fetchPolicy: 'no-cache',
  });
  const [updateMe] = useUpdateMeMutation({
    onCompleted: (d) => {
      if (!d) return;

      refetchMe();
      addNotification({
        type: 'success',
        title: 'Profile updated',
        message: 'Your profile has been updated successfully',
        duration: 5000,
      });
    },
  });

  if (!me.id) {
    return (
      <SettingsLayout page="profile">
        <Loader />
      </SettingsLayout>
    );
  }

  return (
    <SettingsLayout page="profile">
      <div className="w-full p-4 rounded-lg bg-slate-200 dark:bg-slate-950 flex flex-row justify-between items-center">
        <span>
          You want to preview your profile? Click on the button on the right.
        </span>
        <Button onClick={() => setShowProfile(true)}>Preview profile</Button>
        <UserProfile
          open={showProfile}
          setOpen={setShowProfile}
          userId={me.id}
        />
      </div>
      <SettingsCategory
        title="Public Profile"
        description="This information will be visible to other students."
      >
        <SettingsTable>
          <SettingsTableRow
            title="Cover Image"
            description="Recommended size: 465 x 300. Maximum size: 5Mb"
          >
            <div className="flex items-center space-x-4">
              {me.coverURL && me.coverURL != '' && (
                <div
                  className="group rounded-lg w-[77px] h-[50px] bg-cover bg-center flex overflow-hidden cursor-pointer"
                  style={{ backgroundImage: `url(${me.coverURL})` }}
                  onClick={() => {
                    updateMe({ variables: { input: { coverURL: '' } } });
                  }}
                >
                  <span className="flex w-full h-full items-center justify-center transition-all opacity-0 group-hover:opacity-100 bg-slate-900/50 backdrop backdrop-blur-sm">
                    <i className="fal fa-trash text-red-500 text-2xl "></i>
                  </span>
                </div>
              )}
              <FileInput
                name="cover-image"
                accept="image/png, image/jpeg"
                onChange={(value) => {
                  const coverFile = value.files?.[0];
                  if (!coverFile) return;

                  presignedUrl({
                    variables: {
                      contentLength: coverFile.size,
                      contentType: coverFile.type,
                      kind: PresignedUploadUrlKind.USER_COVER,
                    },
                  }).then(({ data }) => {
                    const presignedURL = new URL(data!.presignedUploadURL);
                    fetch(presignedURL, {
                      method: 'PUT',
                      body: coverFile,
                      headers: {
                        'Content-Type': coverFile.type,
                        'Content-Length': coverFile.size.toString(),
                        'x-amz-acl': 'public-read',
                      },
                    }).then(async (d) => {
                      if (!d.ok) {
                        return addNotification({
                          type: 'error',
                          title: 'Error uploading cover',
                          message: 'There was an error uploading your cover',
                          duration: 5000,
                        });
                      }

                      updateMe({
                        variables: {
                          input: {
                            coverURL: presignedURL.href.replace(
                              presignedURL.search,
                              '',
                            ),
                          },
                        },
                      });
                    });
                  });
                }}
              />
            </div>
          </SettingsTableRow>
          <SettingsTableRow
            title="Pronouns"
            description="You can add your pronouns visible across all the app"
          >
            <SelectInput
              name="pronouns"
              objects={Object.values(UserPronoun)}
              selectedValue={me.pronoun}
              defaultValue={UserPronoun.PRIVATE}
              onChange={(value) => {
                updateMe({
                  variables: { input: { pronoun: value as UserPronoun } },
                });
              }}
            />
          </SettingsTableRow>
          <SettingsTableRow
            title="Nickname"
            description="You can add a custom AKA name visible across all the app"
            isSponsorOnly
          >
            <TextInput
              name="nickname"
              type="text"
              maxLength={20}
              defaultValue={me.nickname || ''}
              className="flex-1 bg-slate-50 dark:bg-slate-900"
              disabled={!me.flags?.includes(UserFlag.SPONSOR)}
              debounce={1000}
              onChange={(value) => {
                updateMe({ variables: { input: { nickname: value } } });
              }}
            />
          </SettingsTableRow>
        </SettingsTable>
      </SettingsCategory>

      <SettingsCategory
        title="Third-party accounts"
        description="Add and manage your thrid-party accounts to your S42 account."
        className="bg-transparent"
      >
        <h2 className="text-xl font-semibold mb-4">Add an account</h2>
        <div className="flex space-x-2 mb-4">
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

        <h2 className="text-xl font-semibold mb-4">Manage your accounts</h2>
        <div className="bg-slate-500/10 rounded-md px-4 py-2 mb-4 space-x-2 flex justify-center items-center">
          <i className="fas fa-fw fa-info-circle"></i>
          <span>
            <b>Remember</b>, when you change your handle on any of your
            accounts, you will need to update it here as well.
          </span>
        </div>
        <div className="grid grid-cols-4 gap-2 font-display font-semibold border-b-2 border-b-slate-500/30 mb-4 pb-4">
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

export default ProfileSettingPage;
