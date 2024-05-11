import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../AuthContext/AuthProvider';
import { findUserAllNotes, getAllProjects, getAllTraining, getAllUser, getUserAllFieldDay, getUserAllGroupMeeting, getUserDemos } from '../../../services/userServices';
import { useDispatch, useSelector } from 'react-redux';
import { daeAction } from '../../store/projectSlice';
import toast from 'react-hot-toast';
import Loader from '../../shared/Loader';
import DashboardMenu from "./DashboardMenu";
import { Outlet } from "react-router-dom";

const DashboardLayout = () => {
  const { user, role, username } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const { refetch } = useSelector(state => state.dae)

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
        }
      };
      fetchAdminAllData();
    }
    setLoading(false)
  }, [user, role, username, dispatch, refetch]);
  return (
    <section className="grid py-0">
      <div className="grid relative grid-cols-12">
        <div className="col-span-2 mx-4 sticky top-0 h-screen">
          <div className="py-5 px-1">
            <DashboardMenu />
          </div>
        </div>
        <div className="col-span-10 px-7 bg-slate-50	mx-2">
          <>
            {loading && <Loader />}
            {!loading &&
              <>
                <Outlet />
              </>}
          </>
        </div>
      </div>
    </section>
  );
};

export default DashboardLayout;
