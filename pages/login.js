import { Button, Card, Text } from '@nextui-org/react';
import AuthLayout from '../layouts/auth'
import { useAuth } from "../lib/auth";
import { Lock } from 'react-iconly'

export default function Login() {
  const { signIn } = useAuth()
  
  return (
    <div className="flex flex-col w-screen h-screen items-center justify-center">
      <Card css={{ w: "450px" }} className='border-0 p-10' hoverable>
        <Card.Header className="flex justify-center">
          <Text h1 size={60} css={{ textGradient: '45deg, $blue500 -20%, $pink500 50%' }}>
            Soundcord
          </Text>
        </Card.Header>
        <Card.Body>
          <Button iconRight={<Lock fill="currentColor" />} shadow auto size="xl" color="gradient" onClick={() => signIn('discord')}>
            <Text css={{ color: 'inherit' }} transform="uppercase">
              Sign in with Discord
            </Text>
          </Button>
        </Card.Body>
      </Card>
    </div>
  )
}

Login.getLayout = function getLayout(page) {
  return (
    <AuthLayout>
      {page}
    </AuthLayout>
  )
}
