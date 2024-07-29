import React, { useContext, useEffect, useState, useCallback } from 'react';
import SectionTitle from '../../shared/SectionTitle';
import AddModuleButton from '../../shared/AddModuleButton';
import { deleteAFarmer, getAllFarmers } from '../../../services/userServices';
import toast from 'react-hot-toast';
import { AuthContext } from '../../AuthContext/AuthProvider';
import { toBengaliNumber } from "bengali-number";
import { MdOutlineDelete } from "react-icons/md";
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

        // Find the blocks under the selected union
        const result = blockAndUnions?.filter(
            (single) => single?.unionB === selectedUnion
        );
        const blocks = result?.map((single) => single?.blockB);

        // Update the state with the blocks of the selected union
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
            {user && (
                <>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 py-6">
                        <div>
                            <label className="font-extrabold mb-1 block">ইউনিয়ন</label>
                            <select
                                className="input input-bordered w-full"
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
                            <label className="font-extrabold mb-1 block">ব্লক</label>
                            <select
                                className="input input-bordered w-full"
                                value={blockName}
                                onChange={(e) => setBlockName(e.target.value)}
                            >
                                <option value="" label="সিলেক্ট করুন" />
                                {blocksOfUnion?.map((single, index) => (
                                    <option key={index} value={single}>
                                        {single}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div className="w-full mb-12">
                        <div>
                            <input
                                type="text"
                                className="input input-bordered w-full"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                placeholder="খুজুন (কৃষকের নাম, মোবাইল, NID, BID, কৃষি কার্ড, গ্রাম, ব্লক, ইউনিয়ন, পিতার নাম)"
                            />
                        </div>
                    </div>
                </>
            )}
            {!loading && filteredFarmers?.length > 0 && (
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
                                <th className="border border-gray-300">প্রকল্পের নাম</th>
                                <th className="border border-gray-300">অর্থবছর, মৌসুম</th>
                                <th className="border border-gray-300">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredFarmers?.map((farmer, index) => (
                                <tr key={farmer?._id} className="hover">
                                    <th className="border border-gray-300 font-normal">
                                        {toBengaliNumber(index + 1)}
                                    </th>
                                    <td className="border border-gray-300 font-normal">
                                        {farmer?.farmersInfo?.farmerName}
                                    </td>
                                    <td className="border border-gray-300 font-normal">
                                        {farmer?.farmersInfo?.fathersOrHusbandsName}
                                    </td>
                                    <td className="border border-gray-300 font-normal">
                                        {farmer?.numbersInfo?.mobile},{farmer?.numbersInfo?.NID}
                                    </td>
                                    <td className="border border-gray-300 font-normal">
                                        {farmer?.numbersInfo?.BID},{farmer?.numbersInfo?.agriCard}
                                    </td>
                                    <td className="border border-gray-300 font-normal">
                                        {farmer?.address?.village},
                                        <span className="border border-gray-300">
                                            {farmer?.address?.block},
                                            {farmer?.address?.union}
                                        </span>
                                    </td>
                                    <td className="border border-gray-300 font-normal">
                                        {farmer?.projectInfo?.projectName}
                                    </td>
                                    <td className="border border-gray-300 font-normal">
                                        {farmer?.projectInfo?.fiscalYear},
                                        <span className="border border-gray-300">{farmer?.projectInfo?.season}</span>
                                    </td>
                                    <td className="border border-gray-300">
                                        <MdOutlineDelete
                                            className="text-red-600 w-6 h-6 cursor-pointer"
                                            onClick={() => handleDelete(farmer?._id)}
                                        />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
            {!loading && filteredFarmers?.length === 0 && <NoContentFound />}
            {loading && <Loader />}
        </section>
    );
};

export default FarmerList;
