import React, { useEffect, useState } from "react";
import SingleTraining from "./SingleTraining";
import { getAllTraining } from "../../../services/userServices";
import SectionTitle from "../../shared/SectionTitle";
import AddModuleButton from "../../shared/AddModuleButton";
import { makeSureOnline } from "../../shared/MessageConst";
import FiscalYear from "../../shared/FiscalYear";
import Season from "../../shared/Season";
import { useSelector } from "react-redux";
import { toBengaliNumber } from "bengali-number";
import LoaderWithOutDynamicMessage from "../../shared/LoaderWithOutDynamicMessage";
import NoContentFound from "../../shared/NoContentFound";

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
        setAllTrainings(result?.data?.data);
        setFilterAllTrainings(result?.data?.data);
      } else {
        setError("তথ্য ডাটাবেইজ থেকে আনতে অসুবিধা হয়েছে।");
      }
    } catch (err) {
      setError("সার্ভারজনিত সমস্যা হচ্ছে। দয়া করে সংশ্লিষ্ট ব্যক্তিকে অবহিত করুন");
    } finally {
      setLoading(false);
      setFetchEnd(true);
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

    if (selectedProject) {
      filtered = filtered.filter((project) =>
        project.projectInfo.details.includes(selectedProject)
      );
    }

    if (fiscalYear) {
      filtered = filtered.filter((project) =>
        project.fiscalYear.includes(fiscalYear)
      );
    }

    if (season) {
      filtered = filtered.filter((project) => project.season.includes(season));
    }

    return filtered;
  };

  useEffect(() => {
    const filtered = filterTours();
    setFilterAllTrainings(filtered);
  }, [selectedProject, fiscalYear, season]);

  useEffect(() => {
    const filtered = allTrainings.filter((item) => {
      for (const key in item) {
        if (typeof item[key] === "string" && item[key].toLowerCase().includes(search.toLowerCase())) {
          return true;
        }
        if (typeof item[key] === "object") {
          for (const subKey in item[key]) {
            if (
              typeof item[key][subKey] === "string" &&
              item[key][subKey].toLowerCase().includes(search.toLowerCase())
            ) {
              return true;
            }
          }
        }
      }
      return false;
    });
    setFilterAllTrainings(filtered);
  }, [search]);

  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <SectionTitle
        title={`সকল প্রশিক্ষণ ${loading ? '' : `(${toBengaliNumber(allTrainings?.length)})`}`}
      />
      <div className="text-right mb-4">
        <AddModuleButton
          btnText="প্রশিক্ষণ যুক্ত করুন"
          link="addTraining"
        />
      </div>
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="flex-1">
          <label className="block font-semibold mb-2">প্রকল্পের পুরো নাম</label>
          <select
            className="input input-bordered w-full"
            value={selectedProject}
            onChange={(e) => setSelectedProject(e.target.value)}
          >
            <option value="" label="প্রকল্প সিলেক্ট করুন" />
            {allProjects?.map((project) => (
              <option
                key={project?.name?.details}
                value={project?.name?.details}
              >
                {project?.name?.details}
              </option>
            ))}
          </select>
        </div>

        <div className="flex-1">
          <label className="block font-semibold mb-2">অর্থবছর</label>
          <select
            className="input input-bordered w-full"
            value={fiscalYear}
            onChange={(e) => setFiscalYear(e.target.value)}
          >
            <option value="">সিলেক্ট করুন</option>
            <FiscalYear />
          </select>
        </div>

        <div className="flex-1">
          <label className="block font-semibold mb-2">মৌসুম</label>
          <select
            className="input input-bordered w-full"
            value={season}
            onChange={(e) => setSeason(e.target.value)}
          >
            <Season />
          </select>
        </div>
      </div>
      <div className="mb-6">
        <input
          type="text"
          className="input input-bordered w-full"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="খুঁজুন (প্রশিক্ষণের বিষয়, প্রকল্পের নাম, অর্থ বছর, মৌসুম, উপস্থিত কর্মকর্তার নাম)"
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {!loading && !error && filterAllTrainings.length > 0 && filterAllTrainings.map((singleTraining) => (
          <SingleTraining
            setReload={setReload}
            reload={reload}
            key={singleTraining?._id}
            data={singleTraining}
          />
        ))}
      </div>
      {loading && !error && (
        <div className="flex justify-center items-center py-4">
          <LoaderWithOutDynamicMessage />
        </div>
      )}
      {!loading && filterAllTrainings.length < 1 && fetchEnd && (
        <NoContentFound text="কোনো প্রশিক্ষণের তথ্য পাওয়া যায়নি।" />
      )}
    </section>
  );
};

export default Training;
