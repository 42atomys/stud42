import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html>
      <Head>
        <script async src="https://kit.fontawesome.com/a8d6f88c41.js" crossOrigin="anonymous"></script>
      </Head>
      <body className="antialiased text-slate-600 dark:text-slate-400 bg-slate-100 dark:bg-slate-800">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
