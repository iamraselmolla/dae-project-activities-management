import React, { useContext, useEffect, useState } from "react";
import SingleDemo from "./SingleDemo";
import { Link } from "react-router-dom";
import { makeSureOnline } from "../../shared/MessageConst";
import toast from "react-hot-toast";
import { getAllDemos } from "../../../services/userServices";
import Loader from "../../shared/Loader";
import { AuthContext } from "../../AuthContext/AuthProvider";
import AddModuleButton from "../../shared/AddModuleButton";

const Demo = () => {
  const [demos, setDemos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [fetchEnd, setFetchEnd] = useState(false);
  const { user } = useContext(AuthContext)
  useEffect(() => {
    const fetchAllDemos = async () => {
      setLoading(true);
      try {
        const result = await getAllDemos();
        if (result?.status === 200) {
          setDemos(result.data?.data);
          setLoading(false);
          setFetchEnd(true);
        }
      } catch (err) {
        toast.error(
          "প্রদর্শনীর তথ্য ডাটাবেজ থেকে আনতে সমস্যা হয়েছে। দয়া করে সংশ্লিষ্ট কর্তৃপক্ষকে অবহিত করুন"
        );
        setLoading(false);
        setFetchEnd(true);
      }
    };
    if (navigator.onLine) {
      fetchAllDemos();
    } else {
      makeSureOnline();
    }
  }, []);

  return (
    <section className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
      {user && <div className="text-right font-extrabold">
        <AddModuleButton link={'addDemo'} btnText={'প্রদর্শনী যুক্ত করুন'} />
      </div>}
      <div className="container px-4 md:px-0 grid md:grid-cols-2 lg:grid-cols-3 grid-cols-1 gap-3">
        {!loading &&
          fetchEnd &&
          demos?.length > 0 &&
          demos?.map((demo) => <SingleDemo key={demo?._id} data={demo} />)}
      </div>
      {!loading && fetchEnd && demos?.length < 1 && (
        <h2 className="text-red-600 text-center text-2xl  font-extrabold">
          কোনো প্রদর্শনীর তথ্য পাওয়া যায়নি!!
        </h2>
      )}
      {!fetchEnd && loading && (
        <div className="py-20">
          <div className="fixed daeLoader">
            <Loader />
            <h2 className="text-green-600 mt-3 text-4xl">
              তথ্য আনা হচ্ছে। দয়া করে অপেক্ষা করুন
            </h2>
          </div>
        </div>
      )}
    </section>
  );
};

export default Demo;
