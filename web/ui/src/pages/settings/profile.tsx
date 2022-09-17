import SettingsLayout from '@containers/settings/SettingsLayout';
import { NextPage } from 'next';

type PageProps = {};

const ProfileSettingPage: NextPage<PageProps> = () => {
  return (
    <SettingsLayout page="profile">
      <h1>Profile</h1>
    </SettingsLayout>
  );
};

export default ProfileSettingPage;
