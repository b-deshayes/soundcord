import '../styles/tailwind.css'
import { createTheme, CssBaseline, NextUIProvider } from '@nextui-org/react';


import { AuthProvider } from '../lib/auth';
import { supabase } from '../lib/supabase';

const theme = createTheme({
  'type': 'dark'
})

function MyApp({ Component, pageProps }) {
  const getLayout = Component.getLayout || ((page) => page)
  return getLayout((
    <AuthProvider supabase={supabase}>
      <NextUIProvider theme={theme}>
        <CssBaseline />
        <Component {...pageProps} />
      </NextUIProvider>
    </AuthProvider>
  ))
}

export default MyApp;
