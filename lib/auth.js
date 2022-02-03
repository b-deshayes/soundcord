import { useRouter } from 'next/router'
import { createContext, useContext, useEffect, useState } from 'react'

export const AuthContext = createContext()

// TODO: Add some constants, like for URL
export const AuthProvider = ({ supabase, ...props }) => {
  const [session, setSession] = useState(null)
  const [role, setRole] = useState(null)
  const router = useRouter()

  useEffect(() => {
    setSession(supabase.auth.session())

    if (session?.user && role == null) {
      getRole().then(setRole)
    }

    const { data: authListener } = supabase.auth.onAuthStateChange(async (event, session) => {
      setSession(session)

      const response = await fetch('/api/auth', {
        method: 'POST',
        headers: new Headers({ 'Content-Type': 'application/json' }),
        credentials: 'same-origin',
        body: JSON.stringify({ event, session }),
      })
      const body = await response.json()

      if (event === 'SIGNED_IN') {
        if (response.status === 403) {
          console.log(body.message) // TODO: useToast()
          setSession(null)
          if (router.route !== '/login') router.push('/login')
        } else {
          // console.log(session)
          setRole(await getRole())
          router.push('/')
        }
      }
    }, [])

    return () => {
      authListener?.unsubscribe()
    }
  }, [role, router, session, supabase.auth])

  const getRole = async () => {
    const response = await fetch('/api/users/@me/role', {
      method: 'POST',
      headers: new Headers({ 'Content-Type': 'application/json' }),
      credentials: 'same-origin',
    })
    const body = await response.json()

    return body?.role || 'user'
  }

  const signOut = () => {
    router.push('/login')
    supabase.auth.signOut()
  }

  const signIn = async (provider) => {
    provider = provider ?? 'discord'
    const redirectTo = `${process.env.SITE_URL}/`
    await supabase.auth.signIn({ provider }, { redirectTo })
  }

  return (
    <AuthContext.Provider
      value={{
        session,
        role,
        signOut,
        signIn,
      }}
      {...props}
    />
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
