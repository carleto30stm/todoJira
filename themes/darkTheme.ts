import { createTheme } from '@mui/material';


export  const darkTheme = createTheme({
          palette: {
            mode: 'dark',
             secondary: {
                main: '#19857b'
            }
        },
        components: { 
          MuiAppBar: {
            defaultProps: {
              elevation: 1,
              sx: {
                backgroundColor: '#321463'
              }
              }
            }
          }
        })