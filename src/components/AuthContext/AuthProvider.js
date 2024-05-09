import React, { createContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { getAllProjects } from "../../services/userServices";
import { projectAction } from "../store/projectSlice";
import { useDispatch } from "react-redux";

export const AuthContext = createContext();
const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [initialLoading, setInitialLoading] = useState(true);
  const [jwtToken, setJwtToken] = useState("");
  const [role, setRole] = useState(null);
  const [username, setUsername] = useState(null);
  const dispatch = useDispatch();


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
        const result = await getAllProjects();
        if (result?.status === 200) {
          dispatch(projectAction.setAllProjects(result?.data?.data))

        }

      }
      catch (err) {
        toast.error('প্রকল্পের তথ্য সার্ভার থেকে আনতে সমস্যার সৃষ্টি হচ্ছে।')
      }
    }
    fetchAllProjects()
  }, [])



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
    return <>......</>;
  }
  return (
    <>
      <AuthContext.Provider value={authInfo}>
        {children}
      </AuthContext.Provider>
    </>
  );
};

export default AuthProvider;