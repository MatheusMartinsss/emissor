import { RootState } from "@/app/store";
import { useSelector } from "react-redux";
import { Navigate } from 'react-router-dom';

export const ProtectedRoute = ({ children, requiredRole }: { children: JSX.Element; requiredRole?: string }) => {
    const { token, user } = useSelector((state: RootState) => state.user);
    console.log(user)
    if (!token) {
        return <Navigate to="/login" replace />;
    }
    if (user && requiredRole && user?.role !== requiredRole) {
        return <Navigate to="/unauthorized" replace />;
    }
    return children;
};

export const PublicRoute = ({ children }: { children: JSX.Element }) => {
    const { token } = useSelector((state: RootState) => state.user);

    if (token) {
        return <Navigate to="/dashboard" replace />;
    }

    return children;
};