import React, { useEffect, useState } from "react";
import SingleTraining from "./SingleTraining";
import { Link } from "react-router-dom";
import { getAllTraining } from "../../../services/userServices";
import toast from "react-hot-toast";
import SingleDemo from "../DaeGroupMeeting/SingleDaeGroupMeetings";
import Loader from "../../shared/Loader";
import SectionTitle from "../../shared/SectionTitle";
import AddModuleButton from "../../shared/AddModuleButton";
import { makeSureOnline } from "../../shared/MessageConst";

const Training = () => {
  const [allTrainings, setAllTrainings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [fetchEnd, setFetchEnd] = useState(false);
  const [reload, setReload] = useState(false);

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
      makeSureOnline();
    }
  }, [reload]);

  return (
    <section className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
      <SectionTitle title={"সকল প্রশিক্ষণ"} />
      <div className="text-right font-extrabold">
        <AddModuleButton
          btnText={"প্রশিক্ষণ যুক্ত করুন"}
          link={"addTraining"}
          key={"addTraining"}
        />
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 grid-cols-1 gap-6">
        {!loading &&
          !error &&
          allTrainings?.length > 0 &&
          allTrainings?.map((singleTraining) => (
            <SingleTraining
              setReload={setReload}
              reload={reload}
              key={singleTraining?._id}
              data={singleTraining}
            />
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
