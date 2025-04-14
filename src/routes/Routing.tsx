import { Routes, Route, Navigate } from 'react-router-dom';
import Register from '@/pages/Auth/Register';
import Login from '@/pages/Auth/Login';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { initializeAuth } from '@/features/user/userSlice';
import { ProtectedRoute, PublicRoute } from '@/components/ProtectedRoutes/ProtectedRoutes';
import { DashboardRoutes } from './DashboardRoutes';
import { AdminRoutes } from './AdminRoutes'
import Layout from '@/components/Layout/Layout';



const Routing = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(initializeAuth())
  }, [])
  return (

    <Routes>
      <Route path="/login" element={
        <PublicRoute>
          <Login />
        </PublicRoute>
      } />
      <Route path="/register" element={
        <PublicRoute>
          <Register />
        </PublicRoute>
      } />

      <Route element={<Layout />}>
        <Route path="/dashboard/*" element={
          <ProtectedRoute>
            <DashboardRoutes />
          </ProtectedRoute>
        } />
        <Route path="/admin/*" element={
          <ProtectedRoute requiredRole="admin">
            <AdminRoutes />
          </ProtectedRoute>
        } />
      </Route>

      {/* Redirecionamentos */}
      <Route path="/" element={<Navigate to="/dashboard" replace />} />
      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes >

  );
};

export default Routing;
