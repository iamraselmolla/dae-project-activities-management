import React, { useContext } from "react";
import { AuthContext } from "../../AuthContext/AuthProvider";
import AdminDashboard from "./DashboardContent/AdminDashboard";

const Dashboard = () => {
    const { role } = useContext(AuthContext)


    return (
        <section className="py-6">
            {role === 'admin' && <AdminDashboard />}
        </section>
    );
};

export default Dashboard;
