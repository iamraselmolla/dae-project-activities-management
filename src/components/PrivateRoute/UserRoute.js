import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../AuthContext/AuthProvider';
import Loader from '../shared/Loader';
import toast from 'react-hot-toast';

const UserRoute = ({ children }) => {
    const { user, loading, role } = useContext(AuthContext);
    const location = useLocation();

    if (loading) {
        return <><Loader /></>
    }

    if (role !== 'user') {
        toast.error("এইটা লগিন করা অবস্থায় ইউজারের এরিয়া । আপনি এই পেইজে প্রবেশ করতে পারবেন না।")
        return <Navigate to="/login" state={{ from: location }} replace></Navigate>
    }
    return children

};

export default UserRoute;