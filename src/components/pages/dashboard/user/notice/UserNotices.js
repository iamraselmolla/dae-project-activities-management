import React, { useState } from "react";
import { useSelector } from "react-redux";
import SectionTitle from "../../../../shared/SectionTitle";
import Notice from "../../../../shared/Notice";
import NoContentFound from "../../../../shared/NoContentFound";
import { toBengaliNumber } from "bengali-number";

const UserNotices = () => {
    const { userNotices: notices } = useSelector(state => state.dae);
    const [priorityFilter, setPriorityFilter] = useState("");
    const [search, setSearch] = useState("");



    return (
        <section className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
            <div className="text-right font-extrabold col-span-1">
                <SectionTitle title={`সকল নোটিশ (${toBengaliNumber(notices?.length || 0)})`} />
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
                {
                    notices?.map((notice) => (
                        <Notice
                            key={notice._id}
                            notice={notice}
                        />
                    ))}
            </div>
            {notices.length < 1 && (
                <NoContentFound text={"কোনো নোটিশের তথ্য পাওয়া যায়নি!"} />
            )}
        </section>
    );
};

export default UserNotices;
