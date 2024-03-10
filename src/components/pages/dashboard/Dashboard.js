import React, { useContext } from 'react';
import { AuthContext } from '../../AuthContext/AuthProvider';


const Dashboard = () => {
    const { username, user, block, blockB, union, unionB, role, } = useContext(AuthContext);
    console.log(user, username, block, blockB, union, unionB, role, "checking user")
    return (
        <div>
            Dashboard
        </div>
    );
};

export default Dashboard;