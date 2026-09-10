import React from 'react';
import { AppBar, Box, Button, Toolbar, Typography } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const linkStyle = {
  textDecoration: 'none'
};

const Header = () => {
  const location = useLocation();
  const { isAuthenticated, isAdmin, logout, user } = useAuth();

  const isActive = (path) => location.pathname === path;

  return (
    <AppBar position="sticky" sx={{ backgroundColor: '#f8bbd0', color: '#2f1c2f', boxShadow: 1 }}>
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', gap: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <img src={require('../../assets/img/logo.jpg')} alt="Pink" width="52" />
          <Typography variant="h6" sx={{ fontWeight: 800, color: '#e91e63' }}>
            PINK BEAUTY HUB
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexWrap: 'wrap', justifyContent: 'center' }}>
          <Link to="/" style={linkStyle}>
            <Button color="inherit" variant={isActive('/') ? 'contained' : 'text'} sx={{ borderRadius: 999 }}>
              Trang chu
            </Button>
          </Link>
          <Link to="/about" style={linkStyle}>
            <Button color="inherit" variant={isActive('/about') ? 'contained' : 'text'} sx={{ borderRadius: 999 }}>
              Gioi thieu
            </Button>
          </Link>
          <Link to="/services" style={linkStyle}>
            <Button color="inherit" variant={isActive('/services') ? 'contained' : 'text'} sx={{ borderRadius: 999 }}>
              Dich vu
            </Button>
          </Link>
          {isAuthenticated && (
            <Link to="/activities" style={linkStyle}>
              <Button color="inherit" variant={isActive('/activities') ? 'contained' : 'text'} sx={{ borderRadius: 999 }}>
                Lich hen cua ban
              </Button>
            </Link>
          )}
          {isAdmin && (
            <Link to="/admin" style={linkStyle}>
              <Button color="inherit" variant={isActive('/admin') ? 'contained' : 'text'} sx={{ borderRadius: 999 }}>
                Quan tri
              </Button>
            </Link>
          )}
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          {isAuthenticated ? (
            <>
              <Typography variant="body2" sx={{ fontWeight: 700 }}>
                {user?.email}
              </Typography>
              <Button onClick={logout} variant="outlined" color="inherit">
                Dang xuat
              </Button>
            </>
          ) : (
            <Link to="/login" style={linkStyle}>
              <Button variant="contained" color="secondary">
                Dang nhap
              </Button>
            </Link>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
