import Head from 'next/head'

export default function LoginLayout({ children }) {
  return (
    <>
      <Head>
        <title>Soundcord - Login</title>
      </Head>
      <main className='flex flex-col w-screen h-screen items-center justify-center'>{children}</main>
    </>
  )
}
