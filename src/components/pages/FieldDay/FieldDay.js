import React, { useEffect, useState } from "react";
import SingleFieldDay from "./SingleFieldDay";
import { Link } from "react-router-dom";
import { getAllFieldDays } from "../../../services/userServices";
import toast from "react-hot-toast";
import Loader from "../../shared/Loader";
import SectionTitle from "../../shared/SectionTitle";

const FieldDay = () => {
  const [loading, setLoading] = useState(false);
  const [allFieldDays, setAllFieldDay] = useState([]);
  const [error, setError] = useState(null);
  const [fetchEnd, setFetchEnd] = useState(false);
  const fetchAllFieldDays = async () => {
    setLoading(true);
    try {
      const result = await getAllFieldDays();
      if (result?.status === 200) {
        setAllFieldDay(result?.data?.data);
        setLoading(false);
        setFetchEnd(true);
      } else {
        setError("তথ্য ডাটাবেইজ থেকে আনতে অসুবিধা হয়েছে।");
        setFetchEnd(true);
      }
    } catch (err) {
      setError(
        "সার্ভারজনিত সমস্যা হচ্ছে। দয়া করে সংশ্লিষ্ট ব্যক্তিকে অবহিত করুন"
      );
      setFetchEnd(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (navigator.onLine) {
      fetchAllFieldDays();
    } else {
      toast.error("আপনার ইন্টারনেট সংযোগ অথবা ওয়াইফাই চালু করুন");
    }
  }, []);
  return (
    <section className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
      <SectionTitle title={"সকল মাঠ দিবস"} />
      <div className="text-right font-extrabold">
        <Link to="/addFieldDay">
          <button className="btn btn-outline btn-accent mb-5 border-2 px-5 py-22">
            <div className="flex justify-center items-center gap-2 text-lg">
              <span className="relative flex h-8 w-8">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-8 w-8 bg-sky-500"></span>
              </span>
              <div>মাঠদিবস যুক্ত করুন</div>
            </div>
          </button>
        </Link>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-4 grid-cols-1 gap-6">
        {!loading &&
          !error &&
          allFieldDays?.length > 0 &&
          allFieldDays?.map((singleFieldDay) => (
            <SingleFieldDay key={singleFieldDay?._id} data={singleFieldDay} />
          ))}

        {!loading && allFieldDays?.length < 1 && fetchEnd && (
          <div className="flex justify-center items-center">
            <h2 className="text-red-600 text-2xl  font-extrabold">
              কোনো মাঠ ডিবসের তথ্য পাওয়া যায়নি
            </h2>
          </div>
        )}
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

export default FieldDay;
