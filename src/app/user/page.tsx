'use client';

import React, { useState } from 'react';
import {
    Container,
    Typography,
    TextField,
    Button,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    IconButton,
    Box,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
    Alert,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
    Card,
} from '@mui/material';
import { Edit, Delete, Close } from '@mui/icons-material';
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

type User = {
    id: number;
    name: string;
    email: string;
    role: string;
};

type FormUser = {
    id: number | null;
    name: string;
    email: string;
    role: string;
};

const drawerWidth = 240;

export default function UserManagement() {
    const router = useRouter();

    // Navigation handlers
    const handleLogout = () => router.push('/');
    const handleAllProducts = () => router.push('all-product');
    const handleProductManagement = () => router.push('product-management');
    const handleUser = () => router.push('user');
    const handleDashboard = () => router.push('Dashboard');
    const handleProduct = () => router.push('product');

    const primaryItems = [
        { text: 'Dashboard', icon: <DashboardIcon />, onclick: handleDashboard },
        { text: 'All Products', icon: <ShoppingCartIcon />, onclick: handleAllProducts },
        { text: 'Product Management', icon: <ProductIcon />, onclick: handleProductManagement },
        { text: 'Product', icon: <ProductIcon />, onclick: handleProduct },
        { text: 'User', icon: <UserIcon />, onclick: handleUser },
    ];

    const secondaryItems = [
        { text: 'Logout', icon: <LogoutIcon />, onClick: handleLogout },
    ];

    // User state management
    const [users, setUsers] = useState<User[]>([
        { id: 1, name: 'สมชาย ใจดี', email: 'somchai@example.com', role: 'admin' },
        { id: 2, name: 'สุดา แสนดี', email: 'suda@example.com', role: 'user' },
    ]);

    const [form, setForm] = useState<FormUser>({
        id: null,
        name: '',
        email: '',
        role: 'user'
    });

    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [userToDelete, setUserToDelete] = useState<number | null>(null);
    const [errors, setErrors] = useState<Record<string, string>>({});

    const validateForm = () => {
        const newErrors: Record<string, string> = {};

        if (!form.name.trim()) {
            newErrors.name = 'กรุณากรอกชื่อผู้ใช้';
        }

        if (!form.email.trim()) {
            newErrors.email = 'กรุณากรอกอีเมล';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
            newErrors.email = 'รูปแบบอีเมลไม่ถูกต้อง';
        }

        if (!form.role) {
            newErrors.role = 'กรุณาเลือกสิทธิ์การใช้งาน';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
        // Clear error when user types
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    const handleRoleChange = (e: any) => {
        const value = e.target.value;
        setForm(prev => ({ ...prev, role: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateForm()) return;

        if (form.id !== null) {
            setUsers(users.map(u => (u.id === form.id ? form as User : u)));
        } else {
            const newUser: User = {
                ...form,
                id: Date.now(),
            };
            setUsers([...users, newUser]);
        }

        setForm({ id: null, name: '', email: '', role: 'user' });
    };

    const handleEdit = (user: User) => {
        setForm(user);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleDeleteClick = (id: number) => {
        setUserToDelete(id);
        setDeleteDialogOpen(true);
    };

    const handleDeleteConfirm = () => {
        if (userToDelete) {
            setUsers(users.filter(u => u.id !== userToDelete));
            if (form.id === userToDelete) {
                setForm({ id: null, name: '', email: '', role: 'user' });
            }
        }
        setDeleteDialogOpen(false);
    };

    const handleCancelEdit = () => {
        setForm({ id: null, name: '', email: '', role: 'user' });
    };

    const getRoleName = (role: string) => {
        switch (role) {
            case 'admin': return 'ผู้ดูแลระบบ';
            case 'user': return 'ผู้ใช้งานทั่วไป';
            default: return role;
        }
    };

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
                        User Management System
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
                        User Management
                    </Typography>

                    {/* User Form */}
                    <Card sx={{ mb: 4, p: 3, boxShadow: 3 }}>
                        <Typography variant="h5" gutterBottom sx={{ mb: 3, fontWeight: 'medium' }}>
                            {form.id ? 'แก้ไขผู้ใช้' : 'เพิ่มผู้ใช้ใหม่'}
                        </Typography>

                        <Box component="form" onSubmit={handleSubmit} sx={{ display: 'grid', gap: 3 }}>
                            <TextField
                                fullWidth
                                label="ชื่อผู้ใช้"
                                name="name"
                                value={form.name}
                                onChange={handleChange}
                                error={!!errors.name}
                                helperText={errors.name}
                            />

                            <TextField
                                fullWidth
                                label="อีเมล"
                                name="email"
                                type="email"
                                value={form.email}
                                onChange={handleChange}
                                error={!!errors.email}
                                helperText={errors.email}
                            />

                            <FormControl fullWidth error={!!errors.role}>
                                <InputLabel id="role-label">สิทธิ์การใช้งาน</InputLabel>
                                <Select
                                    labelId="role-label"
                                    label="สิทธิ์การใช้งาน"
                                    value={form.role}
                                    onChange={handleRoleChange}
                                >
                                    <MenuItem value="admin">ผู้ดูแลระบบ</MenuItem>
                                    <MenuItem value="user">ผู้ใช้งานทั่วไป</MenuItem>
                                </Select>
                                {errors.role && (
                                    <Typography variant="caption" color="error" sx={{ mt: 1, display: 'block' }}>
                                        {errors.role}
                                    </Typography>
                                )}
                            </FormControl>

                            <Box sx={{ display: 'flex', gap: 2 }}>
                                <Button
                                    type="submit"
                                    variant="contained"
                                    sx={{ px: 4 }}
                                    size="large"
                                >
                                    {form.id ? 'บันทึกการแก้ไข' : 'เพิ่มผู้ใช้'}
                                </Button>

                                {form.id && (
                                    <Button
                                        variant="outlined"
                                        onClick={handleCancelEdit}
                                        sx={{ px: 4 }}
                                        size="large"
                                    >
                                        ยกเลิก
                                    </Button>
                                )}
                            </Box>
                        </Box>
                    </Card>

                    {/* User List */}
                    <Typography variant="h5" gutterBottom sx={{ mb: 3, fontWeight: 'medium' }}>
                        รายชื่อผู้ใช้ ({users.length})
                    </Typography>

                    {users.length === 0 ? (
                        <Alert severity="info" sx={{ mb: 3 }}>
                            ไม่มีข้อมูลผู้ใช้ในระบบ
                        </Alert>
                    ) : (
                        <TableContainer component={Paper} sx={{ boxShadow: 2 }}>
                            <Table sx={{ minWidth: 650 }} aria-label="user table">
                                <TableHead sx={{ backgroundColor: 'primary.light' }}>
                                    <TableRow>
                                        <TableCell sx={{ color: 'common.white', fontWeight: 'bold' }}>ชื่อผู้ใช้</TableCell>
                                        <TableCell sx={{ color: 'common.white', fontWeight: 'bold' }}>อีเมล</TableCell>
                                        <TableCell sx={{ color: 'common.white', fontWeight: 'bold' }}>สิทธิ์การใช้งาน</TableCell>
                                        <TableCell align="right" sx={{ color: 'common.white', fontWeight: 'bold' }}>การจัดการ</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {users.map((user) => (
                                        <TableRow
                                            key={user.id}
                                            hover
                                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                        >
                                            <TableCell component="th" scope="row">
                                                {user.name}
                                            </TableCell>
                                            <TableCell>{user.email}</TableCell>
                                            <TableCell>{getRoleName(user.role)}</TableCell>
                                            <TableCell align="right">
                                                <IconButton
                                                    onClick={() => handleEdit(user)}
                                                    color="primary"
                                                    aria-label="edit"
                                                >
                                                    <Edit />
                                                </IconButton>
                                                <IconButton
                                                    onClick={() => handleDeleteClick(user.id)}
                                                    color="error"
                                                    aria-label="delete"
                                                >
                                                    <Delete />
                                                </IconButton>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    )}
                </Container>
            </Box>

            {/* Delete Confirmation Dialog */}
            <Dialog
                open={deleteDialogOpen}
                onClose={() => setDeleteDialogOpen(false)}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    ยืนยันการลบผู้ใช้
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        คุณแน่ใจว่าต้องการลบผู้ใช้นี้หรือไม่? การดำเนินการนี้ไม่สามารถยกเลิกได้
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setDeleteDialogOpen(false)}>ยกเลิก</Button>
                    <Button onClick={handleDeleteConfirm} color="error" autoFocus>
                        ลบผู้ใช้
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
}