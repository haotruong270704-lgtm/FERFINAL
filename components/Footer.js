import React from 'react';
import { Box, Typography, Container, Grid, IconButton, Link } from '@mui/material';
import { Facebook, Instagram, LinkedIn, Twitter } from '@mui/icons-material'; 

const Footer = () => {
  return (
    <Box
      sx={{
        backgroundColor: '#F8BBD0', 
        color: '#FFCOB9', 
        paddingTop: '40px',
        paddingBottom: '20px',
        marginTop: 'auto',
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid item xs={12} sm={4}>
          <Typography variant="h6" sx={{ fontWeight: 'bold', marginBottom: '20px', color: '#E91E63' }}>
  PINK
</Typography>

            <Typography variant="body2" sx={{ marginBottom: '10px', color: '#FFCOB9' }}>
              Địa chỉ: FPT, Ngũ Hành Sơn, Đà Nẵng.
            </Typography>
            <Typography variant="body2" sx={{ marginBottom: '10px', color: '#FFCOB9' }}>
              Điện thoại: 123-456-7890
            </Typography>
            <Typography variant="body2" sx={{ color: '#FFCOB9' }}>
              Email: <Link href="mailto:info@abc.com" sx={{ color: '#FFCOB9' }}>pink@gmail.com</Link>
            </Typography>
          </Grid>

          <Grid item xs={12} sm={4}>
          <Typography variant="h6" sx={{ fontWeight: 'bold', marginBottom: '20px', color: '#E91E63' }}>
  Liên Kết
</Typography>

            <ul style={{ listStyle: 'none', padding: 0 }}>
              <li><Link href="/" sx={{ color: '#FFCOB9', textDecoration: 'none' }}>Trang Chủ</Link></li>
              <li><Link href="/about" sx={{ color: '#FFCOB9', textDecoration: 'none' }}>Giới Thiệu</Link></li>
              <li><Link href="/services" sx={{ color: '#FFCOB9', textDecoration: 'none' }}>Dịch Vụ</Link></li>
              <li><Link href="/contact" sx={{ color: '#FFCOB9', textDecoration: 'none' }}>Liên Hệ</Link></li>
            </ul>
          </Grid>

          <Grid item xs={12} sm={4}>
          <Typography variant="h6" sx={{ fontWeight: 'bold', marginBottom: '20px', color: '#E91E63' }}>
  Kết Nối Với Chúng Tôi
</Typography>

            <Box>
              <IconButton color="inherit" href="https://facebook.com" target="_blank">
                <Facebook sx={{ color: '#FFCOB9' }} />
              </IconButton>
              <IconButton color="inherit" href="https://instagram.com" target="_blank">
                <Instagram sx={{ color: '#FFCOB9' }} />
              </IconButton>
              <IconButton color="inherit" href="https://linkedin.com" target="_blank">
                <LinkedIn sx={{ color: '#FFCOB9' }} />
              </IconButton>
              <IconButton color="inherit" href="https://twitter.com" target="_blank">
                <Twitter sx={{ color: '#FFCOB9' }} />
              </IconButton>
            </Box>
          </Grid>
        </Grid>
        <Box sx={{ textAlign: 'center', marginTop: '20px' }}>
          <Typography variant="body2" sx={{ fontSize: '14px', color: '#FFCOB9' }}>
            © {new Date().getFullYear()} Pink. Tất cả quyền được bảo lưu.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
