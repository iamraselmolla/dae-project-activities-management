import axios from "axios";
import React, { createContext, useEffect, useState } from "react";
import AddImageModal from "../shared/AddImageModal";

export const AuthContext = createContext();
const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [initialLoading, setInitialLoading] = useState(false);
  const [jwtToken, setJwtToken] = useState("");
  const [role, setRole] = useState(null);
  const [username, setUsername] = useState(null);
  const [modalData, setModalData] = useState(null);
  const [reloadData, setReloadData] = useState(false)
  useEffect(() => {
    setInitialLoading(true);
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
  }, []);

  const authInfo = {
    user,
    setUser,
    jwtToken,
    setJwtToken,
    role,
    setRole,
    username,
    setModalData
  };
  if (initialLoading) {
    return <>......</>;
  }
  return (
    <>
      <AuthContext.Provider value={authInfo}>
        {children}
        {modalData && <AddImageModal data={modalData} />}
      </AuthContext.Provider>
    </>
  );
};

export default AuthProvider;