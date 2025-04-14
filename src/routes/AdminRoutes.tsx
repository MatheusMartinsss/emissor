import { RootState } from "@/app/store";
import Company from "@/pages/Admin/Company/Company";
import { useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";

export const AdminRoutes = () => {
 

    return (
        <Routes>

            { /* <Route index element={<AdminDashboard />} />
                <Route path="users" element={} />
                <Route path="company" element={<AdminSettings />} /> */}
            <Route path="company" element={<Company />} />
        </Routes>
    );
};