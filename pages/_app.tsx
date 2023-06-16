import type { AppProps } from 'next/app'
import { CssBaseline, ThemeProvider } from '@mui/material'
import { SnackbarProvider } from 'notistack';
import '@/styles/globals.css'
import { UiContextProvider } from '@/context/ui'
import { lightTheme, darkTheme } from '@/themes'
import { EntriesContextProvider } from '@/context/entries'


export default function App({ Component, pageProps }: AppProps) {
  return (
    <SnackbarProvider maxSnack={3}>
      <EntriesContextProvider>
        <UiContextProvider>
          <ThemeProvider theme={darkTheme}>
            <CssBaseline/>
            <Component {...pageProps} />   
          </ThemeProvider>
        </UiContextProvider>
      </EntriesContextProvider>
    </SnackbarProvider>
  ) 
}
