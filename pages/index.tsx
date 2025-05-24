import Head from 'next/head';
import '@/styles/Home.module.css';
import { Scene } from './3d';

export default function Home() {
  return (
    <>
      <Head>
        <title>CAMS</title>
        <meta name="description" content="CAMS app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>

      </main>

      <Scene />
    </>
  );
}
