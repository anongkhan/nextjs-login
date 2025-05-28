'use client';

import { useRouter } from 'next/navigation';
import {
  Container,
  Typography,
  Button,
  Box,
  AppBar,
  Toolbar,
  CssBaseline,
  Paper,
} from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import { styled } from '@mui/material/styles';

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  marginTop: theme.spacing(6),
  textAlign: 'center',
  backgroundColor: theme.palette.background.default,
  boxShadow: theme.shadows[3],
  borderRadius: theme.shape.borderRadius * 2,
}));

export default function DashboardPage() {
  const router = useRouter();


  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="static" color="primary" enableColorOnDark>
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Typography variant="h6" component="div">
            🎉 Dashboard
          </Typography>
        </Toolbar>
      </AppBar>

      <Container maxWidth="sm">
        <StyledPaper>
          <Typography variant="h4" gutterBottom fontWeight={600} color="primary">
            ຍິນດີຕ້ອນຮັບ
          </Typography>
          <Typography variant="body1" sx={{ fontSize: '1.2rem' }}>
            ເຂົ້າສູ່ລະບົບສຳເລັດ!
          </Typography>
        </StyledPaper>
      </Container>
    </>
  );
}
