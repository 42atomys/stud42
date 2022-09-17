import SettingsLayout from '@containers/settings/SettingsLayout';
import { NextPage } from 'next';

type PageProps = {};

const TermsPage: NextPage<PageProps> = () => {
  return (
    <SettingsLayout page="terms">
      <h1>Terms</h1>
    </SettingsLayout>
  );
};

export default TermsPage;
