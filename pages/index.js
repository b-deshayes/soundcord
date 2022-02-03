import enforceAuthenticated from '../hooks/enforceAuthenticated'
import MainLayout from '../layouts/main'

export default function Home({ user }) {
  return <>{JSON.stringify(user, null, 2)} lorem ipsum</>
}

Home.getLayout = function getLayout(page) {
  return <MainLayout>{page}</MainLayout>
}

export const getServerSideProps = enforceAuthenticated()
