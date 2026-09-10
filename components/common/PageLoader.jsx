import React from 'react';
import { Box, CircularProgress } from '@mui/material';

const PageLoader = () => (
  <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
    <CircularProgress color="secondary" />
  </Box>
);

export default PageLoader;
