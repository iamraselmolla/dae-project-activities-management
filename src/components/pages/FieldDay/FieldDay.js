import React, { useContext, useEffect, useState } from "react";
import SingleFieldDay from "./SingleFieldDay";
import { getAllFieldDays } from "../../../services/userServices";
import Loader from "../../shared/Loader";
import SectionTitle from "../../shared/SectionTitle";
import AddModuleButton from "../../shared/AddModuleButton";
import { makeSureOnline } from "../../shared/MessageConst";
import NoContentFound from "../../shared/NoContentFound";
import { AuthContext } from "../../AuthContext/AuthProvider";
import { useSelector } from "react-redux";
import FiscalYear from "../../shared/FiscalYear";
import Season from "../../shared/Season";

const FieldDay = () => {
  const { projects: allProject } = useSelector((state) => state.dae);
  const [loading, setLoading] = useState(false);
  const [allFieldDays, setAllFieldDay] = useState([]);
  const [error, setError] = useState(null);
  const [fetchEnd, setFetchEnd] = useState(false);
  const { user } = useContext(AuthContext);
  const { blockAndUnions } = useSelector((state) => state.dae);
  const [allUnion, setAllUnion] = useState([]);
  const [selectedProject, setSelectedProject] = useState("");
  const [fiscalYear, setFiscalYear] = useState("");
  const [season, setSeason] = useState("");
  const [unionName, setUnionName] = useState("");
  const [blockName, setBlockName] = useState("");
  const [search, setSearch] = useState("");
  const [filteredFieldDays, setFilteredFieldDays] = useState([]);
  const [blocksOfUnion, setBlocksOfUnion] = useState([]);

  const fetchAllFieldDays = async () => {
    setLoading(true);
    try {
      const result = await getAllFieldDays();
      if (result?.status === 200) {
        setAllFieldDay(result?.data?.data);
        setFilteredFieldDays(result?.data?.data)
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

  const filterProjects = () => {
    let filtered = allFieldDays;

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
      filtered = filtered.filter((project) =>
        project.season.includes(season)
      );
    }

    if (unionName !== "") {
      filtered = filtered.filter((project) =>
        project.address.union.includes(unionName)
      );
    }

    if (blockName !== "") {
      filtered = filtered.filter((project) =>
        project.address.block.includes(blockName)
      );
    }

    return filtered; // Return the filtered projects
  };

  useEffect(() => {
    const filtered = filterProjects();
    setFilteredFieldDays(filtered);
  }, [selectedProject, fiscalYear, season, unionName, blockName]);

  const handleSelectChange = (e) => {
    setSelectedProject(e.target.value);
  };

  useEffect(() => {
    // Filter data whenever the search input changes
    const filtered = allFieldDays.filter((item) => {
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
    setFilteredFieldDays(filtered); // Update filtered data
  }, [search]);

  useEffect(() => {
    const checkUnion = [];
    blockAndUnions?.map((single) =>
      checkUnion.includes(single?.unionB) ? "" : checkUnion.push(single?.unionB)
    );
    setAllUnion(checkUnion);
  }, [blockAndUnions]);

  const handleUnionAndBlockSelection = (e) => {
    const selectedUnion = e.target.value;
    setUnionName(selectedUnion);

    // Find the blocks under the selected union
    const result = blockAndUnions?.filter(
      (single) => single?.unionB === selectedUnion
    );
    const blocks = result?.map((single) => single?.blockB); // Assuming result contains an array of objects with 'blockB' property

    // Update the state with the blocks of the selected union
    setBlocksOfUnion(blocks);
  };

  return (
    <section className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
      <AddModuleButton btnText={"মাঠদিবস যুক্ত করুন"} link={"addFieldDay"} />
      <SectionTitle title={"সকল মাঠ দিবস"} />
      {user && (
        <div className="flex py-6 flex-wrap justify-between items-center gap-3">
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
              {allProject?.map((project) => (
                <option
                  key={project._id}
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

          <div>
            <label className="font-extrabold mb-1 block">ইউনিয়নের নাম</label>
            <select
              className="input input-bordered w-full"
              value={unionName}
              onChange={handleUnionAndBlockSelection}
            >
              <option key={"kdsfkd"} value="">
                ইউনিয়ন
              </option>
              {allUnion?.map((single) => (
                <option key={single}>{single}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="font-extrabold mb-1 block">ব্লকের নাম</label>
            <select
              className="input input-bordered w-full"
              value={blockName}
              onChange={(e) => setBlockName(e.target.value)}
            >
              <option value="">ব্লক সিলেক্ট করুন</option>
              {blocksOfUnion?.map((single, index) => (
                <option key={index} value={single}>
                  {single}
                </option>
              ))}
            </select>
          </div>

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

      <div className="grid md:grid-cols-2 lg:grid-cols-3 grid-cols-1 gap-6">
        {!loading &&
          !error &&
          filteredFieldDays?.length > 0 &&
          filteredFieldDays?.map((singleFieldDay) => (
            <SingleFieldDay key={singleFieldDay?._id} data={singleFieldDay} />
          ))}
      </div>
      {!loading && filteredFieldDays?.length < 1 && fetchEnd && (
        <NoContentFound text={" কোনো মাঠ দিবসের তথ্য পাওয়া যায়নি!"} />
      )}
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
