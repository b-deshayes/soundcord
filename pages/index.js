import enforceAuthenticated from '../hooks/enforceAuthenticated'
import AuthLayout from '../layouts/auth'
import Navbar from '../components/navbar'

export default function Home() {
  return <Navbar />
}

Home.getLayout = function getLayout(page) {
  return <AuthLayout>{page}</AuthLayout>
}

export const getServerSideProps = enforceAuthenticated()
