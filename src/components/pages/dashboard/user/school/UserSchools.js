import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../../../AuthContext/AuthProvider';
import { useSelector } from 'react-redux';

const UserSchools = () => {
    const [schools, userSchools] = useState([]);
    const { user } = useContext(AuthContext);
    const { refetch } = useSelector(state => state.dae)

    useEffect(() => {
        const fetchData = async () => {

        }
        fetchData()
    }, [user, refetch])
    return (
        <div>

        </div>
    );
};

export default UserSchools;