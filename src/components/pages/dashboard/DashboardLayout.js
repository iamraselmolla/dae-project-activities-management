import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../AuthContext/AuthProvider";
import {
  findUserAllNotes,
  getAllDistributions,
  getAllMotivationalTours,
  getAllProjects,
  getAllTraining,
  getAllUser,
  getUserAllFieldDay,
  getUserAllGroupMeeting,
  getUserAllSchools,
  getUserDemos,
} from "../../../services/userServices";
import { useDispatch, useSelector } from "react-redux";
import { daeAction } from "../../store/projectSlice";
import toast from "react-hot-toast";
import Loader from "../../shared/Loader";
import DashboardMenu from "./DashboardMenu";
import { Outlet } from "react-router-dom";

const DashboardLayout = () => {
  const { user, role } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const { refetch } = useSelector((state) => state.dae);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const noteResult = await findUserAllNotes();
        if (noteResult?.status === 200) {
          dispatch(daeAction.setUserNotes(noteResult?.data?.data));
        }
      } catch (err) {
        toast.error("Error fetching notes.");
      }
    };

    const fetchUserData = async () => {
      try {
        if (refetch === "all" || refetch === "demos") {
          const demoResult = await getUserDemos();
          if (demoResult?.status === 200) {
            dispatch(daeAction.setUserDemos(demoResult?.data?.data));
            dispatch(daeAction.setRefetch('all'))

          }
        }
        if (refetch === "all" || refetch === "fieldDays") {
          const fieldDayResult = await getUserAllFieldDay();
          if (fieldDayResult?.status === 200) {
            dispatch(daeAction.setUserFieldDays(fieldDayResult?.data?.data));
          }
        }
        if (refetch === "all" || refetch === "meetings") {
          const meetingResult = await getUserAllGroupMeeting();
          if (meetingResult?.status === 200) {
            dispatch(daeAction.setDaeMeeting(meetingResult?.data?.data));
          }
        }
        if (refetch === "all" || refetch === "schools") {
          const schoolResults = await getUserAllSchools();
          if (schoolResults.status === 200) {
            dispatch(daeAction.setUserSchools(schoolResults?.data?.data));
          }
        }
      } catch (err) {
        toast.error("Error fetching user data.");
      }
    };

    const fetchAdminData = async () => {
      try {
        if (refetch === "all" || refetch === "users") {
          const userResult = await getAllUser();
          if (userResult?.status === 200) {
            dispatch(daeAction.setAllUsers(userResult?.data?.data));
          }
        }
        if (refetch === "all" || refetch === "distributions") {
          const distributionResult = await getAllDistributions();
          if (distributionResult?.status === 200) {
            dispatch(daeAction.setDistribution(distributionResult?.data?.data));
          }
        }
        if (refetch === "all" || refetch === "trainings") {
          const trainingsResult = await getAllTraining();
          if (trainingsResult?.status === 200) {
            dispatch(daeAction.setAllTrainings(trainingsResult?.data?.data));
          }
        }
        if (refetch === "all" || refetch === "projects") {
          const projectsResult = await getAllProjects(role);
          if (projectsResult?.status === 200) {
            dispatch(daeAction.setAllProjects(projectsResult?.data?.data));
          }
        }
        if (refetch === "all" || refetch === "tours") {
          const tourResult = await getAllMotivationalTours();
          if (tourResult?.status === 200) {
            dispatch(daeAction.setAllMotivationTours(tourResult?.data?.data));
          }
        }
      } catch (err) {
        toast.error("Error fetching admin data.");
      }
    };

    const fetchData = async () => {

      await fetchNotes();

      if (role === "user") {
        await fetchUserData();
      } else if (role === "admin") {
        await fetchAdminData();
      }


      dispatch(daeAction.setEndFetch(true));
    };

    fetchData();
  }, [user, role, refetch]);

  return (
    <section className="grid grid-cols-1 lg:grid-cols-12 gap-4">
      <div className="lg:col-span-2">
        <div className="sticky top-0 lg:h-screen h-auto overflow-y-auto">
          <div className="py-5 px-2">
            <DashboardMenu />
          </div>
        </div>
      </div>
      <div className="lg:col-span-10 px-6 bg-slate-50">
        {loading ? <Loader /> : <Outlet />}
      </div>
    </section>
  );
};

export default DashboardLayout;
