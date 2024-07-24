import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../AuthContext/AuthProvider';
import Loader from '../shared/Loader';
import toast from 'react-hot-toast';

const AdminRoute = ({ children }) => {
    const { loading, role } = useContext(AuthContext);
    const location = useLocation();

    if (loading) {
        return <Loader />;
    }

    if (role !== 'admin') {
        toast.error("এইটা এডমিনিস্ট্রেটিভ এরিয়া। আপনি এই পেইজে প্রবেশ করতে পারবেন না।")
        return <Navigate to="/login" state={{ from: location }} replace></Navigate>
    }
    return children

};

export default AdminRoute;