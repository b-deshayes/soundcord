import '../styles/tailwind.css'
import { createTheme, CssBaseline, NextUIProvider } from '@nextui-org/react'

import { AuthProvider } from '../lib/auth'
import { supabase } from '../lib/supabase'

const theme = createTheme({
  type: 'dark',
  theme: {
    colors: {
      background: '#18191c',
      accents1: '#1e2023',
    },
  },
})

function MyApp({ Component, pageProps }) {
  const getLayout = Component.getLayout || ((page) => page)
  return getLayout(
    <AuthProvider supabase={supabase}>
      <NextUIProvider theme={theme}>
        <CssBaseline />
        <Component {...pageProps} />
      </NextUIProvider>
    </AuthProvider>
  )
}

export default MyApp
