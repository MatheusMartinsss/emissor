import Home from "@/pages/Home/Home";
import NotaFiscal from "@/pages/NotaFiscal/NotaFiscal";
import Notas from "@/pages/Notas/Notas";
import Settings from "@/pages/Settings/Settings";
import { Route, Routes } from "react-router-dom";

export const DashboardRoutes = () => {
    return (
        <Routes>
            <Route path="/dashboard" index element={<Home />} />
            <Route path='/notas' element={<Notas />} />
            <Route path='/nota_fiscal' element={<NotaFiscal />} />
            <Route path='/settings' element={<Settings />} />
        </Routes>
    );
};