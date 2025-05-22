"use client";

import { useState } from 'react';
import {
  Container,
  Typography,
  TextField,
  Button,
  Box,
  Paper,
  InputAdornment,
  Grid,
  Snackbar,
  Alert,
} from '@mui/material';
import { Email, Lock, Person } from '@mui/icons-material';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function RegisterPage() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const isValidEmail = (email: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const isFormValid = name.trim() !== '' && isValidEmail(email) && password.length >= 8;

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    if (!name.trim()) {
      setError('ກະລຸນາໃສ່ຊື່ໃຫ້ຄົບຖ້ວນ');
      return <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        open={Boolean(error)}
        onClose={() => setError('')}
        message={error}
        key={error}
      />;
    }

    if (!isValidEmail(email)) {
      setError('ກະລຸນາໃສ່ອີເມວໃຫ້ຖືກຕ້ອງ');
      return <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        open={Boolean(error)}
        onClose={() => setError('')}
        message={error}
        key={error}
      />;
    }

    if (password.length < 8) {
      setError('ລະຫັດຜ່ານຕ້ອງມີຢ່າງນ້ອຍ 8 ຕົວອັກສອນ');
      return;
    }

    // Clear error & show success
    setError('');
    setSuccess(true);

    // จำลองการลงทะเบียน (สามารถเพิ่ม API ตรงนี้ได้)
    console.log('Registering user:', { name, email, password });

    // หน่วงเวลาแล้วค่อยไปหน้า login
    setTimeout(() => {
      router.push('/');
    }, 2000);
  };

  return (
    <Container maxWidth="sm">
      <Box className='height[100vh] flex justify-center items-center' >
        <Paper elevation={3} sx={{ padding: 4, width: '100%' }}>
          <Typography variant="h5" align="center" color="primary" gutterBottom>
            Create Account
          </Typography>
          <form onSubmit={handleRegister}>
            <TextField
              label="Full Name"
              fullWidth
              margin="normal"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                setError('');
              }}
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <Person color="primary" />
                    </InputAdornment>
                  ),
                }
              }}
            />
            <TextField
              label="Email"
              fullWidth
              margin="normal"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setError('');
              }}
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <Email color="primary" />
                    </InputAdornment>
                  ),
                }
              }}
            />
            <TextField
              label="Password"
              type="password"
              fullWidth
              margin="normal"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setError('');
              }}
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <Lock color="primary" />
                    </InputAdornment>
                  ),
                }
              }}
              helperText="ລະຫັດຜ່ານຕ້ອງມີຢ່າງນ້ອຍ 8 ຕົວອັກສອນ"
            />

            {error && (
              <Typography color="error" variant="body2" sx={{ mt: 1 }}>
                {error}
              </Typography>
            )}

            <Grid container justifyContent="flex-end" sx={{ mt: 1 }}>
              <Link href="/" passHref>
                <Button variant="text" size="small">
                  Already have an account?
                </Button>
              </Link>
            </Grid>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              sx={{ mt: 2 }}
            >
              Create Account
            </Button>
          </form>
        </Paper>
      </Box>

      {/* Snackbar แจ้งเตือนความสำเร็จ */}
      <Snackbar
        open={success}
        autoHideDuration={3000}
        onClose={() => setSuccess(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert severity="success" sx={{ width: '100%' }}>
          ລົງທະບຽນສຳເລັດ! ກຳລັງປ່ຽນໄປຍັງຫນ້າລ໋ອກອິນ...
        </Alert>
      </Snackbar>
    </Container>
  );
}
