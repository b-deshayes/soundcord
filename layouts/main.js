import Head from 'next/head'
import Navbar from '../components/navbar'
import enforceAuthenticated from '../hooks/enforceAuthenticated'

export default function MainLayout({ children }) {
  return (
    <>
      <Head>
        <title>Soundcord - Dashboard</title>
      </Head>
      <div className='flex flex-col justify-between min-h-screen'>
        <main className='p-4 flex-grow'>{children}</main>
        <Navbar />
      </div>
    </>
  )
}

export const getServerSideProps = enforceAuthenticated()
