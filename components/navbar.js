import { Button } from '@nextui-org/react'
import Image from 'next/image'
import { useAuth } from '../lib/auth'

export default function Navbar() {
  const { session, signOut } = useAuth()

  return (
    <div className='flex flex-col w-screen h-screen items-center justify-center'>
      {session && (
        <>
          <Image
            width={100}
            height={100}
            src={session.user.user_metadata.picture}
            className='rounded-full'
            alt={session.user.user_metadata.full_name}
          />
          <h3 className='mt-3 text-lg text-white'>Welcome {session.user.user_metadata.full_name}</h3>
          <h3 className='mt-3 text-lg text-white'>You are signed in as {session.user.user_metadata.provider_id}</h3>
          <Button shadow color='gradient' className='mt-3' auto onClick={() => signOut()}>
            Sign out
          </Button>
        </>
      )}
    </div>
  )
}
