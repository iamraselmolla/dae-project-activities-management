import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../../../AuthContext/AuthProvider';
import { useSelector } from 'react-redux';
import { getUserAllSchools } from '../../../../../services/userServices';
import toast from 'react-hot-toast';
import SectionTitle from '../../../../shared/SectionTitle';
import NoContentFound from '../../../../shared/NoContentFound';
import TableHead from '../../../../shared/TableHead';
import UserSchoolTableRow from './UserSchoolTableRow';

const UserSchools = () => {
    const [schools, setUserSchools] = useState([]);
    const { user } = useContext(AuthContext);
    const { refetch } = useSelector(state => state.dae);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await getUserAllSchools();
                if (result.status === 200) {
                    setUserSchools(result?.data?.data);
                }
            } catch (err) {
                toast.error('ইউজারের সকল স্কুলের তথ্য ডাটাবেইজ থেকে আনতে অসুবিধা হচ্ছে।');
            }
        };
        fetchData();
    }, [user, refetch]);

    // Delete a school
    const handleSchoolDeletion = async (schoolId) => {
        // if (navigator.onLine) {
        //     if (window.confirm(`আপনি কি এই স্কুলটি মুছে ফেলতে চান?`)) {
        //         try {
        //             const result = await deleteSchool(schoolId); // Assuming you have a deleteSchool function
        //             if (result.status === 200) {
        //                 toast.success(result.data.message);
        //                 // Refetch user schools after deletion
        //                 fetchData();
        //             }
        //         } catch (err) {
        //             toast.error('স্কুলটি মুছতে সাময়িক অসুবিধা হচ্ছে।');
        //         }
        //     }
        // } else {
        //     makeSureOnline();
        // }
    };

    return (
        <div className="flex flex-col">
            <SectionTitle title="ইউজারের স্কুলসমূহ" />
            <div className="mt-10 overflow-x-auto">
                <div className="p-1.5 min-w-full inline-block align-middle">
                    <table className="min-w-full divide-y bg-white divide-gray-200">
                        {/* Table Header */}
                        <thead>
                            <tr className="divide-x font-extrabold divide-gray-200">
                                <TableHead text="ক্রঃ নং" />
                                <TableHead text="প্রকল্প" />
                                <TableHead text="অর্থবছর ও মৌসুম" />
                                <TableHead text="স্কুলের তথ্য" />
                                <TableHead text="ঠিকানা" />
                                <TableHead text="তারিখ" />
                                <TableHead text="সহায়তাকারী" />
                                <TableHead text="উর্ধবতন" />
                                <TableHead text="ছবিসমূহ" />
                                <TableHead text="SAAO নাম ও মোবাইল" />
                                <TableHead text="মন্তব্য" />
                                <TableHead text="একশন" />
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {/* Table Body */}
                            {schools.length > 0 ? (
                                schools.map((school, index) => (
                                    <UserSchoolTableRow handleSchoolDeletion={handleSchoolDeletion} index={index} school={school} key={school?._id} />
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="5">
                                        <NoContentFound text="কোনো স্কুল পাওয়া যায়নি" />
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default UserSchools;
