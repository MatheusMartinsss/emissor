import { Routes, Route, Navigate } from 'react-router-dom';
import Register from '@/pages/Auth/Register';
import Login from '@/pages/Auth/Login';
import Home from '@/pages/Home/Home';
import Layout from '@/components/Layout/Layout';
import Notas from '@/pages/Notas/Notas';
import Settings from '@/pages/Settings/Settings';
import NotaFiscal from '@/pages/NotaFiscal/NotaFiscal';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/app/store';
import { isTokenExpired } from '@/utils/utils';
import { useEffect } from 'react';
import { logout, initializeAuth } from '@/features/user/userSlice';

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const { token } = useSelector((state: RootState) => state.user);
  if (!token) {
    return <Navigate to="/login" replace />;
  }
  return children;
};
const PublicRoute = ({ children }: { children: JSX.Element }) => {
  const { token } = useSelector((state: RootState) => state.user);

  if (token) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};

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
      <Route path='/' element={
        <ProtectedRoute>
          <Layout />
        </ProtectedRoute>
      }>
        <Route index path='/dashboard' element={<Home />} />
        <Route path='/notas' element={<Notas />} />
        <Route path='/nota_fiscal' element={<NotaFiscal />} />
        <Route path='/settings' element={<Settings />} />
      </Route>
      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes >

  );
};

export default Routing;
