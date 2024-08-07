import React, { createContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import {
  findAllProjectsData,
  getAllProjects,
  getBlockandUnion,
} from "../../services/userServices";
import { useDispatch, useSelector } from "react-redux";
import { daeAction } from "../store/projectSlice";
import Loader from "../../components/shared/Loader"

export const AuthContext = createContext();
const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [initialLoading, setInitialLoading] = useState(true);
  const [jwtToken, setJwtToken] = useState("");
  const [role, setRole] = useState(null);
  const [username, setUsername] = useState(null);
  const dispatch = useDispatch();
  const { refetch } = useSelector((state) => state.dae);

  useEffect(() => {
    const storedUser = localStorage.getItem("CurrentUser");
    const storedUserToken = localStorage.getItem("CurrentUserToken");
    if (storedUser) {
      const currentUser = JSON.parse(storedUser);
      setUser(currentUser);
      setUsername(currentUser?.username);
      setRole(currentUser?.role);
    }
    if (storedUserToken) {
      setJwtToken(JSON.parse(storedUserToken));
    }
    setInitialLoading(false);
  }, [role, jwtToken, username]);
  useEffect(() => {
    const fetchAllProjects = async () => {
      try {
        let result;
        if (user?.role === "admin") {
          // Load data project based on role..
          result = await getAllProjects();
        } else {
          result = await findAllProjectsData();
        }
        if (result?.status === 200) {
          dispatch(daeAction.setAllProjects(result?.data?.data));
        }

        const result2 = await getBlockandUnion();
        if (result?.status === 200) {
          dispatch(daeAction.setBlokAndUnion(result2?.data?.data));
        }
      } catch (err) {
        toast.error("প্রকল্পের তথ্য সার্ভার থেকে আনতে সমস্যার সৃষ্টি হচ্ছে।");
      }
    };
    if (refetch?.includes('adminFetch') || refetch === "all") {
      fetchAllProjects();
    }
  }, [refetch]);

  const authInfo = {
    user,
    setUser,
    jwtToken,
    setJwtToken,
    role,
    setRole,
    username,
  };
  if (initialLoading) {
    return <Loader />;
  }
  return (
    <>
      <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
    </>
  );
};

export default AuthProvider;
