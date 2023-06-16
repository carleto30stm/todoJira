import {useContext} from 'react'
import { Box, Drawer, List, ListItem, ListItemIcon, ListItemText, Typography } from "@mui/material"
import AllInboxIcon from '@mui/icons-material/AllInbox';
import MailIcon from '@mui/icons-material/Mail';
import { UiContext } from "@/context/ui";

const menuItems: string[] = ['Inbox',  'Starred', 'Send email', 'Drafts']
export const Sidebar = () => {
  const {sideMenuOpen, closeSideMenu} = useContext(UiContext);
  return (
    
    <Drawer 
    anchor="left" 
    open={sideMenuOpen} 
    onClose={closeSideMenu}
    >
        <Box sx={{padding:'5px 10px'}}>
            <Typography variant="h6">Menu</Typography>
        </Box>
        <List>
        {
            menuItems.map((txt,i)=>(
              <ListItem key={txt} >
                  <ListItemIcon>
                    {i % 2 ? <AllInboxIcon /> : <MailIcon />}
                  </ListItemIcon>
                  <ListItemText primary={txt} />
              </ListItem>
            ))
        }
        </List>

    </Drawer>
  )
}
