import { RootState } from "@/app/store";
import { useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";

export const AdminRoutes = () => {
    const { user } = useSelector((state: RootState) => state.user);

    return (
        <Routes>

            { /* <Route index element={<AdminDashboard />} />
                <Route path="users" element={} />
                <Route path="settings" element={<AdminSettings />} /> */}

        </Routes>
    );
};