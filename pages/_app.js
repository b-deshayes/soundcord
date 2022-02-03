import '../styles/tailwind.css'
import { createTheme, CssBaseline, NextUIProvider } from '@nextui-org/react'

import { AuthProvider } from '../lib/auth'
import { supabase } from '../lib/supabase'

const fonts = {
  sans: 'Lato, sans-serif',
}

const theme = createTheme({
  type: 'dark',
  theme: {
    fonts,
    colors: {
      background: '#36393F',
      accents1: '#1e2023',
    },
  },
})

function MyApp({ Component, pageProps }) {
  const getLayout = Component.getLayout || ((page) => page)
  return (
    <AuthProvider supabase={supabase}>
      <NextUIProvider theme={theme}>
        <CssBaseline />
        {getLayout(<Component {...pageProps} />)}
      </NextUIProvider>
    </AuthProvider>
  )
}

export default MyApp
