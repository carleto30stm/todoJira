import { useContext } from 'react';
import NextLink from 'next/link';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import { UiContext } from '@/context/ui';


export const Navbar = () => {
  const {openSideMenu} = useContext(UiContext)
  return (
   <AppBar position='static' >
    <Toolbar>
        <IconButton
            size="large"
            edge="start"
            onClick={openSideMenu}><MenuIcon/></IconButton>
            <NextLink href="/" passHref legacyBehavior>
            <Link underline='none' color='white'>
        <Typography variant="h6">TodoJira</Typography>  
        </Link>       
            </NextLink>
    </Toolbar>
   </AppBar>
  )
}
