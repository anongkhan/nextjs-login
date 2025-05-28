'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import AppBar from '@mui/material/AppBar';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/Inbox';
import StarIcon from '@mui/icons-material/Star';
import SendIcon from '@mui/icons-material/Send';
import DraftsIcon from '@mui/icons-material/Drafts';
import AllInboxIcon from '@mui/icons-material/AllInbox';
import DeleteIcon from '@mui/icons-material/Delete';
import ReportIcon from '@mui/icons-material/Report';
import LogoutIcon from '@mui/icons-material/Logout';


const drawerWidth = 240;

export default function ClippedDrawer() {
  const router = useRouter();

  const handleLogout = () => {
    // คุณสามารถเพิ่ม logic ล้าง token หรือ session ได้ที่นี่
    router.push('/');
  };

  const primaryItems = [
    { text: 'Inbox', icon: <InboxIcon /> },
    { text: 'Starred', icon: <StarIcon /> },
    { text: 'Send email', icon: <SendIcon /> },
    { text: 'Drafts', icon: <DraftsIcon /> },
  ];

  const secondaryItems = [
    { text: 'All mail', icon: <AllInboxIcon /> },
    { text: 'Trash', icon: <DeleteIcon /> },
    { text: 'Spam', icon: <ReportIcon /> },
    { text: 'Logout', icon: <LogoutIcon />, onClick: handleLogout },
  ];

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar>
          <Typography variant="h6" noWrap component="div">
            Welcome to Dashboard
          </Typography>

        </Toolbar>
      </AppBar>

      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: 'auto' }}>
          <List sx={{ mt: 2 }}>
            {primaryItems.map((item) => (
              <ListItem key={item.text} disablePadding>
                <ListItemButton>
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  <ListItemText primary={item.text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
          <Divider />
          <List>
            {secondaryItems.map((item) => (
              <ListItem key={item.text} disablePadding>
                <ListItemButton onClick={item.onClick}>
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  <ListItemText primary={item.text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>

      <Box component="main" sx={{ flexGrow: 1, paddingLeft: 9, paddingTop: 7, paddingRight: 20 }}>
        <Toolbar />
        <Typography sx={{ marginBottom: 2 }}>
          ຍຶນດີຕ້ອນຮັບເຂົ້າສູ່ລະບົບ
        </Typography>
      </Box>
    </Box>
  );
}
