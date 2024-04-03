import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../../../AuthContext/AuthProvider';
import toast from 'react-hot-toast';
import { findUserAllNotes } from '../../../../../services/userServices';
import { AiOutlineFileDone } from 'react-icons/ai';
import { MdOutlineDelete } from 'react-icons/md';
import { CiEdit } from 'react-icons/ci';
import UserNoteTH from './UserNoteTH';
import UserNoteTD from './UserNoteTD';
import Loader from '../../../../shared/Loader';
import { toBengaliNumber } from 'bengali-number';

const UserNotes = () => {
    const { user } = useContext(AuthContext)
    const [allNotes, setAllNotes] = useState([]);
    const [loading, setLoading] = useState(false);
    const [fetchEnd, setFetchEnd] = useState(false)
    useEffect(() => {
        const findAllNotes = async () => {
            setLoading(true)
            try {
                const result = await findUserAllNotes(user?.username)
                if (result.status === 200) {
                    setAllNotes(result?.data?.data)
                    setLoading(false)
                    setFetchEnd(true)
                }
            }
            catch (err) {
                toast.error("ইউজারের নোটের তথ্য আনতে সমস্যার সৃষ্টি হচ্ছে।")
                setLoading(false)
                setFetchEnd(true)
            }
        }
        if (navigator.onLine) {
            findAllNotes()
        } else {
            toast.err("দয়া করে আপনার ইন্টারনেট সংযোগটি চালু করুন")
        }
    }, [user])
    return (
        <div className="flex flex-col">
            <div className="mt-10 overflow-x-auto">
                <div className="p-1.5 min-w-full inline-block align-middle">
                    <div className="border rounded-lg shadow overflow-hidden dark:border-gray-700 dark:shadow-gray-900">
                        {!loading && <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                            <thead>
                                <tr className="divide-x font-extrabold divide-gray-200 dark:divide-gray-700">
                                    <UserNoteTH text="ক্রমিক নং" />
                                    <UserNoteTH text="উদ্দেশ্য" />
                                    <UserNoteTH text="কৃষকের নাম ও পিতার নাম" />
                                    <UserNoteTH text="মোবাইল ও NID" />
                                    <UserNoteTH text="গ্রাম, ব্লক ও ইউনিয়ন" />
                                    <UserNoteTH text="অর্থবছর ও মৌসুম" />
                                    <UserNoteTH text="তারিখ" />
                                    <UserNoteTH text="কার্য শেষের মন্তব্য" />
                                    <UserNoteTH text="SAAO-এর নাম ও মোবাইল নং" />
                                    <UserNoteTH text="একশন" />
                                </tr>
                            </thead>
                            {!loading && fetchEnd && allNotes?.length > 0 ?
                                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                                    {allNotes?.map((singleNote, index) => <tr className="divide-x divide-gray-200 dark:divide-gray-700">
                                        <UserNoteTD text={toBengaliNumber(index + 1)} />
                                        <UserNoteTD text={singleNote?.purpose?.target} />
                                        <UserNoteTD text={
                                            singleNote?.farmersInfo?.name + `\n` + singleNote?.farmersInfo?.fathersOrHusbandName
                                        } />
                                        <UserNoteTD text={singleNote?.farmersInfo.mobile + `\n` + singleNote?.farmersInfo?.NID} />
                                        <UserNoteTD text={singleNote?.address?.village + '\n' + singleNote?.address?.block + '\n' + singleNote?.address?.union} />
                                        <UserNoteTD text={singleNote?.timeFrame?.season + '\n' + toBengaliNumber(singleNote?.timeFrame?.fiscalYear)} />
                                        <UserNoteTD text={toBengaliNumber(
                                            new Date(singleNote?.purpose?.date).toLocaleDateString("bn-BD", {
                                                weekday: "long", // Specify to include the full day name
                                                day: "numeric",
                                                month: "long",
                                                year: "numeric",
                                            })
                                        )} />
                                        <UserNoteTD />
                                        <UserNoteTD text={
                                            singleNote?.SAAO?.name + '\n' + singleNote?.SAAO?.mobile
                                        } />

                                        <td className="p-3 flex gap-2 text-center whitespace-nowrap text-sm font-medium">
                                            <div className="cursor-pointer">
                                                <AiOutlineFileDone size={35} color="green" />
                                            </div>
                                            <div className="cursor-pointer">
                                                <MdOutlineDelete size={35} color="red" />
                                            </div>
                                            <div className="cursor-pointer">
                                                <CiEdit size={35} color="black" />
                                            </div>
                                        </td>
                                    </tr>)}
                                </tbody> : <div className='flex justify-center items-center'>
                                    <h2 className="text-red-600 text-2xl">
                                        কোনো নোট খুজে পাওয়া যায়নি
                                    </h2>
                                </div>}
                        </table>}
                        {loading && <Loader />}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserNotes;