import React, { useEffect, useState } from 'react';
import { getAllUser } from '../../../../services/userServices';
import SectionTitle from '../../../shared/SectionTitle'
import { toBengaliNumber } from 'bengali-number';
import SingleUser from './SingleUser';
import Loader from '../../../shared/Loader';

const Allusers = () => {
    const [allUser, setAllUser] = useState([]);
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        setLoading(true)
        try {
            const fetchAllUsers = async () => {
                const result = await getAllUser()
                if (result?.status === 200) {
                    setAllUser(result?.data?.data)
                    setLoading(false)
                }
            }
            fetchAllUsers();
        }
        catch (err) {
            console.log('error', err)
            setLoading(false)
        }
    }, []);

    return (
        <div className='px-5 py-5'>
            <SectionTitle title='সকল ইউজার তথ্য' />

            {!loading && allUser?.length > 0 && allUser?.map((singleUser, index) => <div key={singleUser?.username}>
                <SingleUser key={singleUser?._id} user={singleUser} index={index} />

            </div>)}
            {loading && <Loader />}
        </div>
    );
};

export default Allusers;