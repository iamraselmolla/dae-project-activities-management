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
import { useSelector } from "react-redux";
import FiscalYear from "../../shared/FiscalYear";
import Season from "../../shared/Season";
import { toBengaliNumber } from "bengali-number";

const AllSchools = () => {
  const { projects: allProject } = useSelector((state) => state.dae);
  const [schools, setSchools] = useState([]);
  const [loading, setLoading] = useState(false);
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
  const [filteredSchools, setFilteredSchools] = useState(schools);
  const [blocksOfUnion, setBlocksOfUnion] = useState([]);
  // const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);




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

  const filterProjects = () => {
    let filtered = schools;

    if (selectedProject !== "") {
      filtered = filtered.filter((project) =>
        project.projectInfo.details.includes(selectedProject)
      );
    }

    if (fiscalYear !== "") {
      filtered = filtered.filter((project) =>
        project.time.fiscalYear.includes(fiscalYear)
      );
    }

    if (season !== "") {
      filtered = filtered.filter((project) =>
        project.time.season.includes(season)
      );
    }

    if (unionName !== "") {
      filtered = filtered.filter((project) =>
        project.location.union.includes(unionName)
      );
    }

    if (blockName !== "") {
      filtered = filtered.filter((project) =>
        project.location.block.includes(blockName)
      );
    }

    return filtered; // Return the filtered projects
  };

  useEffect(() => {
    const filtered = filterProjects();
    setFilteredSchools(filtered);
  }, [selectedProject, fiscalYear, season, unionName, blockName]);

  const handleSelectChange = (e) => {
    setSelectedProject(e.target.value);
  };

  // make the function to search accordingly all field and call the function in each change
  useEffect(() => {
    // Filter data whenever the search input changes
    const filtered = schools.filter((item) => {
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
    setFilteredSchools(filtered); // Update filtered data
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
      <div className="text-right font-extrabold col-span-1">
        <AddModuleButton link={"add-school"} btnText={"স্কুল যুক্ত করুন"} />

        <SectionTitle
          title={`সকল স্কুল (${toBengaliNumber(schools?.length)})`}
        />
      </div>
      {user && (
        <>
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
              <label className="font-extrabold mb-1 block">ইউনিয়ন</label>
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
              <label className="font-extrabold mb-1 block">ব্লক</label>
              <select
                className="input input-bordered w-full"
                value={blockName}
                onChange={(e) => setBlockName(e.target.value)}
              >
                <option value="">সিলেক্ট করুন</option>
                {blocksOfUnion?.map((single, index) => (
                  <option key={index} value={single}>
                    {single}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="w-full mb-12">
            <div>
              <input
                type="text"
                className="input input-bordered w-full"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="খুজুন (প্রকল্পের নাম, উপস্থিত কর্মকর্তার নাম/পদবী, মন্তব্য)"
              />
            </div>
          </div>
        </>
      )}
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
