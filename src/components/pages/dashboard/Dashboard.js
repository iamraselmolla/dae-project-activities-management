import React, { useContext, useEffect } from 'react';
import { AuthContext } from '../../AuthContext/AuthProvider';
import { getAllProjects, getAllUser } from '../../../services/userServices';
import { useDispatch } from 'react-redux';
import { daeAction } from '../../store/projectSlice';


const Dashboard = () => {
    const { user, role, username } = useContext(AuthContext);
    const dispatch = useDispatch()
    useEffect(() => {
        const fetchGeneralData = async () => {
            // Fetch Projets Data
            const projectsResult = await getAllProjects(role);
            if (projectsResult?.status === 200) {
                dispatch(daeAction.setAllProjects(projectsResult?.data?.data))
            }
        }
        fetchGeneralData()
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