import React, { useContext } from "react";
import { AuthContext } from "../../AuthContext/AuthProvider";
import AdminDashboard from "./DashboardContent/AdminDashboard";
import UserDashboard from "./DashboardContent/UserDashboard";

const Dashboard = () => {
  const { role } = useContext(AuthContext);

  return (
    <section className="py-6">
      {role === "admin" && <AdminDashboard />}
      {role === "user" && <UserDashboard />}
    </section>
  );
};

export default Dashboard;
