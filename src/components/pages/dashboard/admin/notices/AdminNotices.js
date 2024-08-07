import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import SectionTitle from "../../../../shared/SectionTitle";
import { toBengaliNumber } from "bengali-number";
import { deleteNotice, getAllNotices, updateNotice } from "../../../../../services/userServices";
import LoaderWithOutDynamicMessage from "../../../../shared/LoaderWithOutDynamicMessage";
import NoContentFound from "../../../../shared/NoContentFound";
import Notice from "./Notice";
import EditNoticeModal from "../../../../shared/EditNoticeModal";
import DeleteConfirmationModal from "../../../../shared/DeleteConfirmationModal";

const AdminNotices = () => {
    const [notices, setNotices] = useState([]);
    const [loading, setLoading] = useState(false);
    const [fetchEnd, setFetchEnd] = useState(false);
    const [priorityFilter, setPriorityFilter] = useState("");
    const [search, setSearch] = useState("");
    const [filteredNotices, setFilteredNotices] = useState(notices);
    const [selectedNotice, setSelectedNotice] = useState(null);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);


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
    }, [priorityFilter, search, notices]);

    const handleEdit = (notice) => {
        setSelectedNotice(notice);
        setShowEditModal(true);
    };

    const handleDelete = (notice) => {
        setSelectedNotice(notice);
        setShowDeleteModal(true);
    };

    const handleUpdateNotice = async (updatedNotice) => {
        try {
            const result = await updateNotice(updatedNotice);
            if (result?.status === 200) {
                const updatedNotices = notices.map((notice) =>
                    notice._id === updatedNotice._id ? updatedNotice : notice
                );
                setNotices(updatedNotices);
                setShowEditModal(false);
                toast.success("নোটিশ সফলভাবে আপডেট হয়েছে");
            }
        } catch (err) {
            toast.error("নোটিশ আপডেট করতে সমস্যা হয়েছে");
        }
    };

    const handleConfirmDelete = async () => {
        try {
            const result = await deleteNotice(selectedNotice._id);
            if (result?.status === 200) {
                const remainingNotices = notices.filter((notice) => notice._id !== selectedNotice._id);
                setNotices(remainingNotices);
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
                    filteredNotices?.length > 0 &&
                    filteredNotices?.map((notice) => (
                        <Notice
                            key={notice?._id}
                            notice={notice}
                            handleEdit={handleEdit}
                            handleDelete={handleDelete}
                        />
                    ))}
            </div>
            {!loading && fetchEnd && filteredNotices?.length < 1 && (
                <NoContentFound text={"কোনো নোটিশের তথ্য পাওয়া যায়নি!"} />
            )}
            {!fetchEnd && loading && <LoaderWithOutDynamicMessage />}

            {/* Edit Notice Modal */}
            {showEditModal && (
                <EditNoticeModal
                    onClose={() => setShowEditModal(false)}
                    notice={selectedNotice}
                    onSave={handleUpdateNotice}
                />
            )}

            {/* Delete Confirmation Modal */}
            {showDeleteModal && (
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
