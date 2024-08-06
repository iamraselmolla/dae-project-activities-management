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
import DashboardMenu from "./DashboardMenu";
import { Outlet } from "react-router-dom";
import DeletingLoader from "../../shared/DeletingLoader";
import toast from "react-hot-toast";

const DashboardLayout = () => {
  const { user, role } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
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
        toast.error("নোটসগুলো সার্ভার থেকে আনতে অসুবিধা হচ্ছে।");
      }
    };
    if (refetch === "all" || refetch.includes('notes')) {
      fetchNotes();
    }

    const fetchUserData = async () => {
      try {
        if (refetch === "all" || refetch.includes('demos')) {
          const demoResult = await getUserDemos();
          if (demoResult?.status === 200) {
            dispatch(daeAction.setUserDemos(demoResult?.data?.data));
          }
        }
        if (refetch === "all" || refetch.includes('fieldDays')) {
          const fieldDayResult = await getUserAllFieldDay();
          if (fieldDayResult?.status === 200) {
            dispatch(daeAction.setUserFieldDays(fieldDayResult?.data?.data));
          }
        }
        if (refetch === "all" || refetch.includes("meetings")) {
          const meetingResult = await getUserAllGroupMeeting();
          if (meetingResult?.status === 200) {
            dispatch(daeAction.setDaeMeeting(meetingResult?.data?.data));
          }
        }
        if (refetch === "all" || refetch.includes('schools')) {
          const schoolResults = await getUserAllSchools();
          if (schoolResults.status === 200) {
            dispatch(daeAction.setUserSchools(schoolResults?.data?.data));
          }
        }
      } catch (err) {
        toast.error("ইউজারের ডেটা পেতে সমস্যা হয়েছে");
      }
    };

    const fetchAdminData = async () => {
      try {
        if (refetch === "all" || refetch.includes("users")) {
          const userResult = await getAllUser();
          if (userResult?.status === 200) {
            dispatch(daeAction.setAllUsers(userResult?.data?.data));
          }
        }
        if (refetch === "all" || refetch.includes("distributions")) {
          const distributionResult = await getAllDistributions();
          if (distributionResult?.status === 200) {
            dispatch(daeAction.setDistribution(distributionResult?.data?.data));
          }
        }
        if (refetch === "all" || refetch.includes("trainings")) {
          const trainingsResult = await getAllTraining();
          if (trainingsResult?.status === 200) {
            dispatch(daeAction.setAllTrainings(trainingsResult?.data?.data));
          }
        }
        if (refetch === "all" || refetch.includes("projects")) {
          const projectsResult = await getAllProjects(role);
          if (projectsResult?.status === 200) {
            dispatch(daeAction.setAllProjects(projectsResult?.data?.data));
          }
        }
        if (refetch === "all" || refetch.includes("tours")) {
          const tourResult = await getAllMotivationalTours();
          if (tourResult?.status === 200) {
            dispatch(daeAction.setAllMotivationTours(tourResult?.data?.data));
          }
        }
      } catch (err) {
        toast.error("এডমিনের সকল তথ্য সার্ভার থেকে আনতে অসুবিধা সৃষ্টি হচ্ছে । দয়া করে সংশ্লিষ্ট ব্যক্তিকে অবহিত করুন । ");
      }
    };

    const fetchData = async () => {
      setLoading(true);

      if (role === "user") {
        await fetchUserData();
      } else if (role === "admin") {
        await fetchAdminData();
      }

      setLoading(false);
      dispatch(daeAction.setEndFetch(true));
    };

    fetchData();
  }, [user, role, refetch, dispatch]);

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
        {loading ? <DeletingLoader /> : <Outlet />}
      </div>
    </section>
  );
};

export default DashboardLayout;
