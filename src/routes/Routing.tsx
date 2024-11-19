import { Routes, Route } from 'react-router-dom';
import Register from '@/pages/Auth/Register';
import Login from '@/pages/Auth/Login';
import Home from '@/pages/Home/Home';
import Layout from '@/components/Layout/Layout';
import Notas from '@/pages/Notas/Notas';
import Settings from '@/pages/Settings/Settings';
import NotaFiscal from '@/pages/NotaFiscal/NotaFiscal';

const Routing = () => {
  return (

    <Routes>
      <Route path='/' element={<Layout />}>
        <Route index path='/dashboard' element={<Home />} />
        <Route path='/notas' element={<Notas />} />
        <Route path='/nota_fiscal' element={<NotaFiscal />} />
        <Route path='/settings' element={<Settings />} />
      </Route>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Routes>

  );
};

export default Routing;
