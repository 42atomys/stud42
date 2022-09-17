import SettingsLayout from '@containers/settings/SettingsLayout';
import { NextPage } from 'next';

type PageProps = {};

const HelpPage: NextPage<PageProps> = () => {
  return (
    <SettingsLayout page="help">
      <h1>Help</h1>
    </SettingsLayout>
  );
};

export default HelpPage;
