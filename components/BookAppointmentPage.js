import React, { useState, useEffect } from 'react';
import {
  Button, Grid, Typography, Select, MenuItem, FormControl,
  InputLabel, Avatar, Checkbox, ListItemText, TextField,
  Box, IconButton
} from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import '../assets/css/BookAppointmentPage.css';

import areas from '../data/areasData'; // ✅ import dữ liệu trung tâm

const BookAppointmentPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { locationName, locationAddress, serviceName, serviceImage, homeService } = location.state || {};

  const [date, setDate] = useState(new Date());
  const [technicians, setTechnicians] = useState(['']);
  const [selectedTime, setSelectedTime] = useState('');
  const [services, setServices] = useState([[]]);
  const [notes, setNotes] = useState('');
  const [availableTimes, setAvailableTimes] = useState([]);
  const [isButtonEnabled, setIsButtonEnabled] = useState(false);
  const [isHomeService, setIsHomeService] = useState(homeService || false);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [fullName, setFullName] = useState('');
  const [numAttending, setNumAttending] = useState(1);

  const technicianList = [
    { name: "Kỹ Thuật Viên 1", image: "/path/to/technician1.jpg" },
    { name: "Kỹ Thuật Viên 2", image: "/path/to/technician2.jpg" },
    { name: "Kỹ Thuật Viên 3", image: "/path/to/technician3.jpg" },
  ];

  const times = [
    { time: "09:00", status: "available" },
    { time: "10:00", status: "available" },
    { time: "11:00", status: "available" },
    { time: "12:00", status: "full" },
    { time: "13:00", status: "full" },
    { time: "14:00", status: "full" },
    { time: "15:00", status: "available" },
    { time: "16:00", status: "available" },
    { time: "17:00", status: "available" },
    { time: "18:00", status: "available" },
    { time: "19:00", status: "available" },
    { time: "20:00", status: "available" },
  ];

  // ✅ Lấy danh sách dịch vụ theo locationName
  const allLocations = Object.values(areas).flatMap(area => area.locations);
  const matchedLocation = allLocations.find(loc => loc.name === locationName);
  const availableServices = matchedLocation?.services || [];

  const today = new Date();
  const nextWeek = new Date();
  nextWeek.setDate(today.getDate() + 7);

  const getAvailableTimesForSelectedDate = () => {
    const todayString = today.toISOString().split('T')[0];
    const selectedDateString = date.toISOString().split('T')[0];
    const currentTime = today.getHours() + today.getMinutes() / 60;

    if (selectedDateString === todayString) {
      return times.filter((time) => {
        const [hour, minute] = time.time.split(':').map(Number);
        return (hour + minute / 60) >= currentTime && time.status === 'available';
      });
    } else if (date <= nextWeek) {
      return times;
    } else {
      return [];
    }
  };

  useEffect(() => {
    setAvailableTimes(getAvailableTimesForSelectedDate());
  }, [date]);

  useEffect(() => {
    const allServicesSelected = services.every(s => s.length > 0);
    const allTechniciansSelected = technicians.every(t => t !== '');
    if (date && fullName && selectedTime && allServicesSelected && allTechniciansSelected) {
      setIsButtonEnabled(true);
    } else {
      setIsButtonEnabled(false);
    }
  }, [date, fullName, selectedTime, services, technicians]);

  const handleDateChange = (date) => setDate(date);
  const handleTechnicianChange = (e, index) => {
    const updated = [...technicians];
    updated[index] = e.target.value;
    setTechnicians(updated);
  };

  const handleTimeChange = (time) => {
    if (time.status === "available") setSelectedTime(time.time);
  };

  const handleServiceChange = (event, index) => {
    const updated = [...services];
    updated[index] = event.target.value;
    setServices(updated);
  };

  const handleNotesChange = (e) => setNotes(e.target.value);
  const handlePhoneNumberChange = (e) => setPhoneNumber(e.target.value);
  const handleEmailChange = (e) => setEmail(e.target.value);
  const handleFullNameChange = (e) => setFullName(e.target.value);

  const handleNumAttendingChange = (action) => {
    setNumAttending(prev => {
      const newNum = action === 'increase' ? prev + 1 : prev - 1;
      setTechnicians(Array(newNum).fill(''));
      setServices(Array(newNum).fill([]));
      return newNum;
    });
  };

  const calculateTotalPrice = () => {
    let total = 0;
    services.forEach(serviceList => {
      serviceList.forEach(serviceName => {
        const service = availableServices.find(s => s.name === serviceName);
        if (service?.price) {
          total += parseFloat(service.price.replace(/[^\d]/g, ''));
        }
      });
    });
    return total;
  };

  const handleConfirmAppointment = () => {
    const bookingData = {
      fullName,
      phoneNumber,
      email,
      date: date.toLocaleDateString(),
      time: selectedTime,
      services: services,

      technicians: technicians.join(', '),
      notes,
      location: locationName,
      address: locationAddress,
      isHomeService,
      totalPrice: calculateTotalPrice()
    };

    alert("Bạn đang trong thời gian giữ chỗ, vui lòng thanh toán trong 10 phút!");
    navigate("/payment", { state: { bookingData } });
  };

  const getAvailableTechnicians = (index) => {
    const selectedTechnicians = technicians.filter((_, i) => i !== index);
    return technicianList.filter(tech => !selectedTechnicians.includes(tech.name));
  };

  return (
    <div className="book-appointment-page">
      <Box sx={{ p: 4 }}>
        <Typography variant="h5" gutterBottom>
          Đặt Lịch Hẹn tại {locationName}
        </Typography>

        <TextField
          label="Họ và Tên"
          fullWidth
          value={fullName}
          onChange={handleFullNameChange}
          sx={{ mb: 2 }}
        />

        <TextField
          label="Số điện thoại"
          fullWidth
          value={phoneNumber}
          onChange={handlePhoneNumberChange}
          sx={{ mb: 2 }}
        />

        <TextField
          label="Email"
          fullWidth
          value={email}
          onChange={handleEmailChange}
          sx={{ mb: 2 }}
        />

        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Typography variant="body1" sx={{ mr: 2 }}>
            Số người:
          </Typography>
          <IconButton onClick={() => handleNumAttendingChange('decrease')} disabled={numAttending <= 1}>
            <RemoveIcon />
          </IconButton>
          <Typography variant="body1" sx={{ mx: 2 }}>
            {numAttending}
          </Typography>
          <IconButton onClick={() => handleNumAttendingChange('increase')}>
            <AddIcon />
          </IconButton>
        </Box>

        {[...Array(numAttending)].map((_, index) => (
          <Box key={index} sx={{ mb: 3 }}>
            <Typography variant="subtitle1">Khách {index + 1}</Typography>

            <FormControl fullWidth sx={{ mb: 2 }}>
              <InputLabel>Chọn Kỹ Thuật Viên</InputLabel>
              <Select
                value={technicians[index]}
                onChange={(e) => handleTechnicianChange(e, index)}
              >
                {getAvailableTechnicians(index).map((tech) => (
                  <MenuItem key={tech.name} value={tech.name}>
                    <Avatar src={tech.image} sx={{ mr: 1 }} />
                    {tech.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl fullWidth sx={{ mb: 2 }}>
              <InputLabel>Chọn Dịch Vụ</InputLabel>
              <Select
                multiple
                value={services[index]}
                onChange={(e) => handleServiceChange(e, index)}
                renderValue={(selected) => selected.join(', ')}
              >
                {availableServices.map((service) => (
                  <MenuItem key={service.name} value={service.name}>
                    <Checkbox checked={services[index].indexOf(service.name) > -1} />
                    <ListItemText primary={`${service.name} (${service.price})`} />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        ))}

        <DatePicker
          selected={date}
          onChange={handleDateChange}
          dateFormat="dd/MM/yyyy"
          minDate={new Date()}
          maxDate={nextWeek}
          className="date-picker"
        />

        <Box sx={{ mt: 2 }}>
          <Typography variant="
::contentReference[oaicite:0]{index=0}
 
          body1">Chọn giờ:</Typography>
          <Grid container spacing={1}>
            {availableTimes.map((timeObj) => (
              <Grid item key={timeObj.time}>
                <Button
                  variant={selectedTime === timeObj.time ? "contained" : "outlined"}
                  onClick={() => handleTimeChange(timeObj)}
                  disabled={timeObj.status !== 'available'}
                >
                  {timeObj.time}
                </Button>
              </Grid>
            ))}
          </Grid>
        </Box>

        <TextField
          label="Ghi chú"
          fullWidth
          multiline
          rows={3}
          value={notes}
          onChange={handleNotesChange}
          sx={{ mt: 3 }}
        />

        <Typography variant="h6" sx={{ mt: 3 }}>
          Tổng Giá: {calculateTotalPrice().toLocaleString()} ₫
        </Typography>

        <Button
          variant="contained"
          color="primary"
          sx={{ mt: 3 }}
          onClick={handleConfirmAppointment}
          disabled={!isButtonEnabled}
        >
          Xác Nhận Đặt Lịch
        </Button>
      </Box>
    </div>
  );
};

export default BookAppointmentPage;
