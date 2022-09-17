import SettingsLayout from '@containers/settings/SettingsLayout';
import { NextPage } from 'next';

type PageProps = {};

const PrivacyPage: NextPage<PageProps> = () => {
  return (
    <SettingsLayout page="privacy">
      <h1>Privacy</h1>
    </SettingsLayout>
  );
};

export default PrivacyPage;
