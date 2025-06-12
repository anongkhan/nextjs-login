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
import UserIcon from '@mui/icons-material/Person';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import LogoutIcon from '@mui/icons-material/Logout';
import ProductIcon from '@mui/icons-material/ProductionQuantityLimits';
import DashboardIcon from '@mui/icons-material/Dashboard';


const drawerWidth = 240;

export default function ClippedDrawer() {
    const router = useRouter();

    const handleDashboard = () => {
        router.push('Dashboard');
    };
    const handleSubmit = () => {
        router.push('all-product');
    };
    const handleProductManagement = () => {
        router.push('product-management');
    };
    const handleUser = () => {
        router.push('user');
    };
    const handleProduct = () => {
        router.push('product'); 
    };
    const handleLogout = () => {
        router.push('/');
    };

    const primaryItems = [
        { text: 'Dashboard', icon: <DashboardIcon />, onclick: handleDashboard },
        { text: 'All Products', icon: <ShoppingCartIcon />, onclick: handleSubmit },
        { text: 'Product Management', icon: <ProductIcon />, onclick: handleProductManagement },
        { text: 'Product', icon: <ProductIcon />, onclick: handleProduct },
        { text: 'User', icon: <UserIcon />, onclick: handleUser },
    ];

    const secondaryItems = [
        { text: 'Logout', icon: <LogoutIcon />, onClick: handleLogout },
    ];



  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          zIndex: (theme) => theme.zIndex.drawer + 1,
          backgroundColor: 'primary.main',
        }}
      >
        <Toolbar>
          <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
            Welcome to Dashboard
          </Typography>
          
        </Toolbar>
      </AppBar>

      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: 'border-box',
            backgroundColor: 'background.paper',
          },
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: 'auto', display: 'flex', flexDirection: 'column', height: '100%' }}>
          <List sx={{ mt: 2 }}>
            {primaryItems.map((item) => (
              <ListItem key={item.text} disablePadding>
                <ListItemButton
                  onClick={item.onclick}
                  sx={{
                    '&:hover': {
                      backgroundColor: 'action.hover',
                    }
                  }}
                >
                  <ListItemIcon sx={{ color: 'text.primary' }}>{item.icon}</ListItemIcon>
                  <ListItemText primary={item.text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
          <Divider sx={{ my: 1 }} />
          <List sx={{ mt: 'auto', mb: 2 }}>
            {secondaryItems.map((item) => (
              <ListItem key={item.text} disablePadding>
                <ListItemButton
                  onClick={item.onClick}
                  sx={{
                    '&:hover': {
                      backgroundColor: 'error.light',
                    }
                  }}
                >
                  <ListItemIcon sx={{ color: 'error.main' }}>{item.icon}</ListItemIcon>
                  <ListItemText primary={item.text} sx={{ color: 'error.main' }} />
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
