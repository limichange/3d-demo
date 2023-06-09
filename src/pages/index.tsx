import Head from 'next/head'
import { ThreePlayer } from '@/components/ThreePlayer'

export default function Home() {
  return (
    <>
      <Head>
        <title>Error 404</title>
        <meta name='description' content='Generated by Error 404' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <main>
        <div style={{ height: '90vh' }}>
          <ThreePlayer showText={true} />
        </div>
      </main>
    </>
  )
}
