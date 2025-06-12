import { Navigate, Outlet } from "react-router-dom";

const AdminRoute = () => {
    const token = localStorage.getItem("token");
    const userRole = localStorage.getItem("role");

    console.log("Token:", token);
    console.log("User Role:", userRole);

    if (!token || userRole !== "admin") {
        console.log("No valid session found, redirecting to /");
        return <Navigate to="/" />; 
    }

    return <Outlet />;
};

export default AdminRoute;