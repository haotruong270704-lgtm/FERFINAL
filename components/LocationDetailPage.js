import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Box, Typography, Button } from '@mui/material';
import areas from '../data/areasData';

const LocationDetailPage = () => {
  const { id } = useParams();

  let selectedLocation = null;
  for (let areaKey in areas) {
    selectedLocation = areas[areaKey].locations.find(location => location.id === id);
    if (selectedLocation) break;
  }

  if (!selectedLocation) {
    return <Typography variant="h5">Không tìm thấy địa điểm</Typography>;
  }

  return (
    <div>
      <Box sx={{ padding: '20px', backgroundColor: '#f9f9f9', marginTop: '120px' }}>
        <Typography variant="h3" sx={{ fontWeight: 'bold' }}>
          {selectedLocation.name}
        </Typography>
        <Typography variant="h6" sx={{ marginTop: '10px' }}>
          {selectedLocation.address}
        </Typography>
        <Typography variant="body1" sx={{ marginTop: '20px' }}>
          {selectedLocation.description}
        </Typography>

        {selectedLocation.homeService && (
          <Typography variant="body2" sx={{ color: '#f44336', marginTop: '10px', fontStyle: 'italic' }}>
            Dịch vụ tại nhà có sẵn! Liên hệ để biết thêm chi tiết.
          </Typography>
        )}
      </Box>

      <Box sx={{ padding: '20px', backgroundColor: '#fff', marginTop: '20px' }}>
        <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
          Đặt lịch ngay tại {selectedLocation.name}
        </Typography>
        <Link
          to="/book-appointment"
          state={{
            locationName: selectedLocation.name,
            locationAddress: selectedLocation.address,
            homeService: selectedLocation.homeService,
          }}
          style={{ textDecoration: 'none' }}
        >
          <Button
            variant="contained"
            color="primary"
            sx={{
              marginTop: '20px',
              padding: '12px 25px',
              fontWeight: 'bold',
              backgroundColor: '#E91E63',
              '&:hover': {
                backgroundColor: '#D81B60',
              },
            }}
          >
            Đặt Lịch Ngay
          </Button>
        </Link>
      </Box>
    </div>
  );
};

export default LocationDetailPage;
