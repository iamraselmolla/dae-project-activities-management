import React, { useContext } from 'react';
import { AuthContext } from '../../AuthContext/AuthProvider';


const Dashboard = () => {
    const { user } = useContext(AuthContext);
    console.log(user, "checking user")
    return (
        <div>
            Dashboard
        </div>
    );
};

export default Dashboard;