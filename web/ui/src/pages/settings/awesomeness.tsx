import { SettingsCategory } from '@containers/settings';
import SettingsLayout from '@containers/settings/SettingsLayout';
import { NextPage } from 'next';
import Image from 'next/image';

type PageProps = {};

const AwesomenessSettingPage: NextPage<PageProps> = () => {
  return (
    <SettingsLayout page="awesomeness">
      <SettingsCategory title="Awesomeness" description="">
        <div className="w-full flex flex-col items-center p-8">
          <div className="w-[200px] h-[250px] flex justify-center items-center">
            <Image
              src="/assets/images/kappa.png"
              width={200}
              height={250}
              layout="fixed"
              alt="Kappa"
            />
          </div>
          <p className="mt-8 text-center">
            Really? You thought you could hack the system like that? I saw you
            coming, kid!
            <br />
            It will be ready soon but for now don&apos;t try, I&apos;ve already
            thought about it
          </p>
        </div>
      </SettingsCategory>
    </SettingsLayout>
  );
};

export default AwesomenessSettingPage;
