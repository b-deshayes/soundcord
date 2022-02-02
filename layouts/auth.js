import Head from 'next/head'

export default function AuthLayout({ children }) {
  return (
    <>
      <Head>
        <title>Layouts Example</title>
      </Head>
      <main>{children}</main>
    </>
  )
}
