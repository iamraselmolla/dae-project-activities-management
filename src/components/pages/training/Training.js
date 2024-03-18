import React, { useEffect, useState } from "react";
import SingleTraining from "./SingleTraining";
import { Link } from "react-router-dom";
import { getAllTraining } from "../../../services/userServices";
import toast from "react-hot-toast";
import SingleDemo from "../DaeGroupMeeting/SingleDaeGroupMeetings";
import Loader from "../../shared/Loader";

const Training = () => {
  const [allTrainings, setAllTrainings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [fetchEnd, setFetchEnd] = useState(false);

  const fetchAllTraining = async () => {
    setLoading(true);
    try {
      const result = await getAllTraining();
      if (result.status === 200) {
        console.log(result);
        setAllTrainings(result?.data?.data);
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
      fetchAllTraining();
    } else {
      toast.error("আপনার ইন্টারনেট সংযোগটি চালু করুন");
    }
  }, []);
  console.log(allTrainings);

  return (
    <section className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
      <div className="text-right font-extrabold">
        <Link to="/addTraining">
          <button className="btn btn-outline btn-accent mb-5 border-2 px-5 py-22">
            <div className="flex justify-center items-center gap-2 text-lg">
              <span className="relative flex h-8 w-8">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-8 w-8 bg-sky-500"></span>
              </span>
              <div>প্রশিক্ষণ যুক্ত করুন</div>
            </div>
          </button>
        </Link>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-4 grid-cols-1 gap-6">
        {!loading &&
          !error &&
          allTrainings?.length > 0 &&
          allTrainings?.map((singleTraining) => (
            <SingleTraining key={singleTraining?._id} data={singleTraining} />
          ))}

        {!loading && allTrainings?.length < 1 && fetchEnd && (
          <div className="flex justify-center items-center">
            <h2 className="text-red-600 text-2xl  font-extrabold">
              কোনো কৃষক প্রশিক্ষণের তথ্য পাওয়া যায়নি।
            </h2>
          </div>
        )}
      </div>
      {loading && !error && (
        <div className="flex justify-center items-center">
          <Loader />
        </div>
      )}
    </section>
  );
};

export default Training;
