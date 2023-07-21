import Logo from '@assets/images/logo.svg';
import { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';

type PageProps = {};

const AboutPage: NextPage<PageProps> = () => {
  return (
    <div className="">
      <Head>
        <title>About - S42</title>
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
        This page stay under construction, thanks for your comprehension.
      </div>
      <div className="p-4 container mx-auto">
        <div className="flex flex-col">
          <div className="flex items-center">
            <Logo
              height={96}
              className="fill-slate-800 -top-3 relative  mr-4 dark:fill-white mt-4 mb-4"
            />
            <h1 className="text-8xl font-black py-5 mb-10 bg-clip-text text-transparent bg-gradient-to-r w-fit from-fuchsia-500 via-indigo-500 to-sky-500">
              About
            </h1>
          </div>
          <p className="mb-4">
            Stud42 is an open-source project that aims to be the project for
            every student on every campus around the world. It was initiated by{' '}
            <a
              className="underline hover:cursor-pointer text-indigo-500"
              href="https://github.com/42atomys"
              rel="noreferrer"
              target="_blank"
            >
              @42atomys
            </a>{' '}
            (also known as Atom) as a direct continuation of the Stud42.fr
            project. Atom announced that the project would be made open-source
            upon his departure from 42 staff, and he fulfilled that promise four
            years later.
          </p>
          <p>
            Today, Stud42 is a community-driven initiative that embodies the
            principles of transparency, education, and collaboration.
          </p>
          <h2 className="text-4xl font-bold py-2 mb-2 bg-clip-text text-transparent bg-gradient-to-r w-fit from-fuchsia-500 via-indigo-500 to-sky-500">
            Project Objectives
          </h2>
          <ul className="space-y-4">
            <li>
              <strong>Open Source:</strong> The Stud42 project is entirely
              open-source. All source code is available in this repository, and
              no private code will ever be added under any circumstances. This
              allows every student to access the code, study it, and contribute
              to its improvement.
            </li>
            <li>
              <strong>Community:</strong> The project is created by the
              community, for the community. Users&apos; ideas and suggestions
              are welcomed and voted on by the community. Stud42 aims to foster
              a collaborative environment where every student can actively
              participate in the project&apos;s development.
            </li>
            <li>
              <strong>Transparency:</strong> Stud42 is committed to
              transparency. No secrets or lies are tolerated. Transparency is
              essential for building trust and community engagement.
            </li>
            <li>
              <strong>Education:</strong> The primary focus of Stud42 is to be
              an educational project. All code added to the project must be
              understandable by any student and must be extensively commented to
              facilitate self-learning.
            </li>
          </ul>
          <h2 className="text-4xl font-bold py-2 mb-2 bg-clip-text text-transparent bg-gradient-to-r w-fit from-fuchsia-500 via-indigo-500 to-sky-500">
            Contributions and Participation
          </h2>
          <p className="mb-4">
            You are welcome to contribute to Stud42 in various ways:
          </p>
          <ul className="space-y-4">
            <li>
              <strong>Code:</strong> If you are a developer, you can contribute
              by proposing improvements, fixing bugs, or adding new features. Be
              sure to read the contribution guidelines and follow best
              development practices to ensure code consistency. Get started by
              checking out the{' '}
              <a
                className="underline hover:cursor-pointer text-indigo-500"
                href="https://github.com/42atomys/stud42"
                target="_blank"
                rel="noreferrer"
              >
                GitHub repository
              </a>
              .
            </li>
            <li>
              <strong>Documentation:</strong> Documentation is a crucial aspect
              of the Stud42 project. If you notice missing or ambiguous parts in
              the existing documentation, feel free to improve it by opening a
              pull request. You can also suggest new sections to cover topics
              that have not been addressed.
            </li>
            <li>
              <strong>Report Issues:</strong> If you encounter any issues or
              bugs while using Stud42, please report them by{' '}
              <a
                className="underline hover:cursor-pointer text-indigo-500"
                href="https://github.com/42atomys/stud42/issues/new"
                target="_blank"
                rel="noreferrer"
              >
                opening a detailed issue
              </a>
              . Be sure to provide sufficient information to reproduce the
              problem, allowing our community to assist you effectively.
            </li>
            <li>
              <strong>Give your inputs:</strong> If you have any ideas or
              suggestions for Stud42, you can share them on the{' '}
              <a
                className="underline hover:cursor-pointer text-indigo-500"
                href="https://discord.gg/5f864c6hyj"
                target="_blank"
                rel="noreferrer"
              >
                Discord server
              </a>
              . You can also vote on existing ideas to help us prioritize them.
            </li>
          </ul>
          <h2 className="text-4xl font-bold py-2 mb-2 bg-clip-text text-transparent bg-gradient-to-r w-fit from-fuchsia-500 via-indigo-500 to-sky-500">
            License
          </h2>
          <p>
            Stud42 is distributed under the MIT License. You are free to use
            this project for your own projects, provided you comply with the
            terms of the license and retain the credits to the original authors.
          </p>
          <h2 className="text-4xl font-bold py-2 mb-2 bg-clip-text text-transparent bg-gradient-to-r w-fit from-fuchsia-500 via-indigo-500 to-sky-500">
            Contact
          </h2>
          <p>
            If you wish to get in touch with the Stud42 team, you can join the{' '}
            <a
              className="underline hover:cursor-pointer text-indigo-500"
              href="https://discord.gg/5f864c6hyj"
              target="_blank"
              rel="noreferrer"
            >
              Discord server
            </a>{' '}
            or contact all adminstrators by email at{' '}
            <a
              className="underline hover:cursor-pointer text-indigo-500"
              href="mailto:admins@s42.app"
            >
              admins@s42.app
            </a>
            .
          </p>
          <p>Thank you for your support and participation in Stud42!</p>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
