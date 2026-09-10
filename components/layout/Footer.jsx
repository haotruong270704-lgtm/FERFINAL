import React from 'react';
import { Box, Container, Grid, Link, Typography } from '@mui/material';

const Footer = () => (
  <Box sx={{ backgroundColor: '#f8bbd0', mt: 'auto', py: 4 }}>
    <Container maxWidth="lg">
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Typography variant="h6" sx={{ color: '#e91e63', fontWeight: 800 }}>
            PINK BEAUTY HUB
          </Typography>
          <Typography variant="body2">Dia chi: FPT City, Ngu Hanh Son, Da Nang</Typography>
          <Typography variant="body2">Email: pink@gmail.com</Typography>
          <Typography variant="body2">Hotline: 123-456-7890</Typography>
        </Grid>
        <Grid item xs={12} md={4}>
          <Typography variant="h6" sx={{ color: '#e91e63', fontWeight: 800 }}>
            Dieu huong
          </Typography>
          <Link href="/" underline="hover" color="inherit" display="block">
            Trang chu
          </Link>
          <Link href="/services" underline="hover" color="inherit" display="block">
            Dich vu
          </Link>
          <Link href="/about" underline="hover" color="inherit" display="block">
            Gioi thieu
          </Link>
        </Grid>
        <Grid item xs={12} md={4}>
          <Typography variant="h6" sx={{ color: '#e91e63', fontWeight: 800 }}>
            Tai khoan demo
          </Typography>
          <Typography variant="body2">Admin: admin@example.com / 123456</Typography>
          <Typography variant="body2">User: user@example.com / 123456</Typography>
        </Grid>
      </Grid>
    </Container>
  </Box>
);

export default Footer;
