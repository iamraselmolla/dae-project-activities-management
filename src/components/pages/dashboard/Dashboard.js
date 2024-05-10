import React, { useContext, useEffect } from 'react';
import { AuthContext } from '../../AuthContext/AuthProvider';
import { getAllUser } from '../../../services/userServices';
import { useDispatch } from 'react-redux';
import { daeAction } from '../../store/projectSlice';


const Dashboard = () => {
    const { user, role, username } = useContext(AuthContext);
    const dispatch = useDispatch()
    useEffect(() => {
        const fetchUserAllData = async () => {

        }
        const fetchAdminAllData = async () => {
            const userResult = await getAllUser();
            if (userResult?.status === 200) {
                dispatch(daeAction.setAllUsers(userResult?.data?.data))
            }
        }
        if (user && role === 'admin') {
            fetchAdminAllData()
        }

    }, [user, role, username])
    return (
        <div>
            Dashboard
        </div>
    );
};

export default Dashboard;