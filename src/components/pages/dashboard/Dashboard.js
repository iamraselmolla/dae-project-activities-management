import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../AuthContext/AuthProvider';
import { findUserAllNotes, getAllProjects, getAllTraining, getAllUser, getUserAllFieldDay, getUserAllGroupMeeting, getUserDemos } from '../../../services/userServices';
import { useDispatch } from 'react-redux';
import { daeAction } from '../../store/projectSlice';
import toast from 'react-hot-toast';
import Loader from '../../shared/Loader';

const Dashboard = () => {
    const { user, role, username } = useContext(AuthContext);
    const [loading, setLoading] = useState(true);
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchGeneralData = async () => {
            try {
                // User all Notes
                const noteResult = await findUserAllNotes();
                if (noteResult?.status === 200) {
                    dispatch(daeAction.setUserNotes(noteResult?.data?.data));
                }
            } catch (err) {
                toast.error("তথ্য সেকশন-১ সার্ভার থেকে আনতে অসুবিধা হচ্ছে।");
            } finally {
                setLoading(false);
            }
        };
        fetchGeneralData();

        if (user && role === 'user') {
            const fetchUserAllData = async () => {
                try {
                    // Demo
                    const demoResult = await getUserDemos();
                    if (demoResult?.status === 200) {
                        dispatch(daeAction.setUserDemos(demoResult?.data?.data));
                    }
                    // Field Day
                    const fieldDayResult = await getUserAllFieldDay();
                    if (fieldDayResult?.status === 200) {
                        dispatch(daeAction.setUserFieldDays(fieldDayResult?.data?.data));
                    }

                    // Dae meeting
                    const meetingResult = await getUserAllGroupMeeting();
                    if (meetingResult?.status === 200) {
                        dispatch(daeAction.setDaeMeeting(meetingResult?.data?.data));
                    }
                } catch (err) {
                    toast.error("তথ্য সেকশন-২ সার্ভার থেকে আনতে অসুবিধা হচ্ছে।");
                }
            };
            fetchUserAllData();
        }

        if (user && role === 'admin') {
            const fetchAdminAllData = async () => {
                try {
                    // All Users
                    const userResult = await getAllUser();
                    if (userResult?.status === 200) {
                        dispatch(daeAction.setAllUsers(userResult?.data?.data));
                    }

                    // All Trainings
                    const trainingsResult = await getAllTraining();
                    if (trainingsResult?.status === 200) {
                        dispatch(daeAction.setAllTrainings(trainingsResult?.data?.data));
                    }
                    // all projects
                    const projectsResult = await getAllProjects(role);
                    if (projectsResult?.status === 200) {
                        dispatch(daeAction.setAllProjects(projectsResult?.data?.data));
                    }
                } catch (err) {
                    toast.error("তথ্য সেকশন-৩ সার্ভার থেকে আনতে অসুবিধা হচ্ছে।");
                } finally {
                    setLoading(false);
                }
            };
            fetchAdminAllData();
        }
    }, [user, role, username, dispatch]);

    return (
        <>
            {loading && <Loader />}
        </>
    );
};

export default Dashboard;
