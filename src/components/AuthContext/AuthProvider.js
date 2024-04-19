import axios from "axios";
import React, { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();
const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [initialLoading, setInitialLoading] = useState(false);
  const [jwtToken, setJwtToken] = useState("");
  const [role, setRole] = useState(null);
  const [username, setUsername] = useState(null);
  const [block, setBlock] = useState(null);
  const [blockB, setBlockB] = useState(null);
  const [unionB, setUnionB] = useState(null);
  const [union, setUnion] = useState(null);

  useEffect(() => {
    setInitialLoading(true);
    const storedUser = localStorage.getItem("CurrentUser");
    const storedUserToken = localStorage.getItem("CurrentUserToken");
    if (storedUser) {
      const currentUser = JSON.parse(storedUser);
      setUser(currentUser);
      setUsername(currentUser?.username);
      setBlock(currentUser?.block);
      setBlockB(currentUser?.blockB);
      setUnion(currentUser?.union);
      setUnionB(currentUser?.unionB);
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
    block,
    username,
    blockB,
    union,
    unionB,
  };
  if (initialLoading) {
    return <>......</>
  }
  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
