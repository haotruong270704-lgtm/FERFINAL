import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Box, Typography, Button } from '@mui/material';
import { QRCodeCanvas } from 'qrcode.react';
import '../assets/css/Payment.css';

const PaymentPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const bookingData = location.state?.bookingData;

  if (!bookingData) {
    return <Typography variant="h5">Không tìm thấy dữ liệu đặt lịch.</Typography>;
  }

  const handlePaymentConfirmation = () => {
    const existing = JSON.parse(localStorage.getItem('bookingHistory')) || [];
    localStorage.setItem('bookingHistory', JSON.stringify([...existing, bookingData]));
    localStorage.setItem('bookingData', JSON.stringify(bookingData));
    navigate('/activities');
  };

  return (
    <Box sx={{ textAlign: 'center', mt: 10 }}>
      <Typography variant="h4" gutterBottom>
        Thanh Toán Đặt Lịch
      </Typography>
      <Typography variant="h6" gutterBottom>
        Bạn đang trong thời gian giữ chỗ. Vui lòng thanh toán trong 10 phút.
      </Typography>

      <Box sx={{ mt: 3 }}>
        <QRCodeCanvas
          value="https://www.example.com/payment-link"
          size={256}
          level="H"
        />
      </Box>

      <Typography variant="h6" sx={{ mt: 3 }}>
        Quét mã QR để hoàn tất thanh toán
      </Typography>

      <Button variant="contained" color="primary" sx={{ mt: 3 }} onClick={handlePaymentConfirmation}>
        Xác Nhận Thanh Toán
      </Button>

      <Box sx={{ mt: 5 }} className="booking-info-container">
        <Typography className="booking-info-header">Thông Tin Đặt Lịch:</Typography>

        <div className="booking-info-row"><strong>Dịch vụ:</strong> {bookingData.services}</div>
        <div className="booking-info-row"><strong>Ngày:</strong> {bookingData.date}</div>
        <div className="booking-info-row"><strong>Giờ:</strong> {bookingData.time}</div>
        <div className="booking-info-row"><strong>Địa điểm:</strong> {bookingData.location}</div>
        <div className="booking-info-row"><strong>Địa chỉ:</strong> {bookingData.address}</div>
        <div className="booking-info-row"><strong>Kỹ thuật viên:</strong> {bookingData.technicians}</div>
        <div className="booking-info-row"><strong>Ghi chú:</strong> {bookingData.notes}</div>
        <div className="booking-info-row">
          <strong>Tổng Giá:</strong> {bookingData.totalPrice.toLocaleString()} ₫
        </div>
      </Box>
    </Box>
  );
};

export default PaymentPage;
