import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import { signIn,signOut, useSession,getSession } from 'next-auth/react';

const inter = Inter({ subsets: ['latin'] })

export default function Home(props) {

  const homesession = useSession();

  console.log("homesession",homesession)
  console.log("data",props)
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={`${styles.main} ${inter.className}`}>
        <div className={styles.description}>
          <p>
            Get started by editing&nbsp;
            <code className={styles.code}>src/pages/index.js</code>
          </p>
          <button
  onClick={() => {
    signIn(
      'azure-ad',
      { callbackUrl: '/' },
      // { prompt: 'login' },
    );
  }}
>
  Log in
</button>
          <button
  onClick={() => {
    signIn(
      'github'
      // { prompt: 'login' },
    );
  }}
>
  GITHUB LOGIN in
</button>
       <button
  onClick={() => {
    signIn(
      'cognito',
      { callbackUrl: '/' },
      // { prompt: 'login' },
    );
  }}
>
  Cog Log in1.4
</button>
         </div>
      </main>
    </>
  )
}

export async function getServerSideProps(ctx){
  const sesssion = await getSession(ctx);
  // console.log(sesssion)
  return {
    props: {
      datass: sesssion ? sesssion : 'no - sesion'
    }
  }
}
