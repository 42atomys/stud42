import { FileInput, SelectInput, TextInput } from '@components/Form';
import { Loader } from '@components/Loader';
import { UserProfile } from '@components/UserProfile';
import {
  SettingsCategory,
  SettingsTable,
  SettingsTableRow,
} from '@containers/settings';
import SettingsLayout from '@containers/settings/SettingsLayout';
import { useMe } from '@ctx/currentUser';
import {
  PresignedUploadUrlKind,
  UserFlag,
  UserPronoun,
  usePresignedUploadUrlLazyQuery,
  useUpdateMeMutation,
} from '@graphql.d';
import { NextPage } from 'next';
import { useState } from 'react';

type PageProps = {};

const ProfileSettingPage: NextPage<PageProps> = () => {
  const { me } = useMe();
  const [showProfile, setShowProfile] = useState(false);
  const [presignedUrl] = usePresignedUploadUrlLazyQuery({
    fetchPolicy: 'no-cache',
  });
  const [updateMe] = useUpdateMeMutation();

  if (!me.id) {
    return (
      <SettingsLayout page="profile">
        <Loader />
      </SettingsLayout>
    );
  }

  return (
    <SettingsLayout page="profile">
      <div className="w-full p-4 rounded-lg bg-slate-950 flex flex-row justify-between items-center">
        <span>
          You want to preview your profile? Click on the button on the right.
        </span>
        <button
          className="inline-flex justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 sm:col-start-2 disabled:opacity-50 disabled:pointer-events-none"
          onClick={() => setShowProfile(true)}
        >
          Preview profile
        </button>
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
            description="Recommended size: 465 x 300. Maximum size: 10Mb"
          >
            <div className="flex items-center space-x-4">
              {me.coverURL && (
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
                      headers: { 'Content-Type': coverFile.type },
                    }).then(async () => {
                      updateMe({
                        variables: {
                          input: {
                            coverURL: presignedURL.href.replace(
                              presignedURL.search,
                              ''
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
    </SettingsLayout>
  );
};

export default ProfileSettingPage;
