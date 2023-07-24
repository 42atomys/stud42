import { Button } from '@components/Button';
import { SettingsCategory } from '@containers/settings';
import SettingsLayout from '@containers/settings/SettingsLayout';
import { NextPage } from 'next';
import Link from 'next/link';

type PageProps = {};

const AccountSettingPage: NextPage<PageProps> = () => {
  return (
    <SettingsLayout page="accounts">
      <SettingsCategory
        title="Export account data"
        description="Export all your data from S42 in a JSON file."
        className="bg-transparent"
      >
        <div className="flex flex-col space-y-4">
          <p className="text-sm">
            The export may take a few hours depending to your data. You will
            receive an email with a link to download the file. The link will be
            valid for 24 hours.
          </p>
          <Button disabled onClick={() => {}}>
            Export my data
          </Button>
          <p>
            <b className="text-amber-500">Warning:</b> This feature is not
            implemented yet. But you can ask for it to a <b>maintainer</b> on
            our{' '}
            <a
              href="https://discord.gg/5f864c6hyj"
              className="text-indigo-500 hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              Discord server
            </a>
            .
          </p>
        </div>
      </SettingsCategory>

      <SettingsCategory
        title="Delete account"
        description="Delete S42 relative data from your student account."
        className="bg-transparent"
      >
        <div className="flex flex-col space-y-4">
          <p>
            This action is irreversible and will delete all data related to your
            activity on S42. You will not be able to recover your data.
            <br />
            Your account will be converted to a <b>Passive user</b>, according
            to the{' '}
            <Link
              href="/about/privacy"
              className="text-indigo-500 hover:underline"
            >
              Privacy Policy
            </Link>{' '}
            and{' '}
            <Link
              href="/about/terms"
              className="text-indigo-500 hover:underline"
            >
              Terms of Use
            </Link>{' '}
            of S42.
          </p>
          <p>
            All your data will not be processed anymore and only the data
            necessary for the operation of the site will be kept, such as your
            42 profile, accessible by the 42 API.
          </p>
          <Button disabled color="danger" onClick={() => {}}>
            Delete my s42 data, and become a passive user
          </Button>
          <p>
            <b className="text-amber-500">Warning:</b> This feature is not
            implemented yet. But you can ask for it to a <b>maintainer</b> on
            our{' '}
            <a
              href="https://discord.gg/5f864c6hyj"
              className="text-indigo-500 hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              Discord server
            </a>
            .
          </p>
        </div>
      </SettingsCategory>
    </SettingsLayout>
  );
};

export default AccountSettingPage;
