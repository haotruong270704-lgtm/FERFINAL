import React, { useState } from 'react';
import { TextField, Button, Typography, Grid, Box, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { setUserToLocal } from '../utils/auth';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      if (email === 'admin@example.com' && password === '123456') {
        const mockUser = {
          email,
          name: 'Admin User',
        };

      
        setUserToLocal(mockUser);

       
        navigate('/');
      } else {
        throw new Error('Email hoặc mật khẩu không đúng');
      }
    } catch (err) {
      setErrorMessage(err.message || 'Đã xảy ra lỗi');
    }
  };

  return (
    <Grid container justifyContent="center" alignItems="center" style={{ minHeight: '100vh', backgroundColor: '#F7F1F1' }}>
      <Grid item xs={12} sm={8} md={6} lg={4}>
        <Paper elevation={3} style={{ padding: '30px 40px', borderRadius: '12px' }}>
          <Typography variant="h4" align="center" gutterBottom>
            Đăng nhập
          </Typography>
          <form onSubmit={handleSubmit}>
            <Box mt={2}>
              <TextField
                fullWidth
                label="Email"
                variant="outlined"
                margin="normal"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <TextField
                fullWidth
                label="Mật khẩu"
                type="password"
                variant="outlined"
                margin="normal"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Box>
            <Box mt={3}>
              <Button fullWidth variant="contained" color="primary" type="submit">
                Đăng nhập
              </Button>
            </Box>
          </form>
          {errorMessage && (
            <Box mt={2} color="red" textAlign="center">
              <Typography variant="body2" color="error">
                {errorMessage}
              </Typography>
            </Box>
          )}
        </Paper>
      </Grid>
    </Grid>
  );
};

export default LoginPage;
