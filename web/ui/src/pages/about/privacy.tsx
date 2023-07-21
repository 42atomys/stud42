import Logo from '@assets/images/logo.svg';
import { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';

type PageProps = {};

const PrivacyPage: NextPage<PageProps> = () => {
  return (
    <div className="">
      <Head>
        <title>Privacy Policy - S42</title>
      </Head>
      <div className="w-100 bg-black p-4 text-center">
        I&apos;m fine, send me back to the{' '}
        <Link
          className="underline text-indigo-500 hover:cursor-pointer"
          href="/"
        >
          S42 application
        </Link>
      </div>
      <div className="w-100 bg-indigo-500 p-4 text-slate-900 text-center">
        <div className="container mx-auto text-center">
          This policy is published as a draft. It will be updated during the
          beta of the application. This policy will be updated before final
          release with the approbation of the 42 Data Protection Officer and a
          CNIL Agent.
        </div>
      </div>
      <div className="p-4 container mx-auto">
        <div className="flex flex-col">
          <div className="flex items-center">
            <Logo
              height={96}
              className="fill-slate-800 -top-3 relative  mr-4 dark:fill-white mt-4 mb-4"
            />
            <h1 className="text-8xl font-black py-5 mb-10 bg-clip-text text-transparent bg-gradient-to-r w-fit from-fuchsia-500 via-indigo-500 to-sky-500">
              Privacy Policy
            </h1>
          </div>
          <small>
            <strong>Effective Date:</strong> 21/07/2023
          </small>
        </div>

        <div className="my-10">
          This Privacy Policy describes how S42 collects, uses, and shares
          personal data when you use our website located at s42.app (the
          &quot;Website&quot;). S42 respects your privacy and is committed to
          protecting your personal data. This Privacy Policy also tells you
          about your rights and choices with respect to your personal data, and
          how you can reach us to get answers to your questions.
          <br />
          <div>
            <p>
              According in this Privacy Policy, &quot;personal data&quot; means
              any information relating to an identified or identifiable natural
              person.
            </p>

            <ul>
              <li>
                <strong>Passive Users:</strong> those who have never visited the
                site but have logged in at least once to a cluster since July
                2022
              </li>
              <li>
                <strong>Active Users:</strong> those who have visited the site
                at least once
              </li>
            </ul>
          </div>
        </div>

        <h2 className="text-4xl font-bold py-2 mb-2 bg-clip-text text-transparent bg-gradient-to-r w-fit from-fuchsia-500 via-indigo-500 to-sky-500">
          1. Personal data we collect
        </h2>

        <p>
          We collect personal data from two types of users:{' '}
          <strong>Passive Users</strong> and <strong>Active Users</strong>.
        </p>

        <p className="mt-4 underline">For all users (passive and active):</p>
        <ul>
          <li>- Full name</li>
          <li>- Student email address from 42</li>
          <li>- Data related to locations, campuses, and curriculum</li>
        </ul>

        <p className="mt-4 underline">For Active Users:</p>
        <ul>
          <li>
            - Teams for creating friend groups related to your ongoing work
          </li>
          <li>- Username of accounts you decide to link via Oauth2</li>
        </ul>

        <h2 className="text-4xl font-bold py-2 mb-2 bg-clip-text text-transparent bg-gradient-to-r w-fit from-fuchsia-500 via-indigo-500 to-sky-500">
          2. How we use your personal data
        </h2>

        <p className="mt-4">
          <span className="underline">For all users:</span> We use your data to
          display a map of the 42 network campuses&apos; clusters, generate
          anonymous statistics, friends proposition. All displayed information
          is directly retrieved from the 42 API.
        </p>

        <p className="mt-4">
          <span className="underline">For Active Users:</span> We use the
          information you provide in customizing your profile to personalize the
          site&apos;s appearance for your profile and for our services.
        </p>

        <p className="mt-4">
          <span className="underline">For Passive Users:</span> We do not
          process your data. Your data comes from the 42 API and is only visible
          to active users.
        </p>

        <h2 className="text-4xl font-bold py-2 mb-2 bg-clip-text text-transparent bg-gradient-to-r w-fit from-fuchsia-500 via-indigo-500 to-sky-500">
          3. How we share your personal data
        </h2>

        <p>
          At S42, we value your privacy highly. We do not sell, trade, or
          distribute your personal data to third parties. Only authorized
          administrators within S42 have access to your personal data for the
          purpose of performing their duties.
          <br />
          We retain your information only as long as necessary to provide our
          services or as required by law. If we are legally compelled to
          disclose your personal information, we will do so upholding your
          rights and our commitment to maintaining the confidentiality of your
          data.
        </p>

        <h2 className="text-4xl font-bold py-2 mb-2 bg-clip-text text-transparent bg-gradient-to-r w-fit from-fuchsia-500 via-indigo-500 to-sky-500">
          4. Your rights
        </h2>

        <p className="mt-4 underline">
          Under the General Data Protection Regulation (GDPR), you have the
          right to:
        </p>

        <ul>
          <li>Access your personal data by downloading it.</li>
          <li>Rectify inaccurate personal data.</li>
          <li>Request the deletion of your personal data.</li>
          <li>Request restriction of processing of your personal data.</li>
        </ul>

        <p className="mt-4">
          Please note that for any requests relating to data coming from the 42
          API, you should contact the Data Protection Officer of 42.
        </p>

        <h2 className="text-4xl font-bold py-2 mb-2 bg-clip-text text-transparent bg-gradient-to-r w-fit from-fuchsia-500 via-indigo-500 to-sky-500">
          5. Data security
        </h2>

        <p>
          We implement appropriate technical and organizational measures to
          protect your personal data against accidental or unlawful destruction,
          loss, change, or damage. Security checks and backups are performed on
          a monthly basis, and server access is limited to S42 administrators
          via a private VPN.
        </p>

        <h2 className="text-4xl font-bold py-2 mb-2 bg-clip-text text-transparent bg-gradient-to-r w-fit from-fuchsia-500 via-indigo-500 to-sky-500">
          6. International data transfers
        </h2>

        <p>
          All data are processed and stored in France. Data from all campuses
          worldwide are currently stored in France with the OVH hosting service.
          There is no foreign transfer of data.
        </p>

        <h2 className="text-4xl font-bold py-2 mb-2 bg-clip-text text-transparent bg-gradient-to-r w-fit from-fuchsia-500 via-indigo-500 to-sky-500">
          7. Changes to this Privacy Policy
        </h2>

        <p>
          We may update this Privacy Policy from time to time. If we make
          significant privacy changes, active users will be notified through a
          banner at the top of the website.
        </p>

        <h2 className="text-4xl font-bold py-2 mb-2 bg-clip-text text-transparent bg-gradient-to-r w-fit from-fuchsia-500 via-indigo-500 to-sky-500">
          8. Contact Us
        </h2>

        <p>
          If you have any questions about our use of your personal data, please
          contact us at:
        </p>

        <p>
          S42 Email:{' '}
          <a
            className="underline text-indigo-500 hover:cursor-pointer"
            href="mailto:contact@s42.app"
          >
            contact@s42.app
          </a>
        </p>

        <h2 className="text-4xl font-bold py-2 mb-2 bg-clip-text text-transparent bg-gradient-to-r w-fit from-fuchsia-500 via-indigo-500 to-sky-500">
          9. Administrators
        </h2>

        <p>
          The following individuals are authorized administrators at S42 and
          they can be contacted via the email addresses{' '}
          <a
            className="underline text-indigo-500 hover:cursor-pointer"
            href="mailto:admins@s42.app"
          >
            admins@s42.app
          </a>
          :
        </p>

        <p>
          - Atom (Discord: @42atomys or{' '}
          <a
            className="underline text-indigo-500 hover:cursor-pointer"
            href="mailto:contact@s42.app"
          >
            contact@s42.app
          </a>
          )
        </p>
      </div>
    </div>
  );
};

export default PrivacyPage;
