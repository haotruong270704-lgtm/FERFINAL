import React, { useEffect, useState } from 'react';
import { Alert, Box, Button, Grid, Paper, Stack, TextField, Typography } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const LoginPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated, isLoading, login, error } = useAuth();
  const [credentials, setCredentials] = useState({
    email: 'user@example.com',
    password: '123456'
  });
  const [submitError, setSubmitError] = useState('');

  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      const nextPath = location.state?.from?.pathname || '/activities';
      navigate(nextPath, { replace: true });
    }
  }, [isAuthenticated, isLoading, location.state, navigate]);

  const handleChange = (field) => (event) => {
    setCredentials((prev) => ({
      ...prev,
      [field]: event.target.value
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmitError('');

    try {
      await login(credentials.email.trim(), credentials.password.trim());
    } catch (loginError) {
      setSubmitError(loginError.message || 'Dang nhap that bai.');
    }
  };

  return (
    <Grid container justifyContent="center" sx={{ py: 8, px: 2, backgroundColor: '#fff7fa', minHeight: '70vh' }}>
      <Grid item xs={12} sm={10} md={6} lg={4}>
        <Paper elevation={4} sx={{ p: 4, borderRadius: 4 }}>
          <Typography variant="h4" sx={{ fontWeight: 800, color: '#e91e63', textAlign: 'center', mb: 1 }}>
            Dang nhap
          </Typography>
          <Typography variant="body2" sx={{ textAlign: 'center', mb: 3 }}>
            Chuyen sang Context API + useReducer va dang nhap bang du lieu trong db.json.
          </Typography>

          <Stack spacing={2} component="form" onSubmit={handleSubmit}>
            {(submitError || error) && <Alert severity="error">{submitError || error}</Alert>}

            <TextField label="Email" value={credentials.email} onChange={handleChange('email')} required fullWidth />
            <TextField
              label="Mat khau"
              type="password"
              value={credentials.password}
              onChange={handleChange('password')}
              required
              fullWidth
            />

            <Button type="submit" variant="contained" color="secondary" disabled={isLoading} size="large">
              {isLoading ? 'Dang xu ly...' : 'Dang nhap'}
            </Button>
          </Stack>

          <Box sx={{ mt: 3 }}>
            <Alert severity="info" sx={{ mb: 1 }}>
              Admin: admin@example.com / 123456
            </Alert>
            <Alert severity="success">User: user@example.com / 123456</Alert>
          </Box>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default LoginPage;
