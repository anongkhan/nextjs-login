'use client';

import React from 'react';
import {
    Box,
    Card,
    CardContent,
    CardMedia,
    Typography,
    Container
} from '@mui/material';
import { useRouter } from 'next/navigation';
import Drawer from '@mui/material/Drawer';
import AppBar from '@mui/material/AppBar';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
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

const products = [
    {
        id: 1,
        name: 'Adidas Samba',
        price: '100 $',
        image: '/images/adidas samba.avif',
    },
    {
        id: 2,
        name: 'Nike Air Force 1 Low White Black',
        price: '100 $',
        image: '/images/nike-air-force-1-low-white-black.webp',
    },
    {
        id: 3,
        name: 'Vans Old Skool',
        price: '100 $',
        image: '/images/vans-old-skool.jpg',
    },
];
const drawerWidth = 240;

export default function ClippedDrawer() {
    const router = useRouter();

    const handleDashboard = () => {
        router.push('Dashboard');
    };
    const handleSubmit = () => {
        router.push('all-product');
    };
    const handleProduct = () => {
        router.push('product-management');
    };
    const handleUser = () => {
        router.push('user');
    };
    const handleLogout = () => {
        router.push('/');
    };

    const primaryItems = [
        { text: 'Dashboard', icon: <DashboardIcon />, onclick: handleDashboard },
        { text: 'All Products', icon: <ShoppingCartIcon />, onclick: handleSubmit },
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

            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    p: 3,
                    width: { sm: `calc(100% - ${drawerWidth}px)` },
                    backgroundColor: 'background.default',
                    minHeight: '100vh'
                }}
            >
                <Toolbar />
                <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
                    <Typography variant="h4" gutterBottom sx={{ mb: 4, fontWeight: 'bold', color: 'primary.main' }}>
                        All Products
                    </Typography>

                    <Box
                        sx={{
                            display: 'flex',
                            flexWrap: 'wrap',
                            gap: 3,
                            justifyContent: { xs: 'center', sm: 'flex-start' },
                        }}
                    >
                        {products.map((product) => (
                            <Card
                                key={product.id}
                                sx={{
                                    width: {
                                        xs: '100%',
                                        sm: 'calc(50% - 12px)',
                                        md: 'calc(33.33% - 16px)',
                                    },
                                    maxWidth: 345,
                                    boxShadow: 3,
                                    transition: 'transform 0.3s',
                                    '&:hover': {
                                        transform: 'translateY(-5px)',
                                        boxShadow: 6,
                                    },
                                    display: 'flex',
                                    flexDirection: 'column',
                                    height: '100%',
                                }}
                            >
                                <CardMedia
                                    component="img"
                                    sx={{
                                        height: 200,
                                        objectFit: 'cover',
                                    }}
                                    image={product.image}
                                    alt={product.name}
                                />
                                <CardContent sx={{ flexGrow: 1 }}>
                                    <Typography gutterBottom variant="h6" component="div" sx={{ fontWeight: 'bold' }}>
                                        {product.name}
                                    </Typography>
                                    <Typography variant="body1" color="text.secondary" sx={{ fontWeight: 'medium' }}>
                                        {product.price}
                                    </Typography>
                                </CardContent>
                            </Card>
                        ))}
                    </Box>
                </Container>
            </Box>
        </Box>
    );
}