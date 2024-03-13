import React, { useContext } from 'react';
import { AuthContext } from '../../AuthContext/AuthProvider';


const Dashboard = () => {
    const { username, user, role, } = useContext(AuthContext);
    console.log(user, username, role, "checking user")
    return (
        <div>
            Dashboard
        </div>
    );
};

export default Dashboard;