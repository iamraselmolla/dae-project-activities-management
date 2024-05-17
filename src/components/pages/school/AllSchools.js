import React, { useContext, useEffect, useState } from "react";
import SingleSchool from "./SingleSchool";
import { makeSureOnline } from "../../shared/MessageConst";
import toast from "react-hot-toast";
import Loader from "../../shared/Loader";
import { AuthContext } from "../../AuthContext/AuthProvider";
import AddModuleButton from "../../shared/AddModuleButton";
import NoContentFound from "../../shared/NoContentFound";
import SectionTitle from "../../shared/SectionTitle";
import { getAllSchools } from "../../../services/userServices";

const AllSchools = () => {
  const [schools, setSchools] = useState([]);
  const [loading, setLoading] = useState(false);
  const [fetchEnd, setFetchEnd] = useState(false);
  const { user } = useContext(AuthContext);
  const [search, setSearch] = useState("");
  const [filteredSchools, setFilteredSchools] = useState(schools);

  useEffect(() => {
    const fetchAllSchools = async () => {
      setLoading(true);
      try {
        const result = await getAllSchools();
        if (result?.status === 200) {
          setSchools(result.data?.data);
          setFilteredSchools(result.data?.data);
          setLoading(false);
          setFetchEnd(true);
        }
      } catch (err) {
        toast.error(
          "তথ্য ডাটাবেজ থেকে আনতে সমস্যা হয়েছে। দয়া করে সংশ্লিষ্ট কর্তৃপক্ষকে অবহিত করুন"
        );
        setLoading(false);
        setFetchEnd(true);
      }
    };
    if (navigator.onLine) {
      fetchAllSchools();
    } else {
      makeSureOnline();
    }
  }, []);

  useEffect(() => {
    const filtered = schools.filter((item) => {
      for (const key in item) {
        if (typeof item[key] === "string" && item[key].includes(search)) {
          return true;
        }
        if (typeof item[key] === "object") {
          for (const subKey in item[key]) {
            if (
              typeof item[key][subKey] === "string" &&
              item[key][subKey].includes(search)
            ) {
              return true;
            }
          }
        }
      }
      return false;
    });
    setFilteredSchools(filtered); // Update filtered data
  }, [search, schools]);

  return (
    <section className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
      <div className="text-right font-extrabold col-span-1">
        <AddModuleButton link={"add-school"} btnText={"স্কুল যুক্ত করুন"} />
      </div>
      {user && (
        <div className="flex py-6 flex-wrap justify-between items-center gap-3">
          <div>
            <label className="font-extrabold mb-1 block">অনুসন্ধান</label>
            <input
              type="text"
              className="input input-bordered w-full"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="অনুসন্ধান লিখুন"
            />
          </div>
        </div>
      )}

      <SectionTitle title={"সকল স্কুল"} />
      <div className="container px-4 md:px-0 grid md:grid-cols-2 lg:grid-cols-3 grid-cols-1 gap-3 mt-10">
        {!loading &&
          fetchEnd &&
          filteredSchools?.length > 0 &&
          filteredSchools?.map((school) => (
            <SingleSchool key={school?._id} data={school} />
          ))}
      </div>
      {!loading && fetchEnd && filteredSchools?.length < 1 && (
        <NoContentFound text={"কোনো স্কুলের তথ্য পাওয়া যায়নি!"} />
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

export default AllSchools;
