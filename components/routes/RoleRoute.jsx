import React from 'react';
import { Alert, Box } from '@mui/material';
import ProtectedRoute from './ProtectedRoute';
import { useAuth } from '../../contexts/AuthContext';

const RoleRoute = ({ children, roles }) => {
  const { user } = useAuth();

  return (
    <ProtectedRoute>
      {roles.includes(user?.role) ? (
        children
      ) : (
        <Box sx={{ p: 4 }}>
          <Alert severity="error">Ban khong co quyen truy cap khu vuc nay.</Alert>
        </Box>
      )}
    </ProtectedRoute>
  );
};

export default RoleRoute;
