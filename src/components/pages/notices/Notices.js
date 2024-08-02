// src/Notices.js
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../AuthContext/AuthProvider";
import toast from "react-hot-toast";
import LoaderWithOutDynamicMessage from "../../shared/LoaderWithOutDynamicMessage";
import NoContentFound from "../../shared/NoContentFound";
import SectionTitle from "../../shared/SectionTitle";
import Notice from "./Notice";
import { getAllNotices } from "../../../services/userServices";

const Notices = () => {
    const [notices, setNotices] = useState([]);
    const [loading, setLoading] = useState(false);
    const [fetchEnd, setFetchEnd] = useState(false);
    const [priorityFilter, setPriorityFilter] = useState("");
    const [search, setSearch] = useState("");
    const [filteredNotices, setFilteredNotices] = useState(notices);
    const { user } = useContext(AuthContext);

    useEffect(() => {
        const fetchAllNotices = async () => {
            setLoading(true);
            try {
                const result = await getAllNotices();
                if (result?.status === 200) {
                    setNotices(result.data?.data);
                    setFilteredNotices(result.data?.data);
                    setLoading(false);
                    setFetchEnd(true);
                }
            } catch (err) {
                toast.error(
                    "নোটিশের তথ্য ডাটাবেজ থেকে আনতে সমস্যা হয়েছে। দয়া করে সংশ্লিষ্ট কর্তৃপক্ষকে অবহিত করুন"
                );
                setLoading(false);
                setFetchEnd(true);
            }
        };
        if (navigator.onLine) {
            fetchAllNotices();
        } else {
            toast.error("দয়া করে ইন্টারনেট সংযোগ চেক করুন");
        }
    }, []);

    const filterNotices = () => {
        let filtered = notices;

        if (priorityFilter !== "") {
            filtered = filtered.filter((notice) => notice.priority === priorityFilter);
        }

        if (search !== "") {
            filtered = filtered.filter((notice) =>
                notice.subject.includes(search) ||
                notice.content.includes(search)
            );
        }

        return filtered;
    };

    useEffect(() => {
        const filtered = filterNotices();
        setFilteredNotices(filtered);
    }, [priorityFilter, search]);

    return (
        <section className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
            <div className="text-right font-extrabold col-span-1">
                <SectionTitle
                    title={`সকল নোটিশ ${!loading ? `(${filteredNotices.length})` : ''}`}
                />
            </div>
            <div className="flex py-6 flex-wrap md:flex-wrap lg:flex-nowrap justify-between items-center gap-3">
                <div>
                    <select
                        className="input input-bordered"
                        value={priorityFilter}
                        onChange={(e) => setPriorityFilter(e.target.value)}
                    >
                        <option value="" label="প্রাধান্য সিলেক্ট করুন" />
                        <option value="High" label="উচ্চ" />
                        <option value="Medium" label="মাঝারি" />
                        <option value="Low" label="নিম্ন" />
                    </select>
                </div>
                <div className="w-full">
                    <input
                        type="text"
                        className="input input-bordered w-full"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="খুজুন (বিষয়, বিষয়বস্তু)"
                    />
                </div>
            </div>
            <div className="container px-4 md:px-0 grid md:grid-cols-2 lg:grid-cols-3 grid-cols-1 gap-3 mt-10">
                {!loading &&
                    fetchEnd &&
                    filteredNotices?.length > 0 &&
                    filteredNotices?.map((notice) => (
                        <Notice key={notice?._id} notice={notice} />
                    ))}
            </div>
            {!loading && fetchEnd && filteredNotices?.length < 1 && (
                <NoContentFound text={"কোনো নোটিশের তথ্য পাওয়া যায়নি!"} />
            )}
            {!fetchEnd && loading && <LoaderWithOutDynamicMessage />}
        </section>
    );
};

export default Notices;
