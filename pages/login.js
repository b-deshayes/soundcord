import { Button, Card, Text } from '@nextui-org/react'
import { useAuth } from '../lib/auth'
import { Lock } from 'react-iconly'
import LoginLayout from '../layouts/login'

export default function Login() {
  const { signIn } = useAuth()

  return (
    <>
      <Card css={{ w: '450px' }} className='border-0 p-10' hoverable>
        <Card.Header className='flex justify-center'>
          <Text h1 size={60} css={{ textGradient: '45deg, $blue500 -20%, $pink500 50%' }}>
            Soundcord
          </Text>
        </Card.Header>
        <Card.Body>
          <Button
            iconRight={<Lock fill='currentColor' />}
            shadow
            auto
            size='xl'
            color='gradient'
            onClick={() => signIn('discord')}>
            <Text css={{ color: 'inherit' }} transform='uppercase'>
              Sign in with Discord
            </Text>
          </Button>
        </Card.Body>
      </Card>
    </>
  )
}

Login.getLayout = function getLayout(page) {
  return <LoginLayout>{page}</LoginLayout>
}
