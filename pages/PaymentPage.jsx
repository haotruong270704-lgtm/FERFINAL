import React, { useMemo, useState } from 'react';
import { Alert, Box, Button, Paper, Stack, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { QRCodeCanvas } from 'qrcode.react';
import { useAuth } from '../contexts/AuthContext';
import { appointmentsService } from '../services/appointmentsService';
import { paymentsService } from '../services/paymentsService';
import { clearBookingDraft, readBookingDraft } from '../utils/bookingDraft';

const PaymentPage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const draft = useMemo(() => readBookingDraft(), []);

  const handleConfirmPayment = async () => {
    if (!draft) {
      return;
    }

    setSubmitting(true);
    setError('');

    try {
      const payment = await paymentsService.createPayment({
        appointmentId: null,
        amount: draft.booking.totalPrice,
        method: 'qr',
        status: 'paid',
        qrValue: `https://pink-beauty-hub.example/payment/${Date.now()}`,
        paidAt: new Date().toISOString()
      });

      const appointment = await appointmentsService.createAppointment({
        ...draft.booking,
        userId: user.id,
        paymentId: payment.id,
        status: 'confirmed',
        createdAt: draft.booking.createdAt || new Date().toISOString()
      });

      await paymentsService.updatePayment(payment.id, {
        ...payment,
        appointmentId: appointment.id
      });

      clearBookingDraft();
      navigate('/activities');
    } catch (paymentError) {
      setError(paymentError.message || 'Thanh toan that bai.');
    } finally {
      setSubmitting(false);
    }
  };

  if (!draft) {
    return (
      <Box sx={{ maxWidth: 760, mx: 'auto', py: 6, px: 2 }}>
        <Alert severity="warning" sx={{ mb: 2 }}>
          Khong tim thay du lieu dat lich tam thoi.
        </Alert>
        <Button variant="contained" color="secondary" onClick={() => navigate('/services')}>
          Quay lai trang dich vu
        </Button>
      </Box>
    );
  }

  return (
    <Box sx={{ maxWidth: 760, mx: 'auto', py: 6, px: 2 }}>
      <Paper sx={{ p: 4, borderRadius: 4, textAlign: 'center' }}>
        <Typography variant="h4" sx={{ color: '#e91e63', fontWeight: 800, mb: 2 }}>
          Thanh toan lich hen
        </Typography>
        <Typography variant="body1" sx={{ mb: 3 }}>
          Quet ma QR ben duoi de mo phong thao tac thanh toan truoc khi tao appointment qua JSON Server.
        </Typography>

        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

        <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
          <QRCodeCanvas value={`pink-booking-${draft.booking.locationId}-${draft.booking.totalPrice}`} size={240} level="H" />
        </Box>

        <Stack spacing={1} sx={{ textAlign: 'left', mb: 3 }}>
          <Typography><strong>Chi nhanh:</strong> {draft.location.name}</Typography>
          <Typography><strong>Dia chi:</strong> {draft.location.address}</Typography>
          <Typography><strong>Ngay:</strong> {draft.booking.date}</Typography>
          <Typography><strong>Gio:</strong> {draft.booking.time}</Typography>
          <Typography><strong>Dich vu:</strong> {draft.services.map((service) => service.name).join(', ')}</Typography>
          <Typography><strong>Ky thuat vien:</strong> {draft.booking.technicians.join(', ')}</Typography>
          <Typography><strong>Tong tien:</strong> {draft.booking.totalPrice.toLocaleString()} VND</Typography>
        </Stack>

        <Button variant="contained" color="secondary" size="large" onClick={handleConfirmPayment} disabled={submitting}>
          {submitting ? 'Dang tao giao dich...' : 'Xac nhan da thanh toan'}
        </Button>
      </Paper>
    </Box>
  );
};

export default PaymentPage;
