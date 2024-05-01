import React, { useEffect, useState } from 'react';
import { getAllTraining } from '../../../../../services/userServices';
import toast from 'react-hot-toast';
import SingleTrainingRow from './SingleTrainingRow';
import TableHead from './TableComponent/TableHead';
import Loader from '../../../../shared/Loader';
import { makeSureOnline } from '../../../../shared/MessageConst';

const AdminTrainings = () => {
    const [allTrainings, setAllTrainings] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [fetchEnd, setFetchEnd] = useState(false);
    const [reload, setReload] = useState(false);
    const fetchAllTraining = async () => {
        setLoading(true);
        try {
            const result = await getAllTraining();
            if (result.status === 200) {
                setAllTrainings(result?.data?.data);
                setLoading(false);
                setFetchEnd(true);
            } else {
                setError("তথ্য ডাটাবেইজ থেকে আনতে অসুবিধা হয়েছে।");
                setFetchEnd(true);
            }
        } catch (err) {
            setError(
                "সার্ভারজনিত সমস্যা হচ্ছে। দয়া করে সংশ্লিষ্ট ব্যক্তিকে অবহিত করুন"
            );
            setFetchEnd(true);
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        if (navigator.onLine) {
            fetchAllTraining();
        } else {
            makeSureOnline();
        }
    }, [reload]);
    return (
        <div className="flex flex-col">
            <div className="mt-10 overflow-x-auto">
                <div className="p-1.5 min-w-full inline-block align-middle">
                    <div className="border rounded-lg shadow overflow-hidden dark:border-gray-700 dark:shadow-gray-900">
                        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                            <thead>
                                <tr className="divide-x font-extrabold divide-gray-200 dark:divide-gray-700">
                                    <TableHead text={'ক্রমিক নং'} />
                                    <TableHead text={'প্রকল্পের নাম'} />
                                    <TableHead text={'অর্থবছর ও মৌসুম'} />
                                    <TableHead text={'বিষয়'} />
                                    <TableHead text={'তারিখ ও বার'} />
                                    <TableHead text={'কৃষক/কৃষাণী'} />
                                    <TableHead text={'কর্মকর্তা ও গণ্যমান্য ব্যক্তিদের নাম'} />
                                    <TableHead text={' ছবিসমূহ'} />
                                    <TableHead text={' মন্তব্য'} />
                                    <TableHead text={'একশন'} />
                                </tr>
                            </thead>
                            {!loading &&
                                !error &&
                                allTrainings?.length > 0 &&
                                allTrainings?.map((training, index) => (
                                    <SingleTrainingRow
                                        index={index}
                                        setReload={setReload}
                                        reload={reload}
                                        key={training?._id}
                                        data={training}
                                    />
                                ))}
                            {!loading && allTrainings?.length < 1 && fetchEnd && (
                                <div className="flex justify-center items-center">
                                    <h2 className="text-red-600 text-2xl  font-extrabold">
                                        কোনো কৃষক প্রশিক্ষণের তথ্য পাওয়া যায়নি।
                                    </h2>
                                </div>
                            )}


                        </table>
                        {loading && !error && (
                            <div className="flex justify-center items-center">
                                <Loader />
                            </div>
                        )}

                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminTrainings;