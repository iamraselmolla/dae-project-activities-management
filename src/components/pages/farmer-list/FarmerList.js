import React, { useContext, useEffect, useState, useCallback } from 'react';
import SectionTitle from '../../shared/SectionTitle';
import AddModuleButton from '../../shared/AddModuleButton';
import { deleteAFarmer, getAllFarmers } from '../../../services/userServices';
import toast from 'react-hot-toast';
import { AuthContext } from '../../AuthContext/AuthProvider';
import LoaderWithDynamicMessage from '../../shared/LoaderWithDynamicMessage';
import { toBengaliNumber } from "bengali-number";
import { MdOutlineDelete } from "react-icons/md";
import { makeSureOnline } from '../../shared/MessageConst';
import NoContentFound from '../../shared/NoContentFound';

const FarmerList = () => {
    const { user } = useContext(AuthContext);
    const [allFarmers, setAllFarmers] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchFarmers = useCallback(async () => {
        try {
            const result = await getAllFarmers();
            if (result?.status === 200) {
                setAllFarmers(result?.data?.data);
            }
        } catch (err) {
            toast.error('কৃষকের তথ্য সার্ভার থেকে আনতে অসুবিধা হচ্ছে।');
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchFarmers();
    }, [user, fetchFarmers]);

    const handleDelete = async (id) => {
        const confirmed = window.confirm('আপনি কি নিশ্চিত যে এই কৃষকের তথ্য মুছতে চান?');
        if (confirmed) {
            try {
                if (navigator.onLine) {
                    const result = await deleteAFarmer(id);
                    if (result?.status === 200) {
                        toast.success(result?.data?.message);
                        fetchFarmers();  // Refetch farmers after deletion
                    }
                } else {
                    makeSureOnline();
                }
            } catch (err) {
                toast.error("কৃষক মুছে ফেলতে সমস্যা হচ্ছে । দয়া করে সংশ্লিষ্ট ব্যক্তিকে জানান ।");
            }
        }
    };

    return (
        <section className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
            <div className="mt-3">
                <SectionTitle title={'সংরক্ষণকৃত কৃষকের তথ্য'} />
            </div>
            {!loading && allFarmers?.length > 0 && (
                <div className="overflow-x-auto">
                    <table className="table table-xs border border-gray-300">
                        <thead className="font-bold text-black text-xl">
                            <tr>
                                <th className="border border-gray-300">ক্রঃ নং</th>
                                <th className="border border-gray-300">কৃষকের নাম</th>
                                <th className="border border-gray-300"> পিতার নাম</th>
                                <th className="border border-gray-300">মোবাইল, NID</th>
                                <th className="border border-gray-300">BID, কৃষি কার্ড</th>
                                <th className="border border-gray-300">ঠিকানা</th>
                                <th className="border border-gray-300">মন্তব্য</th>
                                <th className="border border-gray-300">একশন</th>
                            </tr>
                        </thead>
                        <tbody>
                            {allFarmers?.map((farmer, index) => (
                                <tr key={farmer?._id}>
                                    <th className="border border-gray-300">{toBengaliNumber(index + 1)}</th>
                                    <td className="border border-gray-300">{farmer?.farmersInfo?.farmerName}</td>
                                    <td className="border border-gray-300">{farmer?.farmersInfo?.fathersOrHusbandsName}</td>
                                    <td className="border border-gray-300">{farmer?.numbersInfo?.mobile}<br /> {farmer?.numbersInfo?.NID}</td>
                                    <td className="border border-gray-300">{farmer?.numbersInfo?.BID}<br /> {farmer?.numbersInfo?.agriCard}</td>
                                    <td className="border border-gray-300">{farmer?.address?.village}, {farmer?.address?.block}, {farmer?.address?.union}</td>
                                    <td className="border border-gray-300">{farmer?.comment}</td>
                                    <td className="border border-gray-300">
                                        {farmer?.username === user?.username && (
                                            <MdOutlineDelete onClick={() => handleDelete(farmer?._id)} size={30} color='red' cursor="pointer" />
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                        <tfoot className="font-bold text-black text-xl">
                            <tr>
                                <th className="border border-gray-300">ক্রঃ নং</th>
                                <th className="border border-gray-300">কৃষকের নাম</th>
                                <th className="border border-gray-300"> পিতার নাম</th>
                                <th className="border border-gray-300">মোবাইল, NID</th>
                                <th className="border border-gray-300">BID, কৃষি কার্ড</th>
                                <th className="border border-gray-300">ঠিকানা</th>
                                <th className="border border-gray-300">মন্তব্য</th>
                                <th className="">একশন</th>
                            </tr>
                        </tfoot>
                    </table>
                </div>
            )}
            <AddModuleButton link={"add-farmer"} btnText={"নতুন কৃষকের তথ্য সংরক্ষণ করুন।"} />
            {loading && <LoaderWithDynamicMessage message={'তথ্য আনা হচ্ছে। দয়া করে অপেক্ষা করেন।'} />}
            {!loading && allFarmers?.length === 0 && <NoContentFound text={"কোনো কৃষক তথ্য পাওয়া যায়নি!"} />}
        </section>
    );
};

export default FarmerList;
