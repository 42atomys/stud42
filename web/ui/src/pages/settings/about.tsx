import SettingsLayout from '@containers/settings/SettingsLayout';
import { NextPage } from 'next';

type PageProps = {};

const AboutPage: NextPage<PageProps> = () => {
  return (
    <SettingsLayout page="about">
      <h1>About</h1>
    </SettingsLayout>
  );
};

export default AboutPage;
