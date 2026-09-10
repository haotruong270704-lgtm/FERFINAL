import React, { useEffect, useMemo, useState } from 'react';
import {
  Alert,
  Box,
  Button,
  Chip,
  FormControl,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  Switch,
  TextField,
  Typography
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { Link } from 'react-router-dom';
import { MapContainer, Marker, Popup, TileLayer, useMap } from 'react-leaflet';
import { getDistance } from 'geolib';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import PageLoader from '../components/common/PageLoader';
import { geocodingService } from '../services/geocodingService';
import { locationsService } from '../services/locationsService';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png')
});

const redIcon = new L.Icon({
  iconUrl: require('../assets/img/marker-icon-red.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

const MapCenterUpdater = ({ center }) => {
  const map = useMap();

  useEffect(() => {
    if (center) {
      map.setView(center, 13);
    }
  }, [center, map]);

  return null;
};

const defaultCenter = [16.0544, 108.2022];

const isInDaNangBoundary = ([lat, lng]) => lat >= 15.9 && lat <= 16.2 && lng >= 108.0 && lng <= 108.35;

const ServicesPage = () => {
  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchAddress, setSearchAddress] = useState('');
  const [searchedPosition, setSearchedPosition] = useState(null);
  const [userPosition, setUserPosition] = useState(null);
  const [areaFilter, setAreaFilter] = useState('all');
  const [nearbyOnly, setNearbyOnly] = useState(false);

  useEffect(() => {
    const loadLocations = async () => {
      try {
        const locationData = await locationsService.getLocations();
        setLocations(locationData);
      } catch (loadError) {
        setError(loadError.message || 'Khong the tai danh sach chi nhanh.');
      } finally {
        setLoading(false);
      }
    };

    loadLocations();
  }, []);

  useEffect(() => {
    if (!navigator.geolocation) {
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const coords = [position.coords.latitude, position.coords.longitude];
        setUserPosition(isInDaNangBoundary(coords) ? coords : defaultCenter);
      },
      () => {
        setUserPosition(defaultCenter);
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
    );
  }, []);

  const handleSearchAddress = async () => {
    if (!searchAddress.trim()) {
      return;
    }

    try {
      const result = await geocodingService.searchAddress(searchAddress.trim());

      if (!result) {
        setError('Khong tim thay dia chi trong khu vuc Da Nang.');
        return;
      }

      const coords = [Number(result.lat), Number(result.lon)];

      if (!isInDaNangBoundary(coords)) {
        setError('Dia chi tim duoc nam ngoai khu vuc Da Nang.');
        return;
      }

      setError('');
      setSearchedPosition(coords);
    } catch (searchError) {
      setError(searchError.message || 'Tim dia chi that bai.');
    }
  };

  const currentCenter = searchedPosition || userPosition || defaultCenter;

  const enrichedLocations = useMemo(() => {
    return locations
      .map((location) => {
        const currentDistance = currentCenter
          ? getDistance(
              { latitude: currentCenter[0], longitude: currentCenter[1] },
              { latitude: location.lat, longitude: location.lng }
            )
          : null;

        return {
          ...location,
          distance: currentDistance
        };
      })
      .sort((first, second) => {
        if (first.distance == null || second.distance == null) {
          return 0;
        }

        return first.distance - second.distance;
      });
  }, [currentCenter, locations]);

  const filteredLocations = enrichedLocations.filter((location) => {
    const matchArea = areaFilter === 'all' || location.area === areaFilter;
    const matchNearby = !nearbyOnly || (location.distance != null && location.distance <= 5000);
    return matchArea && matchNearby;
  });

  const areas = Array.from(new Set(locations.map((location) => location.area)));

  if (loading) {
    return <PageLoader />;
  }

  return (
    <Box sx={{ maxWidth: 1200, mx: 'auto', px: 2, py: 4 }}>
      <Stack spacing={2} sx={{ mb: 3 }}>
        <Typography variant="h4" sx={{ fontWeight: 800, color: '#e91e63' }}>
          He thong Pink Beauty Hub
        </Typography>
        <Typography variant="body1">
          Du lieu nay dang duoc doc tu JSON Server va da tach thanh collection locations/services.
        </Typography>
      </Stack>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <Grid container spacing={2} sx={{ mb: 3 }}>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="Tim dia chi tai Da Nang"
            value={searchAddress}
            onChange={(event) => setSearchAddress(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === 'Enter') {
                handleSearchAddress();
              }
            }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleSearchAddress}>
                    <SearchIcon />
                  </IconButton>
                </InputAdornment>
              )
            }}
          />
        </Grid>
        <Grid item xs={12} md={3}>
          <FormControl fullWidth>
            <InputLabel>Khu vuc</InputLabel>
            <Select value={areaFilter} label="Khu vuc" onChange={(event) => setAreaFilter(event.target.value)}>
              <MenuItem value="all">Tat ca</MenuItem>
              {areas.map((area) => (
                <MenuItem key={area} value={area}>
                  {area}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={3}>
          <PaperLikeSwitch nearbyOnly={nearbyOnly} onChange={setNearbyOnly} />
        </Grid>
      </Grid>

      <Grid container spacing={3}>
        <Grid item xs={12} lg={7}>
          <Box sx={{ height: 520, overflow: 'hidden', borderRadius: 4, boxShadow: 2 }}>
            <MapContainer center={currentCenter} zoom={13} scrollWheelZoom style={{ height: '100%', width: '100%' }}>
              <MapCenterUpdater center={currentCenter} />
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />

              {searchedPosition && (
                <Marker position={searchedPosition} icon={redIcon}>
                  <Popup>Vi tri tim kiem cua ban</Popup>
                </Marker>
              )}

              {userPosition && !searchedPosition && (
                <Marker position={userPosition} icon={redIcon}>
                  <Popup>Vi tri hien tai cua ban</Popup>
                </Marker>
              )}

              {filteredLocations.map((location) => (
                <Marker key={location.id} position={[location.lat, location.lng]}>
                  <Popup>
                    <strong>{location.name}</strong>
                    <br />
                    {location.address}
                  </Popup>
                </Marker>
              ))}
            </MapContainer>
          </Box>
        </Grid>

        <Grid item xs={12} lg={5}>
          <Stack spacing={2}>
            {filteredLocations.map((location) => (
              <Box key={location.id} sx={{ p: 3, borderRadius: 4, boxShadow: 2, backgroundColor: '#fff' }}>
                <Typography variant="h6" sx={{ fontWeight: 800 }}>
                  {location.name}
                </Typography>
                <Typography variant="body2" sx={{ mb: 1 }}>
                  {location.address}
                </Typography>
                <Chip label={`Gia tu ${location.priceFrom.toLocaleString()} VND`} color="secondary" sx={{ mr: 1, mb: 1 }} />
                {location.homeService && <Chip label="Tai nha" color="success" sx={{ mb: 1 }} />}
                {location.distance != null && (
                  <Typography variant="body2" sx={{ color: 'text.secondary', mb: 2 }}>
                    Cach ban khoang {(location.distance / 1000).toFixed(1)} km
                  </Typography>
                )}
                <Link to={`/location/${location.id}`} style={{ textDecoration: 'none' }}>
                  <Button variant="contained" color="secondary">
                    Xem chi tiet
                  </Button>
                </Link>
              </Box>
            ))}

            {filteredLocations.length === 0 && <Alert severity="info">Khong co chi nhanh phu hop bo loc hien tai.</Alert>}
          </Stack>
        </Grid>
      </Grid>
    </Box>
  );
};

const PaperLikeSwitch = ({ nearbyOnly, onChange }) => (
  <Box
    sx={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      height: '100%',
      minHeight: 56,
      px: 2,
      borderRadius: 2,
      border: '1px solid',
      borderColor: 'divider',
      backgroundColor: '#fff'
    }}
  >
    <Typography variant="body2">Chi hien thi trong ban kinh 5km</Typography>
    <Switch checked={nearbyOnly} onChange={(event) => onChange(event.target.checked)} color="secondary" />
  </Box>
);

export default ServicesPage;
