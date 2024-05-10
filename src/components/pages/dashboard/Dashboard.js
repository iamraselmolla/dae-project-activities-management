import React, { useContext, useEffect } from 'react';
import { AuthContext } from '../../AuthContext/AuthProvider';


const Dashboard = () => {
    const { user, role, username } = useContext(AuthContext);
    useEffect(() => {

    }, [user, role, username])
    return (
        <div>
            Dashboard
        </div>
    );
};

export default Dashboard;