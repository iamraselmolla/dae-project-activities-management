import React, { useEffect, useState } from "react";
import SingleTraining from "./SingleTraining";
import { getAllTraining } from "../../../services/userServices";
import Loader from "../../shared/Loader";
import SectionTitle from "../../shared/SectionTitle";
import AddModuleButton from "../../shared/AddModuleButton";
import { makeSureOnline } from "../../shared/MessageConst";
import FiscalYear from "../../shared/FiscalYear";
import Season from "../../shared/Season";
import { useSelector } from "react-redux";
import { toBengaliNumber } from "bengali-number";
const Training = () => {
  const [allTrainings, setAllTrainings] = useState([]);
  const [filterAllTrainings, setFilterAllTrainings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [fetchEnd, setFetchEnd] = useState(false);
  const [reload, setReload] = useState(false);
  const [selectedProject, setSelectedProject] = useState("");
  const [fiscalYear, setFiscalYear] = useState("");
  const [season, setSeason] = useState("");
  const [search, setSearch] = useState("");
  const { projects: allProjects } = useSelector((state) => state.dae);
  const fetchAllTraining = async () => {
    setLoading(true);
    try {
      const result = await getAllTraining();
      if (result.status === 200) {
        console.log(result);
        setAllTrainings(result?.data?.data);
        setFilterAllTrainings(result?.data?.data);
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

  const filterTours = () => {
    let filtered = allTrainings;

    if (selectedProject !== "") {
      filtered = filtered.filter((project) =>
        project.projectInfo.details.includes(selectedProject)
      );
    }

    if (fiscalYear !== "") {
      filtered = filtered.filter((project) =>
        project.fiscalYear.includes(fiscalYear)
      );
    }

    if (season !== "") {
      filtered = filtered.filter((project) => project.season.includes(season));
    }

    return filtered;
  };
  useEffect(() => {
    const filtered = filterTours();
    setFilterAllTrainings(filtered);
  }, [selectedProject, fiscalYear, season]);

  const handleSelectChange = (e) => {
    setSelectedProject(e.target.value);
  };

  // Make and call function to change searching result according each searching key change
  useEffect(() => {
    // Filter data whenever the search input changes
    const filtered = allTrainings.filter((item) => {
      // Check if any field matches the search input
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
    setFilterAllTrainings(filtered); // Update filtered data
  }, [search]);

  return (
    <section className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
      <SectionTitle
        title={`সকল প্রশিক্ষণ (${toBengaliNumber(allTrainings?.length)})`}
      />
      <div className="text-right font-extrabold">
        <AddModuleButton
          btnText={"প্রশিক্ষণ যুক্ত করুন"}
          link={"addTraining"}
          key={"addTraining"}
        />
      </div>
      <div className="flex py-6 flex-wrap md:flex-wrap lg:flex-nowrap  justify-between items-center gap-3">
        <div>
          <label className="font-extrabold mb-1 block">
            প্রকল্পের পুরো নাম
          </label>
          <select
            className="input input-bordered w-full"
            value={selectedProject}
            onChange={handleSelectChange}
          >
            <option value="" label="প্রকল্প সিলেক্ট করুন" />
            {allProjects?.map((project) => (
              <option
                key={project?.name?.details}
                value={project?.name?.details}
                label={project?.name?.details}
              />
            ))}
          </select>
        </div>

        <div>
          <label className="font-extrabold mb-1 block">অর্থবছর</label>
          <select
            className="input input-bordered w-full"
            type="text"
            value={fiscalYear}
            onChange={(e) => setFiscalYear(e.target.value)}
            placeholder="অর্থবছর সিলেক্ট করুন"
          >
            <option value={""}>সিলেক্ট করুন</option>
            <FiscalYear />
          </select>
        </div>
        <div>
          <label className="font-extrabold mb-1 block">মৌসুম</label>
          <select
            className="input input-bordered w-full"
            id="season"
            name="season"
            value={season}
            onChange={(e) => setSeason(e.target.value)}
          >
            <Season />
          </select>
        </div>
      </div>
      <div className="mt-6 mb-10">
        <input
          type="text"
          className="input input-bordered w-full"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="খুজুন (প্রশিক্ষণের বিষয়, প্রকল্পের নাম, অর্থ বছর, মৌসুম, উপস্থিত কর্মকর্তার নাম)"
        />
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 grid-cols-1 gap-6">
        {!loading &&
          !error &&
          filterAllTrainings?.length > 0 &&
          filterAllTrainings?.map((singleTraining) => (
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
