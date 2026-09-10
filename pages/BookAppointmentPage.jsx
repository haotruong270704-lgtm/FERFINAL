import React, { useEffect, useMemo, useState } from 'react';
import {
  Alert,
  Box,
  Button,
  Checkbox,
  Chip,
  FormControl,
  FormControlLabel,
  FormGroup,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Stack,
  TextField,
  Typography
} from '@mui/material';
import dayjs from 'dayjs';
import { useNavigate, useParams } from 'react-router-dom';
import PageLoader from '../components/common/PageLoader';
import { useAuth } from '../contexts/AuthContext';
import { technicians } from '../data/technicians';
import { appointmentsService } from '../services/appointmentsService';
import { locationsService } from '../services/locationsService';
import { serviceCatalogService } from '../services/serviceCatalogService';
import { saveBookingDraft } from '../utils/bookingDraft';

const availableTimes = ['09:00', '10:00', '11:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00'];

const BookAppointmentPage = () => {
  const { locationId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [location, setLocation] = useState(null);
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    fullName: user?.name || '',
    email: user?.email || '',
    phoneNumber: user?.phone || '',
    date: dayjs().add(1, 'day').format('YYYY-MM-DD'),
    time: '',
    serviceIds: [],
    technician: '',
    notes: '',
    homeService: false
  });

  useEffect(() => {
    const loadBookingData = async () => {
      try {
        const [locationData, serviceData] = await Promise.all([
          locationsService.getLocationById(locationId),
          serviceCatalogService.getServicesByLocation(locationId)
        ]);

        setLocation(locationData);
        setServices(serviceData);
      } catch (loadError) {
        setError(loadError.message || 'Khong the tai du lieu dat lich.');
      } finally {
        setLoading(false);
      }
    };

    loadBookingData();
  }, [locationId]);

  const selectedServices = useMemo(
    () => services.filter((service) => form.serviceIds.includes(service.id)),
    [form.serviceIds, services]
  );

  const totalPrice = useMemo(
    () => selectedServices.reduce((sum, service) => sum + service.price, 0),
    [selectedServices]
  );

  const updateField = (field) => (event) => {
    const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value;
    setForm((prev) => ({
      ...prev,
      [field]: value
    }));
  };

  const handleServiceToggle = (serviceId) => (event) => {
    setForm((prev) => ({
      ...prev,
      serviceIds: event.target.checked
        ? [...prev.serviceIds, serviceId]
        : prev.serviceIds.filter((id) => id !== serviceId)
    }));
  };

  const validateBooking = () => {
    if (!form.fullName.trim()) return 'Vui long nhap ho va ten.';
    if (!/^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(form.email)) return 'Email khong dung dinh dang.';
    if (!/^\\d{10,11}$/.test(form.phoneNumber)) return 'So dien thoai can 10-11 chu so.';
    if (!form.date) return 'Vui long chon ngay.';
    if (!form.time) return 'Vui long chon gio.';
    if (!form.technician) return 'Vui long chon ky thuat vien.';
    if (form.serviceIds.length === 0) return 'Vui long chon it nhat mot dich vu.';
    return '';
  };

  const handleContinueToPayment = async () => {
    const validationError = validateBooking();

    if (validationError) {
      setError(validationError);
      return;
    }

    setSubmitting(true);
    setError('');

    try {
      const conflictingAppointments = await appointmentsService.getAppointments({
        locationId,
        date: form.date,
        time: form.time
      });

      const hasConflict = conflictingAppointments.some((appointment) => appointment.status !== 'cancelled');

      if (hasConflict) {
        setError('Khung gio nay da co lich hen. Vui long chon gio khac.');
        return;
      }

      saveBookingDraft({
        location,
        services: selectedServices,
        booking: {
          locationId: Number(locationId),
          fullName: form.fullName.trim(),
          email: form.email.trim(),
          phoneNumber: form.phoneNumber.trim(),
          date: form.date,
          time: form.time,
          serviceIds: form.serviceIds,
          technicians: [form.technician],
          notes: form.notes.trim(),
          homeService: form.homeService,
          totalPrice,
          createdAt: new Date().toISOString()
        }
      });

      navigate('/payment');
    } catch (submitError) {
      setError(submitError.message || 'Khong the giu cho lich hen nay.');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return <PageLoader />;
  }

  if (!location) {
    return (
      <Box sx={{ p: 4 }}>
        <Alert severity="warning">Khong tim thay dia diem de dat lich.</Alert>
      </Box>
    );
  }

  return (
    <Box sx={{ maxWidth: 1000, mx: 'auto', py: 4, px: 2 }}>
      <Paper sx={{ p: 4, borderRadius: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: 800, color: '#e91e63', mb: 1 }}>
          Dat lich tai {location.name}
        </Typography>
        <Typography variant="body2" sx={{ mb: 3 }}>
          Dia chi: {location.address}
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {error}
          </Alert>
        )}

        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <TextField fullWidth label="Ho va ten" value={form.fullName} onChange={updateField('fullName')} />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField fullWidth label="Email" value={form.email} onChange={updateField('email')} />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField fullWidth label="So dien thoai" value={form.phoneNumber} onChange={updateField('phoneNumber')} />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              type="date"
              label="Ngay hen"
              value={form.date}
              onChange={updateField('date')}
              InputLabelProps={{ shrink: true }}
              inputProps={{ min: dayjs().format('YYYY-MM-DD') }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <FormControl fullWidth>
              <InputLabel>Khung gio</InputLabel>
              <Select value={form.time} label="Khung gio" onChange={updateField('time')}>
                {availableTimes.map((time) => (
                  <MenuItem key={time} value={time}>
                    {time}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={6}>
            <FormControl fullWidth>
              <InputLabel>Ky thuat vien</InputLabel>
              <Select value={form.technician} label="Ky thuat vien" onChange={updateField('technician')}>
                {technicians.map((technician) => (
                  <MenuItem key={technician} value={technician}>
                    {technician}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
              Chon dich vu
            </Typography>
            <FormGroup>
              <Grid container spacing={1}>
                {services.map((service) => (
                  <Grid item xs={12} md={6} key={service.id}>
                    <FormControlLabel
                      control={
                        <Checkbox checked={form.serviceIds.includes(service.id)} onChange={handleServiceToggle(service.id)} color="secondary" />
                      }
                      label={`${service.name} - ${service.price.toLocaleString()} VND (${service.duration})`}
                    />
                  </Grid>
                ))}
              </Grid>
            </FormGroup>
          </Grid>
          {location.homeService && (
            <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox checked={form.homeService} onChange={updateField('homeService')} color="secondary" />}
                label="Su dung dich vu tai nha"
              />
            </Grid>
          )}
          <Grid item xs={12}>
            <TextField
              fullWidth
              multiline
              minRows={3}
              label="Ghi chu"
              value={form.notes}
              onChange={updateField('notes')}
            />
          </Grid>
        </Grid>

        <Stack direction="row" spacing={1} sx={{ mt: 3, flexWrap: 'wrap' }}>
          {selectedServices.map((service) => (
            <Chip key={service.id} label={service.name} color="secondary" variant="outlined" />
          ))}
        </Stack>

        <Typography variant="h6" sx={{ mt: 3, fontWeight: 800 }}>
          Tong tien: {totalPrice.toLocaleString()} VND
        </Typography>

        <Button sx={{ mt: 3 }} variant="contained" color="secondary" size="large" onClick={handleContinueToPayment} disabled={submitting}>
          {submitting ? 'Dang kiem tra lich...' : 'Tiep tuc thanh toan'}
        </Button>
      </Paper>
    </Box>
  );
};

export default BookAppointmentPage;
