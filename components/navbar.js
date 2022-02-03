import { useState } from 'react'
import { useAuth } from '../lib/auth'
import { Tooltip, Avatar } from '@nextui-org/react'
import { Logout, PaperPlus, AddUser } from 'react-iconly'
import Whitelist from './whitelist'

export default function Navbar() {
  const { session, signOut, role } = useAuth()
  const [visible, setVisible] = useState(false)

  return (
    <nav className='px-2 sm:px-4 py-2.5 bg-[#292b2f] shadow-2xl grow-0'>
      <div className='container flex items-center gap-10'>
        {session && (
          <>
            <div className='flex flex-row items-center gap-2'>
              <Avatar
                size='lg'
                src={session.user.user_metadata.picture}
                zoomed
                alt={session.user.user_metadata.full_name}
                color='success'
                bordered
              />
              <div className='flex flex-col text-sm'>
                <span className='font-bold'>{session.user.user_metadata.full_name}</span>
                <span className='text-gray-300 text-xs'>#{session.user.user_metadata.provider_id}</span>
              </div>
            </div>

            <div className='flex flex-row'>
              <Tooltip hideArrow rounded content='Ajouter un son' css={{ background: '#202225' }}>
                <button
                  className='
                  hover:bg-[#5865f2]
                  hover:text-[#dcddde]
                  transition-all
                  p-2
                  rounded-md
                  text-[#829291]'>
                  <PaperPlus set='curved' primaryColor='currentColor' />
                </button>
              </Tooltip>

              {role && role === 'admin' && (
                <>
                  <Whitelist handleClose={() => setVisible(false)} show={visible} />
                  <Tooltip hideArrow rounded content='Whitelister' css={{ background: '#202225' }}>
                    <button
                      onClick={() => setVisible(true)}
                      className='
                  hover:bg-[#ed4245]
                  hover:text-[#dcddde]
                  transition-all
                  p-2
                  rounded-md
                  text-[#829291]'>
                      <AddUser set='curved' primaryColor='currentColor' />
                    </button>
                  </Tooltip>
                </>
              )}

              <Tooltip hideArrow rounded content='Se déconnecter' css={{ background: '#202225' }}>
                <button
                  onClick={signOut}
                  className='
                  hover:bg-[#35383e]
                  hover:text-[#dcddde]
                  transition-all
                  p-2
                  rounded-md
                  text-[#829291]'>
                  <Logout set='curved' primaryColor='currentColor' />
                </button>
              </Tooltip>
            </div>
          </>
        )}
      </div>
    </nav>
  )
}
