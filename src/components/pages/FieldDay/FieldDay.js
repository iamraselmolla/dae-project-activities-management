import React, { useEffect, useState } from "react";
import SingleFieldDay from "./SingleFieldDay";
import { getAllFieldDays } from "../../../services/userServices";
import toast from "react-hot-toast";
import Loader from "../../shared/Loader";
import SectionTitle from "../../shared/SectionTitle";
import AddModuleButton from "../../shared/AddModuleButton";
import { makeSureOnline } from "../../shared/MessageConst";

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
      makeSureOnline();
    }
  }, []);
  return (
    <section className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
      <SectionTitle title={"সকল মাঠ দিবস"} />
      <div className="text-right font-extrabold">
        <AddModuleButton btnText={"মাঠদিবস যুক্ত করুন"} link={"addFieldDay"} />
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 grid-cols-1 gap-6">
        {!loading &&
          !error &&
          allFieldDays?.length > 0 &&
          allFieldDays?.map((singleFieldDay) => (
            <SingleFieldDay key={singleFieldDay?._id} data={singleFieldDay} />
          ))}

        {!loading && allFieldDays?.length < 1 && fetchEnd && (
          <div className="flex justify-center items-center">
            <h2 className="text-red-600 text-2xl  font-extrabold">
              কোনো মাঠ দিবসের তথ্য পাওয়া যায়নি
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
