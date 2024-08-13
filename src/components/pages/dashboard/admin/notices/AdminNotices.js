import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import SectionTitle from "../../../../shared/SectionTitle";
import { toBengaliNumber } from "bengali-number";
import { deleteNotice, updateNotice } from "../../../../../services/userServices";
import LoaderWithOutDynamicMessage from "../../../../shared/LoaderWithOutDynamicMessage";
import NoContentFound from "../../../../shared/NoContentFound";
import DeleteConfirmationModal from "../../../../shared/DeleteConfirmationModal";
import { useSelector } from "react-redux";
import Notice from "../../../../shared/Notice";

const AdminNotices = () => {
    const { allNotices: notices } = useSelector(state => state.dae);
    const [filteredNotices, setFilteredNotices] = useState([]);
    const [priorityFilter, setPriorityFilter] = useState("");
    const [search, setSearch] = useState("");
    const [selectedNotice, setSelectedNotice] = useState(null);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [loading, setLoading] = useState(true);
    const [fetchEnd, setFetchEnd] = useState(false);

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
        if (notices.length > 0) {
            setFilteredNotices(filterNotices());
            setLoading(false);
            setFetchEnd(true);
        } else {
            setLoading(false);
            setFetchEnd(true);
        }
    }, [priorityFilter, search, notices]);

    const handleEdit = (notice) => {
        setSelectedNotice(notice);
    };

    const handleDelete = (notice) => {
        setSelectedNotice(notice);
        setShowDeleteModal(true);
    };


    const handleConfirmDelete = async () => {
        try {
            const result = await deleteNotice(selectedNotice._id);
            if (result?.status === 200) {
                const remainingNotices = notices.filter((notice) => notice._id !== selectedNotice._id);
                setFilteredNotices(remainingNotices);
                setShowDeleteModal(false);
                toast.success("নোটিশ সফলভাবে মুছে ফেলা হয়েছে");
            }
        } catch (err) {
            toast.error("নোটিশ মুছতে সমস্যা হয়েছে");
        }
    };

    return (
        <section className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
            <div className="text-right font-extrabold col-span-1">
                <SectionTitle
                    title={`সকল নোটিশ ${!loading ? `(${toBengaliNumber(filteredNotices.length)})` : ''}`}
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
                    filteredNotices.length > 0 &&
                    filteredNotices.map((notice) => (
                        <Notice
                            key={notice._id}
                            notice={notice}
                            handleEdit={handleEdit}
                            handleDelete={handleDelete}
                        />
                    ))}
            </div>
            {!loading && fetchEnd && filteredNotices.length < 1 && (
                <NoContentFound text={"কোনো নোটিশের তথ্য পাওয়া যায়নি!"} />
            )}
            {!fetchEnd && loading && <LoaderWithOutDynamicMessage />}

            {/* Delete Confirmation Modal */}
            {showDeleteModal && selectedNotice && (
                <DeleteConfirmationModal
                    onClose={() => setShowDeleteModal(false)}
                    onConfirm={handleConfirmDelete}
                    notice={selectedNotice}
                />
            )}
        </section>
    );
};

export default AdminNotices;
