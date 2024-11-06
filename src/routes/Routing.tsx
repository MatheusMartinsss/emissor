import { Routes, Route, Router } from 'react-router-dom';
import Register from '@/pages/Auth/Register';
import Login from '@/pages/Auth/Login';
import Home from '@/pages/Home/Home';
import Layout from '@/components/Layout/Layout';

const Routing = () => {
  return (

    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
      </Route>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Routes>

  );
};

export default Routing;
