import React, { useEffect, useState } from "react";
import SectionTitle from "../../shared/SectionTitle";
import SingleDaeGroupMeetings from "./SingleDaeGroupMeetings";
import { fetchAllGroups } from "../../../services/userServices";
import Loader from "../../shared/Loader";
import AddModuleButton from "../../shared/AddModuleButton";

const DaeGroupMeeting = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [allGroups, setAllGroups] = useState([]);
    const [fetchEnd, setFetchEnd] = useState(false)
    const fetchGroups = async () => {
        setLoading(true);
        try {
            const result = await fetchAllGroups();
            if (result?.status === 200) {
                setAllGroups(result?.data?.data);
                setLoading(false)
                setFetchEnd(true)
            } else {
                setError("তথ্য ডাটাবেইজ থেকে আনতে অসুবিধা হয়েছে।");
                setFetchEnd(true)
            }
        } catch (err) {
            setError(
                "সার্ভারজনিত সমস্যা হচ্ছে। দয়া করে সংশ্লিষ্ট ব্যক্তিকে অবহিত করুন"
            );
            setFetchEnd(true)
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchGroups();
    }, []);
    return (
        <section className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
            <SectionTitle title={"সকল কৃষক গ্রুপ সভা"} />
            <AddModuleButton btnText={'কৃষক গ্রুপ সভা যুক্ত করুন'} link={'add-dae-group-meeting'} />
            <div className="container px-4 md:px-0 grid md:grid-cols-2 lg:grid-cols-3 grid-cols-1 gap-6">
                {!loading &&
                    !error &&
                    allGroups?.length > 0 &&
                    allGroups?.map((singleGroup) => (
                        <SingleDaeGroupMeetings key={singleGroup?._id} data={singleGroup} />
                    ))}

                {!loading && allGroups?.length < 1 && fetchEnd && <div className="flex justify-center items-center">
                    <h2 className="text-red-600 text-2xl  font-extrabold">
                        কোনো গ্রুপের তথ্য পাওয়া যায়নি
                    </h2>
                </div>}
            </div>
            {loading && !error && (
                <div className="flex justify-center items-center">
                    <Loader />
                </div>
            )}
            {!loading && error && <p className="text-red-500 font-bold">{error}</p>}
        </section>
    );
};

export default DaeGroupMeeting;
