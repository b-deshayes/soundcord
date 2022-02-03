import { useRouter } from 'next/router'
import { createContext, useContext, useEffect, useState } from 'react'

export const AuthContext = createContext()

// TODO: Add some constant, like for URL
export const AuthProvider = ({ supabase, ...props }) => {
  const [session, setSession] = useState(null)
  const router = useRouter()

  useEffect(() => {
    setSession(supabase.auth.session())

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
          router.push('/')
        }
      }
    }, [])

    return () => {
      authListener?.unsubscribe()
    }
  }, [router, session, supabase.auth])

  const signOut = () => {
    supabase.auth.signOut()
    router.push('/login')
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
