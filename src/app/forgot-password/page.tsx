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
  Snackbar,
  Alert,
} from '@mui/material';
import { Email } from '@mui/icons-material';
import { useRouter } from 'next/navigation'; // นำ router เข้ามา

export default function ForgotPasswordPage() {
  const router = useRouter(); // ใช้งาน router
  const [email, setEmail] = useState('');
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const isValidEmail = (email: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const isFormValid = isValidEmail(email);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!isFormValid) {
      setError('ກະລຸນາໃສ່ອີເມວໃຫ້ຖືກຕ້ອງ');
      return;
    }

    setError('');
    console.log('Sending reset link to:', email);
    setSuccess(true);
    setEmail('');

    // รอ 3 วินาทีแล้วเปลี่ยนหน้าไปยัง /login
    setTimeout(() => {
      router.push('/');
    }, 2000);
  };

  return (
    <Container maxWidth="sm">
      <Box height="100vh" display="flex" alignItems="center" justifyContent="center">
        <Paper elevation={3} sx={{ padding: 4, width: '100%' }}>
          <Typography variant="h5" align="center" color="primary" gutterBottom>
            Forgot Password
          </Typography>

          <form onSubmit={handleSubmit}>
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
            {error && (
              <Typography color="error" variant="body2" sx={{ mt: 1 }}>
                {error}
              </Typography>
            )}
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              sx={{ mt: 2 }}
            >
              Send Reset Link
            </Button>
          </form>
        </Paper>
      </Box>

      {/* Snackbar แสดงข้อความสำเร็จ */}
      <Snackbar
        open={success}
        autoHideDuration={3000}
        onClose={() => setSuccess(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert severity="success" sx={{ width: '100%' }}>
          ລະບົບໄດ້ສົ່ງລິ້ງລິເຊັດລະຫັດຜ່ານໃໝ່ໃຫ້ແລ້ວ ກຳລັງກັບໄປຫນ້າລ໋ອກອິນ...
        </Alert>
      </Snackbar>
    </Container>
  );
}
