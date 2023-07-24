import Logo from '@assets/images/logo.svg';
import { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';

type PageProps = {};

const TermsPage: NextPage<PageProps> = () => {
  return (
    <div className="">
      <Head>
        <title>Terms of Service - S42</title>
      </Head>
      <div className="w-100 bg-black p-4 text-slate-200 text-center">
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
          This terms of services is published as a draft. It will be updated
          during the beta of the application.
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
              Terms of Service
            </h1>
          </div>
          <small>
            <strong>Effective Date:</strong> 21/07/2023
          </small>
        </div>

        <p className="my-10">
          Welcome to S42! The following terms and conditions (&quot;Terms&quot;)
          govern all use of the S42 website and all content, services, and
          products available at or through the website.
        </p>

        <h2 className="text-4xl font-bold py-2 mb-2 bg-clip-text text-transparent bg-gradient-to-r w-fit from-fuchsia-500 via-indigo-500 to-sky-500">
          1. Acceptance of Terms
        </h2>

        <p>
          By accessing our Website, you agree to be bound by these Terms. If you
          do not agree to all the Terms, then you may not access the Website or
          use any of our services.
        </p>

        <h2 className="text-4xl font-bold py-2 mb-2 bg-clip-text text-transparent bg-gradient-to-r w-fit from-fuchsia-500 via-indigo-500 to-sky-500">
          2. Changes
        </h2>

        <p>
          S42 reserves the right, at its sole discretion, to modify or replace
          any part of this Agreement. It is your responsibility to check this
          Agreement periodically for changes. Your continued use of or access to
          the website following the posting of any changes to this Agreement
          constitutes acceptance of those changes. Any changes made will be
          available on our GitHub repository for reference.
        </p>

        <h2 className="text-4xl font-bold py-2 mb-2 bg-clip-text text-transparent bg-gradient-to-r w-fit from-fuchsia-500 via-indigo-500 to-sky-500">
          3. Content Posted on Other Websites
        </h2>

        <p>
          We have not reviewed, and cannot review, all of the material, made
          available through the websites and webpages to which S42 links, and
          that link to S42. S42 does not have any control over those non-S42
          websites and is not responsible for their contents or their use.
        </p>

        <h2 className="text-4xl font-bold py-2 mb-2 bg-clip-text text-transparent bg-gradient-to-r w-fit from-fuchsia-500 via-indigo-500 to-sky-500">
          4. Copyright Infringement and DMCA Policy
        </h2>

        <p>
          As S42 asks others to respect its intellectual property rights, it
          respects the intellectual property rights of others.
          <br />
          <br />
          As an open-source project under the MIT license, S42 deeply respects
          the intellectual property rights of others, just as it asks others to
          respect its own rights. We abide by the copyright law and expect our
          users to do the same.
          <br />
          <br />
          If you believe that material located on or linked to by our Website
          violates your copyright, you are encouraged to notify S42 in
          accordance with the Digital Millennium Copyright Act
          (&quot;DMCA&quot;) policy. S42 will respond to all such notices,
          including as required or appropriate, by removing the infringing
          material or disabling all links to the infringing material.
          <br />
          <br />
          Additionally, while S42 uses open-source software like Font Awesome
          Pro, we abide by the terms of their respective licenses. It is
          important to note that usage of our Website and services does not
          grant you rights to use any third-party open-source software. Users
          are advised to review the licensing terms of any such software before
          using them in connection with our Website or services.
        </p>

        <h2 className="text-4xl font-bold py-2 mb-2 bg-clip-text text-transparent bg-gradient-to-r w-fit from-fuchsia-500 via-indigo-500 to-sky-500">
          5. Intellectual Property
        </h2>

        <div>
          This Agreement does not transfer from S42 to you any S42 or third
          party intellectual property, and all right, title, and interest in and
          to such property will remain (as between the parties) solely with S42.
          <br />
          <ol>
            <li className="mt-4">
              <strong>Definition</strong>: All content on our website, including
              but not limited to text, graphics, logos, icons, images, audio
              clips, digital downloads, is our property or the property of our
              content providers and is protected by international and national
              intellectual property laws. Our source code is licensed under MIT
              and is therefore open source.
            </li>
            <li className="mt-4">
              <strong>Affirmation of Rights</strong>: We claim all intellectual
              property rights over our website and its content (excluding the
              MIT-licensed source code), unless otherwise stated or attributed
              to other sources.
            </li>
            <li className="mt-4">
              <strong>Authorized Use</strong>: Users may download, modify and
              use the source code of our site in accordance with the terms of
              the MIT license. Users may also download and print a copy of the
              content on our site for their personal non-commercial use,
              provided that they respect all copyright and other proprietary
              notices. Any other use of the content on our site, including its
              reproduction, modification, distribution, transmission,
              reprinting, display or performance, is strictly prohibited without
              our prior written permission.
            </li>
            <li className="mt-4">
              <strong>Prohibition of Copying</strong>: Copying, reproducing,
              downloading, distributing, selling or any other exploitation of
              the content of our website for commercial purposes is strictly
              prohibited without our prior written permission.
            </li>
            <li className="mt-4">
              <strong>Consequences of Violation</strong>: In case of violation
              of these terms, we reserve the right to take all necessary
              measures, including but not limited to blocking your access to our
              site, seeking damages in court, and/or reporting your activity to
              competent judicial authorities.
            </li>
            <li className="mt-4">
              <strong>Reporting Violations</strong>: If you suspect a violation
              of our intellectual property rights, please contact us providing
              full details so we can take appropriate action.
            </li>
          </ol>
        </div>

        <h2 className="text-4xl font-bold py-2 mb-2 bg-clip-text text-transparent bg-gradient-to-r w-fit from-fuchsia-500 via-indigo-500 to-sky-500">
          6. Termination
        </h2>

        <p>
          S42 may terminate your access to all or any part of the Website at any
          time, with or without cause, with or without notice, effective
          immediately.
          <br />
          Termination may occur for reasons including, but not limited to, a
          breach of the terms of use, violation of applicable laws, or misuse of
          the Website. In the event of termination, you must cease all use of
          the Website.
          <br />
          S42 is not liable to you or any third party for the termination of
          your access to the Website. The provisions of these terms of use that,
          by their nature, should survive termination will survive, including
          but not limited to, ownership warranties, warranty disclaimers,
          indemnities, and limitations of liability.
        </p>

        <h2 className="text-4xl font-bold py-2 mb-2 bg-clip-text text-transparent bg-gradient-to-r w-fit from-fuchsia-500 via-indigo-500 to-sky-500">
          7. Disclaimer of Warranties
        </h2>

        <p>
          The Website is provided &quot;as is&quot;. S42 and its suppliers and
          licensors hereby disclaim all warranties of any kind, express or
          implied, including, without limitation, the warranties of
          merchantability, fitness for a particular purpose and
          non-infringement.
        </p>

        <h2 className="text-4xl font-bold py-2 mb-2 bg-clip-text text-transparent bg-gradient-to-r w-fit from-fuchsia-500 via-indigo-500 to-sky-500">
          8. General Representation and Warranty
        </h2>

        <p>
          You represent and warrant that (i) your use of the Website will be in
          strict accordance with the S42 Privacy Policy, with this Agreement,
          and with all applicable laws and regulations (including without
          limitation any local laws or regulations in your country, state, city,
          or other governmental area, regarding online conduct and acceptable
          content, and including all applicable laws regarding the transmission
          of technical data exported from the United States or the country in
          which you reside) and (ii) your use of the Website will not infringe
          or misappropriate the intellectual property rights of any third party.
        </p>

        <h2 className="text-4xl font-bold py-2 mb-2 bg-clip-text text-transparent bg-gradient-to-r w-fit from-fuchsia-500 via-indigo-500 to-sky-500">
          9. Contact Information
        </h2>

        <p>
          If you have any questions about these Terms, please contact us at{' '}
          <a
            className="underline text-indigo-500 hover:cursor-pointer"
            href="mailto:contact@s42.app"
          >
            contact@s42.app
          </a>
        </p>
      </div>
    </div>
  );
};

export default TermsPage;
