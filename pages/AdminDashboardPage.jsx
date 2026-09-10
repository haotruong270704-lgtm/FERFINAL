import React, { useEffect, useMemo, useState } from 'react';
import {
  Alert,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Stack,
  Tab,
  Tabs,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Typography
} from '@mui/material';
import PageLoader from '../components/common/PageLoader';
import { locationsService } from '../services/locationsService';
import { serviceCatalogService } from '../services/serviceCatalogService';
import { usersService } from '../services/usersService';

const adminConfigs = {
  users: {
    title: 'Nguoi dung',
    columns: ['id', 'name', 'email', 'role', 'phone'],
    emptyForm: { name: '', email: '', password: '123456', role: 'user', phone: '' },
    fields: [
      { name: 'name', label: 'Ho va ten', type: 'text' },
      { name: 'email', label: 'Email', type: 'text' },
      { name: 'password', label: 'Mat khau', type: 'text' },
      { name: 'role', label: 'Vai tro', type: 'select', options: ['admin', 'user'] },
      { name: 'phone', label: 'So dien thoai', type: 'text' }
    ]
  },
  locations: {
    title: 'Chi nhanh',
    columns: ['id', 'name', 'area', 'priceFrom', 'homeService'],
    emptyForm: {
      name: '',
      area: '',
      address: '',
      priceFrom: 150000,
      description: '',
      homeService: false,
      lat: 16.05,
      lng: 108.22
    },
    fields: [
      { name: 'name', label: 'Ten chi nhanh', type: 'text' },
      { name: 'area', label: 'Khu vuc', type: 'text' },
      { name: 'address', label: 'Dia chi', type: 'text' },
      { name: 'priceFrom', label: 'Gia tu', type: 'number' },
      { name: 'description', label: 'Mo ta', type: 'text' },
      { name: 'homeService', label: 'Tai nha', type: 'boolean' },
      { name: 'lat', label: 'Lat', type: 'number' },
      { name: 'lng', label: 'Lng', type: 'number' }
    ]
  },
  services: {
    title: 'Dich vu',
    columns: ['id', 'name', 'locationId', 'price', 'category'],
    emptyForm: {
      name: '',
      locationId: '',
      price: 150000,
      duration: '30 phut',
      category: 'Nail Care'
    },
    fields: [
      { name: 'name', label: 'Ten dich vu', type: 'text' },
      { name: 'locationId', label: 'Chi nhanh', type: 'location-select' },
      { name: 'price', label: 'Gia', type: 'number' },
      { name: 'duration', label: 'Thoi luong', type: 'text' },
      { name: 'category', label: 'Danh muc', type: 'text' }
    ]
  }
};

