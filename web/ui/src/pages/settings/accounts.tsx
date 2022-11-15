import SettingsLayout from '@containers/settings/SettingsLayout';
import { NextPage } from 'next';

type PageProps = {};

const AccountsSettingPage: NextPage<PageProps> = () => {
  return (
    <SettingsLayout page="accounts">
      <h1>AccountsSetting</h1>
    </SettingsLayout>
  );
};

export default AccountsSettingPage;
