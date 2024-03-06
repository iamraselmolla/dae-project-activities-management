import axios from 'axios';
import React, { createContext, useEffect, useState } from 'react';

export const AuthContext = createContext();
const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);
    const [jwtToken, setJwtToken] = useState("");
    const [role, setRole] = useState(null);



    useEffect(() => {
        setLoading(true);
        const storedUser = localStorage.getItem('CurrentUser');
        const storedUserToken = localStorage.getItem('CurrentUserToken');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
        if (storedUserToken) {
            setJwtToken(JSON.parse(storedUserToken));
        }
        setLoading(false);
    }, []);






    const authInfo = { user, setUser, loading, setLoading, jwtToken, setJwtToken, role, setRole }
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;