import { SelectInput } from '@components/Form';
import {
  SettingsCategory,
  SettingsLayout,
  SettingsTable,
  SettingsTableRow,
  ThemePreview,
} from '@containers/settings';
import { useMe } from '@ctx/currentUser';
import { ClusterMapAvatarSize, Theme } from '@graphql.d';
import { NextPage } from 'next';

type PageProps = {};

const ApparenceSettingPage: NextPage<PageProps> = () => {
  const {
    me: { settings },
    updateSettings,
  } = useMe();

  return (
    <SettingsLayout page="apparence">
      <SettingsCategory
        title="Theme preference"
        description="Choose how S42 looks to you. Select a single theme, or sync with your
        system and automatically switch between light and dark themes."
      >
        <div className="flex flex-col lg:flex-row space-y-8 lg:space-y-0 items-center justify-around">
          <div onClick={() => updateSettings({ theme: Theme.AUTO })}>
            <ThemePreview
              themeName="auto"
              active={settings.theme === Theme.AUTO}
            />
          </div>
          <div onClick={() => updateSettings({ theme: Theme.LIGHT })}>
            <ThemePreview
              themeName="light"
              active={settings.theme === Theme.LIGHT}
            />
          </div>
          <div onClick={() => updateSettings({ theme: Theme.DARK })}>
            <ThemePreview
              themeName="dark"
              active={settings.theme === Theme.DARK}
            />
          </div>
        </div>
      </SettingsCategory>

      <SettingsCategory
        title="Cluster Map"
        description="Choose how clusters are displayed on the map for you."
      >
        <SettingsTable>
          <SettingsTableRow
            title="Avatar size"
            description="Choose the size of the avatar displayed on the map when a student is online."
          >
            <SelectInput
              className="flex-1"
              objects={Object.values(ClusterMapAvatarSize)}
              selectedValue={
                settings.clusterMapAvatarSize || ClusterMapAvatarSize.AUTO
              }
              defaultValue={ClusterMapAvatarSize.AUTO}
              onChange={(value) =>
                updateSettings({
                  clusterMapAvatarSize: value as ClusterMapAvatarSize,
                })
              }
            />
          </SettingsTableRow>
        </SettingsTable>
      </SettingsCategory>
    </SettingsLayout>
  );
};

export default ApparenceSettingPage;
