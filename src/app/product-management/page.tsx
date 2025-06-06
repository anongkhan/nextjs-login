'use client';

import { useState } from 'react';
import {
  Container,
  Typography,
  TextField,
  Button,
  Card,
  CardContent,
  CardActions,
  IconButton,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';
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

interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
}

const drawerWidth = 240;

export default function ProductManagementPage() {
  const router = useRouter();

  // Navigation handlers
  const handleLogout = () => router.push('/');
  const handleAllProducts = () => router.push('all-product');
  const handleProduct = () => router.push('product-management');
  const handleUser = () => router.push('user');
  const handleDashboard = () => router.push('Dashboard');

  const primaryItems = [
    { text: 'Dashboard', icon: <DashboardIcon />, onclick: handleDashboard },
    { text: 'All Products', icon: <ShoppingCartIcon />, onclick: handleAllProducts },
    { text: 'Product', icon: <ProductIcon />, onclick: handleProduct },
    { text: 'User', icon: <UserIcon />, onclick: handleUser },
  ];

  const secondaryItems = [
    { text: 'Logout', icon: <LogoutIcon />, onClick: handleLogout },
  ];

  // Product state management
  const [products, setProducts] = useState<Product[]>([
    { id: 1, name: 'รองเท้าวิ่ง', price: 2500, description: 'รองเท้าสำหรับวิ่งระยะไกล' },
    { id: 2, name: 'กระเป๋าเป้', price: 1500, description: 'กระเป๋าสำหรับใส่อุปกรณ์กีฬา' },
  ]);

  const [form, setForm] = useState<Omit<Product, 'id'>>({
    name: '',
    price: 0,
    description: '',
  });

  const [editingId, setEditingId] = useState<number | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState<number | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: name === 'price' ? Number(value) : value }));
  };

  const handleSubmit = () => {
    if (!form.name || form.price <= 0) {
      alert('ກະລຸນາໃສ່ຊື່ສິນຄ້າແລະລາຄາໃຫ້ຖືກຕ້ອງ');
      return;
    }

    if (editingId !== null) {
      setProducts((prev) =>
        prev.map((p) => (p.id === editingId ? { ...p, ...form } : p))
      );
      setEditingId(null);
    } else {
      const newProduct = { id: Date.now(), ...form };
      setProducts((prev) => [...prev, newProduct]);
    }
    setForm({ name: '', price: 0, description: '' });
  };

  const handleEdit = (product: Product) => {
    setForm({ 
      name: product.name, 
      price: product.price, 
      description: product.description 
    });
    setEditingId(product.id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDeleteClick = (id: number) => {
    setProductToDelete(id);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = () => {
    if (productToDelete) {
      setProducts((prev) => prev.filter((p) => p.id !== productToDelete));
      if (editingId === productToDelete) {
        setForm({ name: '', price: 0, description: '' });
        setEditingId(null);
      }
    }
    setDeleteDialogOpen(false);
    setProductToDelete(null);
  };

  const handleDeleteCancel = () => {
    setDeleteDialogOpen(false);
    setProductToDelete(null);
  };

  const handleCancelEdit = () => {
    setForm({ name: '', price: 0, description: '' });
    setEditingId(null);
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
            Product Management System
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
          width: { sm: `calc(100% - ${drawerWidth}px)`, },
          backgroundColor: 'background.default',
          minHeight: '100vh'
        }}
      >
        <Toolbar />
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
          <Typography variant="h4" gutterBottom sx={{ mb: 4, fontWeight: 'bold', color: 'primary.main' }}>
            Product Management
          </Typography>

          {/* Product Form */}
          <Card 
            sx={{ 
              mb: 4, 
              p: 3,
              boxShadow: 3,
              backgroundColor: 'background.paper'
            }}
          >
            <Typography variant="h5" gutterBottom sx={{ mb: 3, fontWeight: 'medium' }}>
              {editingId !== null ? 'แก้ไขสินค้า' : 'เพิ่มสินค้าใหม่'}
            </Typography>
            
            <Box component="form" noValidate sx={{ mt: 1 }}>
              <TextField
                fullWidth
                label="ชื่อสินค้า"
                name="name"
                value={form.name}
                onChange={handleChange}
                margin="normal"
                required
                sx={{ mb: 2 }}
              />
              <TextField
                fullWidth
                label="ราคา (บาท)"
                name="price"
                type="number"
                value={form.price || ''}
                onChange={handleChange}
                margin="normal"
                required
                inputProps={{ min: 0 }}
                sx={{ mb: 2 }}
              />
              <TextField
                fullWidth
                label="รายละเอียดสินค้า"
                name="description"
                value={form.description}
                onChange={handleChange}
                margin="normal"
                multiline
                rows={3}
                sx={{ mb: 3 }}
              />
              
              <Box sx={{ display: 'flex', gap: 2 }}>
                <Button
                  variant="contained"
                  onClick={handleSubmit}
                  sx={{ px: 4 }}
                  size="large"
                >
                  {editingId !== null ? 'บันทึกการแก้ไข' : 'เพิ่มสินค้า'}
                </Button>
                
                {editingId !== null && (
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

          {/* Product List */}
          <Typography variant="h5" gutterBottom sx={{ mb: 3, fontWeight: 'medium' }}>
            รายการสินค้า ({products.length})
          </Typography>
          
          {products.length === 0 ? (
            <Box sx={{ 
              textAlign: 'center', 
              p: 4, 
              border: '1px dashed',
              borderColor: 'divider',
              borderRadius: 1
            }}>
              <Typography variant="body1" color="text.secondary">
                ไม่มีสินค้าในระบบ
              </Typography>
            </Box>
          ) : (
            <Box
              sx={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: 3,
                justifyContent: { xs: 'center', md: 'flex-start' },
              }}
            >
              {products.map((product) => (
                <Card 
                  key={product.id}
                  sx={{ 
                    width: { xs: '100%', sm: 'calc(50% - 12px)', md: 'calc(33.33% - 16px)' },
                    maxWidth: 400,
                    boxShadow: 2,
                    transition: 'transform 0.3s, box-shadow 0.3s',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                      boxShadow: 6,
                    },
                    display: 'flex',
                    flexDirection: 'column',
                    height: '100%',
                  }}
                >
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography variant="h6" component="div" sx={{ fontWeight: 'bold' }}>
                      {product.name}
                    </Typography>
                    <Typography color="primary" sx={{ fontSize: '1.25rem', fontWeight: 'medium', mt: 1 }}>
                      ฿{product.price.toLocaleString()}
                    </Typography>
                    <Typography variant="body2" sx={{ mt: 2, color: 'text.secondary' }}>
                      {product.description}
                    </Typography>
                  </CardContent>
                  <CardActions sx={{ justifyContent: 'flex-end', p: 2 }}>
                    <IconButton 
                      onClick={() => handleEdit(product)} 
                      color="primary"
                      aria-label="edit"
                    >
                      <Edit />
                    </IconButton>
                    <IconButton 
                      onClick={() => handleDeleteClick(product.id)} 
                      color="error"
                      aria-label="delete"
                    >
                      <Delete />
                    </IconButton>
                  </CardActions>
                </Card>
              ))}
            </Box>
          )}
        </Container>
      </Box>

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={deleteDialogOpen}
        onClose={handleDeleteCancel}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          ยืนยันการลบสินค้า
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            คุณแน่ใจว่าต้องการลบสินค้านี้หรือไม่? การดำเนินการนี้ไม่สามารถยกเลิกได้
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteCancel}>ยกเลิก</Button>
          <Button onClick={handleDeleteConfirm} color="error" autoFocus>
            ลบสินค้า
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}