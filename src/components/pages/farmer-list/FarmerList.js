import React, { useContext, useEffect, useState, useCallback } from 'react';
import SectionTitle from '../../shared/SectionTitle';
import { deleteAFarmer, getAllFarmers } from '../../../services/userServices';
import toast from 'react-hot-toast';
import { AuthContext } from '../../AuthContext/AuthProvider';
import { toBengaliNumber } from "bengali-number";
import { MdOutlineDelete, MdLocationOn } from "react-icons/md";
import { AiOutlinePhone, AiOutlineIdcard, AiOutlineFieldNumber } from "react-icons/ai";
import { makeSureOnline } from '../../shared/MessageConst';
import NoContentFound from '../../shared/NoContentFound';
import Loader from '../../shared/Loader';
import { useSelector } from 'react-redux';

const FarmerList = () => {
    const { user } = useContext(AuthContext);
    const [allFarmers, setAllFarmers] = useState([]);
    const [loading, setLoading] = useState(true);
    const { blockAndUnions } = useSelector((state) => state.dae);
    const [allUnion, setAllUnion] = useState([]);
    const [unionName, setUnionName] = useState("");
    const [blockName, setBlockName] = useState("");
    const [search, setSearch] = useState("");
    const [filteredFarmers, setFilteredFarmers] = useState([]);
    const [blocksOfUnion, setBlocksOfUnion] = useState([]);

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

    useEffect(() => {
        const checkUnion = [];
        blockAndUnions?.map((single) =>
            checkUnion.includes(single?.unionB) ? "" : checkUnion.push(single?.unionB)
        );
        setAllUnion(checkUnion);
    }, [blockAndUnions]);

    const handleUnionAndBlockSelection = (e) => {
        const selectedUnion = e.target.value;
        setUnionName(selectedUnion);

        const result = blockAndUnions?.filter(
            (single) => single?.unionB === selectedUnion
        );
        const blocks = result?.map((single) => single?.blockB);
        setBlocksOfUnion(blocks);
    };

    const filterFarmers = useCallback(() => {
        let filtered = allFarmers;

        if (unionName !== "") {
            filtered = filtered.filter((farmer) =>
                farmer.address.union.includes(unionName)
            );
        }

        if (blockName !== "") {
            filtered = filtered.filter((farmer) =>
                farmer.address.block.includes(blockName)
            );
        }

        if (search !== "") {
            filtered = filtered.filter((farmer) => {
                const searchLower = search.toLowerCase();
                return (
                    farmer.farmersInfo.farmerName.toLowerCase().includes(searchLower) ||
                    farmer.farmersInfo.fathersOrHusbandsName.toLowerCase().includes(searchLower) ||
                    farmer.numbersInfo.mobile.includes(searchLower) ||
                    farmer.numbersInfo.NID.includes(searchLower) ||
                    (farmer.numbersInfo.BID && farmer.numbersInfo.BID.includes(searchLower)) ||
                    (farmer.numbersInfo.agriCard && farmer.numbersInfo.agriCard.includes(searchLower)) ||
                    farmer.address.village.toLowerCase().includes(searchLower) ||
                    farmer.address.block.toLowerCase().includes(searchLower) ||
                    farmer.address.union.toLowerCase().includes(searchLower)
                );
            });
        }

        setFilteredFarmers(filtered);
    }, [allFarmers, unionName, blockName, search]);

    useEffect(() => {
        filterFarmers();
    }, [unionName, blockName, search, filterFarmers]);

    const handleDelete = async (id) => {
        const confirmed = window.confirm('আপনি কি নিশ্চিত যে এই কৃষকের তথ্য মুছতে চান?');
        if (confirmed) {
            try {
                if (navigator.onLine) {
                    const result = await deleteAFarmer(id);
                    if (result?.status === 200) {
                        toast.success(result?.data?.message);
                        fetchFarmers(); // Refetch farmers after deletion
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
        <section className="container mx-auto px-4 py-8">
            <div className="mb-6">
                <SectionTitle
                    title={`সংরক্ষণকৃত কৃষকের তথ্য ${!loading ? `(${toBengaliNumber(filteredFarmers?.length)})` : ''}`}
                />
            </div>
            {user && (
                <>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                        <div>
                            <label className="block text-sm font-semibold mb-2 text-gray-800">ইউনিয়ন</label>
                            <select
                                className="input input-bordered w-full border-gray-300 rounded-lg"
                                value={unionName}
                                onChange={handleUnionAndBlockSelection}
                            >
                                <option value="" label="ইউনিয়ন" />
                                {allUnion?.map((single) => (
                                    <option key={single} value={single}>{single}</option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-semibold mb-2 text-gray-800">ব্লক</label>
                            <select
                                className="input input-bordered w-full border-gray-300 rounded-lg"
                                value={blockName}
                                onChange={(e) => setBlockName(e.target.value)}
                            >
                                <option value="" label="সিলেক্ট করুন" />
                                {blocksOfUnion?.map((single, index) => (
                                    <option key={index} value={single}>{single}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div className="mb-8">
                        <input
                            type="text"
                            className="input input-bordered w-full border-gray-300 rounded-lg"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="খুজুন (কৃষকের নাম, মোবাইল, NID, BID, কৃষি কার্ড, গ্রাম, ব্লক, ইউনিয়ন, পিতার নাম)"
                        />
                    </div>
                </>
            )}
            {loading && <Loader />}
            {!loading && filteredFarmers?.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {filteredFarmers.map((farmer, index) => (
                        <div key={farmer?._id} className="bg-white border border-gray-200 rounded-lg shadow-lg transition-transform duration-500 linear transform hover:scale-105 overflow-hidden">
                            <div className="p-6">
                                <div className="flex items-center justify-between mb-4">
                                    <div className="flex items-center space-x-4">
                                        <div className="w-12 h-12 theme-bg text-white rounded-full flex items-center justify-center text-xl font-bold">
                                            {toBengaliNumber(index + 1)}
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-semibold text-gray-900">
                                                {farmer?.farmersInfo?.farmerName}
                                            </h3>
                                            <p className="text-sm text-gray-700">
                                                {farmer?.farmersInfo?.fathersOrHusbandsName}
                                            </p>
                                        </div>
                                    </div>
                                    <button
                                        className="text-red-600 hover:text-red-800 font-medium flex items-center"
                                        onClick={() => handleDelete(farmer?._id)}
                                    >
                                        <MdOutlineDelete className="w-6 h-6" />
                                    </button>
                                </div>
                                <div className="border-t border-gray-200 mt-4 pt-4">
                                    <div className="flex items-center mb-2 text-gray-700">
                                        <AiOutlinePhone className="w-5 h-5 text-blue-600 mr-2" />
                                        <span>{farmer?.numbersInfo?.mobile}</span>
                                    </div>
                                    <div className="flex items-center mb-2 text-gray-700">
                                        <AiOutlineIdcard className="w-5 h-5 text-green-600 mr-2" />
                                        <span>{farmer?.numbersInfo?.NID}</span>
                                    </div>
                                    <div className="flex items-center mb-2 text-gray-700">
                                        <AiOutlineFieldNumber className="w-5 h-5 text-yellow-600 mr-2" />
                                        <span>{farmer?.numbersInfo?.BID}, {farmer?.numbersInfo?.agriCard}</span>
                                    </div>
                                    <div className="flex items-center text-gray-700">
                                        <MdLocationOn className="w-5 h-5 text-red-600 mr-2" />
                                        <div className="mt-2 text-gray-600">
                                            <p>{farmer?.address?.village}, {farmer?.address?.block}, {farmer?.address?.union}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                !loading && <NoContentFound />
            )}
        </section>
    );
};

export default FarmerList;
