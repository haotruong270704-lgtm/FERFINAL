import React, { useEffect, useState } from 'react';
import { Box, Typography, Grid, Button, IconButton } from '@mui/material';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { getUserFromLocal, clearUserFromLocal } from '../utils/auth';

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  const isActive = (path) => location.pathname === path;

  useEffect(() => {
    const storedUser = getUserFromLocal();
    setUser(storedUser);
  }, []);

  const handleLoginClick = () => {
    navigate('/login');
  };

  const handleLogout = () => {
    clearUserFromLocal();
    setUser(null);
    navigate('/login');
  };

  return (
    <Box
      sx={{
        padding: '20px',
        backgroundColor: '#F8BBD0',
        borderBottom: '1px solid #e0e0e0',
        fontFamily: '"Poppins", sans-serif',
        position: 'sticky',
        top: 0,
        zIndex: 10,
      }}
    >
      <Grid container justifyContent="space-between" alignItems="center">
        {/* Logo */}
        <Grid item sx={{ display: 'flex', alignItems: 'center' }}>
          <img src={require('../assets/img/logo.jpg')} alt="Logo" width="80" />
          <Typography variant="h4" sx={{ fontWeight: 700, color: '#E91E63', marginLeft: '10px' }}>
            PINK
          </Typography>
        </Grid>

        {/* Navbar */}
        <Grid item xs={12} md={6} sx={{ display: 'flex', justifyContent: 'center' }}>
          <nav>
            <ul style={{ display: 'flex', listStyle: 'none', margin: 0, padding: 0 }}>
              <li style={{ marginRight: '15px' }}>
                <Link to="/" style={{ textDecoration: 'none' }}>
                  <Button sx={navButtonStyle(isActive('/'))}>Trang Chủ</Button>
                </Link>
              </li>
              <li style={{ marginRight: '15px' }}>
                <Link to="/about" style={{ textDecoration: 'none' }}>
                  <Button sx={navButtonStyle(isActive('/about'))}>Giới Thiệu</Button>
                </Link>
              </li>
              <li style={{ marginRight: '15px' }}>
                <Link to="/services" style={{ textDecoration: 'none' }}>
                  <Button sx={navButtonStyle(isActive('/services'))}>Dịch Vụ</Button>
                </Link>
              </li>
              {user && (
                <li style={{ marginRight: '15px' }}>
                  <Link to="/activities" style={{ textDecoration: 'none' }}>
                    <Button sx={navButtonStyle(isActive('/activities'))}>Hoạt Động Của Bạn</Button>
                  </Link>
                </li>
              )}
            </ul>
          </nav>
        </Grid>

        {/* Account */}
        <Grid item sx={{ display: 'flex', alignItems: 'center' }}>
          {user ? (
            <>
              <Typography sx={{ color: '#fff', marginRight: '10px', fontWeight: 700 }}>
                {user.email}
              </Typography>
              <IconButton sx={{ color: '#fff' }} onClick={() => navigate('/profile')}>
                <AccountCircleIcon fontSize="large" />
              </IconButton>
              <Button onClick={handleLogout} variant="outlined" color="secondary" sx={{ ml: 2 }}>
                Đăng xuất
              </Button>
            </>
          ) : (
            <Button onClick={handleLoginClick} variant="contained" color="primary" sx={{ backgroundColor: '#E91E63' }}>
              Đăng nhập
            </Button>
          )}
        </Grid>
      </Grid>
    </Box>
  );
};

const navButtonStyle = (active) => ({
  color: '#333',
  backgroundColor: active ? '#E91E63' : 'transparent',
  borderRadius: '20px',
  padding: '12px 25px',
  fontWeight: '700',
  '&:hover': {
    backgroundColor: '#E91E63',
    color: '#fff',
  },
  ...(active && {
    color: '#fff',
  }),
});

export default Header;
