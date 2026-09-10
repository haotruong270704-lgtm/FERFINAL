import React, { useCallback, useEffect, useMemo, useState } from 'react';
import {
  Alert,
  Box,
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  Paper,
  Stack,
  TextField,
  Typography
} from '@mui/material';
import dayjs from 'dayjs';
import PageLoader from '../components/common/PageLoader';
import { useAuth } from '../contexts/AuthContext';
import { appointmentsService } from '../services/appointmentsService';
import { locationsService } from '../services/locationsService';
import { serviceCatalogService } from '../services/serviceCatalogService';

const ActivitiesPage = () => {
  const { user } = useAuth();
  const [appointments, setAppointments] = useState([]);
  const [locations, setLocations] = useState([]);
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [editingAppointment, setEditingAppointment] = useState(null);
  const [editForm, setEditForm] = useState({ date: '', time: '', notes: '', status: '' });

  const loadAppointments = useCallback(async () => {
    try {
      setLoading(true);
      const [appointmentData, locationData, serviceData] = await Promise.all([
        appointmentsService.getAppointmentsByUser(user.id),
        locationsService.getLocations(),
        serviceCatalogService.getServices()
      ]);

      setAppointments(appointmentData);
      setLocations(locationData);
      setServices(serviceData);
      setError('');
    } catch (loadError) {
      setError(loadError.message || 'Khong the tai lich hen.');
    } finally {
      setLoading(false);
    }
  }, [user.id]);

  useEffect(() => {
    loadAppointments();
  }, [loadAppointments]);

  const locationsMap = useMemo(
    () => Object.fromEntries(locations.map((location) => [location.id, location])),
    [locations]
  );

  const servicesMap = useMemo(
    () => Object.fromEntries(services.map((service) => [service.id, service])),
    [services]
  );

  const displayStatus = (appointment) => {
    if (appointment.status === 'cancelled') {
      return { label: 'Da huy', color: 'default' };
    }

    const appointmentTime = dayjs(`${appointment.date} ${appointment.time}`);

    if (appointmentTime.isAfter(dayjs())) {
      return { label: 'Sap dien ra', color: 'info' };
    }

    if (dayjs().diff(appointmentTime, 'minute') <= 60) {
      return { label: 'Dang dien ra', color: 'warning' };
    }

    return { label: 'Da hoan thanh', color: 'success' };
  };

  const openEditDialog = (appointment) => {
    setEditingAppointment(appointment);
    setEditForm({
      date: appointment.date,
      time: appointment.time,
      notes: appointment.notes || '',
      status: appointment.status
    });
  };

  const closeEditDialog = () => {
    setEditingAppointment(null);
  };

  const updateEditField = (field) => (event) => {
    setEditForm((prev) => ({
      ...prev,
      [field]: event.target.value
    }));
  };

  const handleUpdateAppointment = async () => {
    if (!editingAppointment) {
      return;
    }

    try {
      const conflictCandidates = await appointmentsService.getAppointments({
        locationId: editingAppointment.locationId,
        date: editForm.date,
        time: editForm.time
      });

      const hasConflict = conflictCandidates.some(
        (appointment) => appointment.id !== editingAppointment.id && appointment.status !== 'cancelled'
      );

      if (hasConflict) {
        setError('Khung gio moi dang bi trung voi mot lich hen khac.');
        return;
      }

      await appointmentsService.updateAppointment(editingAppointment.id, {
        ...editingAppointment,
        date: editForm.date,
        time: editForm.time,
        notes: editForm.notes,
        status: editForm.status
      });

      closeEditDialog();
      await loadAppointments();
    } catch (updateError) {
      setError(updateError.message || 'Cap nhat lich hen that bai.');
    }
  };

  const handleCancelAppointment = async (appointment) => {
    try {
      await appointmentsService.updateAppointment(appointment.id, {
        ...appointment,
        status: 'cancelled'
      });
      await loadAppointments();
    } catch (cancelError) {
      setError(cancelError.message || 'Khong the huy lich hen.');
    }
  };

  const handleDeleteAppointment = async (appointmentId) => {
    try {
      await appointmentsService.deleteAppointment(appointmentId);
      await loadAppointments();
    } catch (deleteError) {
      setError(deleteError.message || 'Khong the xoa lich hen.');
    }
  };

  if (loading) {
    return <PageLoader />;
  }

  return (
    <Box sx={{ maxWidth: 1100, mx: 'auto', py: 4, px: 2 }}>
      <Typography variant="h4" sx={{ fontWeight: 800, color: '#e91e63', mb: 3 }}>
        CRUD appointments cua ban
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <Stack spacing={2}>
        {appointments.map((appointment) => {
          const location = locationsMap[appointment.locationId];
          const status = displayStatus(appointment);
          const appointmentServices = appointment.serviceIds.map((serviceId) => servicesMap[serviceId]?.name).filter(Boolean);

          return (
            <Paper key={appointment.id} sx={{ p: 3, borderRadius: 4 }}>
              <Grid container spacing={2}>
                <Grid item xs={12} md={8}>
                  <Typography variant="h6" sx={{ fontWeight: 800 }}>
                    {location?.name || 'Chi nhanh'}
                  </Typography>
                  <Typography variant="body2" sx={{ mb: 1 }}>
                    {location?.address}
                  </Typography>
                  <Typography><strong>Ngay:</strong> {appointment.date}</Typography>
                  <Typography><strong>Gio:</strong> {appointment.time}</Typography>
                  <Typography><strong>Dich vu:</strong> {appointmentServices.join(', ')}</Typography>
                  <Typography><strong>Ky thuat vien:</strong> {appointment.technicians.join(', ')}</Typography>
                  <Typography><strong>Ghi chu:</strong> {appointment.notes || 'Khong co'}</Typography>
                  <Typography><strong>Tong tien:</strong> {appointment.totalPrice.toLocaleString()} VND</Typography>
                </Grid>
                <Grid item xs={12} md={4}>
                  <Stack spacing={1} alignItems={{ xs: 'flex-start', md: 'flex-end' }}>
                    <Chip label={status.label} color={status.color} />
                    <Button variant="outlined" color="secondary" onClick={() => openEditDialog(appointment)}>
                      Sua
                    </Button>
                    <Button variant="outlined" color="warning" onClick={() => handleCancelAppointment(appointment)}>
                      Huy lich
                    </Button>
                    <Button variant="outlined" color="error" onClick={() => handleDeleteAppointment(appointment.id)}>
                      Xoa
                    </Button>
                  </Stack>
                </Grid>
              </Grid>
            </Paper>
          );
        })}

        {appointments.length === 0 && <Alert severity="info">Ban chua co lich hen nao tren JSON Server.</Alert>}
      </Stack>

      <Dialog open={Boolean(editingAppointment)} onClose={closeEditDialog} fullWidth maxWidth="sm">
        <DialogTitle>Cap nhat lich hen</DialogTitle>
        <DialogContent sx={{ pt: 1 }}>
          <Stack spacing={2} sx={{ mt: 1 }}>
            <TextField
              fullWidth
              type="date"
              label="Ngay"
              value={editForm.date}
              onChange={updateEditField('date')}
              InputLabelProps={{ shrink: true }}
            />
            <TextField fullWidth label="Gio" value={editForm.time} onChange={updateEditField('time')} />
            <TextField fullWidth label="Trang thai" value={editForm.status} onChange={updateEditField('status')} />
            <TextField
              fullWidth
              multiline
              minRows={3}
              label="Ghi chu"
              value={editForm.notes}
              onChange={updateEditField('notes')}
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeEditDialog}>Dong</Button>
          <Button onClick={handleUpdateAppointment} variant="contained" color="secondary">
            Luu thay doi
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ActivitiesPage;



