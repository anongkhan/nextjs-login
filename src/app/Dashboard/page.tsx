'use client';

import { useRouter } from 'next/navigation';
import {
  Container,
  Typography,
  Button,
  Box,
  AppBar,
  Toolbar,
} from '@mui/material';

export default function DashboardPage() {
  const router = useRouter();

  const handleLogout = () => {
    // ที่จริงควรลบ token/session
    router.push('/');
  };

  return (
    <Container maxWidth="md">
      <AppBar position="static">
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Typography variant="h6">Dashboard</Typography>
          <Button color="inherit" onClick={handleLogout}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>

      <Box mt={4} textAlign="center">
        <Typography variant="h4" gutterBottom>
          ຍິນດີຕ້ອນຮັບເຂົ້າສູ່ 
        </Typography>
        <Typography variant="body1">
          ເຂົ້າສູ່ລະບົບສຳເລັດ!
        </Typography>
      </Box>
    </Container>
  );
}
