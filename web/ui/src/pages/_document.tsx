import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html className="bg-white dark:bg-slate-900">
      <Head>
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/assets/favicon/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/assets/favicon/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/assets/favicon/favicon-16x16.png"
        />
        <link rel="manifest" href="/assets/favicon/site.webmanifest" />
        <link
          rel="mask-icon"
          href="/assets/favicon/safari-pinned-tab.svg"
          color="#1e293b"
        />
        <meta name="apple-mobile-web-app-title" content="Stud42" />
        <meta name="application-name" content="Stud42" />
        <meta name="msapplication-TileColor" content="#1e293b" />
        <meta name="theme-color" content="#1e293b" />
      </Head>
      <body className="antialiased text-slate-600 dark:text-slate-400 bg-slate-100 dark:bg-slate-800/60">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
