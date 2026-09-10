import React, { useEffect, useState } from 'react';
import { Alert, Box, Button, Chip, Divider, Grid, Paper, Typography } from '@mui/material';
import { Link, useParams } from 'react-router-dom';
import PageLoader from '../components/common/PageLoader';
import { locationsService } from '../services/locationsService';
import { serviceCatalogService } from '../services/serviceCatalogService';

const LocationDetailPage = () => {
  const { locationId } = useParams();
  const [location, setLocation] = useState(null);
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadLocationDetail = async () => {
      try {
        const [locationData, serviceData] = await Promise.all([
          locationsService.getLocationById(locationId),
          serviceCatalogService.getServicesByLocation(locationId)
        ]);

        setLocation(locationData);
        setServices(serviceData);
      } catch (loadError) {
        setError(loadError.message || 'Khong the tai thong tin chi nhanh.');
      } finally {
        setLoading(false);
      }
    };

    loadLocationDetail();
  }, [locationId]);

  if (loading) {
    return <PageLoader />;
  }

  if (error) {
    return (
      <Box sx={{ p: 4 }}>
        <Alert severity="error">{error}</Alert>
      </Box>
    );
  }

  if (!location) {
    return (
      <Box sx={{ p: 4 }}>
        <Alert severity="warning">Khong tim thay dia diem.</Alert>
      </Box>
    );
  }

  return (
    <Box sx={{ maxWidth: 1100, mx: 'auto', py: 4, px: 2 }}>
      <Paper sx={{ p: 4, borderRadius: 4, mb: 3 }}>
        <Typography variant="h4" sx={{ fontWeight: 800, color: '#e91e63', mb: 1 }}>
          {location.name}
        </Typography>
        <Typography variant="body1" sx={{ mb: 2 }}>
          {location.address}
        </Typography>
        <Typography variant="body1" sx={{ mb: 2 }}>
          {location.description}
        </Typography>
        <Chip label={`Gia tu ${location.priceFrom.toLocaleString()} VND`} color="secondary" sx={{ mr: 1 }} />
        {location.homeService && <Chip label="Co dich vu tai nha" color="success" />}
      </Paper>

      <Paper sx={{ p: 4, borderRadius: 4 }}>
        <Typography variant="h5" sx={{ fontWeight: 700, mb: 2 }}>
          Dich vu dang co
        </Typography>
        <Grid container spacing={2}>
          {services.map((service) => (
            <Grid item xs={12} md={6} key={service.id}>
              <Paper variant="outlined" sx={{ p: 2, borderRadius: 3, height: '100%' }}>
                <Typography variant="h6" sx={{ fontWeight: 700 }}>
                  {service.name}
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary', mb: 1 }}>
                  {service.category} - {service.duration}
                </Typography>
                <Typography variant="body1" sx={{ fontWeight: 700, color: '#e91e63' }}>
                  {service.price.toLocaleString()} VND
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>

        <Divider sx={{ my: 3 }} />

        <Link to={`/book-appointment/${location.id}`} style={{ textDecoration: 'none' }}>
          <Button variant="contained" color="secondary" size="large">
            Dat lich ngay
          </Button>
        </Link>
      </Paper>
    </Box>
  );
};

export default LocationDetailPage;
