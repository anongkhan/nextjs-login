"use client";

import { useState } from 'react';
import {
  TextField,
  Button,
  Container,
  Typography,
  Box,
  Paper,
  Grid,
  Link,
  InputAdornment,
} from '@mui/material';
import { Email, Lock } from '@mui/icons-material';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  // ค่า email และ password ที่ถูกต้อง
  const correctEmail = 'admin@example.com';
  const correctPassword = '12345678'; // 8 ตัวอักษร

  // ตรวจสอบว่าฟอร์มถูกกรอกครบและถูกต้องหรือยัง
  const isFormValid = email !== '' && password !== '' && password.length <= 8;

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    // ตรวจสอบความยาวรหัสผ่าน
    if (password.length > 8) {
      setError('ລະຫັດຜ່ານຕ້ອງບໍ່ເກິນ 8 ອັກສອນ');
      return;
    }

    // ตรวจสอบข้อมูล login
    if (email !== correctEmail || password !== correctPassword) {
      setError('ອິເມວ ຫຼື ລະຫັດຜ່ານບໍ່ຖືກຕ້ອງ');
      return;
    }

    // Login สำเร็จ
    console.log('Login success!');
    router.push('/Dashboard');
  };

  return (
    <Container maxWidth="sm">
      <Box height="100vh" display="flex" alignItems="center" justifyContent="center">
        <Paper elevation={3} sx={{ padding: 4, width: '100%' }}>
          <Typography variant="h4" align="center" gutterBottom color="primary">
            Login
          </Typography>
          <form onSubmit={handleLogin}>
            <TextField
              label="Email"
              fullWidth
              required
              margin="normal"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setError('');
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Email color="primary" />
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              label="Password"
              type="password"
              fullWidth
              required
              margin="normal"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setError('');
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Lock color="primary" />
                  </InputAdornment>
                ),
              }}
            />

            {error && (
              <Typography color="error" variant="body2" sx={{ mt: 1 }}>
                {error}
              </Typography>
            )}

            <Grid container justifyContent="space-between" sx={{ mt: 1 }}>
              <div>
                <Link href="/forgot-password" variant="body2">
                  Forgot Password?
                </Link>
              </div>
              <div>
                <Link href="/register" variant="body2">
                  Create Account
                </Link>
              </div>
            </Grid>

            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              sx={{ mt: 3 }}
              disabled={!isFormValid} // 🔒 ปิดปุ่มหากฟอร์มไม่พร้อม
            >
              Login
            </Button>
          </form>
        </Paper>
      </Box>
    </Container>
  );
}
