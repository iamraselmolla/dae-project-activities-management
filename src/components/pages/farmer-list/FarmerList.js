import React, { useContext, useEffect, useState } from 'react';
import SectionTitle from '../../shared/SectionTitle';
import AddModuleButton from '../../shared/AddModuleButton';
import { getAllFarmers } from '../../../services/userServices';
import toast from 'react-hot-toast';
import { AuthContext } from '../../AuthContext/AuthProvider';
import LoaderWithDynamicMessage from '../../shared/LoaderWithDynamicMessage';
import { toBengaliNumber } from "bengali-number";

const FarmerList = () => {
    const { user } = useContext(AuthContext);
    const [allFarmers, setAllFarmers] = useState([]);
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        const getFarmersData = async () => {
            try {
                const result = await getAllFarmers();
                if (result?.status === 200) {
                    setAllFarmers(result?.data?.data)
                }
            } catch (err) {
                toast.error('কৃষকের তথ্য সার্ভার থেকে আনতে অসুবিধা হচ্ছে।')
            } finally {
                setLoading(false)
            }

        }
        getFarmersData()
    }, [user])
    return (
        <section className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
            <div className="mt-3">
                <SectionTitle title={'সংরক্ষণকৃত কৃষকের তথ্য'} />
            </div>
            {!loading && allFarmers?.length > 0 &&
                <div className="overflow-x-auto">
                    <table className="table table-xs">
                        <thead className="font-bold text-black text-xl">
                            <tr>
                                <th></th>
                                <th>কৃষকের নাম</th>
                                <th> পিতার নাম</th>
                                <th>মোবাইল, NID</th>
                                <th>BID, কৃষি কার্ড</th>
                                <th>ঠিকানা</th>
                                <th>মন্তব্য</th>
                            </tr>
                        </thead>
                        <tbody>
                            {allFarmers?.map((farmer, index) => (
                                <tr key={farmer?._id}>
                                    <th>{toBengaliNumber(index + 1)}</th>
                                    <td>{farmer?.farmersInfo?.farmersName}</td>
                                    <td>{farmer?.farmersInfo?.fathersOrHusbandsName}</td>
                                    <td>{farmer?.numbersInfo?.mobile}<br /> {farmer?.numbersInfo?.NID}</td>
                                    <td>{farmer?.numbersInfo?.BID}<br /> {farmer?.numbersInfo?.agriId}</td>
                                    <td>{farmer?.address?.village}, {farmer?.address?.block}, {farmer?.address?.union}</td>
                                    <td>{farmer?.comment}</td>
                                </tr>
                            ))}

                        </tbody>
                        <tfoot className="font-bold text-black text-xl">
                            <tr>
                                <th></th>
                                <th>কৃষকের নাম</th>
                                <th> পিতার নাম</th>
                                <th>মোবাইল, NID</th>
                                <th>BID, কৃষি কার্ড</th>
                                <th>ঠিকানা</th>
                                <th>মন্তব্য</th>
                            </tr>
                        </tfoot>
                    </table>
                </div>
            }
            <AddModuleButton link={"add-farmer"} btnText={"নতুন কৃষকের তথ্য সংরক্ষণ করুন।"} />
            {loading && <LoaderWithDynamicMessage />}
        </section>
    );
};

export default FarmerList;