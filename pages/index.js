import enforceAuthenticated from '../hooks/enforceAuthenticated'
import { Button } from '@nextui-org/react';
import AuthLayout from '../layouts/auth'
import Image from "next/image";
import { useAuth } from "../lib/auth";


export default function Home({ user }) {
  const { signOut } = useAuth()

  return (
    <div className="flex flex-col w-screen h-screen items-center justify-center">
      <Image
        width={100}
        height={100}
        src={user.user_metadata.picture}
        className="rounded-full"
        alt={user.user_metadata.full_name}
      />
      <h3 className="mt-3 text-lg text-white">
        Welcome {user.user_metadata.full_name}
      </h3>
      <h3 className="mt-3 text-lg text-white">
        You are signed in as {user.user_metadata.provider_id}
      </h3>
      <Button shadow color="gradient" className="mt-3" auto onClick={() => signOut()}>Sign out</Button>
    </div>
  )
}

Home.getLayout = function getLayout(page) {
  return (
    <AuthLayout>
      {page}
    </AuthLayout>
  )
}

export const getServerSideProps = enforceAuthenticated();
