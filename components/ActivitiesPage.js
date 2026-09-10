import React, { useEffect, useState } from 'react';
import { Box, Typography, Paper, CircularProgress, Grid, Chip } from '@mui/material';
import { styled } from '@mui/system';
import dayjs from 'dayjs';
import '../assets/css/ActivitiesPage.css';

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: '20px',
  marginBottom: '20px',
  backgroundColor: theme.palette.background.paper,
  boxShadow: theme.shadows[3],
  borderRadius: '10px',
  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: theme.shadows[6],
  },
}));

const ActivitiesPage = () => {
  const [historyData, setHistoryData] = useState([]);
  const [loading, setLoading] = useState(true);

  const checkStatus = (bookingTime, bookingDate) => {
    const currentTime = dayjs();
    const bookingDateTime = dayjs(`${bookingDate} ${bookingTime}`);
    const timeDifference = currentTime.diff(bookingDateTime, 'minute');

    if (timeDifference < 0) {
      return 'Đang chờ';
    } else if (timeDifference >= 0 && timeDifference <= 60) {
      return 'Đang tiến hành dịch vụ';
    } else {
      return 'Đã hoàn thành';
    }
  };

  useEffect(() => {
    const savedHistoryData = JSON.parse(localStorage.getItem('bookingHistory')) || [];
    setHistoryData(savedHistoryData);
    setLoading(false);
  }, []);

  if (loading) {
    return <CircularProgress size={60} sx={{ display: 'block', margin: 'auto', marginTop: '50px' }} />;
  }

  return (
    <Box sx={{ padding: '20px' }}>
      <Typography
        variant="h5"
        sx={{
          marginTop: '30px',
          marginBottom: '40px',
          fontWeight: 'bold',
          fontSize: '28px',
          textAlign: 'center',
        }}
      >
        Lịch Sử Đặt Lịch
      </Typography>

      {historyData.length > 0 ? (
        historyData.map((historyItem, index) => {
          const status = checkStatus(historyItem.time, historyItem.date);
          let statusColor = '';

          if (status === 'Đang chờ') {
            statusColor = 'green';
          } else if (status === 'Đang tiến hành dịch vụ') {
            statusColor = '#ADD8E6';
          } else if (status === 'Đã hoàn thành') {
            statusColor = '#E91E63';
          }

          return (
            <StyledPaper key={index} className="activity-card">
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#e91e63' }}>
                    Đặt Lịch {index + 1}
                  </Typography>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <Chip
                    label={status}
                    sx={{
                      fontWeight: 'bold',
                      backgroundColor: statusColor,
                      color: 'white',
                    }}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <Typography variant="body1"><strong>Dịch vụ:</strong> {historyItem.services}</Typography>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <Typography variant="body1"><strong>Ngày:</strong> {historyItem.date}</Typography>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <Typography variant="body1"><strong>Giờ:</strong> {historyItem.time}</Typography>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <Typography variant="body1"><strong>Địa điểm:</strong> {historyItem.location}</Typography>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <Typography variant="body1"><strong>Địa chỉ:</strong> {historyItem.address || 'Không có'}</Typography>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <Typography variant="body1"><strong>Kỹ thuật viên:</strong> {historyItem.technicians}</Typography>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <Typography variant="body1"><strong>Ghi chú:</strong> {historyItem.notes}</Typography>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <Typography variant="body1">
                    <strong>Tổng Giá:</strong> {historyItem.totalPrice ? historyItem.totalPrice.toLocaleString() : 'Chưa có giá'}
                  </Typography>
                </Grid>
              </Grid>
            </StyledPaper>
          );
        })
      ) : (
        <Typography variant="body1" sx={{ textAlign: 'center', marginTop: '50px' }}>
          Không có lịch sử đặt lịch.
        </Typography>
      )}
    </Box>
  );
};

export default ActivitiesPage;
