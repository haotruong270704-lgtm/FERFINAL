import React from 'react';
import { Route, Routes } from 'react-router-dom';
import RoleRoute from '../components/routes/RoleRoute';
import ProtectedRoute from '../components/routes/ProtectedRoute';
import AboutPage from '../pages/AboutPage';
import ActivitiesPage from '../pages/ActivitiesPage';
import AdminDashboardPage from '../pages/AdminDashboardPage';
import BookAppointmentPage from '../pages/BookAppointmentPage';
import HomePage from '../pages/HomePage';
import LocationDetailPage from '../pages/LocationDetailPage';
import LoginPage from '../pages/LoginPage';
import PaymentPage from '../pages/PaymentPage';
import ServicesPage from '../pages/ServicesPage';

const NotFoundPage = () => (
  <div style={{ padding: '60px 16px', textAlign: 'center' }}>
    <h2>404 - Page not found</h2>
    <p>Duong dan ban tim khong ton tai.</p>
  </div>
);

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<HomePage />} />
    <Route path="/about" element={<AboutPage />} />
    <Route path="/login" element={<LoginPage />} />
    <Route path="/services" element={<ServicesPage />} />
    <Route path="/location/:locationId" element={<LocationDetailPage />} />
    <Route
      path="/book-appointment/:locationId"
      element={
        <ProtectedRoute>
          <BookAppointmentPage />
        </ProtectedRoute>
      }
    />
    <Route
      path="/payment"
      element={
        <ProtectedRoute>
          <PaymentPage />
        </ProtectedRoute>
      }
    />
    <Route
      path="/activities"
      element={
        <ProtectedRoute>
          <ActivitiesPage />
        </ProtectedRoute>
      }
    />
    <Route
      path="/admin"
      element={
        <RoleRoute roles={['admin']}>
          <AdminDashboardPage />
        </RoleRoute>
      }
    />
    <Route path="*" element={<NotFoundPage />} />
  </Routes>
);

export default AppRoutes;