const AdminDashboardPage = () => {
  const [tab, setTab] = useState('users');
  const [data, setData] = useState({ users: [], locations: [], services: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [formData, setFormData] = useState(adminConfigs.users.emptyForm);

  const loadData = async () => {
    try {
      setLoading(true);
      const [users, locations, services] = await Promise.all([
        usersService.getUsers(),
        locationsService.getLocations(),
        serviceCatalogService.getServices()
      ]);

      setData({ users, locations, services });
      setError('');
    } catch (loadError) {
      setError(loadError.message || 'Khong the tai du lieu quan tri.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const activeConfig = adminConfigs[tab];
  const activeRows = data[tab];
  const locationsMap = useMemo(
    () => Object.fromEntries(data.locations.map((location) => [location.id, location.name])),
    [data.locations]
  );

  const openCreateDialog = () => {
    setEditingItem(null);
    setFormData(activeConfig.emptyForm);
    setDialogOpen(true);
  };

  const openEditDialog = (item) => {
    setEditingItem(item);
    setFormData(item);
    setDialogOpen(true);
  };

  const closeDialog = () => {
    setDialogOpen(false);
  };

  const updateField = (field) => (event) => {
    setFormData((prev) => ({
      ...prev,
      [field]: event.target.value
    }));
  };

  const normalizePayload = () => {
    if (tab === 'locations') {
      return {
        ...formData,
        priceFrom: Number(formData.priceFrom),
        lat: Number(formData.lat),
        lng: Number(formData.lng),
        homeService: formData.homeService === true || formData.homeService === 'true'
      };
    }

    if (tab === 'services') {
      return {
        ...formData,
        price: Number(formData.price),
        locationId: Number(formData.locationId)
      };
    }

    return formData;
  };

  const handleSubmit = async () => {
    try {
      const payload = normalizePayload();

      if (tab === 'users') {
        if (editingItem) {
          await usersService.updateUser(editingItem.id, payload);
        } else {
          await usersService.createUser(payload);
        }
      }

      if (tab === 'locations') {
        if (editingItem) {
          await locationsService.updateLocation(editingItem.id, payload);
        } else {
          await locationsService.createLocation(payload);
        }
      }

      if (tab === 'services') {
        if (editingItem) {
          await serviceCatalogService.updateService(editingItem.id, payload);
        } else {
          await serviceCatalogService.createService(payload);
        }
      }

      closeDialog();
      await loadData();
    } catch (submitError) {
      setError(submitError.message || 'Luu du lieu that bai.');
    }
  };

  const handleDelete = async (item) => {
    try {
      if (tab === 'users') {
        await usersService.deleteUser(item.id);
      }

      if (tab === 'locations') {
        await locationsService.deleteLocation(item.id);
      }

      if (tab === 'services') {
        await serviceCatalogService.deleteService(item.id);
      }

      await loadData();
    } catch (deleteError) {
      setError(deleteError.message || 'Xoa du lieu that bai.');
    }
  };

  if (loading) {
    return <PageLoader />;
  }

  return (
    <Box sx={{ maxWidth: 1200, mx: 'auto', py: 4, px: 2 }}>
      <Typography variant="h4" sx={{ fontWeight: 800, color: '#e91e63', mb: 3 }}>
        Khu vuc quan tri CRUD
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <Paper sx={{ p: 2, borderRadius: 4 }}>
        <Tabs value={tab} onChange={(_, value) => setTab(value)} sx={{ mb: 2 }}>
          <Tab value="users" label="Users" />
          <Tab value="locations" label="Locations" />
          <Tab value="services" label="Services" />
        </Tabs>

        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
          <Typography variant="h6">{activeConfig.title}</Typography>
          <Button variant="contained" color="secondary" onClick={openCreateDialog}>
            Tao moi
          </Button>
        </Box>

        <Table>
          <TableHead>
            <TableRow>
              {activeConfig.columns.map((column) => (
                <TableCell key={column}>{column}</TableCell>
              ))}
              <TableCell align="right">Thao tac</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {activeRows.map((row) => (
              <TableRow key={row.id}>
                {activeConfig.columns.map((column) => (
                  <TableCell key={column}>
                    {column === 'locationId' ? locationsMap[row[column]] || row[column] : String(row[column])}
                  </TableCell>
                ))}
                <TableCell align="right">
                  <Stack direction="row" spacing={1} justifyContent="flex-end">
                    <Button size="small" onClick={() => openEditDialog(row)}>
                      Sua
                    </Button>
                    <Button size="small" color="error" onClick={() => handleDelete(row)}>
                      Xoa
                    </Button>
                  </Stack>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>

      <Dialog open={dialogOpen} onClose={closeDialog} fullWidth maxWidth="sm">
        <DialogTitle>{editingItem ? 'Cap nhat' : 'Tao moi'} {activeConfig.title}</DialogTitle>
        <DialogContent sx={{ pt: 2 }}>
          <Stack spacing={2} sx={{ mt: 1 }}>
            {activeConfig.fields.map((field) => {
              if (field.type === 'select') {
                return (
                  <FormControl key={field.name} fullWidth>
                    <InputLabel>{field.label}</InputLabel>
                    <Select value={formData[field.name]} label={field.label} onChange={updateField(field.name)}>
                      {field.options.map((option) => (
                        <MenuItem key={option} value={option}>
                          {option}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                );
              }

              if (field.type === 'boolean') {
                return (
                  <FormControl key={field.name} fullWidth>
                    <InputLabel>{field.label}</InputLabel>
                    <Select value={String(formData[field.name])} label={field.label} onChange={updateField(field.name)}>
                      <MenuItem value="true">true</MenuItem>
                      <MenuItem value="false">false</MenuItem>
                    </Select>
                  </FormControl>
                );
              }

              if (field.type === 'location-select') {
                return (
                  <FormControl key={field.name} fullWidth>
                    <InputLabel>{field.label}</InputLabel>
                    <Select value={formData[field.name]} label={field.label} onChange={updateField(field.name)}>
                      {data.locations.map((location) => (
                        <MenuItem key={location.id} value={location.id}>
                          {location.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                );
              }

              return (
                <TextField
                  key={field.name}
                  fullWidth
                  type={field.type}
                  label={field.label}
                  value={formData[field.name]}
                  onChange={updateField(field.name)}
                />
              );
            })}
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDialog}>Dong</Button>
          <Button onClick={handleSubmit} variant="contained" color="secondary">
            Luu
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default AdminDashboardPage;
