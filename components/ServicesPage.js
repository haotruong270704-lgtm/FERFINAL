import React, { useState, useEffect } from 'react';
import {
  Box, Typography, Grid, Button, Chip, TextField,
  InputAdornment, IconButton
} from '@mui/material';
import { Link } from 'react-router-dom';
import {
  MapContainer, TileLayer, Marker, Popup, useMap
} from 'react-leaflet';
import { getDistance } from 'geolib';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import SearchIcon from '@mui/icons-material/Search';
import axios from 'axios';
import '../assets/css/servicespage.css';
import areas from '../data/areasData';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

const redIcon = new L.Icon({
  iconUrl: require('../assets/img/marker-icon-red.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
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

const ZoomToUserButton = ({ searchedPosition, userPosition }) => {
  const map = useMap();

  const handleClick = () => {
    const targetPosition = searchedPosition || userPosition;

    if (
      Array.isArray(targetPosition) &&
      targetPosition.length === 2 &&
      typeof targetPosition[0] === 'number' &&
      typeof targetPosition[1] === 'number'
    ) {
      map.flyTo(targetPosition, 16, { animate: true });
    } else {
      alert('Không có vị trí nào để hiển thị.');
    }
  };

  return (
    <div
      style={{
        position: 'absolute',
        top: 10,
        right: 10,
        zIndex: 1000,
        backgroundColor: 'white',
        padding: '8px',
        borderRadius: '4px',
        boxShadow: '0 2px 6px rgba(0,0,0,0.2)',
        cursor: 'pointer'
      }}
      onClick={handleClick}
      title="Đến vị trí hiển thị"
    >
      📍
    </div>
  );
};

const isInDaNangBoundary = ([lat, lng]) => {
  return lat >= 15.9 && lat <= 16.2 && lng >= 108.0 && lng <= 108.35;
};

const ServicesPage = () => {
  const [userPosition, setUserPosition] = useState(null);
  const [searchAddress, setSearchAddress] = useState('');
  const [searchedPosition, setSearchedPosition] = useState(null);

  const currentCenter = searchedPosition || userPosition;

  useEffect(() => {
    const storedUserPos = localStorage.getItem('userPosition');
    const storedSearchPos = localStorage.getItem('searchedPosition');
    const storedSearchAddr = localStorage.getItem('searchAddress');

    if (storedUserPos) {
      const parsed = JSON.parse(storedUserPos);
      if (Array.isArray(parsed) && parsed.length === 2) {
        setUserPosition(parsed);
      }
    }

    if (storedSearchPos) {
      const parsed = JSON.parse(storedSearchPos);
      if (Array.isArray(parsed) && parsed.length === 2) {
        setSearchedPosition(parsed);
      }
    }

    if (storedSearchAddr) {
      setSearchAddress(storedSearchAddr);
    }

    if (!storedUserPos && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const coords = [pos.coords.latitude, pos.coords.longitude];
          if (isInDaNangBoundary(coords)) {
            setUserPosition(coords);
            localStorage.setItem('userPosition', JSON.stringify(coords));
          } else {
            setUserPosition([16.0471, 108.2062]);
          }
        },
        (err) => {
          console.error('Lỗi lấy vị trí:', err);
          setUserPosition([16.0471, 108.2062]);
        },
        { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
      );
    }
  }, []);

  useEffect(() => {
    if (searchedPosition) {
      localStorage.setItem('searchedPosition', JSON.stringify(searchedPosition));
    }
  }, [searchedPosition]);

  useEffect(() => {
    if (searchAddress) {
      localStorage.setItem('searchAddress', searchAddress);
    } else {
      localStorage.removeItem('searchAddress');
      localStorage.removeItem('searchedPosition');
      setSearchedPosition(null);
    }
  }, [searchAddress]);

  const handleAddressSearch = async () => {
    if (!searchAddress) return;
    try {
      const response = await axios.get('https://nominatim.openstreetmap.org/search', {
        params: {
          q: `${searchAddress}, Đà Nẵng, Việt Nam`,
          format: 'json',
          limit: 1,
          addressdetails: 1,
        }
      });

      if (response.data.length > 0) {
        const result = response.data[0];
        const lat = parseFloat(result.lat);
        const lon = parseFloat(result.lon);

        if (!isInDaNangBoundary([lat, lon])) {
          alert('Địa chỉ tìm được nằm ngoài thành phố Đà Nẵng.');
          return;
        }

        setSearchedPosition([lat, lon]);
      } else {
        alert('Không tìm thấy địa chỉ trong khu vực Đà Nẵng.');
      }
    } catch (error) {
      console.error('Lỗi khi tìm địa chỉ:', error);
    }
  };

  const allLocations = Object.values(areas).flatMap(area => area.locations);

  const nearbyLocations = currentCenter
    ? allLocations.filter(loc => {
        if (!loc.latlng || !isInDaNangBoundary(loc.latlng)) return false;
        const dist = getDistance(
          { latitude: currentCenter[0], longitude: currentCenter[1] },
          { latitude: loc.latlng[0], longitude: loc.latlng[1] }
        );
        return dist <= 3000;
      })
    : [];

  return (
    <div style={{ paddingBottom: '50px' }}>
      <Box sx={{ maxWidth: 500, mx: 'auto', mt: 4, mb: 2 }}>
        <TextField
          fullWidth
          placeholder="Nhập địa chỉ bạn muốn tìm (chỉ trong Đà Nẵng)..."
          value={searchAddress}
          onChange={(e) => setSearchAddress(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleAddressSearch()}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={handleAddressSearch}>
                  <SearchIcon />
                </IconButton>
              </InputAdornment>
            )
          }}
        />
      </Box>

      <Typography variant="h4" sx={{ mb: 2, textAlign: 'center', color: '#E91E63', fontWeight: 'bold' }}>
        Thợ nail gần {searchedPosition ? 'vị trí đã chọn' : 'bạn'}
      </Typography>

      <Grid container spacing={3} justifyContent="center">
        {nearbyLocations.map(loc => (
          <Grid item xs={12} sm={6} md={4} key={loc.id}>
            <Box className="location-card">
              <Typography variant="h6">{loc.name}</Typography>
              <Typography variant="body2">{loc.address}</Typography>
              <Chip label={`Giá từ: ${loc.price}`} sx={{ mt: 1, backgroundColor: '#FFD700', color: '#333', fontWeight: 'bold' }} />
              {loc.homeService && (
                <Box sx={{ mt: '10px', px: 2, py: 1, backgroundColor: '#FFD700', borderRadius: '15px', fontWeight: 600, fontSize: '14px', display: 'inline-block' }}>
                  Dịch vụ tại nhà
                </Box>
              )}
              <Link to={`/location/${loc.id}`} style={{ textDecoration: 'none' }}>
                <Button variant="contained" sx={{ mt: 2, backgroundColor: '#E91E63', '&:hover': { backgroundColor: '#D81B60' } }}>
                  Xem chi tiết
                </Button>
              </Link>
            </Box>
          </Grid>
        ))}
      </Grid>

      <Box className="map-wrapper" sx={{ mt: 5 }}>
        <Typography variant="h6" sx={{ mb: 2 }}>Bản đồ đề xuất:</Typography>
        <div className="map-container">
          <MapContainer
            center={currentCenter || [16.0471, 108.2062]}
            zoom={13}
            scrollWheelZoom
            style={{ height: '600px', width: '100%' }}
          >
            <MapCenterUpdater center={currentCenter} />
            <ZoomToUserButton searchedPosition={searchedPosition} userPosition={userPosition} />
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            {searchedPosition ? (
              <Marker position={searchedPosition} icon={redIcon}>
                <Popup>Vị trí bạn đã tìm</Popup>
              </Marker>
            ) : userPosition && (
              <Marker position={userPosition} icon={redIcon}>
                <Popup>Vị trí của bạn</Popup>
              </Marker>
            )}

            {nearbyLocations.map(loc => (
              <Marker key={loc.id} position={loc.latlng}>
                <Popup>
                  <strong>{loc.name}</strong><br />
                  {loc.address}<br />
                  {loc.price}<br />
                  {currentCenter && (
                    <>
                      <br />
                      Khoảng cách: {Math.round(getDistance(
                        { latitude: loc.latlng[0], longitude: loc.latlng[1] },
                        { latitude: currentCenter[0], longitude: currentCenter[1] }
                      ) / 1000)} km
                    </>
                  )}
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>
      </Box>
    </div>
  );
};

export default ServicesPage;
