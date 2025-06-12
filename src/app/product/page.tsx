'use client'

import { useState, useEffect } from 'react';
import Link from 'next/link';
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
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const drawerWidth = 240;

export interface Product {
    id: number;
    pro_name: string;
    price: number;
    cat_name: string;
}

export default function Products() {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchProducts = async () => {
            const response = await fetch('http://localhost:3005/products');
            const data = await response.json();
            setProducts(data);
            setLoading(false);
        };
        fetchProducts();
    }, []);

    if (loading) {
        return (<><p className="text-center text-3xl text-blue-900 p-10 m-10">Loading Data...</p></>);
    }

    const router = useRouter();

    const handleDashboard = () => router.push('Dashboard');
    const handleSubmit = () => router.push('all-product');
    const handleProductManagement = () => router.push('product-management');
    const handleUser = () => router.push('user');
    const handleProduct = () => router.push('product');
    const handleLogout = () => router.push('/');

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
                <Toolbar>
                    <Typography variant="h4" >
                        Product List
                    </Typography>
                </Toolbar>
                <Divider />
                <TableContainer component={Paper} sx={{ maxWidth: '100%' }}>
                    <Table
                        sx={{
                            minWidth: 650,
                            borderCollapse: 'separate',
                            borderSpacing: 0,
                            '& td, & th': {
                                border: '1px solid #ccc',
                                fontSize: '1rem',
                            },
                            '& th': {
                                backgroundColor: '#1976d2',
                                color: '#fff',
                                fontWeight: 'bold',
                            },
                        }}
                        aria-label="product table"
                    >
                        <TableHead>
                            <TableRow>
                                <TableCell>ID</TableCell>
                                <TableCell>ຊື່ສິນຄ້າ</TableCell>
                                <TableCell>ລາຄາ</TableCell>
                                <TableCell>ປະເພດ</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {products.map((p) => (
                                <TableRow
                                    key={p.id}
                                    
                                    sx={{
                                        '&:hover': {
                                            backgroundColor: 'rgba(25, 118, 210, 0.05)',
                                            cursor: 'pointer',
                                        },
                                        '& td': {
                                            fontSize: '1rem',
                                        }
                                    }}
                                >
                                    <TableCell>{p.id}</TableCell>
                                    <TableCell>
                                        <Link
                                            href={{
                                                pathname: `/product/${p.id}`,
                                                query: { data: JSON.stringify(p) }
                                            }}
                                            style={{ color: '#1976d2', textDecoration: 'none' }}
                                        >
                                            {p.pro_name}
                                        </Link>
                                    </TableCell>
                                    <TableCell>{p.price}</TableCell>
                                    <TableCell>{p.cat_name}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>

            </Box>
        </Box>
    );
}
