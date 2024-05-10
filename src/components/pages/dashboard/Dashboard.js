import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../AuthContext/AuthProvider';
import { getAllProjects, getAllTraining, getAllUser } from '../../../services/userServices';
import { useDispatch } from 'react-redux';
import { daeAction } from '../../store/projectSlice';
import toast from 'react-hot-toast';
import Loader from '../../shared/Loader';



const Dashboard = () => {
    const { user, role, username } = useContext(AuthContext);
    const [loading, setLoading] = useState(true)
    const dispatch = useDispatch();
    useEffect(() => {
        const fetchGeneralData = async () => {
            // Fetch Projets Data
            try {
                const projectsResult = await getAllProjects(role);
                if (projectsResult?.status === 200) {
                    dispatch(daeAction.setAllProjects(projectsResult?.data?.data))
                }

                setLoading(false)
            }
            catch (err) {
                toast.error("তথ্য সেকশন-১ সার্ভার থেকে আনতে অসুবিধা হচ্ছে।")
                setLoading(false)
            }
        }
        fetchGeneralData()



        // Fetch user based data
        const fetchUserAllData = async () => {

        }
        if (user && role === 'user') {
            fetchUserAllData()
        }

        // Fetch Admin Based data
        const fetchAdminAllData = async () => {

            // All Users
            try {
                const userResult = await getAllUser();
                if (userResult?.status === 200) {
                    dispatch(daeAction.setAllUsers(userResult?.data?.data))
                }

                // All Trainings
                const trainingsResult = await getAllTraining();
                if (trainingsResult?.status === 200) {
                    dispatch(daeAction.setAllTrainings(trainingsResult?.data?.data))
                }

                setLoading(false)
            }
            catch (err) {
                toast.error("তথ্য সেকশন-৩ সার্ভার থেকে আনতে অসুবিধার সৃষ্টি হচ্ছে।")
                setLoading(false)
            }

        }
        if (user && role === 'admin') {
            fetchAdminAllData()
        }

    }, [user, role, username])
    return (
        <>
            {loading && <Loader />}
        </>
    );
};

export default Dashboard;